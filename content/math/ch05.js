/* ===== 数学 · 第5章 定积分 · 反常积分 · 应用 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['math/ch05'] = {

lessons: {

'5-1': {
title: '定积分的概念与性质',
secs: [
['why', '为什么学这一节',
`<p>定积分是"无穷细分再累加"的思想工具：面积、路程、做功全归它管。数二的应用题（旋转体、面积）以它为理论根基，概念题（用定义求极限、比较大小）也常从定义出发出题。</p>`],
['think', '直观理解',
`<p><b>求曲边梯形面积：</b>把 $[a,b]$ 切成许多窄条，每条用"矩形高 $f(\\xi_i)$ × 宽 $\\Delta x_i$"近似，再加起来；条越窄近似越好，无限窄时就是精确面积：</p>
$$ \\int_a^b f(x)dx=\\lim_{\\lambda\\to0}\\sum_{i=1}^{n}f(\\xi_i)\\Delta x_i $$
<blockquote>定义的直接应用：求 $\\lim\\limits_{n\\to\\infty}\\dfrac{1}{n}\\sum\\limits_{i=1}^{n}f\\left(\\tfrac{i}{n}\\right)=\\displaystyle\\int_0^1 f(x)dx$——"和式极限认成积分"是概念题标准套路。</blockquote>`],
['def', '定义与公式',
`<p><b>① 定积分定义：</b>分割、取点、求和、取极限；极限存在称可积。$\\displaystyle\\int_a^b f(x)dx$ 与分割方式、取点方式无关。</p>
<p><b>② 可积性常识：</b>闭区间连续或单调（或有界且只有有限个间断点）必可积。</p>
<p><b>③ 重要性质：</b></p>
$$ \\int_a^b[\\alpha f+\\beta g]dx=\\alpha\\int_a^b fdx+\\beta\\int_a^b gdx $$
$$ \\int_a^b f dx=\\int_a^c fdx+\\int_c^b fdx\\ (\\text{区间可加}) $$
$$ f\\le g \\Rightarrow \\int_a^b f\\le\\int_a^b g\\ (\\text{保序}),\\qquad m(b-a)\\le\\int_a^b f\\le M(b-a)\\ (\\text{估值}) $$
<p><b>④ 积分中值定理：</b>$f$ 在 $[a,b]$ 连续，存在 $\\xi\\in[a,b]$ 使 $\\displaystyle\\int_a^b f dx=f(\\xi)(b-a)$——平均高度 × 宽度 = 面积。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（定义求极限）求 $\\lim\\limits_{n\\to\\infty}\\left(\\dfrac{1}{n+1}+\\dfrac{1}{n+2}+\\cdots+\\dfrac{1}{2n}\\right)$</div>
<p>提取 $\\tfrac1n$：$\\dfrac1n\\sum\\limits_{i=1}^{n}\\dfrac{1}{1+\\tfrac{i}{n}}=\\dfrac1n\\sum f\\left(\\tfrac in\\right)$，其中 $f(x)=\\tfrac{1}{1+x}$。</p>
$$ =\\int_0^1\\frac{dx}{1+x}=\\ln2 $$
</div>
<div class="ex-box"><div class="ex-t">例 2（比较大小）不计算，比较 $\\displaystyle\\int_0^{\\pi}\\sin x\\,dx$ 与 $\\displaystyle\\int_0^{\\pi}\\sin^2 x\\,dx$</div>
<p>$(0,\\pi)$ 内 $0<\\sin x<1$，故 $\\sin x>\\sin^2 x$，由保序性前者更大。</p></div>`],
['warn', '易错点',
`<p>• 定积分是<b>数</b>（与积分变量字母无关）：$\\displaystyle\\int_0^1 f(x)dx=\\displaystyle\\int_0^1 f(t)dt$。</p>
<p>• 交换上下限变号：$\\displaystyle\\int_b^a fdx=-\\displaystyle\\int_a^b fdx$。</p>
<p>• 积分中值定理的 $\\xi$ 在闭区间内（教材版本），不保证在中点——别想当然取中点算。</p>`]
],
quiz: [
{id:'q1', q:'$\\lim\\limits_{n\\to\\infty}\\dfrac1n\\sum\\limits_{i=1}^{n}\\dfrac{i}{n}$ 化为定积分是？', opts:['$\\displaystyle\\int_0^1 x\\,dx$', '$\\displaystyle\\int_1^2 x\\,dx$', '$\\displaystyle\\int_0^1 \\tfrac1x dx$', '$\\displaystyle\\int_0^n x\\,dx$'], ans:0, exp:'$\\tfrac in$ 是 $n$ 等分点，和式极限 $=\\int_0^1 xdx=\\tfrac12$。认准"$\\tfrac1n$ 提取 + $\\tfrac in$ 入函数"。'},
{id:'q2', q:'$\\displaystyle\\int_{-1}^{1}x^2dx$ 与 $\\displaystyle\\int_{-1}^{1}x^4dx$ 的大小？', opts:['前者大', '后者大', '相等', '无法比较'], ans:0, exp:'$|x|\\le1$ 时 $x^2\\ge x^4$，由保序性前者不小于后者（端点相等不影响积分更大概率）。'},
{id:'q3', q:'积分中值定理表明：连续函数在 $[a,b]$ 上的定积分等于？', opts:['两端点函数值之差', '$f(a)(b-a)$', '某点函数值 $f(\\xi)\\times(b-a)$', '最大值×区间长'], ans:2, exp:'存在 $\\xi$ 使积分 = 平均高度 × 宽度。'}
]

},

'5-2': {
title: '变限积分与牛顿—莱布尼茨公式',
secs: [
['why', '为什么学这一节',
`<p>变限积分 $\\displaystyle\\int_a^x f(t)dt$ 是连接积分与微分的关键枢纽：对它求导即得被积函数。考研固定题型：求含变限积分的极限、导数、判断奇偶性；牛顿-莱布尼茨公式则是一切定积分计算的总闸门。</p>`],
['think', '直观理解',
`<p><b>变限积分是"累积量"：</b>$F(x)=\\displaystyle\\int_a^x f(t)dt$ 表示从 $a$ 到 $x$ 累积的面积。$x$ 往右挪一点点，面积增加一个"高 $f(x)$ 宽 $dx$"的小条——所以 $F\'(x)=f(x)$。</p>
<blockquote>这就是微积分基本定理的直觉：<b>累积的速率就是当前的高度。</b>反过来 $\\displaystyle\\int_a^b f=F(b)-F(a)$：总面积 = 原函数的"里程表读数差"。</blockquote>`],
['def', '定义与公式',
`<p><b>① 变限积分求导（核心公式）：</b></p>
$$ \\frac{d}{dx}\\int_{\\varphi(x)}^{\\psi(x)}f(t)dt = f[\\psi(x)]\\psi\'(x) - f[\\varphi(x)]\\varphi\'(x) $$
<p class="muted">上代 $\\psi$ 乘其导，下代 $\\varphi$ 乘其导，上减下。</p>
<p><b>② 牛顿—莱布尼茨公式：</b>$f$ 在 $[a,b]$ 连续，$F$ 为其原函数，则</p>
$$ \\int_a^b f(x)dx=F(b)-F(a) $$
<p><b>③ 重要奇偶性（记结论）：</b>$f$ 为奇函数 $\\Rightarrow$ $\\displaystyle\\int_a^x f(t)dt$ 为偶函数；$f$ 为偶函数 $\\Rightarrow$ $\\displaystyle\\int_0^x f(t)dt$ 为奇函数。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（求导）设 $F(x)=\\displaystyle\\int_0^{x^2}\\sin t\\,dt$，求 $F\'(x)$</div>
<p>上界 $x^2$ 乘其导 $2x$：</p>
$$ F\'(x)=\\sin(x^2)\\cdot 2x $$
</div>
<div class="ex-box"><div class="ex-t">例 2（求极限）求 $\\lim\\limits_{x\\to0}\\dfrac{\\displaystyle\\int_0^{x}\\cos t^2\\,dt}{x}$</div>
<p>$\\dfrac00$ 型，洛必达（变限积分求导）：$\\lim\\dfrac{\\cos x^2}{1}=1$。</p></div>
<div class="ex-box"><div class="ex-t">例 3（N-L 公式）求 $\\displaystyle\\int_0^{\\pi/2}\\cos x\\,dx$</div>
$$ \\sin x\\Big|_0^{\\pi/2}=\\sin\\frac{\\pi}{2}-\\sin 0=1 $$
</div>`],
['warn', '易错点',
`<p>• 变限积分求导要求<b>被积函数连续</b>（或可积但有界）；含参量 $x$ 混进被积函数时（如 $\\int_0^x xf(t)dt$）必须先拆出来。</p>
<p>• 上界是复合函数（$x^2$、$\\tfrac1x$）时，链式法则的乘积因子必写。</p>
<p>• N-L 公式要求<b>原函数存在且可算</b>；不要求"原函数初等可表"时别死磕不定积分，考虑换元对称性。</p>`]
],
quiz: [
{id:'q1', q:'$F(x)=\\displaystyle\\int_0^{x}t e^{t^2}dt$，则 $F\'(x)$ 等于？', opts:['$xe^{x^2}$', '$e^{x^2}$', '$2xe^{x^2}$', '$x e^{x^2}\\cdot x$'], ans:0, exp:'直接代公式：被积函数把 $t$ 换成 $x$，即 $xe^{x^2}$。'},
{id:'q2', q:'$\\displaystyle\\int_0^{\\ln2} e^x dx$ 等于？', opts:['2', '$e^2$', '1', '$e^2-1$'], ans:2, exp:'$e^x\\big|_0^{\\ln2}=2-1=1$。'},
{id:'q3', q:'$f(x)$ 为奇函数且连续，$F(x)=\\displaystyle\\int_0^{x}f(t)dt$ 是？', opts:['奇函数', '偶函数', '非奇非偶', '取决于 $f$'], ans:1, exp:'奇函数的原函数（从 0 积）是偶函数：$F(-x)=F(x)$。这是常考结论。'}
]

},

'5-3': {
title: '定积分的换元与分部积分法',
secs: [
['why', '为什么学这一节',
`<p>定积分的不定积分技巧全套照搬，但多两件利器：<b>换元同时换限</b>（不必回代）与<b>对称性秒算</b>（奇函数区间积分为零、周期函数平移）。历年真题中大量定积分靠"先看对称"一步出答案。</p>`],
['think', '直观理解',
`<p><b>奇函数对称区间 = 左右面积抵消：</b>$\\displaystyle\\int_{-a}^{a}$ 奇函数 $=0$（左边负面积恰好抵消右边正面积）；偶函数则只剩一半再翻倍。</p>
<blockquote><b>换元换限：</b>$x=a\\sin t$ 后上下限跟着 $t$ 走，算出 $t$ 的结果直接代限，不用换回 $x$——这是定积分比不定积分省事的地方。</blockquote>`],
['def', '定义与公式',
`<p><b>① 定积分换元：</b>$\\displaystyle\\int_a^b f(x)dx\\xlongequal{x=\\varphi(t)}\\int_\\alpha^\\beta f[\\varphi(t)]\\varphi\'(t)dt$（限 $\\alpha=\\varphi^{-1}(a),\\beta=\\varphi^{-1}(b)$）。</p>
<p><b>② 定积分分部：</b>$\\displaystyle\\int_a^b u\\,dv=uv\\Big|_a^b-\\displaystyle\\int_a^b v\\,du$（边界项随时算）。</p>
<p><b>③ 必背对称结论：</b></p>
$$ \\int_{-a}^{a}f(x)dx=\\begin{cases}2\\displaystyle\\int_0^a f(x)dx, & f\\text{ 偶}\\\\ 0, & f\\text{ 奇}\\end{cases} $$
$$ \\int_0^{\\frac{\\pi}{2}}\\sin^n x\\,dx=\\int_0^{\\frac{\\pi}{2}}\\cos^n x\\,dx=\\frac{(n-1)!!}{n!!}\\cdot\\begin{cases}\\dfrac{\\pi}{2}, & n\\text{ 偶}\\\\ 1, & n\\text{ 奇}\\end{cases} $$
<p class="muted">双阶乘公式（华里士公式）在旋转体、弧长里也常用，记结论省时间。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（对称性）求 $\\displaystyle\\int_{-1}^{1}\\dfrac{x^3+1}{x^2+1}dx$</div>
<p>拆开：$\\dfrac{x^3}{x^2+1}$ 是奇函数积分为 0；$\\dfrac{1}{x^2+1}$ 是偶函数。</p>
$$ =2\\int_0^1\\frac{dx}{1+x^2}=2\\arctan x\\Big|_0^1=\\frac{\\pi}{2} $$
</div>
<div class="ex-box"><div class="ex-t">例 2（换元换限）求 $\\displaystyle\\int_0^{4}\\dfrac{dx}{1+\\sqrt x}$</div>
<p>令 $t=\\sqrt x$，$x=t^2$，$dx=2t\\,dt$；限：$x=0\\to t=0$，$x=4\\to t=2$。</p>
$$ \\int_0^{2}\\frac{2t}{1+t}dt=2\\int_0^2\\left(1-\\frac{1}{1+t}\\right)dt=2\\left[t-\\ln(1+t)\\right]_0^2=4-2\\ln3 $$
</div>
<div class="ex-box"><div class="ex-t">例 3（双阶乘）求 $\\displaystyle\\int_0^{\\frac{\\pi}{2}}\\sin^4 x\\,dx$</div>
$$ \\frac{3!!}{4!!}\\cdot\\frac{\\pi}{2}=\\frac{3\\cdot1}{4\\cdot2}\\cdot\\frac{\\pi}{2}=\\frac{3\\pi}{16} $$
</div>`],
['warn', '易错点',
`<p>• 换元后<b>必须换限</b>；不换限又不回代是最经典的整题报废。</p>
<p>• 对称性判断的是<b>整个被积函数</b>：$\\tfrac{x^3+1}{x^2+1}$ 不能整函数判奇偶，要拆开分别判。</p>
<p>• 双阶乘公式 $n$ 为偶才带 $\\tfrac{\\pi}{2}$ 因子，奇数结尾是 1。</p>`]
],
quiz: [
{id:'q1', q:'$\\displaystyle\\int_{-2}^{2} x^3\\cos x\\,dx$ 等于？', opts:['$4\\cos2$', '0', '$2\\int_0^2x^3\\cos x dx$', '$8$'], ans:1, exp:'$x^3\\cos x$ 是奇函数，对称区间积分为 0。'},
{id:'q2', q:'$\\displaystyle\\int_0^{\\frac{\\pi}{2}}\\cos^3 x\\,dx$ 等于？', opts:['$\\dfrac{\\pi}{4}$', '$\\dfrac{2}{3}$', '$\\dfrac{\\pi}{2}$', '1'], ans:1, exp:'$n=3$ 为奇：$\\tfrac{2!!}{3!!}=\\tfrac{2}{3}$。'},
{id:'q3', q:'$\\displaystyle\\int_0^{1}\\dfrac{dx}{1+\\sqrt x}$ 用 $t=\\sqrt x$ 换元后，新积分限是？', opts:['0 到 1', '0 到 $\\tfrac12$', '1 到 2', '0 到 2'], ans:0, exp:'$x=0\\to t=0$；$x=1\\to t=1$。换元即换限。'}
]

},

'5-4': {
title: '反常积分',
secs: [
['why', '为什么学这一节',
`<p>反常积分把积分推向无穷（无穷区间）与无界（瑕点）。数二考两件事：计算（定义转化 + 极限）与<b>敛散性判断</b>——"该发散的你却算出个数"是命题人最爱设的坑。</p>`],
['think', '直观理解',
`<p><b>无穷区间：</b>$\\displaystyle\\int_1^{+\\infty}\\dfrac{1}{x^2}dx$ 有意义吗？先算到 $b$：$1-\\tfrac1b\\to1$——面积越铺越窄，总和收敛到 1。而 $\\displaystyle\\int_1^{+\\infty}\\dfrac1x dx$：$\\ln b\\to\\infty$，发散。</p>
<blockquote>反常积分的一切都建立在"<b>先正常积分，再取极限</b>"上。极限不存在（含 $\\infty$），就说它发散。</blockquote>`],
['def', '定义与公式',
`<p><b>① 无穷区间：</b></p>
$$ \\int_a^{+\\infty}f(x)dx=\\lim_{b\\to+\\infty}\\int_a^b f(x)dx\\ (\\text{存在则收敛}) $$
<p><b>② 瑕积分</b>（$f$ 在 $x_0$ 附近无界）：$\\displaystyle\\int_a^b f dx=\\lim_{\\varepsilon\\to0^+}\\int_a^{b-\\varepsilon}f dx$。</p>
<p><b>③ 重要敛散结论（$p$ 积分，直接用）：</b></p>
$$ \\int_1^{+\\infty}\\frac{1}{x^p}dx\\ \\begin{cases}\\text{收敛} & p>1\\\\ \\text{发散} & p\\le1\\end{cases}\\qquad \\int_0^{1}\\frac{1}{x^p}dx\\ \\begin{cases}\\text{收敛} & p<1\\\\ \\text{发散} & p\\ge1\\end{cases} $$
<p class="muted">注意方向相反：无穷远"衰减快才收敛"，瑕点附近"爆炸慢才收敛"。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 计算 $\\displaystyle\\int_0^{+\\infty}xe^{-x}dx$</div>
<p>分部：$\\displaystyle\\int xe^{-x}dx=-(x+1)e^{-x}+C$。</p>
$$ \\Big[-(x+1)e^{-x}\\Big]_0^{+\\infty}=0-(-1)=1 $$
<p class="muted">$x\\to+\\infty$ 时 $(x+1)e^{-x}\\to0$（指数压倒幂）。</p></div>
<div class="ex-box"><div class="ex-t">例 2 判断 $\\displaystyle\\int_1^{+\\infty}\\dfrac{dx}{x\\sqrt{\\ln x}}$ 的敛散性</div>
<p>令 $u=\\ln x$：积分 $=\\displaystyle\\int_0^{+\\infty}\\dfrac{du}{\\sqrt u}$，这是 $\\left[0,+\\infty\\right)$ 上的 $p=\\tfrac12$ 瑕积分（$u=0$ 处）与无穷积分，$p<1$ 发散 → <b>发散</b>。</p></div>`],
['warn', '易错点',
`<p>• 瑕点在区间<b>内部</b>时（如 $\\displaystyle\\int_0^2\\tfrac{dx}{x-1}$），必须从瑕点拆成两段，<b>两段都收敛才收敛</b>。</p>
<p>• 看到 $\\infty$ 或分母可为零，第一反应判型：是反常积分就别直接套 N-L 公式。</p>
<p>• $p$ 积分结论可直接引用，比较判敛时找"参照物"最快。</p>`]
],
quiz: [
{id:'q1', q:'$\\displaystyle\\int_1^{+\\infty}\\dfrac{1}{x^3}dx$ 等于？', opts:['发散', '$\\dfrac{1}{2}$', '$\\dfrac{1}{3}$', '1'], ans:1, exp:'$p=3>1$ 收敛；$\\left[-\\tfrac{1}{2x^2}\\right]_1^{+\\infty}=0-(-\\tfrac12)=\\tfrac12$。'},
{id:'q2', q:'$\\displaystyle\\int_0^{1}\\dfrac{dx}{\\sqrt{x}}$ 是？', opts:['发散的瑕积分', '收敛，值为 2', '收敛，值为 $\\tfrac12$', '普通定积分'], ans:1, exp:'$x=0$ 是瑕点，$p=\\tfrac12<1$ 收敛；$2\\sqrt x\\big|_0^1=2$。'},
{id:'q3', q:'$\\displaystyle\\int_{-1}^{1}\\dfrac{dx}{x^2}$ 的情况是？', opts:['等于 $-2$', '等于 2', '发散（瑕点 $x=0$ 在区间内，拆开后发散）', '等于 0'], ans:2, exp:'$x=0$ 处被积函数无界，拆成 $[-1,0)$ 与 $(0,1]$，每段 $\\ge p=2\\ge1$ 发散，故发散。直接算得 $-2$ 是忽略了瑕点的经典错误。'}
]

},

'5-5': {
title: '定积分的应用：面积、旋转体、弧长',
secs: [
['why', '为什么学这一节',
`<p>几何应用是数二的"送分区 + 区分度区"：选填考面积小题，解答题考旋转体大题，公式要形成条件反射。核心思想只有一个：<b>微元法</b>——切薄片，算微元，积分累加。</p>`],
['think', '直观理解',
`<p><b>微元法三步：</b>① 切薄片：在 $[x,x+dx]$ 上把问题"拉直"近似；② 写微元：$dA=$ 高×宽，$dV=$ 底面积×高；③ 积分累加。</p>
<blockquote>旋转体体积的两种切法：<b>圆盘法</b>（垂直于轴切片，$dV=\\pi y^2 dx$，切出来是实心圆片）；<b>柱壳法</b>（平行于轴剥壳，$dV=2\\pi x y\\,dx$，像剥洋葱皮）。</blockquote>`],
['def', '定义与公式',
`<p><b>① 平面图形面积：</b></p>
$$ S=\\int_a^b\\big[f(x)-g(x)\\big]dx\\ (f\\text{ 在上}),\\qquad S=\\int_\\alpha^\\beta\\tfrac12 r^2(\\theta)\\,d\\theta\\ (\\text{极坐标}) $$
<p><b>② 旋转体体积：</b>曲线 $y=f(x)\\ (\\ge0)$、$x\\in[a,b]$ 绕 <b>x 轴</b>：</p>
$$ V_x=\\pi\\int_a^b f^2(x)dx $$
<p>绕 <b>y 轴</b>（柱壳法）：</p>
$$ V_y=2\\pi\\int_a^b x f(x)dx $$
<p><b>③ 弧长：</b></p>
$$ s=\\int_a^b\\sqrt{1+[f\'(x)]^2}\\,dx $$
<p class="muted">旋转曲面面积 $S=2\\pi\\displaystyle\\int_a^b f(x)\\sqrt{1+[f\']^2}dx$（数二大纲内，偶尔考）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（面积）求 $y=x^2$ 与 $y=2x$ 围成的面积</div>
<p>交点：$x^2=2x\\Rightarrow x=0,2$。在 $(0,2)$ 上直线在上：</p>
$$ S=\\int_0^2(2x-x^2)dx=\\left[x^2-\\frac{x^3}{3}\\right]_0^2=4-\\frac83=\\frac43 $$
</div>
<div class="ex-box"><div class="ex-t">例 2（旋转体）求 $y=x^2$、$x\\in[0,1]$ 绕 $x$ 轴旋转的体积</div>
$$ V_x=\\pi\\int_0^1 x^4 dx=\\frac{\\pi}{5} $$
<p>绕 $y$ 轴（柱壳）：$V_y=2\\pi\\displaystyle\\int_0^1 x\\cdot x^2 dx=2\\pi\\cdot\\tfrac14=\\tfrac{\\pi}{2}$。</p></div>
<div class="ex-box"><div class="ex-t">例 3（弧长）求 $y=\\tfrac23 x^{3/2}$ 在 $[0,3]$ 上的弧长</div>
<p>$y\'=x^{1/2}$，$1+(y\')^2=1+x$：</p>
$$ s=\\int_0^3\\sqrt{1+x}\\,dx=\\frac23(1+x)^{3/2}\\Big|_0^3=\\frac23\\left(8-1\\right)=\\frac{14}{3} $$
<p class="muted">弧长题的函数通常设计成 $1+[y\']^2$ 恰好是完全平方式或易积式。</p></div>`],
['warn', '易错点',
`<p>• 面积公式里"<b>上减下</b>"，被积函数为负时会出现负面积——先画图定上下，必要时分段。</p>
<p>• 绕 $y$ 轴用柱壳法时被积的是 $x\\cdot f(x)$，系数 $2\\pi$ 别丢；也可解出 $x=\\varphi(y)$ 用圆盘法（对 $y$ 积）。</p>
<p>• 弧长公式里的 $1+[f\']^2$ 开根号，不能漏"1"。</p>`]
],
quiz: [
{id:'q1', q:'由 $y=x$ 与 $y=x^2$ 围成图形的面积是？', opts:['$\\dfrac{1}{6}$', '$\\dfrac{1}{3}$', '$\\dfrac{1}{2}$', '1'], ans:0, exp:'交点 $(0,0),(1,1)$；$S=\\int_0^1(x-x^2)dx=\\tfrac12-\\tfrac13=\\tfrac16$。'},
{id:'q2', q:'$y=\\sqrt x$、$x\\in[0,4]$ 绕 $x$ 轴旋转所得体积为？', opts:['$8\\pi$', '$4\\pi$', '$16\\pi$', '$2\\pi$'], ans:0, exp:'$V=\\pi\\int_0^4 x\\,dx=8\\pi$。'},
{id:'q3', q:'$y=x$、$x\\in[0,1]$ 绕 $y$ 轴旋转（用柱壳法），$dV$ 为？', opts:['$\\pi x^2 dx$', '$2\\pi x\\cdot x\\,dx$', '$2\\pi y\\,dy$', '$x\\,dx$'], ans:1, exp:'柱壳微元 = 周长 × 高 × 厚 $=2\\pi x\\cdot f(x)\\,dx=2\\pi x^2dx$。'}
]

}

}
};
