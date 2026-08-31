/* ===== 数学 · 第7章 二重积分 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['math/ch07'] = {

lessons: {

'7-1': {
title: '二重积分的概念与性质',
secs: [
['why', '为什么学这一节',
`<p>二重积分把"累加"从线段推广到<b>平面区域</b>：曲顶柱体的体积、平面薄片的质量都由它定义。它是数二多元积分的唯一考型（数二不考三重积分与曲线曲面积分），地位举足轻重。</p>`],
['think', '直观理解',
`<p><b>曲顶柱体体积：</b>把区域 $D$ 切成小方块 $\\Delta\\sigma_i$，每块上方立一根"柱子"，高约 $f(\\xi_i,\\eta_i)$，体积 $f\\cdot\\Delta\\sigma$；全部加起来，格子越细越准：</p>
$$ \\iint_D f(x,y)\\,d\\sigma=\\lim\\sum_i f(\\xi_i,\\eta_i)\\Delta\\sigma_i $$
<blockquote>几何意义：$f\\ge0$ 时是曲顶柱体体积；$f\\equiv1$ 时 $\\iint_D d\\sigma=$ 区域 $D$ 的<b>面积</b>——求不规则图形面积的一个妙招。</blockquote>`],
['def', '定义与公式',
`<p><b>① 性质（与定积分平行）：</b>线性、区域可加（$D=D_1\\cup D_2$ 内部不重叠）、保序性、估值不等式。</p>
<p><b>② 二重积分中值定理：</b>$f$ 在闭区域连续，存在点 $(\\xi,\\eta)\\in D$ 使 $\\iint_D f d\\sigma=f(\\xi,\\eta)\\cdot S_D$。</p>
<p><b>③ 计算总纲：</b>二重积分 = 化为<b>两次定积分</b>（累次积分）；选坐标系（直角 / 极坐标）、选次序是全部技术含量所在。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（比较大小）设 $D: x^2+y^2\\le1$，比较 $\\iint_D (x^2+y^2)\\,d\\sigma$ 与 $\\iint_D (x^2+y^2)^2 d\\sigma$</div>
<p>在 $D$ 内 $0\\le x^2+y^2\\le1$，故 $x^2+y^2\\ge(x^2+y^2)^2$，由保序性前者 $\\ge$ 后者（内部严格大于）。</p></div>
<div class="ex-box"><div class="ex-t">例 2（估值）估计 $\\iint_D \\dfrac{d\\sigma}{100+\\cos^2x+\\cos^2y}$，$D:|x|\\le10, |y|\\le10$</div>
<p>被积函数介于 $\\tfrac{1}{102}$ 与 $\\tfrac{1}{100}$ 之间，区域面积 $400$：</p>
$$ \\frac{400}{102}\\le I \\le 4 $$
</div>`],
['warn', '易错点',
`<p>• $d\\sigma=dxdy$（直角坐标）或 $r\\,drd\\theta$（极坐标）——极坐标忘乘 $r$ 是必炸错误。</p>
<p>• 保序性比较被积函数大小时要<b>在区域 $D$ 内</b>逐点比较。</p>`]
],
quiz: [
{id:'q1', q:'$\\iint_D d\\sigma$（$D$ 为半径 1 的圆）等于？', opts:['$2\\pi$', '$\\pi$', '1', '$4\\pi$'], ans:1, exp:'被积函数为 1 时二重积分 = 区域面积 = $\\pi\\cdot1^2=\\pi$。'},
{id:'q2', q:'$f\\le g$ 在 $D$ 上成立，则？', opts:['$\\iint_D f\\,d\\sigma\\le\\iint_D g\\,d\\sigma$', '$\\iint_D f\\,d\\sigma\\ge\\iint_D g\\,d\\sigma$', '两者相等', '无法比较'], ans:0, exp:'保序性：被积函数逐点不大的，积分也不大。'},
{id:'q3', q:'设 $D: x^2+y^2\\le4$，$M$ 为 $f(x,y)=x^2+y^2$ 在 $D$ 上的最大值，则 $\\iint_D f\\,d\\sigma \\le$ ？', opts:['$4\\pi$', '$16\\pi$', '$8\\pi$', '$2\\pi$'], ans:1, exp:'估值不等式：积分 $\\le M\\times$ 面积 $=4\\times\\pi\\cdot2^2=16\\pi$（实际值为 $8\\pi$，但不等式右端取上界 $16\\pi$）。'}
]

},

'7-2': {
title: '直角坐标下的计算',
secs: [
['why', '为什么学这一节',
`<p>直角坐标累次积分是二重积分的基本功：<b>X 型（先 y 后 x）</b>与 <b>Y 型（先 x 后 y）</b>两种穿线定限法必须形成条件反射。定限错了全盘皆输，这节就是练"看图定限"。</p>`],
['think', '直观理解',
`<p><b>穿线法定限：</b>X 型区域：$x$ 固定在 $[a,b]$ 内，用一条竖线从下往上穿过区域——入口曲线 $y=\\varphi_1(x)$ 是内层下限，出口 $y=\\varphi_2(x)$ 是上限：</p>
$$ \\iint_D f\\,d\\sigma=\\int_a^b dx\\int_{\\varphi_1(x)}^{\\varphi_2(x)}f(x,y)dy $$
<blockquote>先竖着切完一条（对 y 积出关于 x 的式子），再横着扫过全区域（对 x 积）。切不动就换 Y 型横着切。</blockquote>`],
['def', '定义与公式',
`<p><b>① X 型：</b>$D:\\ a\\le x\\le b,\\ \\varphi_1(x)\\le y\\le\\varphi_2(x)$，先 $y$ 后 $x$。</p>
<p><b>② Y 型：</b>$D:\\ c\\le y\\le d,\\ \\psi_1(y)\\le x\\le\\psi_2(y)$，先 $x$ 后 $y$。</p>
<p><b>③ 内层积分变量视为"常数暂存"</b>：$\\int_0^1 x^2 dy=x^2$（对 $y$ 积时 $x$ 是常数）。</p>
<p><b>④ 选序原则：</b>① 内层原函数好求；② 区域不被"切分"（一条穿线进出次数各一）。两者冲突时换序。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 计算 $\\iint_D xy\\,d\\sigma$，$D$ 由 $y=x$ 与 $y=x^2$ 围成</div>
<p>区域：$0\\le x\\le1$，下 $y=x^2$、上 $y=x$（画图！直线在抛物线上方）。</p>
$$ \\int_0^1 dx\\int_{x^2}^{x}xy\\,dy=\\int_0^1 x\\cdot\\frac{y^2}{2}\\Big|_{x^2}^{x}dx=\\frac12\\int_0^1(x^3-x^5)dx=\\frac12\\left(\\frac14-\\frac16\\right)=\\frac{1}{24} $$
</div>
<div class="ex-box"><div class="ex-t">例 2（选序）计算 $\\int_0^1 dx\\int_x^{\\sqrt x}\\dfrac{\\sin y}{y}dy$</div>
<p>$\\tfrac{\\sin y}{y}$ 没有初等原函数——先 y 后 x 走不通，<b>必须换序</b>。原区域：$0\\le x\\le1$，$x\\le y\\le\\sqrt x$，换序后 $y\\in[0,1]$，$y^2\\le x\\le y$：</p>
$$ \\int_0^1\\frac{\\sin y}{y}dy\\int_{y^2}^{y}dx=\\int_0^1\\frac{\\sin y}{y}(y-y^2)dy=\\int_0^1\\sin y(1-y)dy=1-\\sin1 $$
<p class="muted">见 $\\tfrac{\\sin y}{y},\\ e^{-y^2},\\ \\tfrac{1}{\\ln y}$ 立刻警惕：这类"积不动"的函数是换序信号。</p></div>`],
['warn', '易错点',
`<p>• 定限先<b>画图</b>；不画图靠想象定限是事故第一来源。</p>
<p>• 内层上下限可以含外层变量，但<b>外层限必须是常数</b>。</p>
<p>• 对 $y$ 积分时 $x$ 是常数，$\\int xy\\,dy=x\\cdot\\tfrac{y^2}{2}$——系数与变量不要混。</p>`]
],
quiz: [
{id:'q1', q:'X 型区域 $D: 0\\le x\\le1,\\ x\\le y\\le 2x$，化成累次积分是？', opts:['$\\int_0^1dy\\int_x^{2x}f dx$', '$\\int_0^1dx\\int_x^{2x}f dy$', '$\\int_0^{2x}dx\\int_0^1 f dy$', '$\\int_0^1dx\\int_0^{2x} f dy$'], ans:1, exp:'X 型：外层 $x$ 从 0 到 1（常数限），内层 $y$ 从 $x$ 到 $2x$。'},
{id:'q2', q:'被积函数为 $e^{-y^2}$ 时，合理的积分次序是？', opts:['先 $y$ 后 $x$', '先 $x$ 后 $y$', '无法计算', '只能极坐标'], ans:1, exp:'$e^{-y^2}$ 对 $y$ 无初等原函数，必须后积 $y$（先积 $x$）。'},
{id:'q3', q:'$\\int_0^1 dy\\int_0^{y} x\\,dx$ 等于？', opts:['$\\dfrac14$', '$\\dfrac16$', '$\\dfrac12$', '$\\dfrac13$'], ans:1, exp:'内层 $\\tfrac{y^2}{2}$；$\\int_0^1\\tfrac{y^2}{2}dy=\\tfrac16$。'}
]

},

'7-3': {
title: '极坐标下的计算',
secs: [
['why', '为什么学这一节',
`<p>圆域、环域、扇形区域上的二重积分，直角坐标会算到怀疑人生，极坐标却是"量身定制"。看到 $x^2+y^2$ 就条件反射考虑极坐标——这是数二计算的性价比之王。</p>`],
['think', '直观理解',
`<p><b>换一种铺网格方式：</b>直角坐标用"方格"铺地，极坐标用"<b>同心圆 + 放射线</b>"铺地。一个小格子的面积不是 $dr\\cdot d\\theta$，而是"半径 $r$ × 弧长 $rd\\theta$ × 厚 $dr$" $=r\\,dr\\,d\\theta$——那个多出来的 $r$ 是"远处的格子更大"的补偿。</p>
<blockquote>换算三件套：$x=r\\cos\\theta,\\ y=r\\sin\\theta,\\ d\\sigma=r\\,dr\\,d\\theta$。</blockquote>`],
['def', '定义与公式',
`<p><b>① 极坐标变换公式：</b></p>
$$ \\iint_D f(x,y)d\\sigma=\\int_\\alpha^\\beta d\\theta\\int_{r_1(\\theta)}^{r_2(\\theta)}f(r\\cos\\theta, r\\sin\\theta)\\, r\\,dr $$
<p><b>② 常见区域定限：</b>圆域 $x^2+y^2\\le R^2$：$\\theta\\in[0,2\\pi],\\ r\\in[0,R]$；上半圆：$\\theta\\in[0,\\pi]$；环域：$r$ 从 $R_1$ 到 $R_2$。</p>
<p><b>③ 常用曲线的极坐标方程：</b>$x^2+y^2=R^2\\to r=R$；$x^2+y^2=2Rx\\to r=2R\\cos\\theta$；$y=x\\to\\theta=\\tfrac{\\pi}{4}$。</p>
<p><b>④ 被积函数代换：</b>$x^2+y^2\\to r^2$，$\\sqrt{x^2+y^2}\\to r$。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（经典）计算 $\\iint_D e^{-x^2-y^2}d\\sigma$，$D: x^2+y^2\\le R^2$</div>
<p>直角坐标下 $e^{-x^2}$ 积不动，极坐标秒杀：</p>
$$ \\int_0^{2\\pi}d\\theta\\int_0^R e^{-r^2}\\,r\\,dr=2\\pi\\cdot\\frac{1-e^{-R^2}}{2}=\\pi(1-e^{-R^2}) $$
<p class="muted">这正是推导概率积分 $\\int_{-\\infty}^{+\\infty}e^{-x^2}dx=\\sqrt\\pi$ 的经典路线。</p></div>
<div class="ex-box"><div class="ex-t">例 2 计算 $\\iint_D \\sqrt{x^2+y^2}\\,d\\sigma$，$D: x^2+y^2\\le 2x$</div>
<p>边界 $r=2\\cos\\theta$（过原点、圆心 $(1,0)$ 的圆），$\\theta\\in[-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2}]$：</p>
$$ \\int_{-\\frac{\\pi}{2}}^{\\frac{\\pi}{2}}d\\theta\\int_0^{2\\cos\\theta}r\\cdot r\\,dr=\\int_{-\\frac{\\pi}{2}}^{\\frac{\\pi}{2}}\\frac{8\\cos^3\\theta}{3}d\\theta=\\frac{16}{3}\\int_0^{\\frac{\\pi}{2}}\\cos^3\\theta\\,d\\theta=\\frac{16}{3}\\cdot\\frac{2}{3}=\\frac{32}{9} $$
<p class="muted">先画图认圆（$x^2+y^2=2x$ 配方得 $(x-1)^2+y^2=1$），再用华里士公式收尾。</p></div>`],
['warn', '易错点',
`<p>• $d\\sigma=r\\,drd\\theta$ 的 <b>$r$ 是命中率的头号杀手</b>，写变换公式时先把它写上。</p>
<p>• 定 $\\theta$ 范围靠画图：偏心圆 $r=2R\\cos\\theta$ 的 $\\theta$ 不再是 $[0,2\\pi]$。</p>
<p>• 被积函数里的 $\\sqrt{x^2+y^2}$ 换成 $r$（不是 $r^2$）。</p>`]
],
quiz: [
{id:'q1', q:'极坐标下 $\\iint_D f\\,d\\sigma$ 中的面积微元是？', opts:['$dr\\,d\\theta$', '$r\\,dr\\,d\\theta$', '$r^2drd\\theta$', '$dxdy$'], ans:1, exp:'小格子面积 = $r\\,dr\\,d\\theta$，$r$ 因子来自弧长 $rd\\theta$。'},
{id:'q2', q:'圆 $x^2+y^2=2y$ 的极坐标方程是？', opts:['$r=2\\cos\\theta$', '$r=2\\sin\\theta$', '$r=2$', '$r^2=2$'], ans:1, exp:'$x=r\\cos\\theta, y=r\\sin\\theta$ 代入：$r^2=2r\\sin\\theta\\Rightarrow r=2\\sin\\theta$（圆心在 y 轴）。'},
{id:'q3', q:'$\\iint_D (x^2+y^2)d\\sigma$，$D: x^2+y^2\\le1$ 等于？', opts:['$\\pi$', '$\\dfrac{\\pi}{2}$', '$\\dfrac{\\pi}{4}$', '1'], ans:1, exp:'$\\int_0^{2\\pi}d\\theta\\int_0^1 r^2\\cdot r dr=2\\pi\\cdot\\tfrac14=\\tfrac{\\pi}{2}$。'}
]

},

'7-4': {
title: '交换积分次序与对称性技巧',
secs: [
['why', '为什么学这一节',
`<p>换序与对称性是二重积分的两把"外挂"：换序救活积不动的函数，对称性把计算量砍半。历年解答题中，"先换序再计算"几乎是指定动作。</p>`],
['think', '直观理解',
`<p><b>换序三步：</b>① 由给出的累次限<b>反画区域</b>；② 重新用另一方向穿线定限；③ 写出新累次积分。区域是"不变的实体"，累次式只是它的两种"切法"。</p>
<blockquote><b>对称性两个开关：</b>区域关于 y 轴对称 → 看被积函数对 $x$ 的奇偶；区域关于 $x$ 轴对称 → 看对 $y$ 的奇偶。<b>奇零偶倍</b>。</blockquote>`],
['def', '定义与公式',
`<p><b>① 奇偶对称性：</b>$D$ 关于 $y$ 轴对称时</p>
$$ \\iint_D f\\,d\\sigma=\\begin{cases}0, & f(-x,y)=-f(x,y)\\\\ 2\\iint_{D_{右}}f\\,d\\sigma, & f(-x,y)=f(x,y)\\end{cases} $$
<p><b>② 轮换对称性：</b>若把 $D$ 中 $x,y$ 互换后区域不变，则 $\\iint_D f(x,y)d\\sigma=\\iint_D f(y,x)d\\sigma$。妙用：$\\iint_D x^2 d\\sigma=\\iint_D y^2 d\\sigma=\\tfrac12\\iint_D(x^2+y^2)d\\sigma$。</p>
<p><b>③ 换序流程：</b>读限 → 画区域 → 改写为另一型 → 重定限。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（换序）交换 $\\displaystyle\\int_0^1 dy\\int_{y}^{\\sqrt y} f(x,y)dx$ 的次序</div>
<p>区域：$0\\le y\\le1,\\ y\\le x\\le\\sqrt y$，即直线 $x=y$ 与抛物线 $x=\\sqrt y$（即 $y=x^2$）之间。</p>
<p>换成 X 型：$0\\le x\\le1$，下界 $y=x^2$、上界 $y=x$：</p>
$$ \\int_0^1 dx\\int_{x^2}^{x} f(x,y)dy $$
</div>
<div class="ex-box"><div class="ex-t">例 2（对称性）计算 $\\iint_D (xy+\\sin x\\sin y)\\,d\\sigma$，$D: x^2+y^2\\le1$</div>
<p>$D$ 关于两条轴都对称。$xy$ 关于 $x$ 是奇函数（也关于 $y$ 奇）→ 积分 0；$\\sin x\\sin y$ 同理为奇 → 0。</p>
$$ I=0 $$
<p class="muted">先扫一眼奇偶，三秒省三分钟。</p></div>
<div class="ex-box"><div class="ex-t">例 3（轮换对称）计算 $\\iint_D x^2 d\\sigma$，$D: x^2+y^2\\le R^2$</div>
<p>由轮换对称 $\\iint x^2=\\iint y^2$，故</p>
$$ \\iint_D x^2 d\\sigma=\\frac12\\iint_D(x^2+y^2)d\\sigma=\\frac12\\int_0^{2\\pi}d\\theta\\int_0^R r^3dr=\\frac{\\pi R^4}{4} $$
</div>`],
['warn', '易错点',
`<p>• 换序前必须<b>画图</b>，直接对调内外限是错误操作（区域形状会变）。</p>
<p>• 用对称性的前提是<b>区域和函数同时满足</b>——区域不对称或函数不奇不偶都不能用。</p>
<p>• 轮换对称只对"x、y 互换后区域不变"的图形成立（圆、正方形可；偏心圆不可）。</p>`]
],
quiz: [
{id:'q1', q:'交换 $\\int_0^1 dy\\int_0^{y}f\\,dx$ 的次序得？', opts:['$\\int_0^1 dx\\int_x^{1}f\\,dy$', '$\\int_0^1 dx\\int_0^{x}f\\,dy$', '$\\int_0^1 dy\\int_0^{x}f\\,dx$', '$\\int_0^1 dx\\int_0^{1}f\\,dy$'], ans:0, exp:'区域为三角形 $0\\le x\\le y\\le1$；换 X 型：$x$ 从 0 到 1，$y$ 从 $x$ 到 1。'},
{id:'q2', q:'$D$ 关于 $y$ 轴对称，$f(x,y)=x^3y$，则 $\\iint_D f\\,d\\sigma$ 等于？', opts:['$2\\iint_{D_{右}}$', '0', '不适用对称性', '$\\iint_D y\\,d\\sigma$'], ans:1, exp:'$x^3y$ 关于 $x$ 是奇函数（$(-x)^3y=-x^3y$），区域对称 → 积分为 0。'},
{id:'q3', q:'利用轮换对称，$\\iint_D (3x^2-2y^2)d\\sigma$（$D$ 为圆 $x^2+y^2\\le R^2$）可化为？', opts:['$\\iint_D x^2 d\\sigma$', '$\\dfrac{1}{2}\\iint_D (x^2+y^2)d\\sigma$', '$\\iint_D (x^2+y^2)d\\sigma$', '$0$'], ans:1, exp:'$\\iint x^2=\\iint y^2=\\tfrac12\\iint(x^2+y^2)$，故原式 $=3\\cdot\\tfrac12-2\\cdot\\tfrac12=\\tfrac12$ 倍的 $\\iint(x^2+y^2)d\\sigma$。'}
]

}

}
};
