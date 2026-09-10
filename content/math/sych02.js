/* ===== 数学 · 数一扩展 扩2 三重积分与曲线曲面积分 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['math/sych02'] = {

lessons: {

'2-1': {
title: '三重积分',
secs: [
['why', '为什么学这一节',
`<p>三重积分把累加推进到空间区域（密度→质量）。计算三大路线：投影法（先一后二）、截面法（先二后一）、柱面/球面坐标——认清区域形状选路线是全部技巧。</p>`],
['think', '直观理解',
`<p><b>投影法 = 压扁再算。</b>把空间区域 $\\Omega$ 压到 $xOy$ 面得投影 $D$；对每个 $(x,y)\\in D$，竖直方向从底 $z_1(x,y)$ 穿到顶 $z_2(x,y)$：</p>
$$ \\iiint_\\Omega f\\,dV=\\iint_D dxdy\\int_{z_1}^{z_2}f\\,dz $$
<blockquote><b>截面法</b>反过来：先用水平面切 $\\Omega$。若 $f\\equiv1$，已知截面面积 $S(z)$ 就有体积 $\\iiint_\\Omega dV=\\int S(z)dz$；一般被积函数则要计算截面积分 $\\iiint_\\Omega f\\,dV=\\int dz\\iint_{D_z}f\\,dxdy$——"豆腐切片"。</blockquote>
<p><b>柱面坐标 = 极坐标 + z</b>（$dV=r\\,drd\\theta dz$）；<b>球面坐标</b>（$dV=r^2\\sin\\varphi\\,drd\\varphi d\\theta$）对付球与锥。</p>`],
['def', '定义与公式',
`<p><b>① 球面坐标换算：</b>$x=r\\sin\\varphi\\cos\\theta,\\ y=r\\sin\\varphi\\sin\\theta,\\ z=r\\cos\\varphi$；$\\varphi$ 是与 z 轴的夹角。</p>
<p><b>② 坐标系选择：</b>区域含圆柱体/旋转体 → 柱面；含球体/锥体 → 球面；$f$ 含 $x^2+y^2$ → 柱面；含 $x^2+y^2+z^2$ → 球面。</p>
<p><b>③ 对称性：</b>与二重积分同理，"奇零偶倍"按坐标面对称使用。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（球坐标经典）计算 $\\iiint_\\Omega (x^2+y^2+z^2)\\,dV$，$\\Omega: x^2+y^2+z^2\\le R^2$</div>
$$ \\int_0^{2\\pi}d\\theta\\int_0^{\\pi}\\sin\\varphi\\,d\\varphi\\int_0^{R}r^4\\,dr=2\\pi\\cdot2\\cdot\\frac{R^5}{5}=\\frac{4\\pi R^5}{5} $$
</div>
<div class="ex-box"><div class="ex-t">例 2（柱面坐标）计算 $\\iiint_\\Omega z\\,dV$，$\\Omega$ 由 $z=x^2+y^2$ 与 $z=1$ 围成</div>
<p>投影圆 $r\\le1$，$z$ 从抛物面到 1：</p>
$$ \\int_0^{2\\pi}d\\theta\\int_0^{1}r\\,dr\\int_{r^2}^{1}z\\,dz=\\int_0^{2\\pi}d\\theta\\int_0^1\\frac{r(1-r^4)}{2}dr=\\pi\\left(\\frac12-\\frac16\\right)=\\frac{\\pi}{3} $$
</div>`],
['warn', '易错点',
`<p>• 柱面坐标的体积元是 $dV=r\\,drd\\theta dz$，不能漏掉 $r$；球面坐标的体积元是 $dV=r^2\\sin\\varphi\\,drd\\varphi d\\theta$，不能漏掉 $r^2\\sin\\varphi$。</p>
<p>• 球坐标 $\\varphi$ 从 <b>z 轴正方向</b>量起（$[0,\\pi]$），别与方位角 $\\theta$ 混。</p>`]
],
quiz: [
{id:'q1', q:'球面坐标下体积微元 $dV$ 是？', opts:['$dr\\,d\\varphi\\,d\\theta$', '$r^2\\sin\\varphi\\,dr\\,d\\varphi\\,d\\theta$', '$r\\,dr\\,dz$', '$r^2\\,drd\\theta$'], ans:1, exp:'球坐标体积元带 $r^2\\sin\\varphi$。'},
{id:'q2', q:'区域为球体 $x^2+y^2+z^2\\le a^2$，最合适的坐标系是？', opts:['直角坐标', '柱面坐标', '球面坐标', '只能分段'], ans:2, exp:'球与锥优先球坐标；圆柱优先柱坐标。'}
]

},

'2-2': {
title: '对弧长与对坐标的曲线积分',
secs: [
['why', '为什么学这一节',
`<p>曲线积分分两类：第一类（对弧长 $\\int_L f\\,ds$）算"曲线上的总量"（曲线质量）；第二类（对坐标 $\\int_L Pdx+Qdy$）算"沿路径的功"（变力做功）。两类之间由方向性区分，是数一曲线族考题的起点。</p>`],
['think', '直观理解',
`<p><b>第一类：给曲线“称重”。</b>密度 $f$，微元质量 = 密度 × 弧长微元 $ds$。弧长微元非负且不随曲线方向改变。</p>
<blockquote><b>第二类：沿路做功。</b>力 $\\vec F=(P,Q)$ 在位移 $d\\vec r=(dx,dy)$ 上做功 $Pdx+Qdy$——<b>依赖路径方向</b>，反向积分变号。</blockquote>
<p><b>计算通法：</b>把曲线参数化，将被积函数、$dx,dy$ 以及 $ds$ 全部改写成参数 $t$ 的表达式，再按曲线方向确定 $t$ 的起点和终点。</p>`],
['def', '定义与公式',
`<p><b>① 第一类：</b>$\\displaystyle\\int_L f(x,y)\\,ds$。若 $L$ 有正则参数化 $x=x(t),y=y(t)$（$\\alpha\\le t\\le\\beta$，且速度向量不同时为零），则</p>
$$ \\int_\\alpha^\\beta f[x(t),y(t)]\\sqrt{x\'^2(t)+y\'^2(t)}\\,dt $$
<p class="muted">第一类积分与曲线方向无关；若原参数方向相反，可把参数区间重新按从小到大书写，弧长因子始终非负。</p>
<p><b>② 第二类：</b>$\\displaystyle\\int_L Pdx+Qdy=\\int_\\alpha^\\beta\\{P[x(t),y(t)]x\'(t)+Q[x(t),y(t)]y\'(t)\\}dt$（下限 = 起点，上限 = 终点，随方向变）。</p>
<p><b>③ 两类联系：</b>$\\displaystyle\\int_L Pdx+Qdy=\\int_L(P\\cos\\alpha+Q\\cos\\beta)\\,ds$（方向余弦）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（第一类）计算 $\\displaystyle\\int_L (x^2+y^2)\\,ds$，$L$ 为半径 1 的上半圆</div>
<p>参数化 $x=\\cos t,\\ y=\\sin t,\\ t\\in[0,\\pi]$，$ds=dt$：</p>
$$ \\int_0^{\\pi}1\\cdot dt=\\pi $$
</div>
<div class="ex-box"><div class="ex-t">例 2（第二类）计算 $\\displaystyle\\int_L 2xy\\,dx+x^2dy$，$L$：$y=x^2$ 从 $(0,0)$ 到 $(1,1)$</div>
<p>取 $x=t$：$y=t^2,\\ dy=2t\\,dt$：</p>
$$ \\int_0^1\\left(2t\\cdot t^2+t^2\\cdot2t\\right)dt=\\int_0^14t^3dt=1 $$
</div>`],
['warn', '易错点',
`<p>• 第一类积分与曲线方向无关。套用参数公式时通常把参数区间写成 $\\alpha<\\beta$；若改用反向参数化，速度模仍保证弧长因子非负。</p>
<p>• $ds=\\sqrt{x\'^2+y\'^2}\\,dt$ 的根号因子别丢。</p>`]
],
quiz: [
{id:'q1', q:'第一类曲线积分 $\\int_L f\\,ds$ 的 $ds$ 表达式（参数 $t$）是？', opts:['$dt$', '$\\sqrt{x\'^2+y\'^2}\\,dt$', '$x\'(t)dt$', '$|y\'|dt$'], ans:1, exp:'弧长微元的参数表达。'},
{id:'q2', q:'第二类曲线积分改变路径方向，积分值？', opts:['不变', '变号', '变两倍', '归零'], ans:1, exp:'方向性：反向 = 负号。第一类无此性质。'}
]

},

'2-3': {
title: '格林公式',
secs: [
['why', '为什么学这一节',
`<p>格林公式是"曲线积分的降维器"：把闭曲线上的第二类积分换成区域上的二重积分（或反过来）。配合补线技巧，能处理几乎所有第二类曲线积分考题。</p>`],
['think', '直观理解',
`<p><b>闭曲线的环流量 = 内部"漩涡总量"。</b>格林公式说：沿边界走一圈的总功，等于内部每一点"局部旋转"（$\\dfrac{\\partial Q}{\\partial x}-\\dfrac{\\partial P}{\\partial y}$）的累加。</p>
<blockquote>条件两条：<b>闭曲线取正向</b>（沿边界走、区域在左手边）+ <b>P、Q 在闭区域内有一阶连续偏导</b>。不闭就补线，有奇点就挖洞。</blockquote>`],
['def', '定义与公式',
`<p><b>① 格林公式：</b>设有界平面区域 $D$ 的边界 $L$ 分段光滑并取正向，$P,Q$ 在包含 $D$ 的开区域内具有一阶连续偏导，则</p>
$$ \\oint_L P\\,dx+Q\\,dy=\\iint_D\\left(\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}\\right)dxdy. $$
<p><b>② 补线技巧：</b>非闭曲线积分可补线成闭路，先用格林公式计算闭路积分，再减去补线段的积分；补线后的方向必须与区域正向一致。</p>
<p><b>③ 积分与路径无关：</b>设 $P,Q$ 在单连通域内具有一阶连续偏导，则积分与路径无关，当且仅当 $\\dfrac{\\partial Q}{\\partial x}=\\dfrac{\\partial P}{\\partial y}$ 在域内处处成立。此时可选简单路径，也存在势函数 $F$ 使 $dF=P\\,dx+Q\\,dy$。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（格林直接用）计算 $\\oint_L (x-y)dx+(x+y)dy$，$L$：单位圆正向</div>
<p>$\\dfrac{\\partial Q}{\\partial x}-\\dfrac{\\partial P}{\\partial y}=1-(-1)=2$：</p>
$$ \\iint_{x^2+y^2\\le1}2\\,dxdy=2\\pi $$
</div>
<div class="ex-box"><div class="ex-t">例 2（路径无关）验证 $\\displaystyle\\int_L 2xy\\,dx+x^2dy$ 与路径无关，并计算从 $(0,0)$ 到 $(1,1)$</div>
<p>$\\dfrac{\\partial}{\\partial x}(x^2)=2x=\\dfrac{\\partial}{\\partial y}(2xy)$ ✓。取折线 $(0,0)\\to(1,0)\\to(1,1)$：</p>
<p>第一段 $y=0,dy=0$：积 0；第二段 $x=1,dx=0$：$\\displaystyle\\int_0^1 1\\,dy=1$。</p>
<p>结果 $=1$（与 2-2 例 2 沿抛物线结果一致 ✓）。</p></div>`],
['warn', '易错点',
`<p>• 公式中被积函数是 $Q_x-P_y$，<b>减号方向</b>写反是常见错误。</p>
<p>• 区域内有奇点（如 $\\tfrac1{(x^2+y^2)}$ 型）时不能直接套，需挖小圆洞处理。</p>
<p>• 路径无关要求<b>单连通</b>区域。</p>`]
],
quiz: [
{id:'q1', q:'格林公式 $\\oint_L Pdx+Qdy=\\iint_D(? )dxdy$ 中问号处是？', opts:['$P_y-Q_x$', '$Q_x-P_y$', '$P+Q$', '$Q_y-P_x$'], ans:1, exp:'$\\dfrac{\\partial Q}{\\partial x}-\\dfrac{\\partial P}{\\partial y}$。'},
{id:'q2', q:'设 $P,Q$ 在单连通域内具有一阶连续偏导，则曲线积分 $\\int_L Pdx+Qdy$ 与路径无关的充要条件是？', opts:['$P=Q$', '$P_x=Q_y$', '$P_y=Q_x$', '$P\\cdot Q=0$'], ans:2, exp:'在题设的单连通与一阶连续偏导条件下，$\\dfrac{\\partial P}{\\partial y}=\\dfrac{\\partial Q}{\\partial x}$ 处处成立，等价于积分与路径无关。'}
]

},

'2-4': {
title: '曲面积分与高斯、斯托克斯公式',
secs: [
['why', '为什么学这一节',
`<p>曲面积分把"曲线上的累加"推到曲面：第一类算曲面的质量/面积，第二类算<b>穿过曲面的流量</b>（通量）。高斯公式把闭曲面通量化为体积分——通量守恒的数学表达，是数一多元积分学的收官。</p>`],
['think', '直观理解',
`<p><b>第一类：给曲面"称重"</b>（$\\iint_\\Sigma f\\,dS$，$dS$ 是面积微元）。</p>
<blockquote><b>第二类：数"穿过网的水流"。</b>$\\iint_\\Sigma P\\,dydz+Q\\,dzdx+R\\,dxdy$ 记流量；方向取"外侧"为正。<br><b>高斯公式</b>：流出闭曲面的总量 = 内部所有"水龙头" $\\left(\\dfrac{\\partial P}{\\partial x}+\\dfrac{\\partial Q}{\\partial y}+\\dfrac{\\partial R}{\\partial z}\\right)$（散度）之和。</blockquote>`],
['def', '定义与公式',
`<p><b>① 第一类曲面积分计算：</b>若光滑曲面可写成单值图形 $z=z(x,y)$，投影到 $xOy$ 面的区域为 $D$，则 $dS=\\sqrt{1+z_x^2+z_y^2}\\,dxdy$，从而把曲面积分化为 $D$ 上的二重积分。</p>
<p><b>② 高斯公式：</b>设闭区域 $\\Omega$ 的边界 $\\Sigma$ 分片光滑并取外侧，且 $P,Q,R$ 在包含 $\\Omega$ 的区域内具有一阶连续偏导，则</p>
$$ \\oiint_\\Sigma Pdydz+Qdzdx+Rdxdy=\\iiint_\\Omega\\left(\\frac{\\partial P}{\\partial x}+\\frac{\\partial Q}{\\partial y}+\\frac{\\partial R}{\\partial z}\\right)dV $$
<p><b>③ 斯托克斯公式：</b>设定向分片光滑曲面 $\\Sigma$ 的正向边界为 $L$，二者方向按右手规则匹配，且 $P,Q,R$ 在包含 $\\Sigma$ 的区域内具有一阶连续偏导，则</p>
$$ \\oint_L P\\,dx+Q\\,dy+R\\,dz=\\iint_\\Sigma(\\nabla\\times\\vec F)\\cdot\\vec n\\,dS,\\qquad \\vec F=(P,Q,R). $$
<p>展开后，$\\nabla\\times\\vec F=(R_y-Q_z,\\ P_z-R_x,\\ Q_x-P_y)$。它把空间闭曲线的环流化为任一张以 $L$ 为边界的定向曲面上的旋度通量。</p>
<p><b>④ 两类曲面积分联系：</b>若单位法向量 $\\vec n=(\\cos\\alpha,\\cos\\beta,\\cos\\gamma)$ 与曲面指定侧一致，则第二类曲面积分等于 $(P\\cos\\alpha+Q\\cos\\beta+R\\cos\\gamma)$ 对 $dS$ 的第一类积分。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（第一类）计算 $\\iint_\\Sigma (x^2+y^2)dS$，$\\Sigma: x^2+y^2+z^2=R^2$</div>
<p>球面上由对称性 $\\iint x^2dS=\\iint y^2dS=\\iint z^2dS=\\tfrac13\\iint(x^2+y^2+z^2)dS=\\tfrac{R^2}{3}\\cdot4\\pi R^2$。</p>
$$ \\iint_\\Sigma(x^2+y^2)dS=\\frac{2R^2}{3}\\cdot4\\pi R^2=\\frac{8\\pi R^4}{3} $$
</div>
<div class="ex-box"><div class="ex-t">例 2（高斯）计算 $\\oiint_\\Sigma x\\,dydz+y\\,dzdx+z\\,dxdy$，其中 $\\Sigma:x^2+y^2+z^2=R^2$ 取外侧</div>
<p>散度 $=1+1+1=3$：</p>
$$ \\iiint_{\\Omega}3\\,dV=3\\cdot\\frac43\\pi R^3=4\\pi R^3 $$
</div>`],
['warn', '易错点',
`<p>• 高斯公式要求<b>闭曲面 + 外侧</b>；内侧要变号；不闭先补面（补的面要减掉）。</p>
<p>• 第一类曲面积分投影计算时 $dS$ 的根式因子 $\\sqrt{1+z_x^2+z_y^2}$ 别丢。</p>
<p>• 投影公式要求曲面能在所选投影面上写成单值图形。整个球面不能全局写成单值的 $z=z(x,y)$：同一投影点通常对应上下两个球面点，因此应拆成上、下半球分别积分，或改用参数化。</p>`]
],
quiz: [
{id:'q1', q:'高斯公式右侧的被积函数 $\\dfrac{\\partial P}{\\partial x}+\\dfrac{\\partial Q}{\\partial y}+\\dfrac{\\partial R}{\\partial z}$ 称为？', opts:['梯度', '散度', '旋度', '方向导数'], ans:1, exp:'散度（div）——"每点向外冒流体的速率"。'},
{id:'q2', q:'用高斯公式要求闭曲面取？', opts:['内侧', '外侧', '任意侧', '上侧'], ans:1, exp:'标准形式对应外侧；若给内侧则积分变号处理。'}
]

}

}
};
