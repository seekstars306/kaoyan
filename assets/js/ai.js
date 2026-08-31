/* ===== AI 学习助手模块 =====
 * 双层设计：TTS / SRS 等免费功能在 app.js；本文件负责大模型接入（OpenAI 兼容接口）。
 * API Key 只保存在本机 localStorage，请求由浏览器直连服务商。
 */
window.AI = (function(){
  var PRESETS = {
    zhipu:   {name:'智谱 GLM（有免费模型，推荐学生党）', endpoint:'https://open.bigmodel.cn/api/paas/v4', model:'glm-4-flash', keyHint:'open.bigmodel.cn 注册后在「API Keys」创建'},
    deepseek:{name:'DeepSeek（价格极低）', endpoint:'https://api.deepseek.com', model:'deepseek-chat', keyHint:'platform.deepseek.com 创建 API Key'},
    openai:  {name:'OpenAI 兼容（自定义地址）', endpoint:'', model:'', keyHint:'填写任意 OpenAI 兼容服务地址'},
    ollama:  {name:'本地 Ollama（完全免费离线）', endpoint:'http://localhost:11434/v1', model:'qwen2.5:7b', keyHint:'无需 Key；若提示跨域，先以 OLLAMA_ORIGINS=* ollama serve 启动'}
  };

  function cfg(){
    try{ return JSON.parse(localStorage.getItem('kaoyan.ai')||'{}'); }catch(e){ return {}; }
  }
  function save(c){ localStorage.setItem('kaoyan.ai', JSON.stringify(c)); }
  function ready(){
    var c = cfg();
    return !!(c.endpoint && c.model && (c.apiKey || c.noKey));
  }
  function presetList(){ return PRESETS; }

  /* 核心：调用 OpenAI 兼容 chat/completions */
  function chat(messages, opts){
    opts = opts || {};
    var c = cfg();
    if(!ready()){
      return Promise.reject({noKey:true, message:'尚未配置 AI 服务：请到「设置 → AI 服务」填写接口地址、模型与 API Key（智谱有免费模型，Ollama 完全免费）。'});
    }
    var url = c.endpoint.replace(/\/+$/,'') + '/chat/completions';
    var body = {
      model: c.model,
      messages: messages,
      temperature: opts.temperature != null ? opts.temperature : 0.6,
      stream: !!opts.stream
    };
    var headers = {'Content-Type':'application/json'};
    if(c.apiKey) headers['Authorization'] = 'Bearer ' + c.apiKey;

    return fetch(url, {method:'POST', headers:headers, body:JSON.stringify(body)}).then(function(res){
      if(!res.ok){
        return res.text().then(function(t){
          throw {message:'接口返回 ' + res.status + '：' + (t||'').slice(0,200)};
        });
      }
      if(!opts.stream || !res.body || !res.body.getReader){
        return res.json().then(function(j){
          var txt = j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content || '';
          if(opts.onDelta) opts.onDelta(txt);
          return txt;
        });
      }
      /* 流式 SSE 读取 */
      var reader = res.body.getReader(), dec = new TextDecoder('utf-8'), buf = '', full = '';
      function pump(){
        return reader.read().then(function(r){
          if(r.done) return full;
          buf += dec.decode(r.value, {stream:true});
          var lines = buf.split('\n'); buf = lines.pop();
          for(var i=0;i<lines.length;i++){
            var line = lines[i].trim();
            if(!line || line.indexOf('data:')!==0) continue;
            var payload = line.slice(5).trim();
            if(payload === '[DONE]') return full;
            try{
              var j = JSON.parse(payload);
              var d = j.choices && j.choices[0] && j.choices[0].delta && j.choices[0].delta.content || '';
              if(d){ full += d; if(opts.onDelta) opts.onDelta(d, full); }
            }catch(e){}
          }
          return pump();
        });
      }
      return pump();
    });
  }

  /* 连通性测试 */
  function test(){
    return chat([{role:'user', content:'请只回复：OK'}], {temperature:0}).then(function(t){
      return {ok:true, reply:(t||'').trim().slice(0,50)};
    });
  }

  /* ---- 提示词模板（英语学习为核心场景） ---- */
  function sysTutor(){ return '你是一位极有耐心、擅长深入浅出的中国考研英语辅导老师，学生是英语零基础的考研考生（目标英语二）。请始终用中文讲解，英文例句要简单准确，多用类比和拆解，不要堆砌术语；回答分点清晰，重点加粗。'; }

  var TPL = {
    ask: function(ctx, question){
      return [
        {role:'system', content: sysTutor() + (ctx && ctx.title ? '\n学生正在学习：《' + ctx.title + '》这一节。' : '') + (ctx && ctx.text ? '\n本节内容摘要（回答时可引用其中概念）：\n' + ctx.text : '')},
        {role:'user', content: question}
      ];
    },
    word: function(word){
      return [
        {role:'system', content: sysTutor() + '请你按固定格式输出，方便学生记忆单词。'},
        {role:'user', content: '请为单词「' + word + '」输出考研词汇卡片，格式如下：\n### 发音与词性\n### 词根词缀拆解（若无常见词根则说明构词来源）\n### 联想记忆（一个生动的中文联想/谐音/场景）\n### 考研含义与例句（2 个简单英文例句 + 中文翻译）\n### 近义辨析（与 1-2 个易混词的区别）'}
      ];
    },
    sentence: function(sent){
      return [
        {role:'system', content: sysTutor() + '请按课程教授的「长难句拆解五步法」分析。'},
        {role:'user', content: '请逐层分析这个英文句子（面向零基础学生，每步都用中文说明）：\n【第一步】找谓语动词、定主干（主谓宾/主系表）\n【第二步】剥离从句（说明是什么从句、修饰谁）\n【第三步】还原修饰成分（介词短语/非谓语/插入语）\n【第四步】按中文语序重新排列\n【第五步】给出通顺译文\n\n句子：' + sent}
      ];
    },
    makeSentence: function(word, sentence){
      return [
        {role:'system', content: sysTutor()},
        {role:'user', content: '学生正在背单词「' + word + '」，用这个词造了一个句子：\n「' + sentence + '」\n请：1) 指出所有语法/用词错误并解释为什么错；2) 给出修改后的正确句子；3) 再给一个更地道的高级版本（考研写作可用）。用中文解释。'}
      ];
    },
    translate: function(source, mine){
      return [
        {role:'system', content: sysTutor() + '你负责按考研英语二翻译评分标准批改。'},
        {role:'user', content: '英文原句：\n' + source + '\n\n学生的译文：\n' + mine + '\n\n请批改：1) 指出译文中理解错误或表达不当之处（逐处列出：原文片段 → 问题 → 建议改法）；2) 给出参考译文；3) 按考研翻译标准（忠实、通顺）给一个 1-4 档的简评。'}
      ];
    },
    essay: function(topic, essayText){
      return [
        {role:'system', content: sysTutor() + '你负责按考研英语二写作评分标准批改作文。'},
        {role:'user', content: '作文题目/要求：\n' + (topic||'英语二大作文（图表作文）') + '\n\n学生作文：\n' + essayText + '\n\n请批改：\n1. 逐段点评（结构是否清晰、是否覆盖图表信息）\n2. 语言错误清单（每条：原句 → 修改 → 错误类型）\n3. 3 个可升级的亮点句型（给出替换写法）\n4. 按考研评分（语言准确性/结构连贯/内容完整性）给出档次评价与总分预估（满分15分制按大作文）。'}
      ];
    }
  };

  /* 极简 Markdown 渲染（AI 输出用）：### 标题 / **粗体** / - 列表 / 空行分段 */
  function md2html(s){
    var esc = (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    var lines = esc.split('\n'), out = [], inList = false;
    function inline(t){
      return t.replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/`([^`]+)`/g,'<code>$1</code>');
    }
    for(var i=0;i<lines.length;i++){
      var l = lines[i];
      var h = l.match(/^#{1,4}\s+(.*)/);
      if(h){ if(inList){out.push('</ul>');inList=false;} out.push('<h4>'+inline(h[1])+'</h4>'); continue; }
      var li = l.match(/^\s*[-*]\s+(.*)/);
      if(li){ if(!inList){out.push('<ul>');inList=true;} out.push('<li>'+inline(li[1])+'</li>'); continue; }
      if(inList){out.push('</ul>');inList=false;}
      if(/^\s*\d+[.、]\s+/.test(l)){ out.push('<p>'+inline(l)+'</p>'); continue; }
      if(l.trim()===''){ continue; }
      out.push('<p>'+inline(l)+'</p>');
    }
    if(inList) out.push('</ul>');
    return out.join('');
  }

  /* TTS 发音（浏览器自带，免费离线） */
  function speak(text, rate){
    try{
      if(!('speechSynthesis' in window)) return;
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(String(text).replace(/\s+/g,' ').trim());
      u.lang = 'en-US'; u.rate = rate || 0.92;
      var vs = speechSynthesis.getVoices();
      for(var i=0;i<vs.length;i++){ if(/^en(-|_)/i.test(vs[i].lang)){ u.voice = vs[i]; break; } }
      speechSynthesis.speak(u);
    }catch(e){}
  }

  return {cfg:cfg, save:save, ready:ready, chat:chat, test:test, TPL:TPL, md2html:md2html, speak:speak, presetList:presetList};
})();
