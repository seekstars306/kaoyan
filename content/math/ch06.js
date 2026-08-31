/* ===== 数学 · 第6章 多元函数微分学 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['math/ch06'] = {

lessons: {

'6-1': {
title: '二元函数的极限与连续',
secs: [
['why', '为什么学这一节',
`<p>从一元到多元，最大的观念冲击在极限：<b>"以任何方式"趋近都要同一个结果</b>。这条"多路统一"的要求，是判断二元函数极限存在与否、以及多元函数在一点是否连续的关键，也是选择题的常客。</p>`],
['think', '直观理解',
`<p>一元的 $x\\to0$ 只有两个方向（左、右）；二元的 $(x,y)\\to(0,0)$ 是在平面上<b>从四面八方</b>逼近：沿 x 轴、沿 y 轴、沿直线 $y=kx$、沿抛物线 $y=x^2$……</p>
<blockquote><b>不同路径极限不同 ⇒ 极限不存在</b>（证"不存在"的最快武器）。<br>但沿有限条路径结果相同<b>不能</b>证明极限存在——路径有无数条。</blockquote>`],
['def', '定义与公式',
`<p><b>① 二元极限（描述）：</b>当 $(x,y)$ 以任意方式趋于 $(x_0,y_0)$ 时 $f(x,y)$ 都趋于常数 $A$，记 $\\lim\\limits_{(x,y)\\to(x_0,y_0)}f(x,y)=A$。</p>
<p><b>② 连续：</b>$\\lim\\limits_{(x,y)\\to(x_0,y_0)}f(x,y)=f(x_0,y_0)$。多元初等函数在其定义区域上连续。</p>
<p><b>③ 常用判别技巧：</b></p>
<p>• 沿 $y=kx$ 代入得含 $k$ 的结果 → 极限不存在（结果随 $k$ 变）；</p>
<p>• 夹逼/有界乘无穷小仍是二元极限的主力量具。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（证不存在）讨论 $\\lim\\limits_{(x,y)\\to(0,0)}\\dfrac{xy}{x^2+y^2}$</div>
<p>沿 $y=kx$：$\\dfrac{kx^2}{(1+k^2)x^2}=\\dfrac{k}{1+k^2}$，随 $k$ 变化（$k=0$ 得 0，$k=1$ 得 $\\tfrac12$）。</p>
<p>极限<b>不存在</b>。</p></div>
<div class="ex-box"><div class="ex-t">例 2（求极限）求 $\\lim\\limits_{(x,y)\\to(0,0)}\\dfrac{x^2 y}{x^2+y^2}$</div>
<p>放缩：$\\left|\\dfrac{x^2}{x^2+y^2}\\right|\\le1$（有界），$y\\to0$（无穷小）：</p>
$$ \\text{极限}=0 $$
<p class="muted">有界 × 无穷小的套路在二元里照常工作。</p></div>`],
['warn', '易错点',
`<p>• "沿 $y=kx$ 极限与 $k$ 无关" ≠ 极限存在（还得试 $y=x^2$ 等弯曲路径，或用夹逼证存在）。</p>
<p>• 二元极限存在不能推出沿每条路径的"单路极限"的逆命题，逻辑方向只有"存在 ⇒ 各路相同"。</p>
<p>• 分母趋于 0 的判定先整体放缩，别把 $x,y$ 拆开各自处理。</p>`]
],
quiz: [
{id:'q1', q:'$\\lim\\limits_{(x,y)\\to(0,0)}\\dfrac{xy}{x^2+y^2}$ 是否存在？', opts:['存在且为 0', '存在且为 $\\tfrac12$', '不存在', '存在且为 1'], ans:2, exp:'沿不同直线 $y=kx$ 得不同值 $\\tfrac{k}{1+k^2}$，故不存在。'},
{id:'q2', q:'二元函数 $f(x,y)$ 在 $(x_0,y_0)$ 连续要求？', opts:['只要求分别对 x、y 连续', '极限存在即可', '极限存在且等于该点函数值', '偏导数存在'], ans:2, exp:'连续 = 重极限存在且等于函数值。偏导存在推不出连续（与一元"可导⇒连续"不同！）。'},
{id:'q3', q:'$\\lim\\limits_{(x,y)\\to(0,0)}(x^2+y^2)\\sin\\dfrac{1}{x^2+y^2}$ 等于？', opts:['1', '0', '不存在（振荡）', '$\\infty$'], ans:1, exp:'$x^2+y^2\\to0$ 无穷小 × 有界量 $\\sin(\\cdot)$ = 无穷小，极限 0。'}
]

},

'6-2': {
title: '偏导数',
secs: [
['why', '为什么学这一节',
`<p>偏导数是多元函数的"单变量视角"：只让一个变量动、其余冻结。它是全微分、多元极值、条件极值的计算基础。数二自 2021 年纳入多元内容后，偏导计算已成解答题常客。</p>`],
['think', '直观理解',
`<p><b>站在山坡上感受坡度：</b>面朝正东走一步的坡度是 $\\dfrac{\\partial z}{\\partial x}$，面朝正北是 $\\dfrac{\\partial z}{\\partial y}$。<b>求偏导时，另一个变量就是常数</b>——对 $x$ 求导，把 $y$ 当数字看。</p>
<blockquote>$z=x^2 y$：对 $x$ 求导（$y$ 冻结）$=2xy$；对 $y$ 求导（$x$ 冻结）$=x^2$。</blockquote>`],
['def', '定义与公式',
`<p><b>① 定义：</b></p>
$$ \\frac{\\partial z}{\\partial x}=\\lim_{\\Delta x\\to0}\\frac{f(x_0+\\Delta x, y_0)-f(x_0,y_0)}{\\Delta x} $$
<p><b>② 高阶偏导：</b>$\\dfrac{\\partial^2 z}{\\partial x\\partial y}=\\dfrac{\\partial}{\\partial y}\\left(\\dfrac{\\partial z}{\\partial x}\\right)$。当二阶偏导<b>连续</b>时，$\\dfrac{\\partial^2 z}{\\partial x\\partial y}=\\dfrac{\\partial^2 z}{\\partial y\\partial x}$（求导次序可换）。</p>
<p><b>③ 一元结论对照：</b>偏导存在<b>不能</b>推出连续（$f=\\tfrac{xy}{x^2+y^2}$ 在原点两偏导都是 0，但不连续）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 求 $z=x^3 y^2+e^{xy}$ 的偏导</div>
$$ \\frac{\\partial z}{\\partial x}=3x^2y^2+ye^{xy},\\qquad \\frac{\\partial z}{\\partial y}=2x^3y+xe^{xy} $$
</div>
<div class="ex-box"><div class="ex-t">例 2（混合偏导）验证 $z=\\ln(x^2+y^2)$ 满足 $\\dfrac{\\partial^2 z}{\\partial x\\partial y}=\\dfrac{\\partial^2 z}{\\partial y\\partial x}$</div>
<p>$z_x=\\dfrac{2x}{x^2+y^2}$，再对 $y$：$\\dfrac{-2x\\cdot2y}{(x^2+y^2)^2}=\\dfrac{-4xy}{(x^2+y^2)^2}$。</p>
<p>$z_y=\\dfrac{2y}{x^2+y^2}$，再对 $x$：同得 $\\dfrac{-4xy}{(x^2+y^2)^2}$。相等 ✓。</p></div>`],
['warn', '易错点',
`<p>• 对 $x$ 求偏导时 $y$ 是常数，但乘在 $e^{xy}$、$\\sin(xy)$ 里的 $y$ 要作为链式系数出现。</p>
<p>• "偏导存在 ⇒ 连续"在多元<b>不成立</b>，与一元不同，概念题最爱考。</p>
<p>• 混合偏导相等需要"连续"条件，分段函数分段点处要另用定义。</p>`]
],
quiz: [
{id:'q1', q:'$z=x^2+xy+y^2$，则 $\\dfrac{\\partial z}{\\partial x}$ 等于？', opts:['$2x+y$', '$x+2y$', '$2x$', '$2x+2y$'], ans:0, exp:'对 $x$ 求导，$y$ 视为常数：$2x+y$。'},
{id:'q2', q:'$z=\\sin(xy)$，则 $\\dfrac{\\partial z}{\\partial x}$ 等于？', opts:['$\\cos(xy)$', '$y\\cos(xy)$', '$x\\cos(xy)$', '$-y\\sin(xy)$'], ans:1, exp:'链式：外层 $\\cos(xy)$ × 内层对 $x$ 的导数 $y$。'},
{id:'q3', q:'二元函数偏导数存在是函数连续的什么条件？', opts:['充分不必要', '必要不充分', '充要', '既不充分也不必要'], ans:3, exp:'偏导存在推不出连续（反例 $\\tfrac{xy}{x^2+y^2}$）；连续也推不出偏导存在（如 $\\sqrt{x^2+y^2}$ 在原点）。两者独立。'}
]

},

'6-3': {
title: '全微分',
secs: [
['why', '为什么学这一节',
`<p>全微分是"平面近似"：用切平面代替曲面。它把"两个方向都要动"时函数的增量一次说清，是多元可微性的主角，也常出现在求增量近似值的小题中。</p>`],
['think', '直观理解',
`<p>矩形面积 $S=xy$：长宽各变一点，$\\Delta S=(x+\\Delta x)(y+\\Delta y)-xy=x\\Delta y+y\\Delta x+\\Delta x\\Delta y$。</p>
<blockquote>前两项是"长宽各自贡献"的<b>线性主部</b>（全微分 $dS=y\\,dx+x\\,dy$），最后一项 $\\Delta x\\Delta y$ 是更高阶的小量——多元版"切线代替曲线"。</blockquote>`],
['def', '定义与公式',
`<p><b>① 全微分定义：</b>若 $\\Delta z=A\\Delta x+B\\Delta y+o(\\rho)$（$\\rho=\\sqrt{\\Delta x^2+\\Delta y^2}$），称 $z$ 可微，且</p>
$$ dz=\\frac{\\partial z}{\\partial x}dx+\\frac{\\partial z}{\\partial y}dy $$
<p><b>② 逻辑链（多元版）：</b></p>
$$ \\text{偏导连续} \\Rightarrow \\text{可微} \\Rightarrow \\begin{cases}\\text{偏导存在}\\\\ \\text{连续}\\end{cases} $$`
],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 求 $z=xy^2$ 在点 $(1,2)$ 处的全微分</div>
<p>$z_x=y^2=4$，$z_y=2xy=4$。</p>
$$ dz\\big|_{(1,2)}=4\\,dx+4\\,dy $$
</div>
<div class="ex-box"><div class="ex-t">例 2（近似）用全微分估计 $(1.02)^{2.97}$</div>
<p>取 $z=x^y$，$(x_0,y_0)=(1,3)$，$\\Delta x=0.02,\\ \\Delta y=-0.03$。</p>
<p>$z_x=yx^{y-1}=3$，$z_y=x^y\\ln x=0$。$\\Delta z\\approx3(0.02)+0(-0.03)=0.06$。</p>
$$ (1.02)^{2.97}\\approx 1+0.06=1.06 $$
</div>`],
['warn', '易错点',
`<p>• 可微 ⇒ 偏导存在，但偏导存在<b>不足以</b>可微——必须再验证 $\\lim\\dfrac{\\Delta z-[z_x\\Delta x+z_y\\Delta y]}{\\rho}=0$。</p>
<p>• 近似计算要把"基点"选在好算的整点附近，增量给对符号。</p>`]
],
quiz: [
{id:'q1', q:'$z=e^{xy}$ 的全微分是？', opts:['$e^{xy}(y\\,dx+x\\,dy)$', '$e^{xy}(dx+dy)$', '$ye^{xy}dx$', '$e^{xy}dy$'], ans:0, exp:'$z_x=ye^{xy}$，$z_y=xe^{xy}$，$dz=z_xdx+z_ydy$。'},
{id:'q2', q:'多元函数"可微"与"偏导存在"的关系是？', opts:['等价', '可微 ⇒ 偏导存在，反之不然', '偏导存在 ⇒ 可微，反之不然', '无关'], ans:1, exp:'可微是更强的要求：偏导只是"两个方向的斜率"，可微要求"切平面近似"整体成立。'},
{id:'q3', q:'若 $z$ 的两个偏导<b>连续</b>，则 $z$ 一定？', opts:['不可微', '可微', '仅偏导存在', '不连续'], ans:1, exp:'偏导连续是可微的充分条件（多元微分学基本定理）。'}
]

},

'6-4': {
title: '复合函数与隐函数求导',
secs: [
['why', '为什么学这一节',
`<p>多元复合结构（$z=f(u,v),\\ u=u(x,y)$）的链式求导，是多元解答题的算力核心；隐函数求导（方程定 $y(x)$ 或由方程组确定多函数）则常与偏导、全微分组合出题。</p>`],
['think', '直观理解',
`<p><b>多元链式法则 = 走路线图数路径。</b>$z$ 到 $x$ 有两条路：经 $u$、经 $v$。总变化率 = 各条路径"逐层导数相乘、再相加"：</p>
$$ \\frac{\\partial z}{\\partial x}=\\frac{\\partial z}{\\partial u}\\cdot\\frac{\\partial u}{\\partial x}+\\frac{\\partial z}{\\partial v}\\cdot\\frac{\\partial v}{\\partial x} $$
<blockquote><b>隐函数求导 = 方程两边求导 + 解出 $y\'$。</b>公式版：$F(x,y)=0$ 则 $\\dfrac{dy}{dx}=-\\dfrac{F_x}{F_y}$——"负的、上 $x$ 下 $y$"。</blockquote>`],
['def', '定义与公式',
`<p><b>① 多元链式：</b>$z=f(u,v)$，$u=u(x,y)$，$v=v(x,y)$：</p>
$$ \\frac{\\partial z}{\\partial x}=z_u u_x+z_v v_x,\\qquad \\frac{\\partial z}{\\partial y}=z_u u_y+z_v v_y $$
<p><b>② 一个隐方程：</b>$F(x,y)=0$：$\\dfrac{dy}{dx}=-\\dfrac{F_x}{F_y}$；$F(x,y,z)=0$ 定 $z(x,y)$：$\\dfrac{\\partial z}{\\partial x}=-\\dfrac{F_x}{F_z}$。</p>
<p><b>③ 方程组：</b>每个方程两边求导（记 $y,z$ 都是 $x$ 的函数），解线性方程组。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（链式）$z=u^2v$，$u=x+y$，$v=xy$，求 $\\dfrac{\\partial z}{\\partial x}$</div>
<p>$z_u=2uv,\\ z_v=u^2$；$u_x=1,\\ v_x=y$。</p>
$$ z_x=2uv\\cdot1+u^2\\cdot y=2(x+y)xy+(x+y)^2y $$
</div>
<div class="ex-box"><div class="ex-t">例 2（隐函数）设 $e^z-xyz=0$ 确定 $z=z(x,y)$，求 $\\dfrac{\\partial z}{\\partial x}$</div>
<p>$F=e^z-xyz$：$F_x=-yz$，$F_z=e^z-xy$。</p>
$$ z_x=-\\frac{F_x}{F_z}=\\frac{yz}{e^z-xy} $$
<p class="muted">用公式法前先写明 $F$，把所有项移到一边。</p></div>`],
['warn', '易错点',
`<p>• 链式法则<b>漏路径</b>：$z$ 到 $x$ 若有两条路就得两项相加，漏一项结果全错。</p>
<p>• $z=f(x, xy)$ 这类"既有直接路径又有复合路径"的题，画路线图最保险。</p>
<p>• 隐函数公式法里 $F_x$ 是"把 $y,z$ 全当常数"对 $x$ 求导——与"方程确定函数后求导"概念不同，别混。</p>`]
],
quiz: [
{id:'q1', q:'$z=u e^{v}$，$u=x^2$，$v=x+y$，则 $\\dfrac{\\partial z}{\\partial x}$ 含两条路径的项数为？', opts:['0', '1', '2', '3'], ans:2, exp:'$z$ 经 $u$ 到 $x$、经 $v$ 到 $x$，两条路径，$z_x=z_u\\cdot2x+z_v\\cdot1$。'},
{id:'q2', q:'$F(x,y)=x^2+y^2-1=0$ 确定的 $y(x)$，$\\dfrac{dy}{dx}$ 等于？', opts:['$\\dfrac{x}{y}$', '$-\\dfrac{x}{y}$', '$-2x$', '$\\dfrac{2x}{2y}$'], ans:1, exp:'$F_x=2x$，$F_y=2y$，$y\'=-\\tfrac{2x}{2y}=-\\tfrac xy$（与隐函数直接求导一致）。'},
{id:'q3', q:'设 $z=f(xy, \\tfrac{x}{y})$，$f$ 有连续偏导，则 $\\dfrac{\\partial z}{\\partial x}$ 等于？', opts:['$y f_1\' + \\tfrac1y f_2\'$', '$x f_1\'$', '$f_1\'+f_2\'$', '$y f_1\'-\\tfrac1y f_2\'$'], ans:0, exp:'$u=xy$ 对 $x$ 导 $y$；$v=\\tfrac xy$ 对 $x$ 导 $\\tfrac1y$。记号 $f_1\'$ 表 $f$ 对第一个位置变量求偏导。'}
]

},

'6-5': {
title: '多元函数的极值与条件极值',
secs: [
['why', '为什么学这一节',
`<p>多元极值是数二多元部分的应用高点：无条件极值走"一阶偏导为零 + 二阶判别"流程；条件极值（拉格朗日乘数法）解决"在某约束下求最值"——两种方法都是解答题模板。</p>`],
['think', '直观理解',
`<p><b>无条件极值：</b>山顶、谷底——四周围都是"下坡/上坡"，一阶偏导（两个方向的坡度）都必须为零。</p>
<blockquote><b>条件极值 = 沿着围栏找最高点。</b>人被拴在曲线 $g(x,y)=0$ 上，最高点处：坡度方向恰好被"围栏方向 + 一股拉力"平衡——拉力大小就是拉格朗日乘数 $\\lambda$。</blockquote>
<p><b>二阶判别的记忆法：</b>$AC-B^2$ 是"碗的弯曲度指标"：为正且 $A>0$ 碗口朝上（极小）；为正且 $A<0$ 碗口朝下（极大）；为负是马鞍（无极值）。</p>`],
['def', '定义与公式',
`<p><b>① 无条件极值流程：</b>解 $\\begin{cases}f_x=0\\\\ f_y=0\\end{cases}$ 得驻点 → 计算</p>
$$ A=f_{xx},\\quad B=f_{xy},\\quad C=f_{yy} $$
<p>判别：$AC-B^2>0$ 且 $A>0$：极小；$AC-B^2>0$ 且 $A<0$：极大；$AC-B^2<0$：非极值；$=0$：失效另判。</p>
<p><b>② 拉格朗日乘数法：</b>求 $f(x,y)$ 在约束 $g(x,y)=0$ 下的极值，令</p>
$$ L(x,y,\\lambda)=f(x,y)+\\lambda g(x,y) $$
<p>解 $\\begin{cases}L_x=0\\\\ L_y=0\\\\ L_\\lambda=0\\end{cases}$，比较各解的 $f$ 值（实际问题由意义定最值）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（无条件极值）求 $f(x,y)=x^3+y^3-3xy$ 的极值</div>
<p>$f_x=3x^2-3y=0,\\ f_y=3y^2-3x=0$ → $y=x^2$ 且 $x=y^2$ → 实驻点 $(0,0)$ 与 $(1,1)$。</p>
<p>$A=6x,\\ B=-3,\\ C=6y$。</p>
<p>• $(0,0)$：$AC-B^2=0-9=-9<0$，非极值（马鞍点）。</p>
<p>• $(1,1)$：$AC-B^2=36-9=27>0$，$A=6>0$ → <b>极小值 $f(1,1)=1+1-3=-2$</b>。</p></div>
<div class="ex-box"><div class="ex-t">例 2（拉格朗日）表面积 $2xy+2yz+2xz=6a^2$ 的长方体（开顶视为按题给式）求最大体积——以"$x+y+z=a$ 下最大 $xyz$"示范</div>
<p>$L=xyz+\\lambda(x+y+z-a)$：$L_x=yz+\\lambda=0,\\ L_y=xz+\\lambda=0,\\ L_z=xy+\\lambda=0$。</p>
<p>三式相减得 $x=y=z$，代入约束 $x=y=z=\\tfrac a3$，最大体积 $\\dfrac{a^3}{27}$。</p>
<p class="muted">对称约束常给对称解；"乘数方程两两相减"是解方程组的标准技巧。</p></div>`],
['warn', '易错点',
`<p>• 驻点要先解<b>方程组</b>（两个偏导同时为零），只解一个方程是常见半途而废。</p>
<p>• $AC-B^2<0$ 时无论 $A$ 正负都<b>不是极值</b>（马鞍面情形）。</p>
<p>• 拉格朗日法求出的点是"候选点"，闭区域最值还要比较边界与内部驻点。</p>`]
],
quiz: [
{id:'q1', q:'$f(x,y)=x^2+y^2-2x$ 的驻点是？', opts:['$(0,0)$', '$(1,0)$', '$(0,1)$', '$(2,0)$'], ans:1, exp:'$f_x=2x-2=0\\Rightarrow x=1$；$f_y=2y=0\\Rightarrow y=0$。驻点 $(1,0)$（且为极小值点 $-1$）。'},
{id:'q2', q:'驻点处 $AC-B^2<0$ 说明该点？', opts:['极小值点', '极大值点', '不是极值点（马鞍点）', '无法判断'], ans:2, exp:'$AC-B^2<0$ 时两主方向弯曲相反，是马鞍面形状，无极值。'},
{id:'q3', q:'用拉格朗日乘数法求 $f$ 在 $g=0$ 下的极值，构造的函数是？', opts:['$L=f+\\lambda g$', '$L=f\\cdot g$', '$L=g+\\lambda f$', '$L=f-g$'], ans:0, exp:'标准构造 $L=f+\\lambda g$（$\\lambda$ 符号可取负，不影响方程组解）。'}
]

}

}
};
