#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const katex = require('../assets/vendor/katex/katex.min.js');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_ROOT = path.join(ROOT, 'content');
const SECTION_TYPES = new Set(['why', 'think', 'def', 'tool', 'ex', 'warn', 'ext', 'aiw']);
const VOID_TAGS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const RAW_TEXT_TAGS = new Set(['pre', 'code']);
const errors = [];
const warnings = [];
let formulaCount = 0;
let lessonCount = 0;
let questionCount = 0;

function rel(file) {
  return path.relative(ROOT, file).split(path.sep).join('/');
}

function fail(where, message) {
  errors.push(`${where}: ${message}`);
}

function warn(where, message) {
  warnings.push(`${where}: ${message}`);
}

function listJsFiles(dir) {
  return fs.readdirSync(dir, {withFileTypes: true})
    .flatMap(entry => entry.isDirectory() ? listJsFiles(path.join(dir, entry.name)) : [path.join(dir, entry.name)])
    .filter(file => file.endsWith('.js'))
    .sort();
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function evaluate(file, sandbox) {
  try {
    vm.runInContext(read(file), sandbox, {filename: file, displayErrors: true});
  } catch (error) {
    fail(rel(file), `JavaScript 执行失败：${error.message}`);
  }
}

function expectedContentFile(courseId, chapterId) {
  if (courseId === 'math') return `content/math/${chapterId}.js`;
  if (courseId === 'english') return `content/english/${chapterId}.js`;
  return `content/cs408/${chapterId}.js`;
}

function keyFor(courseId, chapterId) {
  if (courseId === 'math') return `math/${chapterId}`;
  if (courseId === 'english') return `english/${chapterId}`;
  return `cs408/${chapterId}`;
}

function curriculumChapters(curriculum) {
  const rows = [];
  for (const [courseId, course] of Object.entries(curriculum || {})) {
    const partIds = new Set();
    for (const part of course.parts || []) {
      if (partIds.has(part.id)) fail(`curriculum/${courseId}`, `重复 part id：${part.id}`);
      partIds.add(part.id);
      const chapterIds = new Set();
      for (const chapter of part.chapters || []) {
        if (chapterIds.has(chapter.id)) fail(`curriculum/${courseId}/${part.id}`, `重复 chapter id：${chapter.id}`);
        chapterIds.add(chapter.id);
        rows.push({courseId, part, chapter, key: keyFor(courseId, chapter.id), file: expectedContentFile(courseId, chapter.id)});
      }
    }
  }
  return rows;
}

function stripRawText(html) {
  return String(html).replace(/<(pre|code)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, match => ' '.repeat(match.length));
}

function parseDelimitedMath(source, onUnmatched) {
  const spans = [];
  let index = 0;
  while (index < source.length) {
    const dollar = source.indexOf('$', index);
    if (dollar < 0) break;
    let precedingSlashes = 0;
    for (let j = dollar - 1; j >= 0 && source[j] === '\\'; j--) precedingSlashes++;
    if (precedingSlashes % 2) { index = dollar + 1; continue; }
    const delimiter = source[dollar + 1] === '$' ? '$$' : '$';
    const start = dollar + delimiter.length;
    let end = -1;
    for (let i = start; i < source.length; i++) {
      if (source[i] !== '$') continue;
      let slashes = 0;
      for (let j = i - 1; j >= 0 && source[j] === '\\'; j--) slashes++;
      if (slashes % 2) continue;
      if (delimiter === '$$' ? source[i + 1] === '$' : source[i + 1] !== '$') { end = i; break; }
    }
    if (end < 0) {
      onUnmatched(delimiter);
      break;
    }
    spans.push({start: dollar, end: end + delimiter.length, formulaStart: start, formulaEnd: end, display: delimiter === '$$'});
    index = end + delimiter.length;
  }
  return spans;
}

function maskMath(text) {
  const source = String(text);
  const spans = parseDelimitedMath(source, () => {});
  let result = '';
  let index = 0;
  for (const span of spans) {
    result += source.slice(index, span.start) + ' '.repeat(span.end - span.start);
    index = span.end;
  }
  return result + source.slice(index);
}

function validateHtml(html, where) {
  const source = String(html);
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(source)) {
    fail(where, 'HTML 含非法控制字符，可能由 JavaScript 反斜杠转义损坏导致');
  }
  const clean = maskMath(source).replace(/<!--[\s\S]*?-->/g, '');
  const stack = [];
  const tagRe = /<\/?([A-Za-z][\w:-]*)(?:\s+[^<>]*?)?\s*\/?>/g;
  let match;
  while ((match = tagRe.exec(clean))) {
    const token = match[0];
    const tag = match[1].toLowerCase();
    if (VOID_TAGS.has(tag) || /\/>$/.test(token)) continue;
    if (token.startsWith('</')) {
      if (!stack.length) {
        fail(where, `多余结束标签 </${tag}>`);
        continue;
      }
      const open = stack.pop();
      if (open !== tag) fail(where, `标签嵌套错误：期待 </${open}>，却遇到 </${tag}>`);
    } else {
      stack.push(tag);
    }
  }
  if (stack.length) fail(where, `未闭合标签：${stack.map(tag => `<${tag}>`).join(', ')}`);
  for (const rawTag of RAW_TEXT_TAGS) {
    const open = (clean.match(new RegExp(`<${rawTag}\\b`, 'gi')) || []).length;
    const close = (clean.match(new RegExp(`</${rawTag}\\s*>`, 'gi')) || []).length;
    if (open !== close) fail(where, `<${rawTag}> 数量 ${open} 与结束标签数量 ${close} 不一致`);
  }
}

function extractMath(text, where) {
  const source = stripRawText(String(text));
  return parseDelimitedMath(source, delimiter => fail(where, `未配对公式分隔符 ${delimiter}`))
    .map(span => {
      const formula = source.slice(span.formulaStart, span.formulaEnd);
      if (!formula.trim()) fail(where, '公式分隔符内为空');
      return {formula, display: span.display};
    });
}

function decodeHtmlEntities(text) {
  return String(text)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

function validateMath(text, where) {
  for (const item of extractMath(text, where)) {
    formulaCount++;
    const formula = decodeHtmlEntities(item.formula);
    try {
      katex.renderToString(formula, {
        displayMode: item.display,
        throwOnError: true,
        strict: 'error',
        trust: false,
        output: 'htmlAndMathml'
      });
    } catch (error) {
      fail(where, `KaTeX 严格解析失败：${JSON.stringify(formula)}；${error.message}`);
    }
  }
}

function normalizeOption(option) {
  const source = String(option);
  const hasLatinLetters = /[A-Za-z]/.test(source.replace(/<[^>]*>/g, ''));
  let normalized = source
    .replace(/<[^>]*>/g, '')
    .replace(/\\(?:dfrac|tfrac|frac)\{([^{}]+)\}\{([^{}]+)\}/g, '($1)/($2)')
    .replace(/\\left|\\right|\$|\s+/g, '')
    .replace(/[，。；：、,.？]/g, '');
  if (!hasLatinLetters) normalized = normalized.toLowerCase();
  return normalized;
}

function exactOption(option) {
  return String(option).replace(/\s+/g, ' ').trim();
}

function validateQuiz(quiz, where) {
  if (!Array.isArray(quiz) || quiz.length === 0) {
    fail(where, 'quiz 必须是非空数组');
    return;
  }
  const ids = new Set();
  for (const [index, question] of quiz.entries()) {
    const qwhere = `${where}/quiz/${question && question.id || index}`;
    questionCount++;
    if (!question || typeof question !== 'object') {
      fail(qwhere, '题目必须是对象');
      continue;
    }
    if (typeof question.id !== 'string' || !question.id.trim()) fail(qwhere, '题号 id 为空或不是字符串');
    else if (ids.has(question.id)) fail(qwhere, `单课内重复题号：${question.id}`);
    else ids.add(question.id);
    if (typeof question.q !== 'string' || !question.q.trim()) fail(qwhere, '题干为空');
    if (!Array.isArray(question.opts) || question.opts.length < 2 || question.opts.length > 4) {
      fail(qwhere, '选项数量必须为 2～4，以匹配当前 ABCD 界面');
    } else {
      const exact = new Map();
      const normalized = new Map();
      question.opts.forEach((option, optionIndex) => {
        if (typeof option !== 'string' || !option.trim()) fail(qwhere, `选项 ${optionIndex + 1} 为空`);
        const exactKey = exactOption(option);
        const duplicateExact = exact.has(exactKey);
        if (duplicateExact) fail(qwhere, `选项 ${optionIndex + 1} 与选项 ${exact.get(exactKey) + 1} 完全重复`);
        else exact.set(exactKey, optionIndex);
        const key = normalizeOption(option);
        if (normalized.has(key) && !duplicateExact) warn(qwhere, `选项 ${optionIndex + 1} 与选项 ${normalized.get(key) + 1} 归一化后相同，需人工确认是否语义等价`);
        normalized.set(key, optionIndex);
        validateHtml(option, `${qwhere}/option-${optionIndex + 1}`);
        validateMath(option, `${qwhere}/option-${optionIndex + 1}`);
      });
    }
    if (!Number.isInteger(question.ans) || !question.opts || question.ans < 0 || question.ans >= question.opts.length) {
      fail(qwhere, `答案下标 ans=${question.ans} 越界或不是整数`);
    }
    if (typeof question.exp !== 'string' || !question.exp.trim()) fail(qwhere, '解析 exp 为空');
    for (const [field, value] of [['q', question.q], ['exp', question.exp]]) {
      if (typeof value === 'string') {
        validateHtml(value, `${qwhere}/${field}`);
        validateMath(value, `${qwhere}/${field}`);
      }
    }
  }
}

function validateSection(section, where) {
  if (!Array.isArray(section) || section.length < 3) {
    fail(where, 'section 必须至少为 [类型, 标题, 内容]');
    return;
  }
  const [type, title, body] = section;
  if (!SECTION_TYPES.has(type)) fail(where, `未知 section 类型：${type}`);
  if (typeof title !== 'string' || !title.trim()) fail(where, 'section 标题为空');
  if (type === 'aiw') {
    if (body !== 'essay' && body !== 'translate') fail(where, `aiw 类型必须为 essay 或 translate，实际为 ${body}`);
    if (body === 'translate' && typeof section[3] !== 'string') fail(where, 'translate aiw 缺少英文原文字符串');
    if (typeof section[3] === 'string') {
      validateHtml(section[3], `${where}/data`);
      validateMath(section[3], `${where}/data`);
    }
    return;
  }
  if (typeof body !== 'string' || !body.trim()) {
    fail(where, 'section 正文为空或不是字符串');
    return;
  }
  validateHtml(body, where);
  validateMath(body, where);
}

function stringLiteralMask(source) {
  let result = '';
  let state = 'code';
  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    const next = source[i + 1];
    if (state === 'code') {
      if (char === '/' && next === '/') { result += '  '; i++; state = 'line-comment'; }
      else if (char === '/' && next === '*') { result += '  '; i++; state = 'block-comment'; }
      else if (char === "'") { result += ' '; state = 'single'; }
      else if (char === '"') { result += ' '; state = 'double'; }
      else if (char === '`') { result += ' '; state = 'template'; }
      else result += ' ';
      continue;
    }
    if (state === 'line-comment' || state === 'block-comment') {
      result += char === '\n' ? '\n' : ' ';
      if (state === 'line-comment' && char === '\n') state = 'code';
      else if (state === 'block-comment' && char === '*' && next === '/') { result += ' '; i++; state = 'code'; }
      continue;
    }
    result += char;
    if (char === '\\' && next !== undefined) { result += next; i++; continue; }
    if (state === 'single' && char === "'") state = 'code';
    else if (state === 'double' && char === '"') state = 'code';
    else if (state === 'template' && char === '`') state = 'code';
  }
  return result;
}

function scanSource(file) {
  const source = read(file);
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(source)) {
    fail(rel(file), '源文件含非法控制字符');
  }
  const stringSource = stringLiteralMask(source);
  const command = /(^|[^\\])\\([A-Za-z]+)/gm;
  let match;
  while ((match = command.exec(stringSource))) {
    const line = source.slice(0, match.index + match[1].length).split('\n').length;
    fail(`${rel(file)}:${line}`, `字符串中疑似单反斜杠命令 \\${match[2]}，模板字符串中的 LaTeX 反斜杠应写成双反斜杠`);
  }
}

function expectContains(file, needles, label) {
  const source = read(path.join(ROOT, file));
  for (const needle of needles) {
    if (!source.includes(needle)) fail(`regression/${label}`, `${file} 缺少关键文本：${needle}`);
  }
}

function runRegressions() {
  expectContains('content/math/ch00.js', [
    '(x+m)(x+n)=x^2+(m+n)x+mn',
    'm+n=-5,\\\\qquad mn=6',
    '$6$ 的整数因数对为 $1,6$ 和 $2,3$',
    '(x-2)(x-3)=x^2-3x-2x+6=x^2-5x+6'
  ], 'math-factorization-chain');
  expectContains('content/math/sych02.js', ['=\\\\frac{\\\\pi}{3}'], 'triple-integral-pi-over-three');
  expectContains('content/math/sych04.js', [
    '\\\\int_0^1 ax\\\\,dx=\\\\frac a2=1\\\\Rightarrow a=2',
    '独立同分布，且具有有限均值 $\\\\mu$ 和有限正方差 $\\\\sigma^2$',
    '一般分布没有这个逆推结论'
  ], 'probability-conditions');
  expectContains('content/english/m0.js', [
    '/ɪ/</button>：it, big',
    '/ɜː/</button>：bird, her',
    '<b>knee</b> 中的 k'
  ], 'english-phonetics');
  const english = read(path.join(ROOT, 'content/english/m0.js'));
  const shortVowels = english.match(/① 短元音 7 个：[\s\S]*?② 长元音 5 个/)?.[0] || '';
  if (shortVowels.includes('bird')) fail('regression/english-phonetics', 'bird 仍被列入短元音段');
  expectContains('content/cs408/ds/ch00.js', [
    '小数部分会被<b>向零截断</b>',
    '<code>-5/2 = -2</code>',
    '不需要也不建议强制类型转换'
  ], 'c-language-semantics');
  expectContains('content/cs408/ds/ch03.js', [
    '统一采用下面的 1 起编号教材版',
    'next = 0 1 2 1 2 3'
  ], 'kmp-next-convention');
  expectContains('content/cs408/ds/ch01.js', [
    '头结点是 <code>r-&gt;next</code>',
    "ans:1, exp:'r 是尾数据结点，r-&gt;next 才是头结点"
  ], 'circular-list-answer');
  expectContains('content/cs408/ds/ch07.js', [
    '维护一个容量为 10 的<b>大根堆</b>',
    '堆中就是最小的 10 个元素'
  ], 'top-k-heap');
  expectContains('content/cs408/os/ch02.js', [
    '0-2 P1，2-4 P2，4-6 P3，6-8 P1，8-9 P2，9-11 P3，11-12 P1',
    '完成时刻分别为 12、9、11'
  ], 'round-robin-sequence');
  expectContains('content/cs408/os/ch04.js', [
    'LOOK</b> 只走到该方向最远请求 183 就回头',
    '=<b>299</b>',
    '=<b>331</b>'
  ], 'scan-look-totals');
  expectContains('content/cs408/net/ch05.js', [
    '确认号 = 501',
    '下一步期望收到序号 501 起的字节',
    '第 4、5 轮后依次为 <b>9、10</b> MSS'
  ], 'tcp-ack-cwnd');
  /* 2026-09 复查:以下五项曾出现“多个选项都正确”或“选项等价”,现固定为唯一答案 */
  expectContains('content/math/ch02.js', ["'$3x^2\\\\ln x+x^3$'"], 'derivative-option-unique');
  expectContains('content/math/ch06.js', ["'$\\\\dfrac{y}{x}$'"], 'implicit-derivative-option-unique');
  expectContains('content/math/ch07.js', ['$-\\\\dfrac{1}{2}\\\\iint_D (x^2+y^2)d\\\\sigma$'], 'rotation-symmetry-option-unique');
  expectContains('content/english/m0.js', ["'pen / pan'"], 'long-short-vowel-distractor');
  expectContains('content/english/m2.js', ["opts:['which', 'what', 'when', 'where'], ans:2"], 'relative-adverb-unique');
  /* 2026-09-11 三轮脉络复查:表述与知识点一致性 */
  expectContains('content/english/m0.js', ['<b>STA</b>tion /ˈsteɪʃn/'], 'station-stress-consistent');
  expectContains('content/english/m7.js', ['exactly quadrupling over the period'], 'chart-multiple-exact');
  expectContains('content/english/m7.js', ['两个简单句合并为一句'], 'upgrade-description-accurate');
  expectContains('content/cs408/ds/ch06.js', ['右孩子 35'], 'avl-lr-final-shape');
  expectContains('content/math/ch02.js', ['“偏导数”是第 6 章多元函数的概念'], 'forward-ref-marked');
}

function main() {
  const contentFiles = listJsFiles(CONTENT_ROOT);
  contentFiles.forEach(scanSource);
  const sandbox = vm.createContext({window: {CONTENT: {}}, console});
  sandbox.window.window = sandbox.window;
  evaluate(path.join(ROOT, 'data/curriculum.js'), sandbox);
  for (const file of contentFiles) evaluate(file, sandbox);
  const curriculum = sandbox.window.CURRICULUM;
  const content = sandbox.window.CONTENT || {};
  if (!curriculum) fail('data/curriculum.js', '未生成 window.CURRICULUM');
  const chapters = curriculumChapters(curriculum);
  const expectedKeys = new Set(chapters.map(row => row.key));
  const actualKeys = new Set(Object.keys(content));
  for (const row of chapters) {
    const where = row.key;
    if (!fs.existsSync(path.join(ROOT, row.file))) fail(where, `课程树指向的文件不存在：${row.file}`);
    const chapterContent = content[row.key];
    if (!chapterContent) {
      fail(where, '课程树存在但 window.CONTENT 中无对应章节');
      continue;
    }
    const lessonDefs = row.chapter.lessons || [];
    const lessonIds = new Set();
    for (const lessonDef of lessonDefs) {
      if (lessonIds.has(lessonDef.id)) fail(where, `课程树内重复 lesson id：${lessonDef.id}`);
      lessonIds.add(lessonDef.id);
      const lesson = chapterContent.lessons && chapterContent.lessons[lessonDef.id];
      const lwhere = `${where}/${lessonDef.id}`;
      lessonCount++;
      if (!lesson) {
        fail(lwhere, '课程树存在但内容文件缺课时');
        continue;
      }
      if (lesson.title !== lessonDef.title) fail(lwhere, `内部标题与课程树不一致：${JSON.stringify(lesson.title)} != ${JSON.stringify(lessonDef.title)}`);
      if (!Array.isArray(lesson.secs) || lesson.secs.length === 0) fail(lwhere, 'secs 必须是非空数组');
      else lesson.secs.forEach((section, index) => validateSection(section, `${lwhere}/section-${index + 1}`));
      validateQuiz(lesson.quiz, lwhere);
    }
    for (const lessonId of Object.keys(chapterContent.lessons || {})) {
      if (!lessonIds.has(lessonId)) fail(`${where}/${lessonId}`, '内容文件含课程树未声明的课时');
    }
  }
  for (const key of actualKeys) {
    if (!expectedKeys.has(key)) fail(key, 'window.CONTENT 中存在课程树未声明的章节');
  }
  const expectedFiles = new Set(chapters.map(row => row.file));
  for (const file of contentFiles) {
    if (!expectedFiles.has(rel(file))) fail(rel(file), '内容文件未被课程树引用');
  }
  if (contentFiles.length !== 53) fail('totals', `内容文件应为 53，实际 ${contentFiles.length}`);
  if (chapters.length !== 53) fail('totals', `课程章节应为 53，实际 ${chapters.length}`);
  if (lessonCount !== 204) fail('totals', `课时应为 204，实际 ${lessonCount}`);
  if (questionCount !== 480) fail('totals', `随堂题应为 480，实际 ${questionCount}`);
  runRegressions();
  warnings.forEach(message => console.warn(`WARN ${message}`));
  if (errors.length) {
    errors.forEach(message => console.error(`ERROR ${message}`));
    console.error(`\n内容校验失败：${errors.length} 个错误，${warnings.length} 个警告。`);
    process.exitCode = 1;
    return;
  }
  console.log(`content-validation-ok files=${contentFiles.length} chapters=${chapters.length} lessons=${lessonCount} questions=${questionCount} formulas=${formulaCount} warnings=${warnings.length}`);
}

main();
