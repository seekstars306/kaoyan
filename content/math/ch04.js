/* ===== 数学 · 第4章 不定积分 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['math/ch04'] = {

lessons: {

'4-1': {
title: '不定积分的概念与基本积分表',
secs: [
['why', '为什么学这一节',
`<p>不定积分是求导的<b>逆运算</b>：已知变化率反推原函数。定积分计算（牛顿-莱布尼茨公式）全靠它，微分方程求解也靠它。公式表的熟练度直接决定积分大题的生死。</p>`],
['think', '直观理解',
`<p><b>求导是"向下微分"，积分是"向上还原"。</b>知道 $2x$ 这个"影子"问：谁的导数是它？$x^2$ 是，$x^2+1$、$x^2-7$ 也都是——还原时丢掉的常数找不回来，所以结果要加 $+C$。</p>
<blockquote>关系一句话：$\\left[\\displaystyle\\int f(x)dx\\right]\' = f(x)$。求导与积分互为逆操作，先积后导等于没做，先导后积补个常数。</blockquote>`],
['def', '定义与公式',
`<p><b>① 定义：</b>在某个区间上若 $F\'(x)=f(x)$，则该区间上 $f$ 的全体原函数为 $F(x)+C$，记作 $\\displaystyle\\int f(x)dx=F(x)+C$。定义域不连通时，各连通区间上的积分常数可以不同。</p>
<p><b>② 基本积分表（必背）：</b></p>
$$ \\int x^a dx=\\frac{x^{a+1}}{a+1}+C\\quad(a\\neq-1,\\ x>0),\\qquad \\int\\frac{1}{x}dx=\\ln|x|+C\\quad(x\\neq0) $$
$$ \\int e^x dx=e^x+C,\\quad \\int a^x dx=\\frac{a^x}{\\ln a}+C\\quad(a>0,\\ a\\neq1) $$
$$ \\int\\sin x\\,dx=-\\cos x+C,\\quad \\int\\cos x\\,dx=\\sin x+C,\\quad \\int\\sec^2x\\,dx=\\tan x+C $$
$$ \\int\\frac{1}{1+x^2}dx=\\arctan x+C,\\qquad \\int\\frac{1}{\\sqrt{1-x^2}}dx=\\arcsin x+C\\quad(|x|<1) $$
<p class="muted">一般实指数的幂函数公式先在 $x>0$ 上使用；若指数是整数等特殊情形，可再按原函数的实际定义域扩展。$x^{-1}$ 必须单独积分为 $\\ln|x|$。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 求 $\\displaystyle\\int\\left(2x-\\dfrac{3}{x}+\\dfrac{1}{\\sqrt x}\\right)dx$</div>
<p>在实数范围内，被积函数要求 $x>0$。逐项积分：$\\displaystyle\\int 2x\\,dx=x^2$；$\\displaystyle\\int-\\frac3x dx=-3\\ln x$；$\\displaystyle\\int x^{-1/2}dx=2x^{1/2}$。</p>
$$ =x^2-3\\ln x+2\\sqrt x+C\\qquad(x>0) $$
</div>
<div class="ex-box"><div class="ex-t">例 2（先化简再积）求 $\\displaystyle\\int \\dfrac{x^2}{1+x^2}dx$</div>
<p>加一减一：$\\dfrac{x^2}{1+x^2}=1-\\dfrac{1}{1+x^2}$，故原式 $=x-\\arctan x+C$。</p>
<p class="muted">有理式先通过多项式除法、配方或裂项，把被积函数整理成积分表中的形状；本题只需“加一减一”。</p></div>
<div class="ex-box"><div class="ex-t">例 3（验证类）已知 $F\'(x)=2x$ 且 $F(1)=3$，求 $F(x)$</div>
<p>$F(x)=x^2+C$，代入 $F(1)=3$ 得 $C=2$，故 $F(x)=x^2+2$。</p>
<p class="muted">"+C" 不只是数学严谨性——具体问题里它由初始条件定出。</p></div>`],
['warn', '易错点',
`<p>• $\\int\\dfrac1x dx=\\ln|x|+C$：绝对值在负区间不可省（虽然很多答案默认 $x>0$，选择题会挖坑）。</p>
<p>• $\\int x^{-1}dx$ 不能套幂函数公式（$a+1=0$ 分母为零）。</p>
<p>• 积分与求导抵消的顺序：先积分再求导还原；先求导再积分要 $+C$。</p>`]
],
quiz: [
{id:'q1', q:'$\\displaystyle\\int \\dfrac{1}{x^2}dx$ 等于？', opts:['$\\ln x^2+C$', '$-\\dfrac{1}{x}+C$', '$\\dfrac{1}{x}+C$', '$-2x^{-3}+C$'], ans:1, exp:'$x^{-2}$ 积分：$\\tfrac{x^{-1}}{-1}=-x^{-1}=-\\tfrac1x$。D 是求导结果（符号反了）。'},
{id:'q2', q:'$\\displaystyle\\int \\cos x\\,dx$ 等于？', opts:['$\\sin x+C$', '$-\\sin x+C$', '$\\cos x+C$', '$-\\cos x+C$'], ans:0, exp:'$(\\sin x)\'=\\cos x$，还原到 $\\sin x$。注意 $\\int\\sin x\\,dx=-\\cos x+C$ 别混。'},
{id:'q3', q:'若 $F(x)=\\ln(1+x^2)$ 是 $f(x)$ 的一个原函数，则 $f\'(x)$ 等于？', opts:['$\\dfrac{2x}{1+x^2}$', '$\\dfrac{2-2x^2}{(1+x^2)^2}$', '$\\dfrac{2}{1+x^2}$', '$\\ln(1+x^2)$'], ans:1, exp:'先由 $f(x)=F\'(x)=\\tfrac{2x}{1+x^2}$，再求导：$f\'(x)=\\tfrac{2(1+x^2)-4x^2}{(1+x^2)^2}=\\tfrac{2-2x^2}{(1+x^2)^2}$。'}
]

},

'4-2': {
title: '第一类换元法（凑微分）',
secs: [
['why', '为什么学这一节',
`<p>凑微分是积分技巧的"第一主力"，考试中过半的积分题第一步就是它。本质是链式法则的逆向：看到复合函数，把内层导数"凑"进 $dx$ 里。</p>`],
['think', '直观理解',
`<p><b>凑微分 = 换个记法看 $dx$。</b>既然 $d(x^2)=2x\\,dx$，那么出现 $x\\,dx$ 就可以写成 $\\tfrac12 d(x^2)$：</p>
<blockquote>$\\displaystyle\\int x\\,e^{x^2}dx=\\tfrac12\\int e^{x^2}\\,d(x^2)=\\tfrac12 e^{x^2}+C$。<br>把 $x^2$ 整体看成新变量 $u$，$\\int e^u du$ 就秒杀了。</blockquote>
<p><b>常用凑法：</b>$x\\,dx=\\tfrac12d(x^2)$；$\\tfrac{dx}{x}=d(\\ln|x|)$（$x\\neq0$）；$e^x dx=d(e^x)$；$\\cos x\\,dx=d(\\sin x)$；$\\tfrac{dx}{\\sqrt x}=2d(\\sqrt x)$（在实数范围内需 $x>0$）。</p>`],
['def', '定义与公式',
`<p><b>① 第一类换元（凑微分）：</b>$\\displaystyle\\int f[\\varphi(x)]\\varphi\'(x)dx=\\int f[\\varphi(x)]\\,d\\varphi(x)\\xlongequal{u=\\varphi(x)}\\int f(u)du$。</p>
<p><b>② 常用凑微分公式：</b></p>
$$ x\\,dx=\\tfrac12 d(x^2),\\quad \\frac{dx}{\\sqrt x}=2d(\\sqrt x)\\ (x>0),\\quad \\frac{dx}{x^2}=-d\\!\\left(\\frac1x\\right),\\quad \\frac{dx}{x}=d(\\ln|x|)\\ (x\\neq0) $$
$$ \\sin x\\,dx=-d(\\cos x),\\quad \\cos x\\,dx=d(\\sin x),\\quad \\frac{dx}{1+x^2}=d(\\arctan x) $$
<p class="muted">逆向思维：看到 $\\int f(g(x))g\'(x)dx$，"内层的导数在外层旁边站着吗？"</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 求 $\\displaystyle\\int x\\cos(x^2)dx$</div>
<p>$x\\,dx=\\tfrac12 d(x^2)$：</p>
$$ \\frac12\\int\\cos(x^2)\\,d(x^2)=\\frac12\\sin(x^2)+C $$
</div>
<div class="ex-box"><div class="ex-t">例 2 求 $\\displaystyle\\int \\dfrac{\\ln x}{x}dx$</div>
<p>$\\dfrac{dx}{x}=d(\\ln x)$：</p>
$$ \\int\\ln x\\,d(\\ln x)=\\frac{\\ln^2 x}{2}+C $$
</div>
<div class="ex-box"><div class="ex-t">例 3（含线性内层）求 $\\displaystyle\\int \\dfrac{dx}{x^2+2x+3}$</div>
<p>配方：$x^2+2x+3=(x+1)^2+2$。令 $u=x+1$：</p>
$$ \\int\\frac{du}{u^2+2}=\\frac{1}{\\sqrt2}\\arctan\\frac{u}{\\sqrt2}+C=\\frac{1}{\\sqrt2}\\arctan\\frac{x+1}{\\sqrt2}+C $$
</div>`],
['warn', '易错点',
`<p>• 凑微分后<b>别忘了"还回来"</b>：用 $u$ 算完要换回原变量（或直接以 $d(x^2)$ 形式写答案）。</p>
<p>• 系数别丢：$d(2x)=2dx$，$x\\,dx=\\tfrac12 d(x^2)$ 的 $\\tfrac12$ 是常错点。</p>
<p>• 不是所有复合都能凑——内层导数必须（差常数倍地）出现在被积函数里，否则考虑分部或换元。</p>`]
],
quiz: [
{id:'q1', q:'$\\displaystyle\\int e^{3x}dx$ 等于？', opts:['$e^{3x}+C$', '$\\dfrac{1}{3}e^{3x}+C$', '$3e^{3x}+C$', '$\\dfrac{1}{3}e^{3x}$'], ans:1, exp:'$e^{3x}dx=\\tfrac13 d(e^{3x})$，积分得 $\\tfrac13 e^{3x}+C$。系数 3 别丢。'},
{id:'q2', q:'$\\displaystyle\\int \\tan x\\,dx$ 等于？', opts:['$\\ln|\\cos x|+C$', '$-\\ln|\\cos x|+C$', '$\\ln|\\sin x|+C$', '$\\sec^2x+C$'], ans:1, exp:'$\\tan x=\\tfrac{\\sin x}{\\cos x}$，凑 $d(\\cos x)=-\\sin x\\,dx$：$-\\int\\tfrac{d\\cos x}{\\cos x}=-\\ln|\\cos x|+C$。'},
{id:'q3', q:'$\\displaystyle\\int \\dfrac{x}{1+x^4}dx$ 等于？', opts:['$\\arctan x^2+C$', '$\\dfrac12\\arctan x^2+C$', '$\\ln(1+x^4)+C$', '$\\dfrac12\\ln(1+x^4)+C$'], ans:1, exp:'$x\\,dx=\\tfrac12 d(x^2)$，令 $u=x^2$：$\\tfrac12\\int\\tfrac{du}{1+u^2}=\\tfrac12\\arctan(x^2)+C$。'}
]

},

'4-3': {
title: '第二类换元法与分部积分法',
secs: [
['why', '为什么学这一节',
`<p>凑微分搞不定的两类顽固分子：含 $\\sqrt{a^2-x^2}$ 的根式（用三角换元"摘根号"）和"幂×指数/对数"乘积（用分部积分"转移求导"）。分部积分更是考试频率最高的积分技巧。</p>`],
['think', '直观理解',
`<p><b>三角换元 = 给根号里"造直角三角形"。</b>$\\sqrt{a^2-x^2}$ 令 $x=a\\sin t$，根号变成 $a\\cos t$——勾股恒等式 $1-\\sin^2=\\cos^2$ 是摘根器。</p>
<blockquote><b>分部积分 = 求导与积分的"接力棒交换"。</b>$\\int x e^x dx$ 里 $x$ 越求导越简单（→1），$e^x$ 积分不变——让 $x$ 拿求导棒、$e^x$ 拿积分棒，交换后式子简化。</blockquote>
<p><b>选棒口诀（反对幂指三）：</b>排在前面的优先拿"求导棒"（进 $u$）：反三角、对数、幂、指数、三角。</p>`],
['def', '定义与公式',
`<p><b>① 第二类换元：</b>在所用区间内选取单调可导的 $x=\\psi(t)$，使换元前后能够一一对应；代入 $dx=\\psi\'(t)dt$，算完再回到 $x$。对 $a>0$，三类常见根式可按所在区间选择相应的 $t$ 范围：</p>
$$ \\sqrt{a^2-x^2}\\to x=a\\sin t\\quad(|x|\\le a);\\qquad \\sqrt{a^2+x^2}\\to x=a\\tan t;\\qquad \\sqrt{x^2-a^2}\\to x=a\\sec t\\quad(|x|\\ge a) $$
<p><b>② 分部积分公式：</b></p>
$$ \\int u\\,dv = uv - \\int v\\,du $$
<p><b>③ 回代三角形：</b>三角换元后画直角三角形标边，$\\cos t,\\tan t$ 一眼读出（如 $x=a\\sin t$ 时 $\\cos t=\\tfrac{\\sqrt{a^2-x^2}}{a}$）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（分部）求 $\\displaystyle\\int xe^x dx$</div>
<p>取 $u=x,\\ dv=e^xdx$，则 $du=dx,\\ v=e^x$：</p>
$$ \\int xe^xdx=xe^x-\\int e^xdx=(x-1)e^x+C $$
</div>
<div class="ex-box"><div class="ex-t">例 2（分部经典循环型）求 $\\displaystyle\\int e^x\\cos x\\,dx$</div>
<p>分部两次（三角、指数轮流求导）：$I=\\int e^x\\cos xdx=e^x\\sin x-\\int e^x\\sin xdx=e^x\\sin x+e^x\\cos x-I$。</p>
<p>解方程：$I=\\dfrac{e^x(\\sin x+\\cos x)}{2}+C$。</p>
<p class="muted">"积回来自己"→ 移项解方程，是分部的标志性结局。</p></div>
<div class="ex-box"><div class="ex-t">例 3（三角换元）求 $\\displaystyle\\int\\sqrt{a^2-x^2}\\,dx\\ (a>0)$</div>
<p>令 $x=a\\sin t\\ (t\\in(-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2}))$，$dx=a\\cos t\\,dt$，根号 $=a\\cos t$：</p>
$$ \\int a\\cos t\\cdot a\\cos t\\,dt=a^2\\int\\frac{1+\\cos2t}{2}dt=\\frac{a^2}{2}t+\\frac{a^2}{2}\\sin t\\cos t+C $$
<p>回代：$t=\\arcsin\\tfrac xa$，$\\sin t=\\tfrac xa$，$\\cos t=\\tfrac{\\sqrt{a^2-x^2}}{a}$：</p>
$$ \\frac{a^2}{2}\\arcsin\\frac{x}{a}+\\frac{x}{2}\\sqrt{a^2-x^2}+C $$
</div>`],
['warn', '易错点',
`<p>• 分部选 $u$ 失误会让式子越积越复杂（把指数放 $u$ 求导就完了）——背"反对幂指三"。</p>
<p>• 三角换元要同时写清参数条件和 $t$ 的范围：例如 $\\sqrt{a^2-x^2}$ 用 $x=a\\sin t$ 时需 $a>0$、$|x|\\le a$，并可取 $t\\in[-\\tfrac\\pi2,\\tfrac\\pi2]$，这样 $\\cos t\\ge0$，开方时才可写成 $a\\cos t$ 而不漏绝对值。</p>
<p>• 回代别忘了三角形法：直接写 $\\cos t$ 的 $x$ 表达式时最容易出错。</p>`]
],
quiz: [
{id:'q1', q:'$\\displaystyle\\int \\ln x\\,dx$ 等于？', opts:['$\\dfrac1x+C$', '$x\\ln x - x + C$', '$x\\ln x + x + C$', '$\\dfrac{\\ln^2x}{2}+C$'], ans:1, exp:'分部：$u=\\ln x, dv=dx$，$\\int= x\\ln x-\\int x\\cdot\\tfrac1x dx=x\\ln x-x+C$。"对数单独出现，直接分部"。'},
{id:'q2', q:'计算 $\\displaystyle\\int\\sqrt{4-x^2}\\,dx$ 应作的换元是？', opts:['$x=2\\tan t$', '$x=2\\sin t$', '$x=2\\sec t$', '$t=\\sqrt{4-x^2}$'], ans:1, exp:'$\\sqrt{a^2-x^2}$ 配 $x=a\\sin t$，这里 $a=2$。'},
{id:'q3', q:'$\\displaystyle\\int x\\cos x\\,dx$ 等于？', opts:['$x\\sin x+\\cos x+C$', '$x\\sin x-\\cos x+C$', '$\\dfrac{x^2}{2}\\sin x+C$', '$-x\\sin x+C$'], ans:0, exp:'分部 $u=x,dv=\\cos xdx$：$x\\sin x-\\int\\sin xdx=x\\sin x+\\cos x+C$。'}
]

},

'4-4': {
title: '有理函数的积分',
secs: [
['why', '为什么学这一节',
`<p>有理函数（多项式之比）是"保证能积出来"的函数类——套路固定：假分式先除、真分式再裂项。它也是很多"看起来不像"的积分（含根号、三角）换元后的落点，是积分章节的收口。</p>`],
['think', '直观理解',
`<p><b>假分式先做除法</b>：$\\dfrac{x^2}{x-1}$ 分子次数不低于分母，先用多项式除法拆成"整式 + 真分式"。类比 $\\tfrac75=1+\\tfrac25$。</p>
<blockquote><b>裂项 = 反向通分。</b>已知 $\\tfrac{1}{x-1}+\\tfrac{1}{x+1}=\\tfrac{2x}{x^2-1}$，那么 $\\tfrac{2x}{x^2-1}$ 的积分就拆成两个简单分式。一般情形用待定系数法把真分式拆成"一次因式"与"二次不可约因式"的简单块。</blockquote>`],
['def', '定义与公式',
`<p><b>① 流程：</b>假分式 →（多项式除法）→ 整式 + 真分式 →（待定系数裂项）→ 简单分式之和。</p>
<p><b>② 裂项标准形：</b></p>
$$ \\frac{px+q}{(x-a)(x-b)}=\\frac{A}{x-a}+\\frac{B}{x-b},\\qquad \\frac{px+q}{(x-a)^2}=\\frac{A}{x-a}+\\frac{B}{(x-a)^2} $$
$$ \\frac{px+q}{x^2+bx+c}\\ (b^2-4c<0): \\text{分子凑分母导数 + 常数两部分} $$
<p><b>③ 两大基础积分：</b></p>
$$ \\int\\frac{dx}{x-a}=\\ln|x-a|+C,\\qquad \\int\\frac{dx}{x^2+a^2}=\\frac{1}{a}\\arctan\\frac{x}{a}+C\\quad(a>0) $$`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 求 $\\displaystyle\\int\\dfrac{1}{x^2-1}dx$</div>
<p>裂项：$\\dfrac{1}{x^2-1}=\\dfrac12\\left(\\dfrac{1}{x-1}-\\dfrac{1}{x+1}\\right)$（通分验证：$\\tfrac{(x+1)-(x-1)}{2(x^2-1)}=\\tfrac{1}{x^2-1}$ ✓）。</p>
$$ \\int=\\frac12\\ln\\left|\\frac{x-1}{x+1}\\right|+C $$
</div>
<div class="ex-box"><div class="ex-t">例 2（待定系数）求 $\\displaystyle\\int\\dfrac{x+5}{x^2-x-2}dx$</div>
<p>分母 $=(x-2)(x+1)$。设 $\\dfrac{x+5}{(x-2)(x+1)}=\\dfrac{A}{x-2}+\\dfrac{B}{x+1}$。</p>
<p>覆盖法：$A=\\dfrac{2+5}{2+1}=\\dfrac73$，$B=\\dfrac{-1+5}{-1-2}=-\\dfrac43$。</p>
$$ \\int=\\frac73\\ln|x-2|-\\frac43\\ln|x+1|+C $$
<p class="muted">覆盖法速算：求 $A$ 就把分母中 $(x-2)$ 用 2 "盖掉"，只算另一因子在该点的值。</p></div>
<div class="ex-box"><div class="ex-t">例 3（不可约二次）求 $\\displaystyle\\int\\dfrac{2x+3}{x^2+2x+2}dx$</div>
<p>分母导数 $2x+2$。分子拆成 $\\underbrace{(2x+2)}_{\\text{凑导数}}+1$：</p>
$$ \\int\\frac{2x+2}{x^2+2x+2}dx+\\int\\frac{dx}{(x+1)^2+1}=\\ln(x^2+2x+2)+\\arctan(x+1)+C $$
</div>`],
['warn', '易错点',
`<p>• 假分式不先做除法直接裂项，是结构级错误（待定系数会无解）。</p>
<p>• 裂项后要<b>通分验证</b>系数（尤其大题），覆盖法虽快也要留一步检查。</p>
<p>• 二次因式积分先看判别式：可约就先因式分解，不可约才走"凑导数 + 配方"。</p>`]
],
quiz: [
{id:'q1', q:'$\\displaystyle\\int\\dfrac{1}{x(x+1)}dx$ 等于？', opts:['$\\ln\\dfrac{x}{x+1}+C$', '$\\ln\\dfrac{x+1}{x}+C$', '$\\dfrac{1}{2}\\ln(x^2+x)+C$', '$-\\dfrac{1}{x^2}+C$'], ans:0, exp:'$\\tfrac{1}{x(x+1)}=\\tfrac1x-\\tfrac{1}{x+1}$，积分 $\\ln|x|-\\ln|x+1|=\\ln\\left|\\tfrac{x}{x+1}\\right|+C$。'},
{id:'q2', q:'$\\displaystyle\\int\\dfrac{x^3}{x-1}dx$ 的第一步处理是？', opts:['直接裂项为 $\\tfrac{A}{x-1}$', '多项式除法：$x^3=(x-1)(x^2+x+1)+1$，化为整式 + 真分式', '令 $u=x-1$ 后无解', '分部积分'], ans:1, exp:'分子次数 3 ≥ 分母次数 1，属假分式，必须先除法降次再处理剩余真分式。'},
{id:'q3', q:'$\\displaystyle\\int\\dfrac{dx}{x^2+4x+5}$ 等于？', opts:['$\\ln(x^2+4x+5)+C$', '$\\arctan(x+2)+C$', '$\\dfrac12\\arctan(x+2)+C$', '$\\dfrac{1}{2x+4}\\ln|x^2+4x+5|+C$'], ans:1, exp:'配方 $(x+2)^2+1$，套 $\\int\\tfrac{du}{u^2+1}=\\arctan u+C$，得 $\\arctan(x+2)+C$。'}
]

}

}
};
