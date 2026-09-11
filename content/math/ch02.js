/* ===== 数学 · 第2章 导数与微分 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['math/ch02'] = {

lessons: {

'2-1': {
title: '导数的概念与几何意义',
secs: [
['why', '为什么学这一节',
`<p>导数是整个微积分的第二个支柱：所有"变化率"问题（速度、成本增速、边际）都是导数。考研中"用定义求导/判断可导"几乎年年出现，尤其"<b>分段函数在分界点是否可导</b>"，只会套公式不会用定义的人必丢分。</p>`],
['think', '直观理解',
`<p><b>导数 = 瞬时速度 = 切线斜率。</b>平均变化率 $\\dfrac{\\Delta y}{\\Delta x}$ 是割线斜率；让 $\\Delta x\\to 0$，割线绕着切点转动，极限位置就是<b>切线</b>，斜率就是<b>导数</b>。</p>
<blockquote>小车位移 $s(t)$：平均速度 $\\tfrac{\\Delta s}{\\Delta t}$ 是"这一段总共跑多快"；$\\Delta t\\to0$ 后就是"这一瞬间跑多快"。</blockquote>`],
['def', '定义与公式',
`<p><b>① 导数定义（两种等价形式，都要会默写）：</b></p>
$$ f\'(x_0)=\\lim_{\\Delta x\\to 0}\\frac{f(x_0+\\Delta x)-f(x_0)}{\\Delta x} = \\lim_{x\\to x_0}\\frac{f(x)-f(x_0)}{x-x_0} $$
<p><b>② 几何意义：</b>$f\'(x_0)$ 是曲线在点 $(x_0, f(x_0))$ 处切线斜率。切线方程为 $y-f(x_0)=f\'(x_0)(x-x_0)$。当 $f\'(x_0)\\neq0$ 时，法线斜率为 $-\\dfrac{1}{f\'(x_0)}$；当 $f\'(x_0)=0$ 时，切线水平，法线是铅直直线 $x=x_0$。</p>
<p><b>③ 可导必连续；连续不一定可导</b>（反例 $|x|$ 在 0 处连续但不可导）。</p>
<p><b>④ 单侧导数：</b>$f\'_+(x_0)=\\lim\\limits_{\\Delta x\\to0^+}\\dfrac{f(x_0+\\Delta x)-f(x_0)}{\\Delta x}$。可导 $\\iff$ 左右导数存在且相等。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（定义求导）用定义求 $f(x)=x^2$ 在 $x_0$ 处的导数</div>
$$ f\'(x_0)=\\lim_{\\Delta x\\to0}\\frac{(x_0+\\Delta x)^2-x_0^2}{\\Delta x}=\\lim\\frac{2x_0\\Delta x+\\Delta x^2}{\\Delta x}=2x_0 $$
</div>
<div class="ex-box"><div class="ex-t">例 2（经典题）设 $f\'(x_0)=2$，求 $\\lim\\limits_{h\\to0}\\dfrac{f(x_0+2h)-f(x_0-h)}{h}$</div>
<p>拆成两个标准形：</p>
$$ \\lim\\frac{f(x_0+2h)-f(x_0)}{h} - \\lim\\frac{f(x_0-h)-f(x_0)}{h} = 2f\'(x_0) + f\'(x_0) = 6 $$
<p class="muted">凑定义式：把增量凑成 $\\tfrac{f(x_0+\\square)-f(x_0)}{\\square}\\to f\'(x_0)$，系数留在外面。</p></div>
<div class="ex-box"><div class="ex-t">例 3（可导性）$f(x)=x|x|$ 在 $x=0$ 处是否可导？</div>
<p>$f\'(0)=\\lim\\limits_{h\\to0}\\dfrac{h|h|-0}{h}=\\lim|h|=0$，存在，可导且 $f\'(0)=0$。</p>
<p class="muted">对比 $|x|$ 本身：左右导数分别为 $-1$ 与 $+1$，不等 → 不可导，图像上有"尖角"。</p></div>`],
['warn', '易错点',
`<p>• 定义式中分母的增量与分子增量必须<b>完全一致</b>：$\\tfrac{f(x_0+3h)-f(x_0)}{h}\\to3f\'(x_0)$，别漏系数。</p>
<p>• "$f\'(x_0)$ 存在"与"$\\lim\\limits_{x\\to x_0}f\'(x)$ 存在"是两回事，后者是导函数的极限，不能拿来判可导。</p>
<p>• 切线可能在切点与曲线相交（不是"只碰一下"）；法线斜率是负倒数，且仅在 $f\'(x_0)\\neq0$ 时成立。</p>`]
],
quiz: [
{id:'q1', q:'设 $f\'(x_0)=3$，则 $\\lim\\limits_{h\\to0}\\dfrac{f(x_0+h)-f(x_0)}{2h}$ 等于？', opts:['3', '$\\dfrac{3}{2}$', '6', '0'], ans:1, exp:'分母多了个 2：$\\tfrac{1}{2}\\cdot\\tfrac{f(x_0+h)-f(x_0)}{h}\\to\\tfrac12\\cdot3=\\tfrac32$。'},
{id:'q2', q:'函数 $f(x)=|x|$ 在 $x=0$ 处？', opts:['可导且 $f\'(0)=0$', '连续且可导', '连续但不可导', '不连续'], ans:2, exp:'左右导数 $\\pm1$ 不相等，不可导；但极限值 $=$ 函数值 $=0$，连续。"连续不一定可导"的标准反例。'},
{id:'q3', q:'曲线 $y=x^2$ 在点 $(1,1)$ 处的切线方程是？', opts:['$y=2x-1$', '$y=2x$', '$y=x$', '$y=x+1$'], ans:0, exp:'切线斜率 $y\'|_{x=1}=2$，点斜式 $y-1=2(x-1)$，即 $y=2x-1$。'}
]

},

'2-2': {
title: '求导法则与基本求导公式',
secs: [
['why', '为什么学这一节',
`<p>求导是考研数学的"算术基本功"——极限、单调性、极值、切线，全都要先求导。公式表要像九九乘法表一样脱口而出，否则后面每一章都在给它还债。</p>`],
['think', '直观理解',
`<p><b>四则求导法则的直觉：</b></p>
<blockquote>乘法 $(uv)\'=u\'v+uv\'$：两人合力创造产出，变化来自"甲进步+乙原地"加"甲原地+乙进步"。<br>除法 $\\left(\\dfrac{u}{v}\\right)\'=\\dfrac{u\'v-uv\'}{v^2}$：注意分子是"减号"，谁在前别背反（口诀：上导下不导，减去上不导下导，除以下导的平方）。</blockquote>`],
['def', '定义与公式',
`<p><b>① 基本导数表（必背）：</b>以下公式都在相应函数有定义且所列导数存在的点使用；一般实指数幂 $x^a$ 先取 $x>0$：</p>
$$ (x^a)\'=ax^{a-1},\\quad (e^x)\'=e^x,\\quad (a^x)\'=a^x\\ln a\\quad(a>0,\\ a\\neq1) $$
$$ (\\ln x)\'=\\frac{1}{x},\\quad (\\log_a x)\'=\\frac{1}{x\\ln a}\\quad(x>0,\\ a>0,\\ a\\neq1) $$
$$ (\\sin x)\'=\\cos x,\\quad (\\cos x)\'=-\\sin x,\\quad (\\tan x)\'=\\sec^2 x=\\frac{1}{\\cos^2 x}\\quad(\\cos x\\neq0) $$
$$ (\\arcsin x)\'=\\frac{1}{\\sqrt{1-x^2}}\\quad(|x|<1),\\qquad (\\arctan x)\'=\\frac{1}{1+x^2} $$
<p><b>② 四则法则：</b>$(u\\pm v)\'=u\'\\pm v\'$；$(uv)\'=u\'v+uv\'$；$\\left(\\dfrac{u}{v}\\right)\'=\\dfrac{u\'v-uv\'}{v^2}$（$v\\neq0$）。</p>
<p><b>③ 对数求导法：</b>幂指函数 $u(x)^{v(x)}$ 先取对数再求导。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（综合求导）求 $y=x^2 e^x$ 的导数</div>
$$ y\'=(x^2)\'e^x+x^2(e^x)\'=2xe^x+x^2e^x=x(x+2)e^x $$
</div>
<div class="ex-box"><div class="ex-t">例 2（商法则）求 $y=\\dfrac{\\ln x}{x}$ 的导数</div>
$$ y\'=\\frac{\\tfrac1x\\cdot x-\\ln x\\cdot1}{x^2}=\\frac{1-\\ln x}{x^2} $$
<p class="muted">注意 $\\left(\\tfrac1x\\right)\'=x^{-1}$ 求导得 $-x^{-2}$，负号别丢。</p></div>
<div class="ex-box"><div class="ex-t">例 3（幂指函数）求 $y=x^{\\sin x}\\ (x>0)$ 的导数</div>
<p>取对数：$\\ln y=\\sin x\\ln x$。两边求导：$\\dfrac{y\'}{y}=\\cos x\\ln x+\\dfrac{\\sin x}{x}$。</p>
$$ y\'=x^{\\sin x}\\left(\\cos x\\ln x+\\frac{\\sin x}{x}\\right) $$
</div>`],
['warn', '易错点',
`<p>• $(\\cos x)\'$ 是 $-\\sin x$，负号是公式的一部分，考试最常见的手滑。</p>
<p>• $x^x$、$x^{\\sin x}$ 这类<b>底数指数都变</b>的幂指函数，不能用幂函数公式，要用对数求导法。</p>
<p>• 积的导数 ≠ 导的积：$(uv)\'\\neq u\'v\'$。</p>`]
],
quiz: [
{id:'q1', q:'$y=x^3\\ln x$ 的导数是？', opts:['$3x^2\\ln x$', '$3x^2\\ln x+x^3$', '$x^2(3\\ln x+1)$', '$3x^2$'], ans:2, exp:'乘法法则：$3x^2\\ln x+x^3\\cdot\\tfrac1x=3x^2\\ln x+x^2=x^2(3\\ln x+1)$（A 漏了第二项）。'},
{id:'q2', q:'$y=\\dfrac{e^x}{x}$ 的导数是？', opts:['$\\dfrac{e^x(x-1)}{x^2}$', '$\\dfrac{e^x(x+1)}{x^2}$', '$e^x$', '$\\dfrac{e^x-1}{x^2}$'], ans:0, exp:'商法则：$\\tfrac{e^x x-e^x\\cdot1}{x^2}=\\tfrac{e^x(x-1)}{x^2}$。'},
{id:'q3', q:'$(\\arctan x)\'$ 等于？', opts:['$\\dfrac{1}{\\sqrt{1+x^2}}$', '$\\dfrac{1}{1+x^2}$', '$-\\dfrac{1}{1+x^2}$', '$\\dfrac{1}{\\sqrt{1-x^2}}$'], ans:1, exp:'$(\\arctan x)\'=\\tfrac{1}{1+x^2}$；带根号的 $\\tfrac{1}{\\sqrt{1-x^2}}$ 是 arcsin 的导数。'}
]

},

'2-3': {
title: '复合、隐函数与参数方程求导',
secs: [
['why', '为什么学这一节',
`<p>考研真题里的求导几乎从来不是裸函数：复合链 $e^{\\sin 2x}$、隐函数 $e^y+xy=e$、参数方程摆线——三种"结构求导"合起来是历年客观题与解答题第一步的固定动作。</p>`],
['think', '直观理解',
`<p><b>链式法则 = 剥洋葱连乘。</b>每剥一层，乘上该层的导数：$y=e^{\\sin 2x}$ 的导数 = 外层 $e^u$ 导（保持 $u$ 不动）× 中层 $\\sin v$ 导 × 内层 $2x$ 导。</p>
<blockquote>口诀：<b>由外向内逐层求导、层层相乘</b>。漏层是最常见错误。</blockquote>
<p><b>隐函数求导 = 把 y 当"带着隐身斗篷的 x 的函数"。</b>方程两边同时对 $x$ 求导，凡遇到 $y$ 的项，链式法则补一个 $y\'$，最后解出 $y\'$。</p>`],
['def', '定义与公式',
`<p><b>① 链式法则：</b>$y=f(u),\\ u=g(x)$，则 $\\dfrac{dy}{dx}=f\'(u)\\cdot g\'(x)$。三层：$\\dfrac{dy}{dx}=f\'\\cdot g\'\\cdot h\'$。</p>
<p><b>② 隐函数求导：</b>$F(x,y)=0$ 两边对 $x$ 求导（$y$ 视为 $x$ 的函数），解出 $y\'$。</p>
<p><b>③ 参数方程求导：</b>$x=x(t),\\ y=y(t)$。在所考察参数处 $x\'(t)\\neq0$ 时，曲线局部可把 $y$ 看成 $x$ 的函数，并有</p>
$$ \\frac{dy}{dx}=\\frac{y\'(t)}{x\'(t)},\\qquad \\frac{d^2y}{dx^2}=\\frac{\\left(\\dfrac{y\'(t)}{x\'(t)}\\right)_t\'}{x\'(t)} $$
<p class="muted">二阶导不是 $\\dfrac{y\'\'(t)}{x\'\'(t)}$，而是先对一阶导的商关于 $t$ 求导，再除以 $x\'(t)$。若 $x\'(t)=0$，不能直接套商式或约分，需由割线极限、隐式关系或更高阶展开另行判断切线。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（链式）求 $y=e^{\\sin 2x}$ 的导数</div>
$$ y\'=e^{\\sin 2x}\\cdot\\cos 2x\\cdot 2 = 2\\cos 2x\\, e^{\\sin 2x} $$
</div>
<div class="ex-box"><div class="ex-t">例 2（隐函数）设 $e^y+xy=e$，求 $y\'$</div>
<p>两边对 $x$ 求导：$e^y y\'+y+xy\'=0 \\Rightarrow y\'(e^y+x)=-y$</p>
$$ y\'=\\frac{-y}{e^y+x} $$
<p class="muted">答案里允许（通常也必须）保留 $y$。</p></div>
<div class="ex-box"><div class="ex-t">例 3（参数方程）$x=t-\\sin t,\\ y=1-\\cos t$，求 $\\dfrac{dy}{dx}$</div>
$$ \\frac{dy}{dx}=\\frac{y\'(t)}{x\'(t)}=\\frac{\\sin t}{1-\\cos t} $$
</div>`],
['warn', '易错点',
`<p>• 链式法则<b>漏内层导数</b>：$(\\sin 2x)\'=2\\cos 2x$ 不是 $\\cos 2x$。</p>
<p>• 隐函数求导中 "$xy$" 是乘积：求导得 $y+xy\'$，不是 $xy\'$。</p>
<p>• 参数方程二阶导要用"商再对 $t$ 求导 ÷ $x\'(t)$"，直接 $\\dfrac{y\'\'}{x\'\'}$ 必错。</p>`]
],
quiz: [
{id:'q1', q:'$y=\\ln(3x^2+1)$ 的导数是？', opts:['$\\dfrac{1}{3x^2+1}$', '$\\dfrac{6x}{3x^2+1}$', '$\\dfrac{6x}{\\ln(3x^2+1)}$', '$\\ln 6x$'], ans:1, exp:'链式法则：外层 $\\tfrac1u$ × 内层 $6x$。'},
{id:'q2', q:'设 $x^2+y^2=1$ 确定 $y=y(x)$，则 $y\'$ 等于？', opts:['$\\dfrac{x}{y}$', '$-\\dfrac{x}{y}$', '$-2x$', '$\\dfrac{y}{x}$'], ans:1, exp:'两边求导：$2x+2yy\'=0$，解得 $y\'=-\\tfrac{x}{y}$（正是圆上切线斜率）。'},
{id:'q3', q:'参数方程 $x=t^2,\\ y=t^3$，则曲线在参数 $t$ 处的切线斜率为？', opts:['$\\dfrac{3}{2}t$', '$\\dfrac{2}{3}t$', '$\\dfrac{3}{2}t^2$', '$\\dfrac{2}{3t}$'], ans:0, exp:'当 $t\\neq0$ 时，$\\dfrac{dy}{dx}=\\dfrac{y\'(t)}{x\'(t)}=\\dfrac{3t^2}{2t}=\\dfrac32t$。在 $t=0$ 处不能直接约去 $t$，但由割线斜率 $\\dfrac{y(t)-y(0)}{x(t)-x(0)}=t\\to0$，切线斜率仍为 0，所以可统一写成 $\\dfrac32t$。'}
]

},

'2-4': {
title: '高阶导数',
secs: [
['why', '为什么学这一节',
`<p>高阶导数在泰勒公式（求 $f^{(n)}(x_0)$）和级数展开里是刚需。考研重点三个：$(e^x)$、$\\sin/cos$ 的 $n$ 阶导循环规律、莱布尼茨公式，以及"分段点二阶可导要用定义"。</p>`],
['think', '直观理解',
`<p><b>高阶导 = 导数的导数。</b>位移求导是速度，再求导是加速度；图像上看，二阶导描述切线斜率怎样变化：$f''>0$ 表示斜率随 $x$ 增大而增大，$f''<0$ 表示斜率随 $x$ 增大而减小。它判断的是斜率增减，不能简单等同于“越来越陡”或“越来越平”——这正是后面凹凸性的基础。</p>
<blockquote>$\\sin x$ 的导数像转圈：$\\cos x\\to-\\sin x\\to-\\cos x\\to\\sin x\\to$ 回到起点，4 步一循环。$n$ 阶导 = 循环取模。</blockquote>`],
['def', '定义与公式',
`<p><b>① 常用 $n$ 阶导数公式：</b>以下取整数 $n\\ge1$，并在函数有定义的点使用：</p>
$$ (e^{ax})^{(n)}=a^ne^{ax},\\qquad (\\sin ax)^{(n)}=a^n\\sin\\left(ax+\\tfrac{n\\pi}{2}\\right) $$
$$ (\\cos ax)^{(n)}=a^n\\cos\\left(ax+\\tfrac{n\\pi}{2}\\right),\\qquad (\\ln(1+x))^{(n)}=\\frac{(-1)^{n-1}(n-1)!}{(1+x)^n}\\quad(x>-1) $$
$$ \\left(\\frac{1}{x+a}\\right)^{(n)}=\\frac{(-1)^n n!}{(x+a)^{n+1}}\\quad(x\\ne-a) $$
<p><b>② 莱布尼茨公式</b>（$u,v$ 均有 $n$ 阶导数时，乘积的 $n$ 阶导，类比二项式定理）：</p>
$$ (uv)^{(n)}=\\sum_{k=0}^{n}\\binom{n}{k}u^{(n-k)}v^{(k)} $$
<p><b>③ 分段点高阶可导：</b>必须用定义验证 $f\'\'(x_0)=\\lim\\dfrac{f\'(x_0+h)-f\'(x_0)}{h}$（当 $f\'$ 在 $x_0$ 两旁表达式不同）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 求 $f(x)=x^2 e^{2x}$ 的 $f^{(n)}(x)$</div>
<p>莱布尼茨，取 $u=e^{2x}$（$u^{(k)}=2^ke^{2x}$），$v=x^2$（三阶以上为 0）：</p>
$$ f^{(n)}=2^ne^{2x}x^2+n\\cdot 2^{n-1}e^{2x}\\cdot 2x+\\frac{n(n-1)}{2}\\cdot2^{n-2}e^{2x}\\cdot2 $$
<p class="muted">莱布尼茨公式中只有 $v^{(0)},v^{(1)},v^{(2)}$ 三项可能非零，因为 $v=x^2$ 的三阶及更高阶导数全为 0；这就是把多项式选作 $v$ 的好处。</p></div>
<div class="ex-box"><div class="ex-t">例 2 求 $y=\\dfrac{1}{x^2-1}$ 的 $n$ 阶导</div>
<p>先拆：$\\dfrac{1}{x^2-1}=\\dfrac12\\left(\\dfrac{1}{x-1}-\\dfrac{1}{x+1}\\right)$，再套公式：</p>
$$ y^{(n)}=\\frac{(-1)^n n!}{2}\\left[\\frac{1}{(x-1)^{n+1}}-\\frac{1}{(x+1)^{n+1}}\\right] $$
<p class="muted">有理函数先裂项，是 $n$ 阶导的第一反应。</p></div>`],
['warn', '易错点',
`<p>• $(\\sin ax)^{(n)}$ 里是 $+\\tfrac{n\\pi}{2}$ 相位偏移，别写成乘 $\\tfrac{n\\pi}{2}$。</p>
<p>• 莱布尼茨公式求"指定点的 $n$ 阶导"时，选多项式部分当 $v$，否则算不完。</p>
<p>• “$f\'\'(x_0)$ 存在”不能只由 $f\'$ 在 $x_0$ 连续推出；连续只说明 $f\'(x_0+h)-f\'(x_0)\\to0$，不能保证再除以 $h$ 后有极限。分段点尤其要用定义。</p>`]
],
quiz: [
{id:'q1', q:'$y=e^{3x}$ 的 $n$ 阶导数是？', opts:['$e^{3x}$', '$3^ne^{3x}$', '$3e^{3x}$', '$n^3e^{3x}$'], ans:1, exp:'每求一次导提出一个 3，$n$ 次后是 $3^n$。'},
{id:'q2', q:'$y=\\sin x$ 的 $2024$ 阶导数是？', opts:['$\\sin x$', '$\\cos x$', '$-\\sin x$', '$-\\cos x$'], ans:0, exp:'$2024$ 除以 4 余 0，转满 506 圈回到 $\\sin x$。'},
{id:'q3', q:'$y=x e^x$ 的二阶导数是？', opts:['$e^x(x+2)$', '$e^x(x+1)$', '$xe^x$', '$2e^x$'], ans:0, exp:'$y\'=e^x(x+1)$，再求导 $y\'\'=e^x(x+1)+e^x=e^x(x+2)$。'}
]

},

'2-5': {
title: '微分的概念与近似计算',
secs: [
['why', '为什么学这一节',
`<p>微分回答"函数增量怎么近似"：$\\Delta y\\approx dy$。它是积分（累加无穷小）、误差估计、泰勒公式（高阶版微分逼近）的共同源头。数二直接考微分定义与可微可导关系的频率很高。</p>`],
['think', '直观理解',
`<p>把曲线在切点附近<b>当成直线看</b>：增量 $\\Delta y$（真值，沿曲线走）与 $dy=f\'(x_0)\\Delta x$（近似，沿切线走）差一个高阶小量 $o(\\Delta x)$。</p>
<blockquote>一句话记忆：<b>可微 = "用切线代替曲线"的误差比 $\\Delta x$ 消失得更快</b>。<br>一元函数中：<b>可微 $\\iff$ 可导</b>，且 $dy=f\'(x)dx$。</blockquote>`],
['def', '定义与公式',
`<p><b>① 微分定义：</b>若 $\\Delta y=A\\Delta x+o(\\Delta x)$（$A$ 与 $\\Delta x$ 无关），称 $f$ 在 $x_0$ 可微，线性主部 $dy=A\\Delta x$。可以证明 $A=f\'(x_0)$，故</p>
$$ dy = f\'(x)\\,dx $$
<p><b>② 近似公式：</b>$f(x_0+\\Delta x)\\approx f(x_0)+f\'(x_0)\\Delta x$（$|\\Delta x|$ 很小时）。</p>
<p><b>③ 常用近似（$x\\to0$）：</b>$\\sqrt[n]{1+x}\\approx1+\\tfrac{x}{n}$；$e^x\\approx1+x$；$\\ln(1+x)\\approx x$；$\\sin x\\approx x$。</p>
<p><b>④ 微分运算法则与求导一致</b>：$d(uv)=v\\,du+u\\,dv$，$d\\left(\\tfrac{u}{v}\\right)=\\tfrac{v\\,du-u\\,dv}{v^2}$。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（近似计算）估算 $\\sqrt{4.02}$</div>
<p>取 $f(x)=\\sqrt x$，$x_0=4$，$\\Delta x=0.02$：$f\'(x)=\\tfrac{1}{2\\sqrt x}$，$f\'(4)=\\tfrac14$。</p>
$$ \\sqrt{4.02}\\approx\\sqrt4+\\tfrac14\\times0.02=2+0.005=2.005 $$
</div>
<div class="ex-box"><div class="ex-t">例 2（求微分）求 $y=e^{x^2}$ 的微分 $dy$</div>
$$ dy = y\'dx = 2xe^{x^2}\\,dx $$
</div>
<div class="ex-box"><div class="ex-t">例 3（概念判断）"$f$ 在 $x_0$ 可导"与"$f$ 在 $x_0$ 可微"的关系？</div>
<p>一元函数中二者<b>等价</b>：可导 $\\Rightarrow$ 可微（$A=f\'$）；可微 $\\Rightarrow$ 增量可线性近似 $\\Rightarrow$ 导数存在。多元函数中不再等价（可微强于偏导存在——“偏导数”是第 6 章多元函数的概念，这里只需记住一元的等价结论）。</p></div>`],
['warn', '易错点',
`<p>• $\\Delta y$ 与 $dy$ 不是一回事：$\\Delta y=dy+o(\\Delta x)$，差的高阶项在小增量时才可忽略。</p>
<p>• 近似公式要求 $|\\Delta x|$ 足够小，且在 $x_0$ 附近；拿 $\\sqrt{402}\\approx20.05$ 就是把"小"用错了。</p>
<p>• "可微 $\\iff$ 可导"仅限<b>一元</b>，写多元结论前先看清章节数。</p>`]
],
quiz: [
{id:'q1', q:'函数 $y=x^3$ 在 $x=1$ 处当 $\\Delta x=0.01$ 时的微分 $dy$ 是？', opts:['0.03', '0.03 + 微小量', '0.000001', '0.01'], ans:0, exp:'$dy=f\'(1)\\Delta x=3\\times0.01=0.03$。（真实增量 $1.01^3-1=0.030301$，微分只取线性主部。）'},
{id:'q2', q:'一元函数 $f$ 在 $x_0$ 可微是 $f$ 在 $x_0$ 连续的什么条件？', opts:['必要不充分', '充分不必要', '充要', '既不充分也不必要'], ans:1, exp:'可微 ⇒ 可导 ⇒ 连续；反之连续推不出可微（如 $|x|$）。'},
{id:'q3', q:'用微分近似，$e^{0.02}$ 约等于？', opts:['0.02', '1.02', '2.02', '1.2'], ans:1, exp:'$e^x\\approx1+x$（$x=0.02$），故约 1.02。'}
]

}

}
};
