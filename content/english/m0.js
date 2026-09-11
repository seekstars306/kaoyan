/* ===== 英语 · 模块0 从字母到句子 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['english/m0'] = {

lessons: {

'0-1': {
title: '26 个字母与书写规范',
secs: [
['why', '为什么从字母开始',
`<p>就像汉语拼音是认汉字的工具，<b>26 个字母是英语一切的地基</b>：单词由字母拼成，查词典按字母排序，音标也要用字母来标注发音。别觉得简单——点每个字母旁的小喇叭<b>跟读一遍</b>，把名字音读准，后面的自然拼读才不会绕弯路。</p>`],
['think', '直观理解',
`<p>26 个字母就像 26 个"零件"，英文世界里所有单词都由它们拼装。它们分两种身份：</p>
<blockquote><b>大写字母</b>：用在句首、人名、地名、国名、"I"（我）永远大写。<br><b>小写字母</b>：日常书写的主力，95% 的场景都是它。</blockquote>
<p>每个字母有两个"名字"：<b>字母名</b>（如 C 读 /siː/，背单词表排序时用）和<b>字母音</b>（如 C 在单词 cat 里读 /k/，拼单词时用）。本节课读的是字母名。</p>`],
['def', '字母表与分类',
`<p><b>按顺序背：</b>A B C D E F G / H I J K L M N / O P Q R S T / U V W X Y Z</p>
<p style="line-height:2.2">点击朗读跟读：
<button class="speak-btn" data-speak="A">A</button><button class="speak-btn" data-speak="B">B</button><button class="speak-btn" data-speak="C">C</button><button class="speak-btn" data-speak="D">D</button><button class="speak-btn" data-speak="E">E</button><button class="speak-btn" data-speak="F">F</button><button class="speak-btn" data-speak="G">G</button><button class="speak-btn" data-speak="H">H</button><button class="speak-btn" data-speak="I">I</button><button class="speak-btn" data-speak="J">J</button><button class="speak-btn" data-speak="K">K</button><button class="speak-btn" data-speak="L">L</button><button class="speak-btn" data-speak="M">M</button><button class="speak-btn" data-speak="N">N</button><button class="speak-btn" data-speak="O">O</button><button class="speak-btn" data-speak="P">P</button><button class="speak-btn" data-speak="Q">Q</button><button class="speak-btn" data-speak="R">R</button><button class="speak-btn" data-speak="S">S</button><button class="speak-btn" data-speak="T">T</button><button class="speak-btn" data-speak="U">U</button><button class="speak-btn" data-speak="V">V</button><button class="speak-btn" data-speak="W">W</button><button class="speak-btn" data-speak="X">X</button><button class="speak-btn" data-speak="Y">Y</button><button class="speak-btn" data-speak="Z">Z</button></p>
<p><b>两组特殊字母要记住：</b></p>
<p>• <b>元音字母（5 个）</b>：A、E、I、O、U —— 它们能"自己响"，是每个音节的核心。单词的发音规律基本都围绕"元音前后发生了什么"。</p>
<p>• <b>半元音</b>：Y —— 有时当元音（如 <i>happy</i> 结尾），有时当辅音（如 <i>yes</i> 开头）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 判断哪些字母是元音字母</div>
<p><i>b, a, e, t, o, u, m, i</i> → 元音字母是 <b>a, e, o, u, i</b>（口诀：AEIOU）。</p></div>
<div class="ex-box"><div class="ex-t">例 2 书写规范判断</div>
<p>"i am a Student." 错在两处：句首 <b>i</b> 应大写为 <b>I</b>；"Student" 在句中不需要大写。正确写法：</p>
<p class="speak-btn" data-speak="I am a student."><b>I am a student.</b> 🔊</p>
<p class="muted">规则：句首大写；"我"（I）任何时候都大写；人名地名首字母大写。</p></div>
<div class="ex-box"><div class="ex-t">例 3 按字母表排序</div>
<p>把 cat, apple, book 排序：apple &lt; book &lt; cat（词典就是按这个顺序排的，查词典必备技能）。</p></div>`],
['warn', '易错点',
`<p>• <b>G</b> /dʒiː/ 和 <b>J</b> /dʒeɪ/ 的名字音很容易混，多跟读几遍。</p>
<p>• <b>W</b> 是"double u"（两个 u 连读），不是"达不溜"的音译。</p>
<p>• 手写时 <b>l（小写 L）</b>、<b>I（大写 i）</b>、<b>1（数字一）</b>要能区分；打字时别把小写 L 打成大写 i。</p>
<p>• 句子里的"I"（我）永远大写，"am/is/are"里的 i 不大写。</p>`]
],
quiz: [
{id:'q1', q:'下列哪一组<b>全部</b>是元音字母？', opts:['a, e, i, o, u', 'a, b, c, d, e', 'a, e, i, o, y', 'e, f, g, o, u'], ans:0, exp:'五个元音字母是 A E I O U。Y 是"半元音"，不算标准元音字母。'},
{id:'q2', q:'下面哪个句子书写<b>完全正确</b>？', opts:['i like english.', 'I like english.', 'I like English.', 'i like English.'], ans:2, exp:'句首的"我"要大写 I；English（英语/英国的）作为语言和国家相关的专有名词首字母要大写。'},
{id:'q3', q:'cat、egg、apple 按词典顺序排列，正确的是？', opts:['cat &lt; egg &lt; apple', 'apple &lt; cat &lt; egg', 'apple &lt; egg &lt; cat', 'egg &lt; apple &lt; cat'], ans:1, exp:'词典按字母表顺序排：a 开头的 apple 最靠前，c 开头的 cat 比 e 开头的 egg 靠前。'}
]

},

'0-2': {
title: '国际音标（上）：20 个元音',
secs: [
['why', '为什么学这一节',
`<p>音标是单词的"<b>发音密码</b>"：词典里每个单词后面的 /ˈæpl/ 就是它。认识 48 个音标后，任何生词你都能照着读出来——这比死记字母拼写高效十倍。元音是音节的"心脏"，先攻元音。</p>`],
['think', '直观理解',
`<p><b>元音 = 气流通过口腔不受阻碍时发出的"共鸣声"。</b>舌位高低、口型开合、嘴唇圆扁，决定了是哪个音。</p>
<blockquote>记忆框架：先分<b>短元音</b>（干脆短促）、<b>长元音</b>（带"波浪线"拉长）、<b>双元音</b>（从一个音滑向另一个音）三族。</blockquote>`],
['def', '音标分类表',
`<p><b>① 短元音 7 个：</b></p>
<p style="line-height:2.1"><button class="speak-btn" data-speak="it">/ɪ/</button>：it, big　<button class="speak-btn" data-speak="bed">/e/</button>：bed, pen　<button class="speak-btn" data-speak="cat">/æ/</button>：cat, apple　<button class="speak-btn" data-speak="dog">/ɒ/</button>：dog, box　<button class="speak-btn" data-speak="book">/ʊ/</button>：book, good　<button class="speak-btn" data-speak="bus">/ʌ/</button>：bus, run　<button class="speak-btn" data-speak="about">/ə/</button>：about（非重读音节中很常见）</p>
<p><b>② 长元音 5 个：</b></p>
<p style="line-height:2.1"><button class="speak-btn" data-speak="ee">/iː/</button>：see, eat　<button class="speak-btn" data-speak="er">/ɜː/</button>：bird, her　<button class="speak-btn" data-speak="ar">/ɑː/</button>：car, father　<button class="speak-btn" data-speak="or">/ɔː/</button>：door, ball　<button class="speak-btn" data-speak="u">/uː/</button>：food, blue</p>
<p><b>③ 双元音 8 个：</b></p>
<p style="line-height:2.1"><button class="speak-btn" data-speak="ay">/eɪ/</button>：day, cake　<button class="speak-btn" data-speak="eye">/aɪ/</button>：time, my　<button class="speak-btn" data-speak="oy">/ɔɪ/</button>：boy, toy　<button class="speak-btn" data-speak="ow">/əʊ/</button>：go, home　<button class="speak-btn" data-speak="ow">/aʊ/</button>：now, out　<button class="speak-btn" data-speak="ear">/ɪə/</button>：ear, here　<button class="speak-btn" data-speak="air">/eə/</button>：hair, care　<button class="speak-btn" data-speak="oor">/ʊə/</button>：tour</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 分辨长短：/ɪ/ vs /iː/</div>
<p><span class="speak-btn" data-speak="ship">ship /ʃɪp/ 船</span>　vs　<span class="speak-btn" data-speak="sheep">sheep /ʃiːp/ 羊</span></p>
<p>口型提示：短 /ɪ/ 嘴巴微开放松；长 /iː/ 嘴角向两边咧开（像微笑）拉长。</p></div>
<div class="ex-box"><div class="ex-t">例 2 双元音滑动：/aɪ/</div>
<p><span class="speak-btn" data-speak="time">time /taɪm/</span>：从"啊"滑向"衣"，一气呵成。中文"爱"字接近但嘴型更扁更长。</p></div>`],
['warn', '易错点',
`<p>• /ɪ/ 与 /iː/、/ʊ/ 与 /uː/ 是不同音素，混读会改词义（ship/sheep）。</p>
<p>• 双元音要<b>滑动</b>，读成两个断开的音就不像了。</p>
<p>• /ə/（schwa）主要出现在<b>非重读</b>音节中，是英语里非常常见的弱读元音；实际发音仍要以词典音标为准。</p>`]
],
quiz: [
{id:'q1', q:'apple /ˈæpl/ 中的元音是？', opts:['/e/', '/æ/', '/aɪ/', '/ɑː/'], ans:1, exp:'/æ/ 短元音，口大而扁，像被踩到脚的惊叫前半段。'},
{id:'q2', q:'下列哪组是"长音 vs 短音"的对立？', opts:['cat / cut', 'ship / sheep', 'pen / pan', 'see / sea'], ans:1, exp:'ship /ʃɪp/ 与 sheep /ʃiːp/：短 /ɪ/ 对长 /iː/。cat/cut 与 pen/pan 都是两短音对立；see 和 sea 发音完全相同。'}
]

},

'0-3': {
title: '国际音标（下）：28 个辅音与拼读',
secs: [
['why', '为什么学这一节',
`<p>辅音是音节的"骨架"。清浊对立（/p/ vs /b/）决定词义，两个"雷区音" /θ/ 和 /ð/（咬舌音）是中文没有的，需要专门练。</p>`],
['think', '直观理解',
`<p><b>辅音 = 气流在口腔或咽喉中受到不同程度阻碍时形成的音。</b>阻碍部位、阻碍方式以及声带是否振动，是描述辅音的三个常用维度。</p>
<blockquote>本教材沿用国内英语教学中常见的英式音标分类表。/p-b/、/t-d/、/k-g/、/f-v/、/s-z/、/ʃ-ʒ/、/θ-ð/、/tʃ-dʒ/ 可按清浊成对练习；/tr, dr, ts, dz/ 在这套表中列作“破擦音组合”，但现代语音学通常把它们分析为辅音连缀，而不是四个独立音位。不同词典的英式、美式标音也可能略有差异，应以所用词典及其录音为准。</blockquote>`],
['def', '音标分类表',
`<p><b>① 爆破音 6 个：</b>/p b / <button class="speak-btn" data-speak="pen">pen</button> <button class="speak-btn" data-speak="bag">bag</button>；/t d/ <button class="speak-btn" data-speak="ten">ten</button> <button class="speak-btn" data-speak="dog">dog</button>；/k g/ <button class="speak-btn" data-speak="cat">cat</button> <button class="speak-btn" data-speak="go">go</button></p>
<p><b>② 摩擦音：</b>/f v/（five, very）、/s z/（see, zoo）、/θ ð/（think 咬舌清音、this 咬舌浊音）、/ʃ ʒ/（she, usually）、/h/（hat）、/r/（red）</p>
<p><b>③ 破擦音：</b>/tʃ dʒ/（chair, job）、/tr dr/（tree, dream）、/ts dz/（cats, beds）</p>
<p><b>④ 鼻音与半元音：</b>/m/（man）、/n/（no）、/ŋ/（sing 鼻音"呃"）、/j/（yes）、/w/（we）、/l/（like 舌侧音）</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 咬舌音专项：/θ/ 与 /ð/</div>
<p><span class="speak-btn" data-speak="think">think /θɪŋk/ 想</span>　<span class="speak-btn" data-speak="this">this /ðɪs/ 这个</span></p>
<p>舌尖轻放在上下齿之间送气——中文没有，坚持一周就成肌肉记忆。</p></div>
<div class="ex-box"><div class="ex-t">例 2 拼读演示：b + æ + g</div>
<p><span class="speak-btn" data-speak="bag">bag /bæɡ/</span>：辅音 b 对准元音 æ，快速连读，收尾 g。音标就是"拼图说明书"。</p></div>`],
['warn', '易错点',
`<p>• /θ/ 别读成 /s/（think→sink 意思全变）。</p>
<p>• 词尾清辅音别"加呃"：book 读 /bʊk/ 不是"布库"。</p>
<p>• /ŋ/ 在词尾别读成 /n/（sing 不等于 sin）。</p>`]
],
quiz: [
{id:'q1', q:'/θ/ 的正确发音动作是？', opts:['上齿咬下唇', '舌尖放在上下齿之间送气', '卷舌', '双唇紧闭'], ans:1, exp:'咬舌送气即 /θ/；咬唇的是 /f/。'},
{id:'q2', q:'清浊成对的一组是？', opts:['/s/ 与 /ʃ/', '/p/ 与 /b/', '/m/ 与 /n/', '/h/ 与 /r/'], ans:1, exp:'/p/（清）与 /b/（浊）发音部位相同只差声带振动。'}
]

},

'0-4': {
title: '自然拼读与音节：见词能读入门',
secs: [
['why', '为什么学这一节',
`<p>自然拼读（Phonics）是"字母组合 → 发音"的规律系统：掌握后看到 <i>nation</i> 这类没背过的词也能读个八九不离十，背单词速度直接翻倍。</p>`],
['think', '直观理解',
`<p><b>音节 = 单词的"节拍"。</b>每个音节有且只有一个元音核心。cat 一个节拍；happy 两个（hap-py）；nation 两个（na-tion）。</p>
<blockquote><b>开音节（魔法 e）：</b>元音+辅音+不发音的 e → 元音读"名字音"：ca<b>ke</b> /eɪ/，hi<b>te</b> /aɪ/。<br><b>闭音节：</b>元音后面被辅音"堵住" → 读短音：ca<b>t</b> /æ/。</blockquote>`],
['def', '常用字母组合速查',
`<p style="line-height:2.1">• <b>ee/ea</b> = /iː/：see, tea　• <b>oo</b> = /uː/ 或 /ʊ/：food, book<br>
• <b>er/ir/ur</b> = /ɜː/：her, bird, turn　• <b>ar</b> = /ɑː/：car　• <b>or</b> = /ɔː/：for<br>
• <b>ai/ay</b> = /eɪ/：rain, day　• <b>oi/oy</b> = /ɔɪ/：coin, boy　• <b>ou/ow</b> = /aʊ/：out, cow<br>
• <b>ch</b> = /tʃ/：chair　• <b>sh</b> = /ʃ/：ship　• <b>th</b> = /θ/ 或 /ð/：think, this　• <b>ph</b> = /f/：photo　• <b>ck</b> = /k/：back　• <b>ng</b> = /ŋ/：sing<br>
• <b>不发音</b>：<b>knee</b> 中的 k、comb 中的 b、island 中的 s</p>
<p><b>重音提示（只是常见倾向，不是无例外规则）：</b>不少双音节名词重音在前，如 <i>TEAcher</i>；一些同形的名词—动词对会发生重音转换，如名词 <i>REcord</i> 与动词 <i>reCORD</i>。含 -tion/-sion 的词常把主重音放在该后缀前一音节，如 <i>NAtion</i>、<i>deCIsion</i>。生词最终仍应查词典音标。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 猜读音：cap vs cape</div>
<p><span class="speak-btn" data-speak="cap">cap</span>：闭音节，/æ/ 短音"帽子"。<span class="speak-btn" data-speak="cape">cape</span>：有魔法 e，/eɪ/ 长音"披风"。一个 e 之差，词义全变。</p></div>
<div class="ex-box"><div class="ex-t">例 2 试读生词：station</div>
<p>拆音节 sta-tion：重音在 tion 前一拍 → <b>STA</b>tion /ˈsteɪʃn/（重音符号 ˈ 标在 steɪ 前，正说明重读第一音节）。没背过也能读对——这就是拼读的威力。</p></div>`],
['warn', '易错点',
`<p>• 拼读规律覆盖约 80% 常用词，<b>例外词</b>（have, give, said…）要单独记。</p>
<p>• 音节划分别把辅音串拆散：nation 是 na-tion 不是 nat-ion。</p>`]
],
quiz: [
{id:'q1', q:'单词 <i>time</i> 中 i 读什么音？为什么？', opts:['/ɪ/ 短音，闭音节', '/aɪ/ 长音，魔法 e 开音节', '/iː/', '/e/'], ans:1, exp:'元音+辅音+不发音 e 的结构让元音"念自己的名字"。'},
{id:'q2', q:'字母组合 <b>ph</b> 通常读？', opts:['/p/', '/f/', '/v/', '/h/'], ans:1, exp:'ph = /f/，如 photo, phone。'}
]

},

'0-5': {
title: '英汉思维差异：英语句子怎么搭',
secs: [
['why', '为什么学这一节',
`<p>零基础学英语最大的坑不是单词，而是<b>"中文式造句"</b>。看清英汉思维的三个根本差异，后面的语法课就不是死记规则，而是"顺着思维走"。</p>`],
['think', '直观理解',
`<p><b>差异一：英语是"先主干后枝叶"。</b>中文喜欢铺垫在先："我昨天在超市买的那个苹果很好吃"；英语先说核心：<i>The apple (I bought yesterday) was delicious</i>——主干"苹果好吃"先行，修饰挂后面。</p>
<blockquote><b>差异二：英语"离不开动词的位置"，严格的主谓结构。</b>中文可以说"下雨了"，英语必须 <i>It rains</i>——"它"不能丢。<br><b>差异三：英语靠"形态变化"表时间，中文靠"加词"。</b>中文"我吃了/我将吃"，英语 <i>I ate / I will eat</i>——动词本身变样。</blockquote>`],
['def', '英语句子最小单元',
`<p><b>一个完整英语句子的铁律：</b></p>
<p>① 必须有<b>主语</b>和<b>谓语动词</b>（祈使句省略主语 you 除外）；</p>
<p>② 一个简单句<b>只允许一个</b>谓语动词（两个动作要用连词或非谓语，模块 2 详讲）；</p>
<p>③ 语序基本是<b>主 → 谓 → 宾/表</b>，时间地点状语习惯放句尾：<i>I study English <b>every day</b>.</i></p>
<p><b>翻译练习对比：</b></p>
<p>中：今天很热。→ 英：<span class="speak-btn" data-speak="It is hot today."><b>It is hot today.</b></span>（It 补主语，is 是动词，today 收尾）</p>
<p>中：我在学英语。→ 英：<span class="speak-btn" data-speak="I am learning English."><b>I am learning English.</b></span></p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 中式英语门诊</div>
<p>❌ <i>Today very hot.</i>（缺主语和动词）→ ✅ <i>It is hot today.</i></p>
<p>❌ <i>I very like English.</i>（very 不能修饰动词）→ ✅ <i>I like English very much.</i></p></div>
<div class="ex-box"><div class="ex-t">例 2 找主干训练</div>
<p>句子：<i>The book <b>that I bought yesterday</b> is very interesting.</i></p>
<p>剥掉括号里的修饰部分：主干 = <i>The book is interesting</i>（书 有趣）。长难句拆解的雏形——先找主谓。</p></div>`],
['warn', '易错点',
`<p>• 漏主语/动词："Today hot" 不成立，必须有 It is。</p>
<p>• 一句话塞两个动词："I like eat apples" 错，应为 <i>I like <b>eating / to eat</b> apples</i>（非谓语登场）。</p>
<p>• very 修饰形容词，much/very much 修饰动词与比较。</p>`]
],
quiz: [
{id:'q1', q:'英语完整句子最少需要哪两样？', opts:['名词和形容词', '主语和谓语动词', '主语和宾语', '动词和状语'], ans:1, exp:'主谓是铁律；宾语可有可无（如 Birds fly.）。'},
{id:'q2', q:'"我每天读书"的正确英译是？', opts:['I every day read books.', 'I read books every day.', 'Every day read books.', 'I am read books every day.'], ans:1, exp:'主谓宾在前，时间状语放句尾；一个句子一个谓语动词 read。'}
]

},

'0-6': {
title: '入门高频词 500：使用说明（词库入口）',
secs: [
['why', '为什么学这一节',
`<p>这一节是"背词系统说明书"：平台已经内置入门词库（「背单词」页），每天 15 个新词 + 按遗忘曲线复习。配合下面两个原则，500 词一个月内可拿下。</p>`],
['think', '直观理解',
`<p><b>原则一：少量多次战胜遗忘。</b>艾宾浩斯遗忘曲线告诉我们：学后 20 分钟忘 40%、一天后忘 70%。SRS 系统（平台背单词页）会在临界点把词推回给你——忘了→10 分钟后重现；模糊→隔天；认识→拉长间隔。</p>
<blockquote><b>原则二：在"句子"里认识单词。</b>孤立背 apple 很容易忘，"I eat an apple" 这种微语境记得牢。平台每张词卡都配了例句，务必读一遍（点小喇叭跟读）。</blockquote>`],
['def', '每日流程（15 分钟）',
`<p>① 打开「<a href="#/words">背单词</a>」页 → 清空"今日队列"（新词 15 + 到期复习）；</p>
<p>② 每张卡：看词 → 猜意思 → 点"显示答案"核对 → 跟读例句 → 诚实点评分（忘了/模糊/认识）；</p>
<p>③ 遇到特别难的词点"🤖 让 AI 深度讲解这个词"，生成词根拆解 + 联想记忆；</p>
<p>④ 学完在「AI 工具」里挑 3 个词造句，让 AI 批改——这一步把"认识"变成"会用"。</p>
<p class="muted">入门词库已内置 36 词起步（入门第一周），完整核心词库见模块1词表。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例：一张词卡的完整使用</div>
<p>卡片正面：apple /ˈæpl/ 🔊 → 心里默猜"苹果" → 显示答案核对 ✓ → 跟读例句 <span class="speak-btn" data-speak="I eat an apple every day.">I eat an apple every day.</span> → 评分"认识" → 该词 1 天后、再 2 天、4 天、7 天……自动排期回来复习。</p></div>`],
['warn', '易错点',
`<p>• 别贪多：一天 50 个新词的后果是三天后全忘，15 个 + 复习才是最优节奏。</p>
<p>• 评分要诚实："模糊"就点模糊，系统才会安排复习；骗系统 = 骗自己。</p>`]
],
quiz: [
{id:'q1', q:'SRS 系统里点"忘了"后，这个词何时重现？', opts:['一个月后', '明天', '10 分钟后（当天重现）', '永远不会'], ans:2, exp:'"忘了"触发最短间隔：10 分钟后重新出现在队列里。'},
{id:'q2', q:'每日新词建议量是？', opts:['越多越好', '15 个左右 + 复习', '100 个', '0 个'], ans:1, exp:'少量多次 + 遗忘曲线复习 = 长期留存率最高的节奏。'}
]

}

}
};
