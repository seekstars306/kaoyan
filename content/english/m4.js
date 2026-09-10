/* ===== 英语 · 模块4 新题型 / 模块5 完形 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['english/m4'] = {

lessons: {

'4-1': {
title: '多项对应题：关键词回文定位',
secs: [
['why', '为什么学这一节',
`<p>英二新题型之一：左边 5 个人物/对象，右边 7 个信息（2 个多余），连线配对。本质是"反向定位连连看"，方法得当可拿满分，是英二的送分大题。</p>`],
['think', '直观理解',
`<p><b>新题型不考精读，考检索。</b>左列的人名/组织就是"锚"：把锚带回原文（人名大写好找），顺藤摸瓜读他/它周边的两三句，对照右列选项挑同义改写。</p>
<blockquote><b>流程：① 左列做定位词 → ② 逐个回文定位 → ③ 选项划关键词与定位句比对 → ④ 用掉的选项划掉，防重复使用。</b></blockquote>`],
['def', '作战手册',
`<p><b>① 定位词选择：</b>人名（大写）、机构名、数字年份优先；普通名词次之。</p>
<p><b>② 比对技巧：</b>选项与原文是<b>同义改写</b>关系：原文 said "extremely difficult" ↔ 选项 found it very hard。词形不同，语义等值。</p>
<p><b>③ 防干扰：</b>多余 2 个选项通常"张冠李戴"（把 A 的观点安给 B）或"偷换程度"（usually → always）。</p>
<p><b>④ 时间预算：</b>整题 15 分钟内，每条连线约 2.5 分钟。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 比对示范</div>
<p>原文：Prof. Lee <b>argues that</b> remote hiring will <b>broaden</b> the talent pool.</p>
<p>选项：Professor Lee — <b>expects a wider range of candidates</b>（期待更广的候选人范围）。</p>
<p>broaden the talent pool = wider range of candidates，同义改写配对成功。</p></div>`],
['warn', '易错点',
`<p>• 忘了划掉已用选项，最后两个选项来回纠结。</p>
<p>• 只看选项"内容像"不看"主体对"——先核主体再核内容。</p>`]
],
quiz: [
{id:'q1', q:'多项对应题的首选定位词是？', opts:['普通动词', '人名、机构名、数字等独特词', '代词', '连词'], ans:1, exp:'独特专名在文中最好找，定位最快最准。'},
{id:'q2', q:'新题型选项与原文的典型关系是？', opts:['原词照抄', '同义改写', '意思相反', '需要推理三步'], ans:1, exp:'同义改写是英语考试命题的通用语言。'}
]

},

'4-2': {
title: '小标题对应题：段落大意概括',
secs: [
['why', '为什么学这一节',
`<p>另一类新题型：给 5 个段落各选一个小标题（7 选 5）。本质是"段落主旨题"的简化版，套路与阅读主旨题一脉相承。</p>`],
['think', '直观理解',
`<p><b>段落主旨常见落点：</b>① 段首主题句；② 转折词后的重点句；③ 段末总结句；④ 高频重复的核心概念。具体位置并不固定，不能只读首句就下结论。</p>
<blockquote><b>标题特征：概括性强、范围与整段匹配。</b>太细（只对应段中一句话）的排除，太宽（覆盖了段落没讲的内容）的排除。</blockquote>`],
['def', '作战手册',
`<p><b>① 先读标题选项</b>，圈出每个标题的核心名词（标题间往往有相似概念，要区分侧重点）。</p>
<p><b>② 逐段读前两句 + 转折句</b>，概括"这段在说谁、说什么"。</p>
<p><b>③ 匹配验证：</b>标题核心词须在段内有落点（原词或同义词）。</p>
<p><b>④ 难段先跳</b>：用已确定的选项倒逼缩小剩余范围。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 匹配示范</div>
<p>段落：Some worry that AI will replace writers. <b>However</b>, current tools still lack true creativity; they merely assist with drafts and editing.</p>
<p>候选标题：A. AI Writing Tools: Helpers, Not Replacements　B. The History of Typewriters　C. How to Publish a Book</p>
<p>→ <b>A</b>：转折后"只是辅助"正对"帮手而非替代"。</p></div>`],
['warn', '易错点',
`<p>• 标题只读了字面没核"段落重心"——让步前的内容当成了主旨。</p>
<p>• 两个标题核心词相同（如都谈 AI），要区分限定语（Replace vs Assist）。</p>`]
],
quiz: [
{id:'q1', q:'小标题对应题确定段落主旨的第一落点是？', opts:['段尾句', '段首句与转折词后', '段落最长句', '全文标题'], ans:1, exp:'首句定调 + 转折校正，是概括段意的黄金组合。'},
{id:'q2', q:'两个候选标题核心词相同时，下一步比较？', opts:['字数多少', '限定语/侧重点', '位置先后', '随意选一个'], ans:1, exp:'如 "Replace writers" vs "Assist writers"，限定语决定对错。'}
]

}

}
};
