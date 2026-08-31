/* ===== 数学 · 第1章 函数 极限 连续 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['math/ch01'] = {

lessons: {

'1-1': {
title: '函数：复合、反函数与初等函数',
secs: [
['why', '为什么学这一节',
`<p>考研真题里的函数几乎都不是"裸函数"，而是复合出来的：如 $e^{-x^2}$、$\\ln\\sin x$。求导要拆复合、求极限要换元、换元积分更是直接依赖复合结构的"逆向操作"。这节是把高中函数观升级到大学操作版。</p>`],
['think', '直观理解',
`<p><b>复合函数 = 机器串联。</b>$y=f(u)=u^2$ 是"平方机"，$u=g(x)=x+1$ 是"加一机"。串联起来 $f(g(x))=(x+1)^2$：先加一，再平方。</p>
<blockquote>拆解口诀：<b>由外向内剥洋葱</b>。看到 $e^{-x^2}$，最外层是"指数机"，里面套着"负平方机"。</blockquote>
<p><b>反函数 = 倒带机。</b>$y=2^x$ 把 3 变成 8；它的反函数 $y=\\log_2 x$ 就把 8 变回 3。图像关于 $y=x$ 对称。</p>`],
['def', '定义与公式',
`<p><b>① 复合函数：</b>$y=f(g(x))$，要求 $g(x)$ 的值域落在 $f$ 的定义域内。对应规则满足 $f(g(x_0))=f(u_0)$，$u_0=g(x_0)$。</p>
<p><b>② 反函数：</b>若 $y=f(x)$ 单调（一一对应），则存在反函数 $x=f^{-1}(y)$，习惯写作 $y=f^{-1}(x)$。性质：$f(f^{-1}(x))=x$；单调性不变。</p>
<p><b>③ 基本初等函数五类：</b>幂、指数、对数、三角、反三角。<b>初等函数</b> = 由它们经有限次四则运算与复合得到、能用一个式子表示的函数。考研主要对象就是初等函数。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（求复合）设 $f(x)=\\dfrac{x}{1+x}$，求 $f(f(x))$</div>
$$ f(f(x)) = \\frac{\\tfrac{x}{1+x}}{1+\\tfrac{x}{1+x}} = \\frac{x}{1+2x} $$
<p class="muted">把 $f$ 的规则"输入替换"执行两遍即可，注意分母通分要细心。</p></div>
<div class="ex-box"><div class="ex-t">例 2（拆复合）把 $y=e^{\\sin^2 x}$ 拆成简单函数</div>
<p>由外向内：$y=e^u$ ← $u=v^2$ ← $v=\\sin x$。</p>
<p class="muted">这个"拆"的动作，就是复合函数求导链式法则的准备动作。</p></div>`],
['warn', '易错点',
`<p>• $f(x+1)$ 与 $f(x)+1$ 完全不同：前者是输入变了，后者是输出变了。</p>
<p>• 反函数存在要求<b>单调（一一对应）</b>：$y=x^2$ 在 $\\mathbb{R}$ 上没有反函数（1 和 -1 挤到同一个输出），但限制在 $[0,+\\infty)$ 上就有。</p>
<p>• $f^{-1}(x)$ 是反函数，<b>不是</b> $\\dfrac{1}{f(x)}$——记号陷阱。</p>`]
],
quiz: [
{id:'q1', q:'设 $f(x)=x^2+1$，则 $f(x-1)$ 等于？', opts:['$x^2$', '$x^2+2x$', '$x^2-2x+2$', '$x^2+2$'], ans:2, exp:'$f(x-1)=(x-1)^2+1=x^2-2x+2$。"输入替换"要整体代入。'},
{id:'q2', q:'$y=2^x+1$ 的反函数是？', opts:['$y=\\log_2 x+1$', '$y=\\log_2(x-1)$', '$y=\\log_2(x+1)$', '$y=\\dfrac{1}{2^x+1}$'], ans:1, exp:'由 $x=2^y+1$ 解出 $y=\\log_2(x-1)$（定义域 $x>1$，恰为原函数值域）。'},
{id:'q3', q:'下列复合关系中，$f(g(x))=\\sqrt{g(x)}$ 要有意义，需要 $g(x)$ 满足？', opts:['$g(x)\\neq 0$', '$g(x)\\ge 0$', '$g(x)>0$', '任意'], ans:1, exp:'外层 $\\sqrt{u}$ 要求 $u\\ge 0$，故需 $g(x)\\ge 0$。复合函数定义域就是"内层值域落进外层定义域"的交集。'}
]

},

'1-2': {
title: '数列的极限',
secs: [
['why', '为什么学这一节',
`<p>极限是整座微积分大厦的地基：导数、积分、级数全部用极限定义。数列极限是极限的入门形态——先把"$n$ 越来越大时 $a_n$ 越来越靠近某个数"说清楚，函数极限只是它的连续版。</p>`],
['think', '直观理解',
`<p><b>一尺之棰，日取其半，万世不竭。</b>每天剩 $a_n=\\tfrac{1}{2^n}$：0.5, 0.25, 0.125, … 无限逼近 0 但永远不等于 0。我们就说"当 $n\\to\\infty$ 时，$a_n$ 的极限是 0"，记 $\\lim\\limits_{n\\to\\infty} \\tfrac{1}{2^n}=0$。</p>
<blockquote>关键认识：<b>极限描述"趋势"，不关心过程中某一两项。</b>把前 100 项改成任何数，极限纹丝不动。</blockquote>
<p>严格定义（$\\varepsilon\\text{-}N$ 语言）的直觉：不管你要求多小的误差 $\\varepsilon$（比如 0.000001），我总能找到足够大的 $N$，使 $n>N$ 的所有项与目标的距离都小于 $\\varepsilon$——这就是"要多近有多近"。</p>`],
['def', '定义与公式',
`<p><b>① 定义：</b>若存在常数 $a$，对任意 $\\varepsilon>0$，存在正整数 $N$，当 $n>N$ 时 $|a_n-a|<\\varepsilon$，则 $\\lim\\limits_{n\\to\\infty}a_n=a$。</p>
<p><b>② 四则运算法则：</b>极限存在时，和差积商的极限 = 极限的和差积商（商要求分母极限 $\\neq 0$）。</p>
<p><b>③ 必会结论：</b></p>
$$ \\lim_{n\\to\\infty} q^n = 0\\ (|q|<1), \\qquad \\lim_{n\\to\\infty}\\frac{1}{n^k}=0\\ (k>0) $$
<p><b>④ 常用判定：</b>夹逼准则（两边夹住）；单调有界数列必有极限。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（抓大头）求 $\\lim\\limits_{n\\to\\infty}\\dfrac{3n^2+2n}{n^2-n+1}$</div>
<p>分子分母同除最高次项 $n^2$：</p>
$$ \\lim_{n\\to\\infty}\\frac{3+\\tfrac{2}{n}}{1-\\tfrac{1}{n}+\\tfrac{1}{n^2}} = \\frac{3+0}{1-0+0}=3 $$
<p class="muted">规律：同次比值=最高次系数比；分子次数低→0，高→$\\infty$。</p></div>
<div class="ex-box"><div class="ex-t">例 2（无穷大与无穷小混合）求 $\\lim\\limits_{n\\to\\infty}\\dfrac{n}{n^2+1}\\cdot\\left(2+\\dfrac{1}{n}\\right)$</div>
<p>$\\dfrac{n}{n^2+1}$ 分母次高，趋于 0；$\\left(2+\\tfrac1n\\right)\\to 2$。所以极限 $=0\\times 2 = 0$。</p></div>`],
['warn', '易错点',
`<p>• 运算法则只能用于<b>极限存在（且为有限值）</b>的情形；"$\\infty-\\infty$"、"$0\\cdot\\infty$"不能直接拆开算。</p>
<p>• 有界 × 无界 不一定无界（如 $\\tfrac{1}{n}\\cdot n$ 未必），但<b>有界 × 无穷小 = 无穷小</b>——这是选择题常客。</p>
<p>• 数列极限与前面有限项无关；$\\lim a_n$ 存在不能推出 $\\{a_n\\}$ 单调。</p>`]
],
quiz: [
{id:'q1', q:'$\\lim\\limits_{n\\to\\infty}\\dfrac{2n^3-n}{5n^3+n^2}$ 等于？', opts:['0', '$\\infty$', '$\\dfrac{2}{5}$', '$\\dfrac{2}{5}-\\dfrac{1}{5}$'], ans:2, exp:'分子分母同次，极限为最高次项系数之比 $\\tfrac{2}{5}$。'},
{id:'q2', q:'$\\lim\\limits_{n\\to\\infty}\\left(\\dfrac{1}{2}\\right)^n$ 等于？', opts:['1', '0', '$\\infty$', '不存在'], ans:1, exp:'公比 $|q|=\\tfrac12<1$ 的等比数列极限为 0。'},
{id:'q3', q:'"对任意 $\\varepsilon>0$，存在 $N$，当 $n>N$ 时 $|a_n-a|<\\varepsilon$"中 $\\varepsilon$ 和 $N$ 的关系是？', opts:['$N$ 由 $\\varepsilon$ 确定，$\\varepsilon$ 越小 $N$ 越大', '$\\varepsilon$ 由 $N$ 确定', '两者无关', '$N$ 必须等于 $\\varepsilon$ 的倒数'], ans:0, exp:'先任意给精度要求 $\\varepsilon$，再回应一个够大的 $N$；要求越苛刻（$\\varepsilon$ 越小），需要的 $N$ 越大。'}
]

},

'1-3': {
title: '函数极限与左右极限',
secs: [
['why', '为什么学这一节',
`<p>函数极限是数列极限的连续版，$x\\to x_0$ 时还可以"从左边来"或"从右边来"。考研每年必考：<b>左右极限分别算</b>的场景（分段函数、$e^{1/x}$、$\\arctan\\tfrac1x$）就藏在选择题第 1、2 题附近，是最稳的送分/丢分点。</p>`],
['think', '直观理解',
`<p>$\\lim\\limits_{x\\to 1} \\dfrac{x^2-1}{x-1}$：$x=1$ 处没定义没关系！极限研究的是<b>靠近时</b>的趋势：$x\\to 1$ 时分子分母一起 $\\to 0$，约分后 $=x+1\\to 2$。</p>
<blockquote>再感受"$x\\to\\infty$"与"$x\\to 0^+$"的区别：<br>$e^{1/x}$ 当 $x\\to 0^+$ 时指数 $+\\infty$，函数爆到 $+\\infty$；当 $x\\to 0^-$ 时指数 $-\\infty$，函数缩到 0。<b>两侧行为完全不同</b>——这就是必须分左右讨论的典型。</blockquote>`],
['def', '定义与公式',
`<p><b>① 描述性定义：</b>$x\\to x_0$ 时 $f(x)$ 无限接近 $A$，记 $\\lim\\limits_{x\\to x_0}f(x)=A$。$x$ 趋近方式是任意的（两侧同时）。</p>
<p><b>② 单侧极限：</b>$f(x_0^-)=\\lim\\limits_{x\\to x_0^-}f(x)$（左极限）、$f(x_0^+)$（右极限）。</p>
$$ \\lim_{x\\to x_0}f(x)=A \\iff f(x_0^-) = f(x_0^+) = A $$
<p><b>③ 四种趋向：</b>$x\\to x_0$、$x\\to\\infty$、$x\\to+\\infty$、$x\\to-\\infty$，各法则与数列极限平行。</p>
<p><b>④ 必背单侧行为：</b>$\\lim\\limits_{x\\to+\\infty}e^x=+\\infty,\\ \\lim\\limits_{x\\to-\\infty}e^x=0$；$\\lim\\limits_{x\\to+\\infty}\\arctan x=\\tfrac{\\pi}{2},\\ \\lim\\limits_{x\\to-\\infty}\\arctan x=-\\tfrac{\\pi}{2}$。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（分段函数）设 $f(x)=\\begin{cases}x+1, & x<0\\\\ x^2, & x\\ge 0\\end{cases}$，讨论 $x\\to 0$ 的极限</div>
<p>左极限 $f(0^-)=\\lim(x+1)=1$；右极限 $f(0^+)=\\lim x^2=0$。</p>
<p>左 ≠ 右，所以 $\\lim\\limits_{x\\to0}f(x)$ <b>不存在</b>。</p></div>
<div class="ex-box"><div class="ex-t">例 2（含参）$\\lim\\limits_{x\\to 0}\\dfrac{e^{1/x}}{e^{1/x}+1}$ 存在吗？</div>
<p>$x\\to 0^+$：$e^{1/x}\\to+\\infty$，极限 $\\to 1$；$x\\to 0^-$：$e^{1/x}\\to 0$，极限 $\\to\\dfrac{0}{0+1}=0$。</p>
<p>左右不等，极限不存在——选填题经典结论。</p></div>`],
['warn', '易错点',
`<p>• 极限存在与"该点是否有定义"无关（可去间断点正是"极限在但函数不在"）。</p>
<p>• 含 $e^{1/x}$、$\\arctan\\tfrac{1}{x}$、$\\dfrac{|x|}{x}$ 的 $x\\to 0$ 问题，<b>必须分左右</b>。</p>
<p>• 分段函数在分段点处的极限，永远用左右极限分别求。</p>`]
],
quiz: [
{id:'q1', q:'$\\lim\\limits_{x\\to 0^-}e^{1/x}$ 等于？', opts:['$+\\infty$', '1', '0', '不存在'], ans:2, exp:'$x\\to 0^-$ 时 $\\tfrac1x\\to-\\infty$，$e^{-\\infty}\\to 0$。'},
{id:'q2', q:'$f(x)=\\begin{cases}\\dfrac{\\sin x}{x}, & x\\neq 0\\\\ 0, & x=0\\end{cases}$，则 $\\lim\\limits_{x\\to 0}f(x)$ 等于？', opts:['0', '1', '不存在', '$-1$'], ans:1, exp:'极限只看 $x\\neq0$ 处的趋近行为：$\\lim\\tfrac{\\sin x}{x}=1$。$x=0$ 处函数值为 0 不影响极限（这正是"可去间断"的素材）。'},
{id:'q3', q:'$\\lim\\limits_{x\\to \\infty}\\arctan x$ 的情况是？', opts:['等于 $\\dfrac{\\pi}{2}$', '等于 $-\\dfrac{\\pi}{2}$', '不存在（左右趋势不同）', '等于 0'], ans:2, exp:'$x\\to+\\infty$ 时 $\\to\\tfrac{\\pi}{2}$，$x\\to-\\infty$ 时 $\\to-\\tfrac{\\pi}{2}$，两侧不同，故 $x\\to\\infty$ 极限不存在。'}
]

},

'1-4': {
title: '无穷小与无穷大',
secs: [
['why', '为什么学这一节',
`<p>"无穷小"是极限为 0 的量的代名词，整个微积分的运算对象几乎都是它（导数 = 两个无穷小之比的极限，积分 = 无穷小求和）。把无穷小的阶、性质搞清，等价替换（下一节）才能用对。</p>`],
['think', '直观理解',
`<p><b>无穷小不是"很小的数"，而是"趋于 0 的变量"。</b>0.000001 是很小的数但不是无穷小；$\\tfrac1n$ 随 $n$ 增大趋于 0，才是无穷小。</p>
<p><b>无穷大不是"很大的数"，而是"绝对值无限增大的变量"。</b>两者关系：倒数互化——非零无穷小的倒数是无穷大。</p>
<blockquote>形象记忆：无穷小是"越来越挤向 0 的点"，无穷大是"越跑越远的点"。$\\dfrac{1}{x}$ 当 $x\\to\\infty$ 是无穷小，$x$ 本身是无穷大，两者互为倒数。</blockquote>`],
['def', '定义与公式',
`<p><b>① 无穷小：</b>$\\lim f(x)=0$（在某一趋向下）。<b>无穷大：</b>$\\lim f(x)=\\infty$。</p>
<p><b>② 关系：</b>同一趋向下，$f$ 为无穷大 $\\iff \\tfrac1f$ 为无穷小（$f\\neq0$）。</p>
<p><b>③ 性质：</b>有限个无穷小之和/积仍是无穷小；<b>有界函数 × 无穷小 = 无穷小</b>。</p>
<p><b>④ 极限与无穷小的关系定理：</b>$\\lim f(x)=A \\iff f(x)=A+\\alpha$，其中 $\\alpha$ 是无穷小。这个"剥壳"写法在证明题里常用。</p>
<p><b>⑤ 阶的比较</b>（设 $\\alpha,\\beta$ 都是无穷小）：</p>
$$ \\lim\\frac{\\beta}{\\alpha}=0: \\beta \\text{ 是高阶无穷小 } o(\\alpha);\\quad =c\\neq0: \\text{同阶};\\quad =1: \\text{等价 } \\alpha\\sim\\beta $$`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（有界×无穷小）求 $\\lim\\limits_{x\\to\\infty}\\dfrac{\\sin x}{x}$</div>
<p>$\\tfrac1x\\to 0$ 是无穷小，$\\sin x$ 有界（$|\\sin x|\\le 1$），乘积是无穷小，极限 $=0$。</p>
<p class="muted">千万别用"重要极限"硬套——那是 $\\tfrac{\\sin x}{x}\\ (x\\to 0)$，趋向不同天差地别。</p></div>
<div class="ex-box"><div class="ex-t">例 2（比较阶）$x\\to 0$ 时，比较 $x^2$ 与 $1-\\cos x$</div>
<p>$\\lim\\limits_{x\\to0}\\dfrac{1-\\cos x}{x^2}=\\dfrac12 \\neq 0$ 且有限，所以两者是<b>同阶</b>无穷小（其实等价于 $\\tfrac{x^2}{2}$）。</p></div>`],
['warn', '易错点',
`<p>• 无穷大 + 无穷大 ≠ 无穷大（可能相消为 0），无穷小 − 无穷小未必是无穷小——都要具体算。</p>
<p>• "很小的常数"不是无穷小；唯一既是常数又是无穷小的只有 0。</p>
<p>• 有限个无穷小之积是无穷小，<b>无穷多个</b>无穷小之积没有此结论。</p>`]
],
quiz: [
{id:'q1', q:'$x\\to 0$ 时，下列哪个<b>不是</b>无穷小？', opts:['$x^2$', '$1-\\cos x$', '$\\sin x$', '$\\cot x$'], ans:3, exp:'$\\cot x=\\tfrac{\\cos x}{\\sin x}\\to\\infty$（$x\\to0$），是无穷大不是无穷小。'},
{id:'q2', q:'$\\lim\\limits_{x\\to\\infty}\\dfrac{1+\\cos x}{x^2}$ 等于？', opts:['1', '不存在（振荡）', '0', '$\\infty$'], ans:2, exp:'$\\tfrac1{x^2}\\to 0$ 无穷小 × 有界量 $(1+\\cos x)$ = 无穷小，极限为 0。'},
{id:'q3', q:'设 $x\\to 0$，$\\alpha=x^3$，$\\beta=\\sin^2 x$，则？', opts:['$\\beta$ 是 $\\alpha$ 的高阶无穷小', '$\\alpha$ 与 $\\beta$ 同阶', '$\\alpha$ 是 $\\beta$ 的高阶无穷小', '两者等价'], ans:2, exp:'$\\lim\\tfrac{x^3}{\\sin^2 x}=\\lim\\tfrac{x^3}{x^2}=0$，$x^3$ 比 $x^2$ 阶数高，趋于 0 更快。'}
]

},

'1-5': {
title: '极限存在准则与两个重要极限',
secs: [
['why', '为什么学这一节',
`<p>两个重要极限是考研极限计算的"发动机"：$\\dfrac{\\sin x}{x}\\to 1$ 撑起了所有三角类极限，$\\left(1+\\tfrac1n\\right)^n\\to e$ 撑起了所有 1 的无穷次幂型极限。每年必考，没有例外。</p>`],
['think', '直观理解',
`<p><b>夹逼准则：</b>一个人被两支队伍夹在中间往前走，两头汇合时他也被"夹"到同一位置。求 $\\lim\\dfrac{n}{n^2+1}$ 精确值困难时，把它上下界一夹就出结果。</p>
<p><b>重要极限一：</b>$\\lim\\limits_{x\\to0}\\dfrac{\\sin x}{x}=1$——单位圆上弦与弧的比值在小角度时趋于 1。要认出它的<b>变装</b>：$\\dfrac{\\sin 5x}{\\tan 3x}\\cdot\\dfrac{1}{?}$ 之类，核心是"角要相同、趋于 0"。</p>
<p><b>重要极限二：</b>$\\lim\\limits_{n\\to\\infty}\\left(1+\\tfrac1n\\right)^n=e$。"利滚利"模型：一年结一次息变 2 倍，连续结息趋向 $e\\approx 2.718$。凡见 $1^{\\infty}$ 型，就朝它靠。</p>`],
['def', '定义与公式',
`<p><b>① 夹逼准则：</b>若 $y_n\\le x_n\\le z_n$ 且 $\\lim y_n=\\lim z_n=a$，则 $\\lim x_n=a$。函数版同理。</p>
<p><b>② 单调有界准则：</b>单调且有界的数列必有极限。</p>
<p><b>③ 两个重要极限：</b></p>
$$ \\lim_{x\\to 0}\\frac{\\sin x}{x}=1 \\qquad \\lim_{x\\to\\infty}\\left(1+\\frac{1}{x}\\right)^x = e,\\quad \\lim_{n\\to\\infty}\\left(1+\\frac{1}{n}\\right)^n=e $$
<p><b>④ 由它们派生的标准结果：</b></p>
$$ \\lim_{x\\to0}\\frac{\\tan x}{x}=1,\\quad \\lim_{x\\to0}\\frac{1-\\cos x}{x^2}=\\frac{1}{2},\\quad \\lim_{x\\to0}(1+x)^{\\frac{1}{x}}=e $$`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（重要极限一）求 $\\lim\\limits_{x\\to0}\\dfrac{\\sin 5x}{\\tan 3x}$</div>
<p>造形：$\\dfrac{\\sin 5x}{5x}\\cdot\\dfrac{3x}{\\tan 3x}\\cdot\\dfrac{5x}{3x}\\to 1\\cdot1\\cdot\\dfrac53=\\dfrac53$。</p>
<p class="muted">"凑角"是标准操作：给 sin 的角凑成它自己，给 tan 的角凑成它自己，剩下系数相除。</p></div>
<div class="ex-box"><div class="ex-t">例 2（重要极限二）求 $\\lim\\limits_{x\\to\\infty}\\left(\\dfrac{x+2}{x}\\right)^{3x}$</div>
<p>改写成 $\\left(1+\\dfrac{2}{x}\\right)^{3x}$，令 $t=\\tfrac{x}{2}$：</p>
$$ \\left[\\left(1+\\frac{1}{t}\\right)^{t}\\right]^{6}\\to e^{6} $$
<p class="muted">$1^{\\infty}$ 三步法：①写成 $(1+\\square)^{\\triangle}$；②$\\square\\cdot\\triangle$ 求极限 $k$；③答案 $e^k$。</p></div>
<div class="ex-box"><div class="ex-t">例 3（夹逼）求 $\\lim\\limits_{n\\to\\infty}\\left(\\dfrac{1}{n^2+1}+\\dfrac{2}{n^2+2}+\\cdots+\\dfrac{n}{n^2+n}\\right)$</div>
<p>把每项分母统一放缩：$\\dfrac{k}{n^2+n}\\le\\dfrac{k}{n^2+k}\\le\\dfrac{k}{n^2}$，两端求和分别得 $\\dfrac{n(n+1)/2}{n^2+n}\\to\\tfrac12$ 与 $\\dfrac{n(n+1)/2}{n^2}\\to\\tfrac12$。夹出极限 $\\tfrac12$。</p></div>`],
['warn', '易错点',
`<p>• 重要极限一是 $\\dfrac{0}{0}$ 型且<b>角趋于 0</b>；$\\lim\\limits_{x\\to\\infty}\\dfrac{\\sin x}{x}=0$（无穷小×有界），两者别混。</p>
<p>• 夹逼的两端必须"极限相同"才夹得住，不相同说明用错了工具。</p>
<p>• $(1+\\square)^{\\triangle}$ 中底数部分必须<b>恰好</b>是 $(1+\\text{无穷小})$，是 $(1-\\tfrac1x)^x$ 时要提出负号换成 $\\left(1+\\tfrac{1}{-x}\\right)$ 再算。</p>`]
],
quiz: [
{id:'q1', q:'$\\lim\\limits_{x\\to 0}\\dfrac{\\tan 2x}{\\sin 5x}$ 等于？', opts:['$\\dfrac{2}{5}$', '$\\dfrac{5}{2}$', '1', '0'], ans:0, exp:'$\\tfrac{\\tan 2x}{\\sin 5x}\\approx\\tfrac{2x}{5x}=\\tfrac25$：tan、sin 在小角时都约等于角本身。'},
{id:'q2', q:'$\\lim\\limits_{n\\to\\infty}\\left(1+\\dfrac{3}{n}\\right)^{n}$ 等于？', opts:['$e$', '$e^3$', '$e^{\\frac13}$', '1'], ans:1, exp:'$1^\\infty$ 型：$\\square\\cdot\\triangle=\\tfrac3n\\cdot n=3$，答案 $e^3$。'},
{id:'q3', q:'$\\lim\\limits_{x\\to 0^+}\\left(\\dfrac{1}{\\sqrt x}\\cdot\\sin\\sqrt x\\right)$ 等于？', opts:['0', '1', '不存在', '$\\infty$'], ans:1, exp:'令 $t=\\sqrt x\\to0^+$，原式 $=\\dfrac{\\sin t}{t}\\to1$。换元后认出重要极限一。'}
]

},

'1-6': {
title: '无穷小的比较与等价替换',
secs: [
['why', '为什么学这一节',
`<p>等价无穷小替换是 $\\dfrac00$ 型极限的<b>第一快刀</b>：把 $\\sin x$ 换成 $x$，题目瞬间变简单。但"加减中能不能换"是每年最容易翻车的考点，本节会把安全规则讲透。</p>`],
['think', '直观理解',
`<p>当 $x\\to 0$，$\\sin x$、$\\tan x$、$\\ln(1+x)$、$e^x-1$ 这些家伙的行为都和 $x$ 几乎一样（差的是高阶小量）。所以在"只看主部"的乘除法里，可以互相顶替。</p>
<blockquote>比喻：比较两辆车谁快，看"主发动机"就行，行李轻重（高阶小量）不影响结论——这是乘除中替换安全的原理。<br>但两辆几乎一样快的车<b>相减</b>时，行李轻重就决定了胜负——这就是加减中替换危险的原因。</blockquote>`],
['def', '定义与公式',
`<p><b>① 必背等价链</b>（$x\\to 0$）：</p>
$$ x\\sim\\sin x\\sim\\tan x\\sim\\arcsin x\\sim\\arctan x\\sim\\ln(1+x)\\sim e^x-1 $$
$$ 1-\\cos x\\sim\\frac{x^2}{2},\\qquad (1+x)^a-1\\sim ax,\\qquad a^x-1\\sim x\\ln a $$
<p><b>② 替换规则：</b>乘除因子可以整体替换；<b>加减慎用</b>——只有当替换后不产生"主部相消"时才安全（常见安全情形：替换的量阶数不同）。</p>
<p><b>③ 幂次比较：</b>同一过程中 $x^k$ 与 $x^m$（$k>m$），低阶的 $x^m$ 是主角；无穷小相加减，"保留最低阶"。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（乘除替换）求 $\\lim\\limits_{x\\to0}\\dfrac{\\ln(1+2x)}{\\sin 3x}$</div>
<p>分子 $\\sim 2x$，分母 $\\sim 3x$，极限 $=\\dfrac23$。</p></div>
<div class="ex-box"><div class="ex-t">例 2（安全的加减）求 $\\lim\\limits_{x\\to0}\\dfrac{\\sin x - x^2\\cos\\tfrac1x}{x}$</div>
<p>拆两项：$\\dfrac{\\sin x}{x}\\to1$；$\\dfrac{x^2\\cos\\tfrac1x}{x}=x\\cos\\tfrac1x\\to0$（有界×无穷小）。结果 $=1$。</p>
<p class="muted">不是所有加减都要怕——能"拆开各算各"（拆分原则）时尽管拆。</p></div>
<div class="ex-box"><div class="ex-t">例 3（危险示范）为什么 $\\lim\\limits_{x\\to0}\\dfrac{\\tan x-\\sin x}{x^3}$ 不能把 tan、sin 都换成 $x$？</div>
<p>若都换成 $x$，分子变 $x-x=0$，错！正确做法：$\\tan x-\\sin x=\\tan x(1-\\cos x)\\sim x\\cdot\\tfrac{x^2}{2}=\\tfrac{x^3}{2}$，极限 $=\\tfrac12$。</p>
<p class="muted">主部相消后，"次主部"才是真正的主角——等价替换的精髓是比到"最后站着不消的那一项"。</p></div>`],
['warn', '易错点',
`<p>• 等价替换<b>只对因子</b>（乘除）绝对安全；加减中替换要验证不消主部，否则用泰勒（3-3 节）。</p>
<p>• $\\ln(1+x)\\sim x$ 要求整体是 $\\ln(1+\\square)$ 且 $\\square\\to0$，是 $\\ln(1+2x^2)$ 就等价 $2x^2$，别漏系数。</p>
<p>• 比较阶数时"谁快谁慢"用比值定阶，不要凭直觉喊"高阶"。</p>`]
],
quiz: [
{id:'q1', q:'$x\\to 0$ 时，$e^{3x}-1$ 的等价无穷小是？', opts:['$x$', '$3x$', '$e^{3x}$', '$3x-1$'], ans:1, exp:'$e^u-1\\sim u$（$u\\to0$），这里 $u=3x$，故等价于 $3x$。'},
{id:'q2', q:'$\\lim\\limits_{x\\to0}\\dfrac{1-\\cos x}{x\\sin x}$ 等于？', opts:['0', '$\\dfrac{1}{2}$', '1', '2'], ans:1, exp:'分子 $\\sim\\tfrac{x^2}{2}$，分母 $\\sim x\\cdot x=x^2$，比值 $\\tfrac12$。'},
{id:'q3', q:'计算 $\\lim\\limits_{x\\to0}\\dfrac{\\tan x - \\sin x}{x^3}$ 的正确路径是？', opts:['tan 与 sin 都替换为 x，得 0', '提取公因式后用 $1-\\cos x\\sim\\tfrac{x^2}{2}$，得 $\\tfrac12$', '用洛必达法则禁止，本题无极限', '替换为 $x-x=0$，极限为 0'], ans:1, exp:'加减中直接替换会导致主部相消。正确做法 $\\tan x-\\sin x=\\tan x(1-\\cos x)\\sim\\tfrac{x^3}{2}$。'}
]

},

'1-7': {
title: '函数的连续性与间断点',
secs: [
['why', '为什么学这一节',
`<p>"连续"是很多大定理的门票：闭区间连续函数有最值、零点定理能证方程有根、可导必连续。间断点分类更是考研选择题的固定考位——给一个函数找间断点并判断类型，几乎年年出现。</p>`],
['think', '直观理解',
`<p><b>连续 = 笔尖不离纸。</b>三点要求合成一句：$\\lim\\limits_{x\\to x_0}f(x)=f(x_0)$——极限值（大家靠近时趋于谁）等于函数值（它自己站在哪）。</p>
<blockquote>间断点分类的直观版：<br><b>可去间断</b>：人没到位，但"位置"存在（极限有，函数值不在或不同）——补个洞就能连续；<br><b>跳跃间断</b>：左右极限都在但不等——跨了一个台阶；<br><b>第二类</b>：至少一侧的极限根本不存在（无穷或振荡）——行为失控。</blockquote>`],
['def', '定义与公式',
`<p><b>① 连续定义：</b>$\\lim\\limits_{x\\to x_0}f(x)=f(x_0)$（含三层：有定义、极限存在、二者相等）。</p>
<p><b>② 间断点分类：</b></p>
<table style="width:100%;border-collapse:collapse;font-size:14px">
<tr style="background:#f1f4f9"><th style="padding:6px;border:1px solid #e3e8f0">类型</th><th style="padding:6px;border:1px solid #e3e8f0">特征</th></tr>
<tr><td style="padding:6px;border:1px solid #e3e8f0">可去间断（第一类）</td><td style="padding:6px;border:1px solid #e3e8f0">左右极限<b>存在且相等</b>，但 $\\neq f(x_0)$ 或 $f(x_0)$ 无定义</td></tr>
<tr><td style="padding:6px;border:1px solid #e3e8f0">跳跃间断（第一类）</td><td style="padding:6px;border:1px solid #e3e8f0">左右极限<b>都存在但不相等</b></td></tr>
<tr><td style="padding:6px;border:1px solid #e3e8f0">第二类间断</td><td style="padding:6px;border:1px solid #e3e8f0">至少一侧极限不存在（无穷间断、振荡间断）</td></tr>
</table>
<p><b>③ 连续函数运算：</b>连续函数的和差积商（分母非零）、复合仍连续；一切初等函数在其定义区间内连续。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（找间断点）讨论 $f(x)=\\dfrac{x}{\\sin x}$ 的间断点</div>
<p>分母为零处间断：$x=k\\pi$（$k$ 为整数）。</p>
<p>• $x=0$：$\\lim\\limits_{x\\to0}\\dfrac{x}{\\sin x}=1$，极限存在（函数无定义）→ <b>可去间断点</b>。</p>
<p>• $x=k\\pi\\ (k\\neq0)$：$\\lim\\limits_{x\\to k\\pi}\\dfrac{x}{\\sin x}=\\infty$ → <b>无穷间断点</b>（第二类）。</p></div>
<div class="ex-box"><div class="ex-t">例 2（含参连续）设 $f(x)=\\begin{cases}e^x, & x<0\\\\ a+x, & x\\ge0\\end{cases}$ 在 $x=0$ 连续，求 $a$</div>
<p>左极限 $=e^0=1$，右极限 $=a$，函数值 $=a$。连续要求 $a=1$。</p></div>`],
['warn', '易错点',
`<p>• 判断类型<b>必须先算左右极限</b>，凭图像感觉猜类型容易栽在振荡类（$\\sin\\tfrac1x$ 在 $x\\to0$ 是振荡间断）。</p>
<p>• 可去间断点"补定义"后连续，但题目若不要求补，函数仍是间断的。</p>
<p>• 初等函数"定义区间内连续"——$\\sqrt{\\sin x}$ 之类先求定义域，别上来就套结论。</p>`]
],
quiz: [
{id:'q1', q:'$x=0$ 是 $f(x)=\\dfrac{\\sin x}{x}$ 的什么间断点？', opts:['可去间断点', '跳跃间断点', '无穷间断点', '振荡间断点'], ans:0, exp:'$\\lim\\limits_{x\\to0}\\tfrac{\\sin x}{x}=1$ 存在但函数在 0 处无定义，属可去间断点（补充定义 $f(0)=1$ 即连续）。'},
{id:'q2', q:'$x=0$ 是 $f(x)=e^{1/x}$ 的什么间断点？', opts:['可去', '跳跃', '第二类间断点', '连续点'], ans:2, exp:'$x\\to0^+$ 时 $e^{1/x}\\to+\\infty$，右极限不存在，为第二类（无穷）间断点。'},
{id:'q3', q:'设 $f(x)=\\begin{cases}x^2+a, & x<1\\\\ 2x, & x\\ge1\\end{cases}$ 在 $x=1$ 处连续，则 $a=$？', opts:['1', '2', '3', '-1'], ans:0, exp:'左极限 $1+a$，右极限 2，连续要求 $1+a=2$，即 $a=1$。'}
]

},

'1-8': {
title: '闭区间上连续函数的性质',
secs: [
['why', '为什么学这一节',
`<p>这节内容少但"证存在"的题全靠它：<b>零点定理</b>证方程有根、<b>介值定理</b>取中间值、最值定理保证闭区间连续函数"有界且取得到最大最小"。考研多以"证明某方程在区间内有根"的形式出现，是证明题里的送分套路。</p>`],
['think', '直观理解',
`<p><b>零点定理 = 过山车必穿地面。</b>山谷在地下（$f(a)<0$），山顶在地上（$f(b)>0$），轨道又不许断（连续），中间必然有某处恰好穿过地面（$f(\\xi)=0$）。</p>
<blockquote>注意两个前提缺一不可：<b>闭区间</b> + <b>连续</b>。开区间或函数有断点，山车就可能"瞬移"过去不碰线。</blockquote>`],
['def', '定义与公式',
`<p><b>① 最值定理：</b>$f$ 在 $[a,b]$ 上连续，则必有最大值 $M$ 与最小值 $m$（从而有界）。</p>
<p><b>② 零点定理：</b>$f$ 在 $[a,b]$ 连续且 $f(a)\\cdot f(b)<0$，则存在 $\\xi\\in(a,b)$ 使 $f(\\xi)=0$。</p>
<p><b>③ 介值定理：</b>$f$ 在 $[a,b]$ 连续，$m\\le\\mu\\le M$，则存在 $\\xi\\in[a,b]$ 使 $f(\\xi)=\\mu$。它与零点定理相通（对 $F(x)=f(x)-\\mu$ 用零点定理）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（证根的存在）证明 $x^3-4x^2+1=0$ 在 $(0,1)$ 内有根</div>
<p>令 $f(x)=x^3-4x^2+1$，它在 $[0,1]$ 连续。$f(0)=1>0$，$f(1)=1-4+1=-2<0$。</p>
<p>由零点定理，存在 $\\xi\\in(0,1)$ 使 $f(\\xi)=0$。∎</p>
<p class="muted">套路三步：构造函数 → 验证连续与端点异号 → 引用零点定理。</p></div>
<div class="ex-box"><div class="ex-t">例 2（介值）$f$ 在 $[0,2]$ 连续，$f(0)=f(2)=1$，证明存在 $\\xi$ 使 $f(\\xi)=\\tfrac12$</div>
<p>$\\tfrac12$ 介于 1 与 1 之间？不能直接用介值定理（最大最小值未知）。构造 $g(x)=f(x)-\\tfrac12$：$g(0)=g(2)=\\tfrac12>0$……此时需更多条件——本题完整版通常给 $f(1)=0$ 等。这里体会：介值定理必须知道"值 $\\mu$ 落在两函数值之间"才能用。</p>
<p class="muted">真题常配 $f(0)f(2)<0$ 或给出第三个点的值，让端点异号。</p></div>`],
['warn', '易错点',
`<p>• 零点定理给的是<b>存在性</b>，不给出根的位置和个数；"有且仅有一个"需要单调性加成。</p>
<p>• 开区间结论失效：$f(x)=\\tfrac1x$ 在 $(0,1)$ 连续但无界——"闭区间"不能省。</p>
<p>• 构造辅助函数时目标明确：要证 $f(x)=g(x)$ 有解，就构造 $F=f-g$ 令其变号。</p>`]
],
quiz: [
{id:'q1', q:'方程 $x^5+x-1=0$ 在 $(0,1)$ 内根的情况？', opts:['无根', '至少有一个根', '恰好两个根', '无法判断'], ans:1, exp:'$f(0)=-1<0$，$f(1)=1>0$，$f$ 连续，零点定理保证至少一个根。'},
{id:'q2', q:'零点定理的使用条件是？', opts:['闭区间连续且端点函数值异号', '只要连续', '只要异号', '开区间连续即可'], ans:0, exp:'两个条件缺一不可：闭区间上连续 + $f(a)f(b)<0$。'},
{id:'q3', q:'$f(x)$ 在 $[a,b]$ 连续，$M$、$m$ 为最大最小值，$\\mu$ 满足 $m\\le\\mu\\le M$，则？', opts:['$f(\\xi)=\\mu$ 必有解（介值定理）', '无解', '仅当 $\\mu$ 是最值时有解', '结论只在开区间成立'], ans:0, exp:'这正是介值定理：介于最小最大之间的任何值都会被取到。'}
]

}

}
};
