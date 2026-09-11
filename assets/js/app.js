/* ===== 考研上岸 · 学习平台 主程序 =====
 * 纯本地运行（file:// 兼容）：hash 路由 + 动态 script 懒加载 + localStorage 持久化
 * 依赖：assets/js/ai.js 提供 window.AI；数据文件提供 window.CURRICULUM / window.PLAN / window.WORDS / window.CONTENT
 */
(function(){
'use strict';

/* ---------------- 存储工具 ---------------- */
var Store = {
  get: function(k, d){ try{ var v = localStorage.getItem(k); return v==null ? d : JSON.parse(v); }catch(e){ return d; } },
  set: function(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
};
var K = { prog:'progress', wrong:'wrong', qh:'qhist', set:'settings', srs:'srs', last:'last', plan:'planCheck' };
var AI_KEY = 'kaoyan.ai';
/* 按登录用户隔离的数据键（kaoyan.u.<user>.<key>） */
function Skey(k){ return 'kaoyan.u.' + (Auth.user() || 'guest') + '.' + k; }
function Sget(k, d){ return Store.get(Skey(k), d); }
function Sset(k, v){ Store.set(Skey(k), v); }
function Sdel(k){ localStorage.removeItem(Skey(k)); }
/* 首次登录时把旧版全局数据迁移进当前账号 */
function migrateLegacyData(user){
  if(!user) return;
  Object.keys(K).forEach(function(k){
    var oldKey = 'kaoyan.' + k, nk = 'kaoyan.u.' + user + '.' + k;
    var old = localStorage.getItem(oldKey);
    if(old && !localStorage.getItem(nk)) localStorage.setItem(nk, old);
    localStorage.removeItem(oldKey);
  });
}

function settings(){ return Sget(K.set, {examDate:'2027-12-25', showShuyi:true, dailyNew:15}); }
function saveSettings(s){ Sset(K.set, s); }
function getProg(){ return Sget(K.prog, {}); }
function setDone(path, on){
  var p = getProg();
  if(on){ p[path] = {d:1, ts:Date.now()}; } else { delete p[path]; }
  Sset(K.prog, p);
}
function isDone(path){ return !!getProg()[path]; }

/* ---------------- 懒加载脚本 ---------------- */
var loaded = {};
function loadScript(src){
  if(loaded[src]) return loaded[src];
  loaded[src] = new Promise(function(res, rej){
    var s = document.createElement('script');
    s.src = src;
    s.onload = function(){ res(); };
    s.onerror = function(){ delete loaded[src]; rej(new Error('加载失败: ' + src)); };
    document.head.appendChild(s);
  });
  return loaded[src];
}

/* ---------------- KaTeX ---------------- */
var katexP = null;
function ensureKatex(){
  if(!katexP){
    katexP = loadScript('assets/vendor/katex/katex.min.js')
      .then(function(){ return loadScript('assets/vendor/katex/contrib/auto-render.min.js'); })
      .catch(function(e){ katexP = null; throw e; });
  }
  return katexP;
}
function renderMath(el){
  if(window.renderMathInElement){
    try{
      renderMathInElement(el, {delimiters:[
        {left:'$$', right:'$$', display:true},
        {left:'$', right:'$', display:false}
      ], throwOnError:false});
    }catch(e){}
  } else { ensureKatex().then(function(){ renderMath(el); }).catch(function(){}); }
}

/* ---------------- 代码高亮（C 语言风格，内容中代码块需预转义 &lt; &gt; &amp;） ---------------- */
var CODE_RE = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("[^"\n]*")|\b(int|char|float|double|void|if|else|for|while|do|return|struct|typedef|sizeof|const|static|break|continue|switch|case|default|long|short|unsigned|signed|bool|true|false|NULL|malloc|free|include|define|printf|scanf|new|delete|class|public|private|template|typename|bool)\b|(\b0[xX][0-9a-fA-F]+\b|\b\d+(\.\d+)?([eE][+-]?\d+)?\b)/g;
function highlightIn(root){
  var pres = root.querySelectorAll('pre.code');
  for(var i=0;i<pres.length;i++){
    if(pres[i].dataset.hl) continue;
    pres[i].dataset.hl = '1';
    pres[i].innerHTML = pres[i].innerHTML.replace(CODE_RE, function(m, c, s, kw, num){
      if(c) return '<span class="c">'+m+'</span>';
      if(s) return '<span class="s">'+m+'</span>';
      if(kw) return '<span class="k">'+m+'</span>';
      if(num) return '<span class="n">'+m+'</span>';
      return m;
    });
  }
}

/* ---------------- 课程数据访问 ---------------- */
function course(courseId){ return window.CURRICULUM && window.CURRICULUM[courseId]; }
function findChapter(courseId, chapId){
  var c = course(courseId); if(!c) return null;
  for(var i=0;i<c.parts.length;i++){
    var part = c.parts[i];
    for(var j=0;j<part.chapters.length;j++){
      if(part.chapters[j].id === chapId) return {part:part, chapter:part.chapters[j]};
    }
  }
  return null;
}
function contentKey(courseId, chapId){
  if(courseId==='math') return 'math/'+chapId;
  if(courseId==='english') return 'english/'+chapId;
  return 'cs408/'+chapId; /* chapId 形如 ds/ch00 */
}
function contentFile(courseId, chapId){
  var k = contentKey(courseId, chapId);
  if(courseId==='math') return 'content/math/'+chapId+'.js';
  if(courseId==='english') return 'content/english/'+chapId+'.js';
  return 'content/cs408/'+k.slice(6)+'.js';
}
function loadChapter(courseId, chapId){
  var file = contentFile(courseId, chapId), key = contentKey(courseId, chapId);
  return loadScript(file).then(function(){
    var content = window.CONTENT && window.CONTENT[key];
    if(!content) throw new Error('内容文件已加载，但未注册章节：' + key);
    return content;
  }).catch(function(e){
    throw new Error('章节加载失败（' + file + '）：' + (e && e.message ? e.message : e));
  });
}
function visibleChapters(courseId){
  var c = course(courseId), shuyi = settings().showShuyi, out = [];
  if(!c) return out;
  c.parts.forEach(function(part){
    if(part.shuyi && !shuyi) return;
    part.chapters.forEach(function(ch){
      if(ch.shuyi && !shuyi) return;
      var lessons = (ch.lessons||[]).filter(function(l){ return !(l.shuyi && !shuyi); });
      out.push({part:part, chapter:ch, lessons:lessons});
    });
  });
  return out;
}
function flatLessons(courseId){
  var out = [];
  visibleChapters(courseId).forEach(function(x){
    x.lessons.forEach(function(l){
      out.push({part:x.part, chapter:x.chapter, lesson:l, path:courseId+'/'+x.chapter.id+'/'+l.id});
    });
  });
  return out;
}
function courseStats(courseId){
  var ls = flatLessons(courseId), done = 0;
  ls.forEach(function(x){ if(isDone(x.path)) done++; });
  return {total: ls.length, done: done, pct: ls.length ? Math.round(done*100/ls.length) : 0};
}

/* ---------------- 小工具 ---------------- */
function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function $(sel, root){ return (root||document).querySelector(sel); }
function $all(sel, root){ return Array.prototype.slice.call((root||document).querySelectorAll(sel)); }
function toast(msg){
  var t = $('#toast');
  if(!t){ t = document.createElement('div'); t.id='toast';
    t.style.cssText='position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#1f2733;color:#fff;padding:9px 20px;border-radius:20px;font-size:14px;z-index:99;box-shadow:0 4px 14px rgba(0,0,0,.25)';
    document.body.appendChild(t); }
  t.textContent = msg; t.style.opacity = '1';
  clearTimeout(t._h); t._h = setTimeout(function(){ t.style.opacity='0'; }, 1800);
}
function todayStr(){ var d = new Date(); return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); }
function countdownDays(){
  var s = settings(), t = new Date(s.examDate + 'T00:00:00');
  if(isNaN(t)) return '—';
  var d = Math.ceil((t - new Date())/86400000);
  return d >= 0 ? d : 0;
}
function ring(pct, color){
  var r = 30, c = 2*Math.PI*r, v = c*pct/100;
  return '<div class="ringwrap"><svg width="74" height="74">'
    + '<circle cx="37" cy="37" r="'+r+'" fill="none" stroke="#edf0f6" stroke-width="8"/>'
    + '<circle cx="37" cy="37" r="'+r+'" fill="none" stroke="'+color+'" stroke-width="8" stroke-linecap="round" stroke-dasharray="'+v+' '+c+'"/>'
    + '</svg><div class="pct">'+pct+'%</div></div>';
}
function aiCfgReady(){ return window.AI && AI.ready(); }
function noKeyHint(){
  return '<div class="ai-hint">⚙️ 尚未配置 AI 服务。请到 <a href="#/settings">设置 → AI 服务</a> 填写接口地址、模型与 API Key（智谱 GLM 有免费模型；本地 Ollama 完全免费）。配置前，其他免费功能均可正常使用。</div>';
}

/* ---------------- 测验引擎 ---------------- */
/*
 * opts: {questions:[{qid,q,opts,ans,exp}], title, sourcePath, autoDone}
 * 渲染整组题目 → 提交 → 批改 + 解析 + 记录（错题本/历史）→ 可重做
 */
function renderQuiz(mount, opts){
  var qs = opts.questions || [];
  if(!qs.length){ mount.innerHTML = ''; return; }
  var html = '<div class="quiz-wrap"><h2 style="font-size:19px">📝 随堂测验 <span class="muted" style="font-weight:400;font-size:13px">共 '+qs.length+' 题 · 做错会自动收进错题本</span></h2><div class="quiz-qs"></div>'
    + '<div class="quiz-actions" style="margin-top:12px"><button class="btn btn-primary q-submit">提交答案</button> <button class="btn q-retry hidden">重做</button>'
    + '<span class="quiz-result" style="margin-left:12px"></span></div></div>';
  mount.innerHTML = html;
  var qsEl = $('.quiz-qs', mount);
  qs.forEach(function(q, qi){
    var d = document.createElement('div'); d.className = 'quiz-q'; d.dataset.qi = qi;
    var oh = '';
    q.opts.forEach(function(o, oi){
      oh += '<label class="opt"><input type="radio" name="q'+qi+'" value="'+oi+'"><span><b>'+'ABCD'[oi]+'.</b> '+o+'</span></label>';
    });
    d.innerHTML = '<div class="qt"><span class="qno">第 '+(qi+1)+' 题</span>'+q.q+'</div>'+oh
      + '<div class="quiz-exp hidden"></div>';
    qsEl.appendChild(d);
  });
  renderMath(mount); highlightIn(mount);

  $('.q-submit', mount).onclick = function(){
    var correct = 0, answered = true;
    var picks = [];
    qs.forEach(function(q, qi){
      var pick = document.querySelector('input[name="q'+qi+'"]:checked');
      picks.push(pick ? +pick.value : -1);
      if(!pick) answered = false;
    });
    if(!answered){ toast('还有题目没作答哦'); return; }
    qs.forEach(function(q, qi){
      var d = $('.quiz-q[data-qi="'+qi+'"]', mount), pick = picks[qi];
      var ok = pick === q.ans; if(ok) correct++;
      $all('.opt', d).forEach(function(o, oi){
        o.classList.add('dim');
        o.querySelector('input').disabled = true;
        if(oi === q.ans) o.classList.add('correct');
        else if(oi === pick) o.classList.add('wrong');
        o.classList.remove('dim');
      });
      var exp = $('.quiz-exp', d);
      exp.classList.remove('hidden');
      exp.classList.toggle('bad', !ok);
      exp.innerHTML = (ok ? '✅ 回答正确。<br>' : '❌ 正确答案：'+'ABCD'[q.ans]+'。<br>') + (q.exp||'');
      /* 记录历史与错题 */
      var qh = Sget(K.qh, {});
      qh[q.qid] = {c: ok?1:0, ts: Date.now(), n: ((qh[q.qid]||{}).n||0)+1};
      Sset(K.qh, qh);
      if(!ok) addWrong(q, pick, opts.title||'');
    });
    var pct = Math.round(correct*100/qs.length);
    $('.quiz-result', mount).textContent = '得分：'+correct+' / '+qs.length+'（'+pct+'%）'+(pct>=60?' 🎉':' 💪 建议重做');
    $('.q-submit', mount).classList.add('hidden');
    $('.q-retry', mount).classList.remove('hidden');
    renderMath(mount);
    if(opts.autoDone && opts.sourcePath && pct>=60){
      if(!isDone(opts.sourcePath)){ setDone(opts.sourcePath, true); toast('本节已自动标记完成 ✅'); refreshDoneBar(opts.sourcePath); }
    }
  };
  $('.q-retry', mount).onclick = function(){ renderQuiz(mount, opts); };
}
function refreshDoneBar(path){
  var bar = $('#doneBar'); if(!bar || bar.dataset.path!==path) return;
  paintDoneBar(bar);
}
function paintDoneBar(bar){
  var path = bar.dataset.path, done = isDone(path);
  bar.innerHTML = '<span style="font-size:18px">'+(done?'✅':'⬜')+'</span>'
    + '<span class="tip">'+(done?'已标记完成。随时可以取消。':'学完本节后，测验得分 ≥60% 会自动标记完成，也可以手动标记。')+'</span>'
    + '<button class="btn btn-sm '+(done?'':'btn-ok')+'" id="doneToggle">'+(done?'取消完成':'标记完成')+'</button>';
  $('#doneToggle', bar).onclick = function(){ setDone(path, !done); paintDoneBar(bar); toast(done?'已取消完成标记':'已标记完成 ✅'); updateNav(); };
}

/* ---------------- 错题本 ---------------- */
function addWrong(q, pick, sourceTitle){
  var w = Sget(K.wrong, {});
  var old = w[q.qid];
  w[q.qid] = {
    qid:q.qid, q:q.q, opts:q.opts, ans:q.ans, exp:q.exp,
    pick:pick, n:((old&&old.n)||0)+1, ts:Date.now(), title: sourceTitle||((old&&old.title)||'')
  };
  Sset(K.wrong, w);
}
function removeWrong(qid){ var w = Sget(K.wrong, {}); delete w[qid]; Sset(K.wrong, w); }

function viewWrongbook(){
  var w = Sget(K.wrong, {}), ids = Object.keys(w);
  var html = '<h1 class="page-title">📕 错题本</h1><p class="page-sub">做错的题自动收进来。重做答对即可移除（掌握），也可以手动移除。</p>';
  html += '<div class="filter-tabs" id="wFilter"><button data-f="all" class="on">全部 ('+ids.length+')</button>';
  ['math','english','cs408'].forEach(function(cid){
    var n = ids.filter(function(i){ return w[i].qid.indexOf(cid+'/')===0; }).length;
    html += '<button data-f="'+cid+'">'+course(cid).name+' ('+n+')</button>';
  });
  html += '</div><div id="wList"></div>';
  $('#view').innerHTML = html;
  function paint(f){
    var list = ids.filter(function(i){ return f==='all' || w[i].qid.indexOf(f+'/')===0; }).sort(function(a,b){ return w[b].ts-w[a].ts; });
    var el = $('#wList');
    if(!list.length){ el.innerHTML = '<div class="empty-tip">'+(ids.length?'该科目暂无错题，继续保持 🎉':'错题本是空的，去刷几道题吧～<br><a href="#/course/math">开始学习 →</a>')+'</div>'; return; }
    el.innerHTML = '';
    list.forEach(function(id){
      var it = w[id];
      var d = document.createElement('div'); d.className = 'wrong-item'; d.dataset.qid = id;
      var oh = '';
      it.opts.forEach(function(o, oi){ oh += '<label class="opt"><input type="radio" name="w_'+id+'" value="'+oi+'"><span><b>'+'ABCD'[oi]+'.</b> '+o+'</span></label>'; });
      d.innerHTML = '<div class="meta"><b>错 '+it.n+' 次</b> · '+esc(it.title||id)+' · '+new Date(it.ts).toLocaleDateString()
        + '<button class="btn btn-ghost btn-sm" style="float:right" data-del="'+id+'">移除</button></div>'
        + '<div class="qt">'+it.q+'</div><div class="w-opts">'+oh+'</div>'
        + '<button class="btn btn-primary btn-sm w-check">提交重做</button>'
        + '<div class="quiz-exp hidden"></div>';
      el.appendChild(d);
    });
    renderMath(el);
    $all('.w-check', el).forEach(function(btn){
      btn.onclick = function(){
        var d = btn.closest('.wrong-item'), id = d.dataset.qid, it = w[id];
        var pick = document.querySelector('input[name="w_'+id+'"]:checked');
        if(!pick){ toast('先选一个答案'); return; }
        pick = +pick.value;
        var ok = pick === it.ans;
        $all('.opt', d).forEach(function(o, oi){
          o.querySelector('input').disabled = true;
          if(oi===it.ans) o.classList.add('correct');
          else if(oi===pick) o.classList.add('wrong');
        });
        var exp = $('.quiz-exp', d);
        exp.classList.remove('hidden'); exp.classList.toggle('bad', !ok);
        exp.innerHTML = (ok ? '✅ 答对了，已从错题本移除。<br>' : '❌ 正确答案：'+'ABCD'[it.ans]+'。<br>') + (it.exp||'');
        btn.classList.add('hidden');
        renderMath(d);
        if(ok){ delete w[id]; Sset(K.wrong, w); setTimeout(function(){ d.style.opacity='.35'; viewWrongbook(); }, 900); }
        else { it.n++; it.pick = pick; it.ts = Date.now(); Sset(K.wrong, w); }
      };
    });
    $all('[data-del]', el).forEach(function(b){ b.onclick = function(){ delete w[b.dataset.del]; Sset(K.wrong, w); viewWrongbook(); }; });
  }
  $all('#wFilter button').forEach(function(b){ b.onclick = function(){
    $all('#wFilter button').forEach(function(x){ x.classList.remove('on'); });
    b.classList.add('on'); paint(b.dataset.f);
  }; });
  paint('all');
}

/* ---------------- SRS 背单词 ---------------- */
var SRS_LADDER = [1,2,4,7,15,30,60]; /* 天 */
function srsState(){ return Sget(K.srs, {st:{}, day:{date:'', n:0}}); }
function saveSrs(s){ Sset(K.srs, s); }
function allWords(){
  var out = [];
  (window.WORDS && window.WORDS.units || []).forEach(function(u){
    (u.words||[]).forEach(function(w){ out.push(w); });
  });
  return out;
}
function srsNewToday(){
  var s = srsState();
  return (s.day && s.day.date===todayStr()) ? s.day.n : 0;
}
function dueWords(){
  var s = srsState(), now = Date.now(), out = [];
  Object.keys(s.st).forEach(function(wid){ if(s.st[wid].due <= now) out.push(wid); });
  return out;
}
function srsRate(wid, rating){ /* rating: 0忘了 1模糊 2认识 */
  var s = srsState(), now = Date.now();
  var isNew = !s.st[wid];
  var e = s.st[wid] || {iv:0, due:now, reps:0, lapse:0};
  if(rating===0){ e.iv = 0; e.due = now + 10*60*1000; e.lapse++; }
  else if(rating===1){ e.iv = e.iv===0 ? 1 : Math.max(1, Math.round(e.iv/2)); e.due = now + e.iv*86400000; }
  else { /* 认识 */
    if(e.iv===0) e.iv = 1;
    else { var ni = SRS_LADDER.indexOf(e.iv); e.iv = (ni>=0 && ni<SRS_LADDER.length-1) ? SRS_LADDER[ni+1] : Math.min(90, e.iv*1.5|0 || 60); }
    e.due = now + e.iv*86400000;
  }
  e.reps++;
  s.st[wid] = e;
  if(!s.day || s.day.date!==todayStr()) s.day = {date:todayStr(), n:0};
  if(isNew) s.day.n++;
  saveSrs(s);
}
function srsQueue(){
  var s = srsState(), words = allWords(), byId = {};
  words.forEach(function(w){ byId[w.id] = w; });
  var limit = settings().dailyNew;
  var newDone = srsNewToday();
  var q = [];
  dueWords().forEach(function(wid){ if(byId[wid]) q.push({w:byId[wid], rev:true}); });
  if(newDone < limit){
    var remaining = limit - newDone;
    for(var i=0;i<words.length && remaining>0;i++){
      if(!s.st[words[i].id]){ q.push({w:words[i], rev:false}); remaining--; }
    }
  }
  return q;
}

function speakBtn(text){
  return '<button class="speak-btn" data-speak="'+esc(text)+'" title="朗读">🔊</button>';
}
document.addEventListener('click', function(e){
  var b = e.target.closest('[data-speak]');
  if(b){ e.preventDefault(); AI.speak(b.dataset.speak); }
});

function viewWords(){
  var words = allWords(), s = srsState();
  var learned = Object.keys(s.st).length;
  var due = dueWords().length, newToday = srsNewToday(), limit = settings().dailyNew;
  var q = srsQueue();
  var html = '<h1 class="page-title">🔤 背单词 <span class="tag">SRS 间隔重复</span></h1>'
    + '<p class="page-sub">艾宾浩斯遗忘曲线排程：忘了→10分钟后重现；模糊→隔天；认识→进入长间隔复习。配合右侧 AI 单词助手食用更佳。</p>'
    + '<div class="stat-strip">'
    + '<div class="stat-chip">词库 <b>'+words.length+'</b></div>'
    + '<div class="stat-chip">已开始学 <b>'+learned+'</b></div>'
    + '<div class="stat-chip">待复习 <b>'+due+'</b></div>'
    + '<div class="stat-chip">今日新学 <b>'+newToday+'</b> / '+limit+'</div>'
    + '<div class="stat-chip">今日队列 <b>'+q.length+'</b></div>'
    + '</div><div id="wordMain"></div>';
  $('#view').innerHTML = html;
  var main = $('#wordMain');

  if(!words.length){
    main.innerHTML = '<div class="card empty-tip">词库文件尚未生成（批次4会加入完整词库）。<br>当前可先使用 <a href="#/settings">AI 单词助手</a> 查任何词。</div>';
    return;
  }
  if(!q.length){
    var nextDue = null, now = Date.now();
    Object.keys(s.st).forEach(function(wid){ if(s.st[wid].due > now && (nextDue===null || s.st[wid].due<nextDue)) nextDue = s.st[wid].due; });
    main.innerHTML = '<div class="card empty-tip">🎉 今日背词任务已完成！'
      + (nextDue ? '<br>下一次复习时间：'+new Date(nextDue).toLocaleString('zh-CN',{month:'long',day:'numeric',hour:'numeric',minute:'numeric'})
                : '<br>明天再来学新词～')
      + '<br><br><button class="btn" id="forceNew">今天就多学 '+(limit)+' 个新词（超额加练）</button></div>';
    $('#forceNew').onclick = function(){
      var st = srsState(), added = 0, byId = {};
      allWords().forEach(function(w){ byId[w.id]=w; });
      for(var i=0;i<allWords().length && added<limit;i++){
        var w = allWords()[i];
        if(!st.st[w.id]){ st.st[w.id] = {iv:0, due:Date.now(), reps:0, lapse:0}; added++; }
      }
      saveSrs(st); viewWords();
    };
    return;
  }
  var idx = 0;
  function paintCard(){
    if(idx >= q.length){ viewWords(); return; }
    var item = q[idx], w = item.w, open = false;
    var d = document.createElement('div'); d.className = 'card';
    d.innerHTML = '<div class="muted" style="text-align:center;font-size:13px">'+(item.rev?'🔁 复习卡':'🆕 新词')+' · 第 '+(idx+1)+' / '+q.length+' 张'
      + '<button class="btn btn-ghost btn-sm" style="float:right" id="wQuit">收工</button></div>'
      + '<div class="word-card">'
      + '<div class="w">'+esc(w.w)+' '+speakBtn(w.w)+'</div>'
      + '<div class="phon">'+esc(w.phon||'')+'</div>'
      + '<div class="detail plain-ans" id="wDetail">'
      + '<div class="row"><span class="cap">释义</span>'+esc(w.pos||'')+' '+esc(w.cn||'')+'</div>'
      + (w.root?'<div class="row"><span class="cap">拆解</span>🧩 '+esc(w.root)+'</div>':'')
      + (w.mn?'<div class="row"><span class="cap">联想</span>💡 '+esc(w.mn)+'</div>':'')
      + (w.ex?'<div class="row"><span class="cap">例句</span>'+esc(w.ex)+' '+speakBtn(w.ex)+'<br><span class="cap"></span><span class="muted">'+esc(w.excn||'')+'</span></div>':'')
      + '</div>'
      + '<div id="wReveal" style="margin-top:16px"><button class="btn btn-primary" id="wShow">显示答案</button></div>'
      + '<div class="srs-btns hidden" id="wRate">'
      + '<button class="btn btn-forget" data-r="0">😴 忘了</button>'
      + '<button class="btn btn-fuzzy" data-r="1">🤔 模糊</button>'
      + '<button class="btn btn-know" data-r="2">😀 认识</button>'
      + '</div></div>'
      + '<div style="margin-top:10px;text-align:center"><button class="btn btn-ghost btn-sm" id="wAsk">🤖 让 AI 深度讲解这个词</button></div>';
    main.innerHTML = ''; main.appendChild(d);
    $('#wShow').onclick = function(){
      open = true;
      $('#wDetail').classList.add('shown');
      $('#wReveal').classList.add('hidden');
      $('#wRate').classList.remove('hidden');
    };
    $all('#wRate .btn').forEach(function(b){ b.onclick = function(){ srsRate(w.id, +b.dataset.r); idx++; paintCard(); }; });
    $('#wQuit').onclick = function(){ viewWords(); };
    $('#wAsk').onclick = function(){ openAIPanel('word', w.w); };
  }
  paintCard();
}

/* ---------------- 课程目录页 ---------------- */
function viewCourse(courseId){
  var c = course(courseId);
  if(!c){ $('#view').innerHTML = '<div class="empty-tip">未找到课程</div>'; return; }
  var st = courseStats(courseId);
  var html = '<h1 class="page-title"><span style="color:'+c.color+'">'+c.icon+'</span> '+c.name+'</h1>'
    + '<p class="page-sub">'+esc(c.desc||'')+'</p>'
    + '<div class="card" style="display:flex;align-items:center;gap:16px">'+ring(st.pct, c.color)
    + '<div><b>'+st.done+' / '+st.total+' 节已完成</b><div class="muted">点击章节展开课程列表，从第一节开始按顺序学效果最好。</div></div></div>';
  if(courseId==='math'){
    html += '<div class="card" style="font-size:13.5px;color:#8a6a2f;background:#fffdf6;border-color:#f0dfc0">提示：带 <span class="chip chip-sy">数一扩展</span> 标记的章节是数一专属内容（数二不考）。可在 <a href="#/settings">设置</a> 中整体隐藏；学有余力想扩展时再打开。</div>';
  }
  html += '<div id="chapWrap"></div>';
  $('#view').innerHTML = html;
  var wrap = $('#chapWrap');
  var lastPart = null;
  visibleChapters(courseId).forEach(function(x){
    if(x.part.id !== lastPart){
      lastPart = x.part.id;
      var ph = document.createElement('div'); ph.className='part-title';
      ph.innerHTML = '<span>'+esc(x.part.name)+'</span>'+(x.part.shuyi?'<span class="chip chip-sy">数一扩展</span>':'');
      wrap.appendChild(ph);
    }
    var done = 0;
    x.lessons.forEach(function(l){ if(isDone(courseId+'/'+x.chapter.id+'/'+l.id)) done++; });
    var card = document.createElement('div'); card.className = 'chap-card';
    var ch = '<div class="chap-head"><span class="arrow">▶</span><span class="ct">'+esc(x.chapter.title)+'</span>'
      + (x.chapter.shuyi?'<span class="chip chip-sy">数一扩展</span>':'')
      + '<span class="cp">'+done+'/'+x.lessons.length+'</span></div><div class="lesson-list">';
    x.lessons.forEach(function(l){
      var path = courseId+'/'+x.chapter.id+'/'+l.id, d = isDone(path);
      ch += '<a class="lesson-item'+(d?' done':'')+'" href="#/lesson/'+path+'"><span class="st">'+(d?'✓':'')+'</span><span class="lt">'+esc(l.title)+'</span>'
        + (l.shuyi?'<span class="chip chip-sy">数一扩展</span>':'')
        + (l.words?'<span class="tag">词库</span>':'')
        + '</a>';
    });
    ch += '<div style="padding:10px 18px"><a class="quiz-link" href="#/quiz/'+courseId+'/'+x.chapter.id+'">📝 章节综合测验（'+x.lessons.length+' 节的题目）</a></div>';
    ch += '</div>';
    card.innerHTML = ch;
    card.querySelector('.chap-head').onclick = function(){ card.classList.toggle('open'); };
    wrap.appendChild(card);
  });
}

/* ---------------- 知识点页 ---------------- */
var AI_CONTEXT = null; /* 当前知识点上下文，供问 AI 使用 */

function viewLesson(courseId, chapId, lesId){
  var fc = findChapter(courseId, chapId);
  if(!fc){ $('#view').innerHTML = '<div class="empty-tip">未找到章节</div>'; return; }
  var lesson = null, li = 0;
  (fc.chapter.lessons||[]).forEach(function(l, i){ if(l.id===lesId){ lesson=l; li=i; } });
  if(!lesson){ $('#view').innerHTML = '<div class="empty-tip">未找到小节</div>'; return; }
  var path = courseId+'/'+chapId+'/'+lesId;

  loadChapter(courseId, chapId).then(function(content){
    var data = content && content.lessons && content.lessons[lesId];
    var flat = flatLessons(courseId);
    var fi = -1; flat.forEach(function(x, i){ if(x.path===path) fi=i; });
    var prev = fi>0 ? flat[fi-1] : null, next = fi>=0 && fi<flat.length-1 ? flat[fi+1] : null;

    var html = '<div class="crumb"><a href="#/course/'+courseId+'">'+course(courseId).name+'</a> / <a href="#/course/'+courseId+'">'+esc(fc.part.name)+'</a> / '+esc(fc.chapter.title)+'</div>'
      + '<h1 class="page-title" style="font-size:21px">'+esc(lesson.title)
      + (lesson.shuyi?'<span class="chip chip-sy">数一扩展</span>':'')+'</h1>';
    html += '<div class="donebar" id="doneBar" data-path="'+path+'"></div>';
    html += '<div id="lessonBody">'+(data?'':'<div class="card empty-tip">🚧 本章内容正在按批次生成中，先学其他章节吧。<br><a href="#/course/'+courseId+'">返回目录 →</a></div>')+'</div>';
    html += '<div class="lesson-nav">'
      + (prev?'<a class="btn" href="#/lesson/'+prev.path+'">← 上一节：'+esc(prev.lesson.title)+'</a>':'<span></span>')
      + (next?'<a class="btn btn-primary" href="#/lesson/'+next.path+'">下一节：'+esc(next.lesson.title)+' →</a>':'<span></span>')
      + '</div>';
    $('#view').innerHTML = html;
    paintDoneBar($('#doneBar'));
    Sset(K.last, path);

    if(data){
      var body = $('#lessonBody');
      (data.secs||[]).forEach(function(sec){
        var type = sec[0], title = sec[1], text = sec[2];
        if(type==='aiw'){ body.appendChild(aiWidget(title, sec[2], sec[3])); return; }
        var d = document.createElement('div'); d.className = 'sec sec-'+type;
        var icon = {why:'💡', think:'🌱', def:'📖', tool:'🛠️', ex:'✏️', warn:'⚠️', ext:'🎯'}[type]||'📌';
        d.innerHTML = '<h3>'+icon+' '+esc(title)+'</h3><div class="sec-body">'+text+'</div>';
        /* 例题：把 <div class="ex-ans"> 折叠 */
        body.appendChild(d);
      });
      renderMath(body); highlightIn(body);
      wrapTables();
      $all('.ans-toggle', body).forEach(function(btn){
        btn.onclick = function(){
          var box = btn.nextElementSibling;
          box.classList.toggle('hidden');
          btn.textContent = box.classList.contains('hidden') ? btn.dataset.show||'查看解析' : btn.dataset.hide||'收起解析';
        };
      });
      var qz = document.createElement('div');
      body.appendChild(qz);
      renderQuiz(qz, {questions:(data.quiz||[]).map(function(q){ q.qid = path+'/'+q.id; return q; }), sourcePath:path, autoDone:true, title:course(courseId).name+' · '+lesson.title});
      /* 设置 AI 上下文 */
      var plain = '';
      (data.secs||[]).forEach(function(sec){ if(typeof sec[2]==='string') plain += sec[2]; });
      plain = plain.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').slice(0, 2600);
      AI_CONTEXT = {title: lesson.title, text: plain};
    } else {
      AI_CONTEXT = null;
    }
    updateNav();
  }).catch(function(e){
    $('#view').innerHTML = '<div class="card empty-tip">章节加载失败：'+esc(e && e.message ? e.message : e)+'<br>请运行 <code>node scripts/validate-content.js</code> 检查内容文件。</div>';
    AI_CONTEXT = null;
    updateNav();
  });
}

/* AI 实战小组件（作文批改 / 翻译批改） */
function aiWidget(title, kind, data){
  var d = document.createElement('div'); d.className = 'sec sec-aiw';
  var inner = '';
  if(kind==='essay'){
    inner = '<label class="fld">题目 / 要求（可留空，默认按英二大作文批改）</label>'
      + '<input type="text" id="aiwTopic" style="width:100%" placeholder="如：2019年英二真题 · 某高校学生手机使用时长图表作文">'
      + '<label class="fld">把你的作文粘贴到这里</label>'
      + '<textarea id="aiwEssay" rows="8" placeholder="My essay..."></textarea>'
      + '<div style="margin-top:10px"><button class="btn btn-primary" id="aiwGo">🤖 AI 批改作文</button></div>';
  } else if(kind==='translate'){
    inner = '<div class="ex-box"><div class="ex-t">待翻译英文</div>'+ (data||'（请把英文原文写在这里）') +'</div>'
      + '<label class="fld">你的译文</label>'
      + '<textarea id="aiwTr" rows="4" placeholder="写下你的翻译…"></textarea>'
      + '<div style="margin-top:10px"><button class="btn btn-primary" id="aiwGo">🤖 AI 批改翻译</button></div>';
  }
  d.innerHTML = '<h3>🤖 '+esc(title)+'</h3>'+inner+'<div class="aiw-result"></div>';
  var go = function(){
    var res = $('.aiw-result', d);
    if(!aiCfgReady()){ res.innerHTML = noKeyHint(); return; }
    var msgs;
    if(kind==='essay'){
      var topic = $('#aiwTopic', d).value, essay = $('#aiwEssay', d).value.trim();
      if(!essay){ toast('先写下你的作文'); return; }
      msgs = AI.TPL.essay(topic, essay);
    } else {
      var mine = $('#aiwTr', d).value.trim();
      if(!mine){ toast('先写下你的译文'); return; }
      msgs = AI.TPL.translate((data||'').replace(/<[^>]+>/g,''), mine);
    }
    res.innerHTML = '<div class="ai-msg ai"><div class="bubble typing">🤖 AI 正在批改，请稍候…</div></div>';
    AI.chat(msgs, {stream:true, onDelta:function(_, full){ $('.bubble', res).innerHTML = AI.md2html(full); }})
      .then(function(full){ $('.bubble', res).innerHTML = AI.md2html(full||'(无返回)'); })
      .catch(function(e){ res.innerHTML = noKeyHint()+'<div class="muted">'+esc(e.message||'')+'</div>'; });
  };
  setTimeout(function(){ var g = $('#aiwGo', d); if(g) g.onclick = go; });
  return d;
}

/* ---------------- 章节综合测验 ---------------- */
function viewChapterQuiz(courseId, chapId){
  var fc = findChapter(courseId, chapId);
  if(!fc){ $('#view').innerHTML = '<div class="empty-tip">未找到章节</div>'; return; }
  $('#view').innerHTML = '<div class="loading">正在加载章节题目…</div>';
  loadChapter(courseId, chapId).then(function(content){
    var html = '<div class="crumb"><a href="#/course/'+courseId+'">'+course(courseId).name+'</a> / '+esc(fc.chapter.title)+'</div>'
      + '<h1 class="page-title" style="font-size:21px">📝 '+esc(fc.chapter.title)+' · 章节测验</h1>';
    $('#view').innerHTML = html;
    if(!content){ $('#view').innerHTML += '<div class="card empty-tip">🚧 本章内容正在生成中。</div>'; return; }
    var qs = [], mount = document.createElement('div');
    $('#view').appendChild(mount);
    (fc.chapter.lessons||[]).forEach(function(l){
      var d = content.lessons && content.lessons[l.id];
      if(!d || !d.quiz) return;
      var p = courseId+'/'+chapId+'/'+l.id;
      (d.quiz||[]).forEach(function(q){
        q = Object.assign({}, q); q.qid = p+'/'+q.id; q.from = l.title;
        qs.push(q);
      });
    });
    if(!qs.length){ mount.innerHTML = '<div class="card empty-tip">本章暂无题目</div>'; return; }
    /* 分组标注来源小节 */
    qs.forEach(function(q, i){ if(!qs[i-1] || qs[i-1].from!==q.from) q._head = q.from; });
    renderQuiz(mount, {questions:qs, title:course(courseId).name+' · '+fc.chapter.title});
    wrapTables();
    $all('.quiz-q', mount).forEach(function(d, i){
      var q = qs[i];
      if(q._head){ var h = document.createElement('div'); h.className='tag'; h.style.margin='10px 0 4px'; h.textContent='来自：'+q._head; d.parentNode.insertBefore(h, d); }
    });
  }).catch(function(e){
    $('#view').innerHTML = '<div class="card empty-tip">章节测验加载失败：'+esc(e && e.message ? e.message : e)+'<br>请运行 <code>node scripts/validate-content.js</code> 检查内容文件。</div>';
    updateNav();
  });
}

/* ---------------- 仪表盘 ---------------- */
function viewHome(){
  var s = settings();
  var stM = courseStats('math'), stE = courseStats('english'), stC = courseStats('cs408');
  var last = Sget(K.last, null);
  var due = dueWords().length, wrongN = Object.keys(Sget(K.wrong, {})).length;
  var html = '<h1 class="page-title">👋 欢迎回来，未来的研究生 <span class="tag" style="font-size:12px;font-weight:normal;vertical-align:middle;margin-left:4px">v1.0.1</span></h1>'
    + '<p class="page-sub">今天是 '+new Date().toLocaleDateString('zh-CN',{year:'numeric',month:'long',day:'numeric',weekday:'long'})+' · 目标：2028 考研（'+s.examDate+'）</p>';
  html += '<div class="dash-hero">'
    + '<div class="card countdown-card"><div class="lbl">距 '+esc(s.examDate)+' 初试</div><div class="days">'+countdownDays()+'</div><div class="lbl">天</div><small>在 <a href="#/settings" style="color:#fff">设置</a> 中可修改日期</small></div>'
    + '<div class="card"><div class="prog-grid">'
    + progCell('math', stM) + progCell('english', stE) + progCell('cs408', stC)
    + '<div class="prog-cell"><div style="width:74px;height:74px;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:800;color:#c0392b">'+wrongN+'</div><div class="num">错题本</div><div class="muted">待消灭</div></div>'
    + '</div></div></div>';
  html += '<div class="quick-links" style="margin-bottom:16px">'
    + '<a class="qlink" href="'+(last?'#/lesson/'+last:'#/course/math/ch00'.replace('/ch00','')+'')+'" id="continueLink"><b>▶ 继续学习</b><span>'+(last?esc(last):'从数学预备篇开始')+'</span></a>'
    + '<a class="qlink" href="#/words"><b>🔤 今日背单词</b><span>待复习 '+due+' 个 + 每日新词</span></a>'
    + '<a class="qlink" href="#/plan"><b>🗓 三阶段计划</b><span>基础 → 强化 → 冲刺</span></a>'
    + '<a class="qlink" href="#/wrongbook"><b>📕 错题本</b><span>'+wrongN+' 道错题等待重做</span></a>'
    + '</div>';
  html += '<div class="card"><h3 style="margin-top:0">📌 今日学习建议</h3><div id="todayTip" class="muted"></div></div>';
  $('#view').innerHTML = html;
  $('#continueLink').href = last ? '#/lesson/'+last : '#/lesson/math/ch00/0-1';
  var tips = [];
  var hour = new Date().getHours();
  if(due>0) tips.push('有 <b>'+due+'</b> 个单词到了遗忘临界点，先去 <a href="#/words">背单词</a> 清掉复习队列（约 '+(due*1|0)+' 分钟）');
  tips.push(hour<12 ? '上午头脑清醒，适合啃数学新知识点' : hour<18 ? '下午适合刷题和看错题本' : '晚上适合复盘：过一遍今天的错题和单词');
  if(!last) tips.push('零基础建议从 <a href="#/lesson/math/ch00/0-1">数学预备篇</a> 和 <a href="#/lesson/english/m0/0-1">英语零基础起步</a> 开始');
  var wq = srsQueue().length;
  if(wq===0 && due===0) tips.push('背词任务已完成 🎉 可以把时间给 408 或数学');
  $('#todayTip').innerHTML = tips.map(function(t){ return '<div style="margin:6px 0">• '+t+'</div>'; }).join('');
}
function progCell(cid, st){
  var c = course(cid);
  return '<div class="prog-cell">'+ring(st.pct, c.color)+'<div class="num">'+c.name+'</div><div class="muted">'+st.done+'/'+st.total+' 节</div></div>';
}

/* ---------------- 学习计划页 ---------------- */
function viewPlan(){
  var P = window.PLAN || {phases:[], tips:[]};
  var checks = Sget(K.plan, {});
  var html = '<h1 class="page-title">🗓 三阶段学习计划（2028 考研）</h1>'
    + '<p class="page-sub">约 16 个月备考期，从零基础到上考场。每月任务可勾选打钩，进度自动保存在本机。</p>';
  html += '<div class="notice">⚠️ 重要提醒：全国硕士研究生招生考试除英语/数学/专业课外的公共课以目标院校最新招生简章为准——多数院校还需考思想政治理论，请尽早确定目标院校并核对其初试科目与考试大纲，本平台按你指定的三门课程设计。</div>';
  P.phases.forEach(function(ph, pi){
    html += '<div class="phase"><div class="phase-head"><span class="phase-dot" style="background:'+ph.color+'"></span>'+esc(ph.name)
      + '<span class="tag">'+esc(ph.range)+'</span></div>'
      + '<p class="muted" style="margin-top:-6px">'+esc(ph.goal||'')+'</p><div class="month-grid">';
    ph.months.forEach(function(mo, mi){
      html += '<div class="month-card"><h4>'+esc(mo.m)+' · '+esc(mo.title)+'</h4><ul>';
      mo.tasks.forEach(function(t, ti){
        var key = pi+'-'+mi+'-'+ti;
        var ck = checks[key] ? 'checked' : '';
        var txt = t.t || t;
        var link = t.href ? ' <a href="'+t.href+'">→ 去学习</a>' : '';
        html += '<li><label style="cursor:pointer"><input type="checkbox" data-pk="'+key+'" '+ck+'> '+txt+link+'</label></li>';
      });
      html += '</ul></div>';
    });
    html += '</div></div>';
  });
  html += '<div class="card"><h3 style="margin-top:0">💬 使用建议</h3>';
  (P.tips||[]).forEach(function(t){ html += '<div style="margin:6px 0">• '+t+'</div>'; });
  html += '</div>';
  $('#view').innerHTML = html;
  $all('[data-pk]').forEach(function(cb){
    cb.onchange = function(){
      var c = Sget(K.plan, {});
      if(cb.checked) c[cb.dataset.pk] = 1; else delete c[cb.dataset.pk];
      Sset(K.plan, c);
    };
  });
}

/* ---------------- 设置页 ---------------- */
function viewSettings(){
  var s = settings(), ai = AI.cfg();
  var presets = AI.presetList();
  var sess = Auth.session(), sysCfg = Auth.sys();
  var html = '<h1 class="page-title">⚙️ 设置</h1>'
    + '<div class="card"><h3 style="margin-top:0">👤 账号</h3>'
    + '<div class="muted" style="margin-bottom:8px">当前登录：<b>' + esc(sess.user) + '</b>'
    + (sess.role==='admin' ? ' <span class="chip chip-sy">管理员</span>' : '')
    + ' · 数据目录 kaoyan.u.' + esc(sess.user) + '</div>'
    + '<label class="fld">旧密码</label><input type="password" id="accOld" style="max-width:260px">'
    + '<label class="fld">新密码（至少 6 位）</label><input type="password" id="accNew" style="max-width:260px">'
    + '<label class="fld">确认新密码</label><input type="password" id="accNew2" style="max-width:260px">'
    + '<div style="margin-top:10px"><button class="btn btn-primary" id="accChange">修改密码</button> '
    + '<button class="btn" id="accLogout" style="color:#c0392b">退出登录</button> <span id="accMsg" class="set-status"></span></div></div>'
    + (sess.role==='admin' ? '<div class="card"><h3 style="margin-top:0">🛠 用户管理（管理员）</h3>'
      + '<div class="set-row"><label style="cursor:pointer"><input type="checkbox" id="sysReg"> 开放注册入口（当前：'
      + (sysCfg.allowRegister ? '<b style="color:var(--ok)">开放</b>' : '<b>关闭</b>') + '）</label></div>'
      + '<div id="userList"></div>'
      + '<hr class="hr"><label class="fld">新增用户</label>'
      + '<div class="set-row"><input type="text" id="nuName" placeholder="用户名" style="width:150px">'
      + '<input type="password" id="nuPwd" placeholder="初始密码（≥6位）" style="width:180px">'
      + '<button class="btn btn-primary" id="nuAdd">创建账号</button> <span id="nuMsg" class="set-status"></span></div>'
      + '<p class="muted">注册默认关闭；开放后登录页会出现注册入口。删除用户会同时清除其学习数据；内置管理员不可删除。</p></div>' : '')
    + '<div class="card"><h3 style="margin-top:0">考试与学习</h3>'
    + '<label class="fld">初试日期（用于倒计时）</label><input type="date" id="setExam" value="'+esc(s.examDate)+'">'
    + '<div class="set-row"><label style="cursor:pointer"><input type="checkbox" id="setShuyi" '+(s.showShuyi?'checked':'')+'> 显示数学「数一扩展」章节（学有余力再开）</label></div>'
    + '<label class="fld">每日新词数量上限</label><input type="number" id="setDaily" min="5" max="100" value="'+(s.dailyNew||15)+'" style="width:120px">'
    + '<div style="margin-top:14px"><button class="btn btn-primary" id="setSave">保存基础设置</button></div></div>';

  html += '<div class="card"><h3 style="margin-top:0">🤖 AI 服务（可选，用于 AI 讲解/批改功能）</h3>'
    + '<p class="muted">平台其余功能（课程、测验、背词、错题本）完全不依赖 AI。接入后可解锁：AI 单词讲解、长难句分析、造句/翻译/作文批改、随时问答。API Key 只保存在本机浏览器。</p>'
    + '<label class="fld">服务商预设</label><select id="aiPreset">'
    + Object.keys(presets).map(function(k){ return '<option value="'+k+'">'+esc(presets[k].name)+'</option>'; }).join('')
    + '</select>'
    + '<label class="fld">接口地址（OpenAI 兼容，以 /v4 或 /v1 结尾）</label><input type="text" id="aiEndpoint" style="width:100%" value="'+esc(ai.endpoint||'')+'" placeholder="https://open.bigmodel.cn/api/paas/v4">'
    + '<label class="fld">模型名称</label><input type="text" id="aiModel" style="width:100%" value="'+esc(ai.model||'')+'" placeholder="glm-4-flash / deepseek-chat / …">'
    + '<label class="fld">API Key</label><input type="password" id="aiKey" style="width:100%" value="'+esc(ai.apiKey||'')+'" placeholder="sk-…">'
    + '<div class="set-row"><label style="cursor:pointer"><input type="checkbox" id="aiNoKey"> 本地服务无需 Key（如 Ollama）</label></div>'
    + '<div class="muted" id="aiKeyHint" style="margin:6px 0"></div>'
    + '<div style="margin-top:10px"><button class="btn btn-primary" id="aiSave">保存 AI 配置</button> <button class="btn" id="aiTest">连通性测试</button> <span id="aiTestStatus"></span></div>'
    + '<hr class="hr"><div class="muted">💡 若浏览器直连提示跨域失败（个别服务商拒绝本地文件来源），可改用本地静态服务打开本平台：<br>'
    + '<code style="background:#f1f4f9;padding:2px 6px;border-radius:5px">cd 本平台目录 && python3 -m http.server 8080</code>，然后访问 http://localhost:8080</div></div>';

  html += '<div class="card"><h3 style="margin-top:0">数据管理</h3>'
    + '<div class="set-row"><button class="btn" id="btnResetProg">清空学习进度</button>'
    + '<button class="btn" id="btnResetWrong">清空错题本</button>'
    + '<button class="btn" id="btnResetAll" style="color:#c0392b;border-color:#e5b1ab">重置全部数据</button></div>'
    + '<p class="muted">所有数据（进度、错题、背词记录、AI 配置）仅保存在本机浏览器 localStorage 中，清除浏览器数据会丢失，请谨慎操作。</p></div>';
  $('#view').innerHTML = html;

  var sel = $('#aiPreset');
  function applyPreset(){
    var p = presets[sel.value];
    $('#aiEndpoint').value = p.endpoint || '';
    $('#aiModel').value = p.model || '';
    $('#aiKeyHint').textContent = '获取方式：' + (p.keyHint||'');
    $('#aiNoKey').checked = sel.value==='ollama';
  }
  if(ai.preset) sel.value = ai.preset;
  applyPreset();
  sel.onchange = applyPreset;

  $('#setSave').onclick = function(){
    s.examDate = $('#setExam').value || s.examDate;
    s.showShuyi = $('#setShuyi').checked;
    s.dailyNew = Math.max(3, +$('#setDaily').value || 15);
    saveSettings(s);
    $('#footCountdown').textContent = countdownDays();
    toast('已保存 ✅');
  };
  $('#aiSave').onclick = function(){
    AI.save({
      preset: sel.value,
      endpoint: $('#aiEndpoint').value.trim(),
      model: $('#aiModel').value.trim(),
      apiKey: $('#aiKey').value.trim(),
      noKey: $('#aiNoKey').checked
    });
    toast('AI 配置已保存 ✅');
  };
  $('#aiTest').onclick = function(){
    AI.save({preset:sel.value, endpoint:$('#aiEndpoint').value.trim(), model:$('#aiModel').value.trim(), apiKey:$('#aiKey').value.trim(), noKey:$('#aiNoKey').checked});
    var st = $('#aiTestStatus');
    st.className = 'set-status'; st.textContent = '测试中…';
    AI.test().then(function(r){
      st.className = 'set-status ok'; st.textContent = '✅ 连通成功：'+r.reply;
    }).catch(function(e){
      st.className = 'set-status bad';
      st.textContent = '❌ ' + (e.noKey ? '配置不完整' : (e.message||'请求失败'));
    });
  };
  $('#accChange').onclick = function(){
    var r = Auth.changePwd(sess.user, $('#accOld').value, $('#accNew').value, $('#accNew2').value);
    var st = $('#accMsg'); st.className = 'set-status ' + (r.ok ? 'ok' : 'bad');
    st.textContent = r.ok ? '✅ 修改成功，下次登录请用新密码' : ('❌ ' + r.msg);
    if(r.ok){ $('#accOld').value = ''; $('#accNew').value = ''; $('#accNew2').value = ''; }
  };
  $('#accLogout').onclick = function(){ Auth.logout(); location.hash = '#/'; route(); };
  if(sess.role==='admin'){
    var reg = $('#sysReg');
    reg.checked = !!sysCfg.allowRegister;
    reg.onchange = function(){
      sysCfg.allowRegister = reg.checked;
      Auth.saveSys(sysCfg);
      toast(reg.checked ? '已开放注册入口' : '已关闭注册入口');
      viewSettings();
    };
    function paintUsers(){
      var box = $('#userList'); if(!box) return;
      var us = Auth.users();
      box.innerHTML = '<div class="tbl-wrap"><table class="user-tbl"><tr><th>用户名</th><th>角色</th><th>最近登录</th><th>操作</th></tr>'
        + us.map(function(u){ return '<tr><td>' + esc(u.username) + '</td><td>' + (u.role==='admin' ? '管理员' : '用户') + '</td>'
          + '<td>' + (u.lastLogin ? new Date(u.lastLogin).toLocaleDateString('zh-CN') : '—') + '</td><td>'
          + (u.username === 'admin' ? '<span class="muted">内置账号</span>'
            : '<button class="btn btn-sm" data-rst="' + esc(u.username) + '">重置密码</button> '
            + '<button class="btn btn-sm" data-del="' + esc(u.username) + '" style="color:#c0392b">删除</button>')
          + '</td></tr>'; }).join('') + '</table></div>';
      $all('[data-rst]', box).forEach(function(b){ b.onclick = function(){
        var np = prompt('为用户「' + b.dataset.rst + '」设置新密码（至少 6 位）：');
        if(np == null) return;
        var r = Auth.adminResetPwd(b.dataset.rst, np);
        alert(r.ok ? '✅ 已重置' : '❌ ' + r.msg);
      };});
      $all('[data-del]', box).forEach(function(b){ b.onclick = function(){
        if(!confirm('确定删除用户「' + b.dataset.del + '」？其学习数据将一并删除。')) return;
        var r = Auth.delUser(b.dataset.del, sess.user);
        if(!r.ok){ alert(r.msg); return; }
        Object.keys(localStorage).forEach(function(k){ if(k.indexOf('kaoyan.u.' + b.dataset.del + '.') === 0) localStorage.removeItem(k); });
        paintUsers();
      };});
    }
    $('#nuAdd').onclick = function(){
      var r = Auth.create($('#nuName').value.trim(), $('#nuPwd').value, null, 'user');
      var st = $('#nuMsg'); st.className = 'set-status ' + (r.ok ? 'ok' : 'bad');
      st.textContent = r.ok ? '✅ 已创建' : ('❌ ' + r.msg);
      if(r.ok){ $('#nuName').value = ''; $('#nuPwd').value = ''; paintUsers(); }
    };
    paintUsers();
  }
  $('#btnResetProg').onclick = function(){ if(confirm('确定清空当前账号的学习进度（章节完成标记）？')){ Sdel(K.prog); toast('已清空'); } };
  $('#btnResetWrong').onclick = function(){ if(confirm('确定清空错题本？')){ Sdel(K.wrong); toast('已清空'); } };
  $('#btnResetAll').onclick = function(){
    if(confirm('确定清空当前账号的全部学习数据（进度/错题/背词/计划勾选/设置）？此操作不可恢复.')){
      Object.keys(K).forEach(function(k){ Sdel(k); });
      localStorage.removeItem(AI_KEY);
      toast('已重置'); setTimeout(function(){ location.hash = '#/'; location.reload(); }, 600);
    }
  };
}

/* ---------------- AI 抽屉面板 ---------------- */
var aiTab = 'ask', aiBusy = false;
function openAIPanel(tab, prefill){
  var panel = $('#aiPanel');
  panel.classList.remove('hidden');
  setAITab(tab || 'ask');
  if(prefill){ $('#aiInput').value = prefill; }
  $('#aiInput').focus();
}
function setAITab(tab){
  aiTab = tab;
  $all('#aiTabs button').forEach(function(b){ b.classList.toggle('on', b.dataset.tab===tab); });
  var ph = {ask:'就本节内容提问，如：洛必达法则什么时候不能用？', word:'输入要查询的英文单词，如：abandon', sent:'粘贴要拆解的英文长难句'}[tab];
  $('#aiInput').placeholder = ph;
}
function aiPush(role, html){
  var body = $('#aiBody');
  var d = document.createElement('div');
  d.className = 'ai-msg '+(role==='user'?'user':'ai');
  d.innerHTML = '<div class="who">'+(role==='user'?'我':'AI 老师')+'</div><div class="bubble">'+html+'</div>';
  body.appendChild(d);
  body.scrollTop = body.scrollHeight;
  return d;
}
function aiSend(){
  if(aiBusy) return;
  var input = $('#aiInput'), text = input.value.trim();
  if(!text) return;
  input.value = '';
  if(!aiCfgReady()){
    aiPush('ai', noKeyHint());
    return;
  }
  aiPush('user', esc(text));
  var msgs, ctx = AI_CONTEXT || {};
  if(aiTab==='word') msgs = AI.TPL.word(text);
  else if(aiTab==='sent') msgs = AI.TPL.sentence(text);
  else msgs = AI.TPL.ask(ctx, text);
  var bubble = aiPush('ai', '<span class="typing">思考中…</span>').querySelector('.bubble');
  aiBusy = true;
  AI.chat(msgs, {stream:true, onDelta:function(_, full){ bubble.innerHTML = AI.md2html(full); $('#aiBody').scrollTop = 1e9; }})
    .then(function(full){ bubble.innerHTML = AI.md2html(full||'（AI 未返回内容）'); })
    .catch(function(e){ bubble.innerHTML = noKeyHint() + '<span class="muted">'+esc(e.message||'请求失败')+'</span>'; })
    .finally(function(){ aiBusy = false; });
}
function initAIPanel(){
  $('#aiFab').onclick = function(){ openAIPanel(AI_CONTEXT?'ask':'word', ''); };
  $('#aiClose').onclick = function(){ $('#aiPanel').classList.add('hidden'); };
  $('#aiClear').onclick = function(){ $('#aiBody').innerHTML = ''; };
  $all('#aiTabs button').forEach(function(b){ b.onclick = function(){ setAITab(b.dataset.tab); }; });
  $('#aiSend').onclick = aiSend;
  $('#aiInput').addEventListener('keydown', function(e){
    if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); aiSend(); }
  });
}

/* ---------------- 路由 ---------------- */
function parseHash(){
  var h = location.hash.replace(/^#\/?/, '');
  return h ? h.split('/').filter(Boolean) : [];
}
var pendingHash = null;
function route(){
  var seg = parseHash(), view = $('#view');
  if(!Auth.session()){
    pendingHash = location.hash;
    Auth.renderLogin(view, function(){
      migrateLegacyData(Auth.user());
      setUserChip();
      var target = pendingHash || '#/';
      pendingHash = null;
      if(location.hash === target) route(); else location.hash = target;
    });
    setUserChip();
    return;
  }
  window.scrollTo(0, 0);
  if(!seg.length){ viewHome(); }
  else if(seg[0]==='course' && seg[1]){ viewCourse(seg[1]); }
  else if(seg[0]==='lesson' && seg.length>=4){ viewLesson(seg[1], seg.slice(2, -1).join('/'), seg[seg.length-1]); }
  else if(seg[0]==='quiz' && seg.length>=3){ viewChapterQuiz(seg[1], seg.slice(2).join('/')); }
  else if(seg[0]==='wrongbook'){ viewWrongbook(); }
  else if(seg[0]==='words'){ viewWords(); }
  else if(seg[0]==='plan'){ viewPlan(); }
  else if(seg[0]==='more'){ viewMore(); }
  else if(seg[0]==='settings'){ viewSettings(); }
  else { viewHome(); }
  updateNav();
  wrapTables();
  $('#footCountdown').textContent = countdownDays();
}
function updateNav(){
  var seg = parseHash();
  var key = !seg.length ? 'home' : ({course:seg[1], lesson:seg[1], quiz:seg[1], words:'words', wrongbook:'wrongbook', plan:'plan', more:'more', settings:'settings'}[seg[0]] || 'home');
  $all('#mainNav a').forEach(function(a){ a.classList.toggle('on', a.dataset.nav===key); });
  /* 底部导航（移动端）：科目直达，工具类归入"我的" */
  var bkey = ({home:'home', math:'math', english:'english', cs408:'cs408', words:'more', wrongbook:'more', plan:'more', settings:'more', more:'more'})[key] || null;
  $all('#bottomNav a').forEach(function(a){ a.classList.toggle('on', a.dataset.bnav===bkey); });
  setUserChip();
}
function setUserChip(){
  var chip = $('#userChip'); if(!chip) return;
  var sess = Auth.session();
  if(sess){ chip.style.display = ''; chip.textContent = (sess.role==='admin' ? '👑 ' : '👤 ') + (sess.name || sess.user); chip.title = '账号：' + sess.user; }
  else { chip.style.display = 'none'; chip.textContent = ''; }
  var fab = $('#aiFab'); if(fab) fab.style.display = sess ? '' : 'none';
  var bn = $('#bottomNav'); if(bn) bn.style.visibility = sess ? '' : 'hidden';
}

/* "我的"聚合页（移动端底部导航入口） */
function viewMore(){
  var due = dueWords().length, wrongN = Object.keys(Sget(K.wrong, {})).length;
  var stM = courseStats('math'), stE = courseStats('english'), stC = courseStats('cs408');
  $('#view').innerHTML = '<h1 class="page-title">📱 我的</h1>'
    + '<p class="page-sub">距初试还有 <b>'+countdownDays()+'</b> 天 · 数学 '+stM.pct+'% · 英语 '+stE.pct+'% · 408 '+stC.pct+'%</p>'
    + '<div class="quick-links">'
    + '<a class="qlink" href="#/words"><b>🔤 背单词</b><span>待复习 '+due+' 个 + 每日新词</span></a>'
    + '<a class="qlink" href="#/wrongbook"><b>📕 错题本</b><span>'+wrongN+' 道待重做</span></a>'
    + '<a class="qlink" href="#/plan"><b>🗓 学习计划</b><span>三阶段按月打卡</span></a>'
    + '<a class="qlink" href="#/settings"><b>⚙️ 设置</b><span>考试日期 / AI 服务 / 数一扩展</span></a>'
    + '<a class="qlink" href="javascript:void(0)" id="moreLogout"><b>🚪 退出登录</b><span>当前账号：' + esc(Auth.user()||'') + '</span></a>'
    + '</div>';
  var ml = $('#moreLogout'); if(ml) ml.onclick = function(){ Auth.logout(); route(); };
}

/* ---------------- 设备判断（移动端适配） ---------------- */
function applyDeviceClass(){
  var mobile = (window.matchMedia && matchMedia('(max-width:768px)').matches)
    || /Android|iPhone|iPad|iPod|Mobile|HarmonyOS/i.test(navigator.userAgent);
  document.body.classList.toggle('mobile', mobile);
  document.body.classList.toggle('desktop', !mobile);
}

/* 宽表格在窄屏下横向滚动 */
function wrapTables(){
  if(!window.matchMedia || !matchMedia('(max-width:768px)').matches) return;
  $all('#view table').forEach(function(t){
    if(!t.parentNode || !t.parentNode.classList || !t.parentNode.classList.contains('tbl-wrap')){
      var w = document.createElement('div'); w.className = 'tbl-wrap';
      t.parentNode.insertBefore(w, t); w.appendChild(t);
    }
    var cols = (t.rows[0] && t.rows[0].cells.length) || 0;
    if(cols >= 5) t.style.minWidth = '560px';
    else if(cols >= 4) t.style.minWidth = '420px';
  });
}

/* ---------------- 启动 ---------------- */
function boot(){
  Promise.all([
    loadScript('data/curriculum.js'),
    loadScript('data/plan.js')
  ]).then(function(){
    var files = (window.WORD_FILES || []).slice();
    return Promise.all(files.map(function(f){ return loadScript(f).catch(function(){}); }));
  }).then(function(){
    initAIPanel();
    Auth.ensureSeed();
    applyDeviceClass();
    window.addEventListener('resize', applyDeviceClass);
    window.addEventListener('orientationchange', applyDeviceClass);
    window.addEventListener('hashchange', route);
    if('speechSynthesis' in window){ speechSynthesis.getVoices(); }
    route();
  }).catch(function(e){
    $('#view').innerHTML = '<div class="card empty-tip">数据文件加载失败：'+esc(e.message||'')+'<br>请确认所有文件完整。</div>';
  });
}
boot();
})();
