/* ===== 数学 · 第8章 常微分方程 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['math/ch08'] = {

lessons: {

'8-1': {
title: '基本概念与可分离变量方程',
secs: [
['why', '为什么学这一节',
`<p>微分方程是"由变化率反推函数"的数学：已知 $y\'=ky$ 反推人口/衰变模型 $y=Ce^{kx}$。数二每年一道大题（约 10 分），套路性强——识别类型、套公式、定常数，是性价比极高的得分章。</p>`],
['think', '直观理解',
`<p><b>方程的"阶" = 最高导数的阶数</b>；<b>通解 = 一族曲线</b>（带常数 $C$），<b>特解 = 其中一条</b>（由初始条件定 $C$）。</p>
<blockquote>可分离变量的直觉：把 $x$ 的"行李"和 $y$ 的"行李"分到等号两边，然后各自积分——微分方程版的"合久必分"。</blockquote>`],
['def', '定义与公式',
`<p><b>① 基本概念：</b>$\\dfrac{dy}{dx}=f(x,y)$；阶、解、通解（含独立任意常数个数 = 阶数）、特解、初始条件。</p>
<p><b>② 可分离变量方程：</b>能写成 $g(y)dy = f(x)dx$ 的形式，两边积分：</p>
$$ \\int g(y)\\,dy=\\int f(x)\\,dx + C $$
<p><b>③ 最经典模型：</b>$\\dfrac{dy}{dx}=ky \\Rightarrow y=Ce^{kx}$（指数增长/衰减，考试多次直接考）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 解 $\\dfrac{dy}{dx}=\\dfrac{y}{x}$（$x>0$）</div>
<p>分离：$\\dfrac{dy}{y}=\\dfrac{dx}{x}$，积分：$\\ln|y|=\\ln|x|+C_1$。</p>
$$ y=Cx\\ (C\\neq0)；\\ C=0\\ (y\\equiv0)\\ \\text{也是解，通解} \\ y=Cx $$
</div>
<div class="ex-box"><div class="ex-t">例 2（带初值）解 $y\'=2xy^2$，$y(0)=-1$</div>
<p>分离：$\\dfrac{dy}{y^2}=2x\\,dx$，积分：$-\\dfrac1y=x^2+C$。</p>
<p>代入 $y(0)=-1$：$C=1$。故 $y=-\\dfrac{1}{x^2+1}$。</p></div>`],
['warn', '易错点',
`<p>• 分离变量时除以 $g(y)$ 可能丢掉<b>常值解</b>（如 $y=0$），严谨解答要补验。</p>
<p>• 积分 $\\ln|y|$ 的绝对值处理：通常合并进常数 $C$（$C$ 可正可负），特解代入初值时用原式更稳。</p>
<p>• 通解中的 $C$ 是<b>任意常数</b>，初始条件是解出特解的钥匙，别忘代入。</p>`]
],
quiz: [
{id:'q1', q:'方程 $y\'=3y$ 的通解是？', opts:['$y=3x+C$', '$y=Ce^{3x}$', '$y=e^{3x}+C$', '$y=\\ln 3x+C$'], ans:1, exp:'分离 $\\tfrac{dy}{y}=3dx$，积分 $\\ln|y|=3x+C_1$，即 $y=Ce^{3x}$。'},
{id:'q2', q:'$\\dfrac{dy}{dx}=xy$ 的通解是？', opts:['$y=Ce^{x^2}$', '$y=Ce^{\\frac{x^2}{2}}$', '$y=x^2+C$', '$y=\\tfrac{x^2}{2}+C$'], ans:1, exp:'$\\tfrac{dy}{y}=x dx \\Rightarrow \\ln|y|=\\tfrac{x^2}{2}+C_1$，即 $y=Ce^{\\frac{x^2}{2}}$。'},
{id:'q3', q:'"通解"的含义是？', opts:['唯一的解', '包含独立任意常数个数等于方程阶数的解族', '所有特解中的最大者', '满足初始条件的解'], ans:1, exp:'通解 = 含独立任意常数（个数=阶数）的解族；满足初始条件定出常数的称特解。'}
]

},

'8-2': {
title: '齐次方程与一阶线性方程',
secs: [
['why', '为什么学这一节',
`<p>一阶线性方程 $y\'+P(x)y=Q(x)$ 的通解公式是数二微分方程大题的"主力武器"；齐次方程（$\\tfrac{dy}{dx}=\\varphi(\\tfrac yx)$）则用换元 $u=\\tfrac yx$ 把它变成可分离方程——两招合起来覆盖了一阶方程的绝大多数考题。</p>`],
['think', '直观理解',
`<p><b>齐次方程识别：</b>右边能写成"整体只看 $\\tfrac yx$"的样子，如 $\\dfrac{x+y}{x-y}=\\dfrac{1+\\tfrac yx}{1-\\tfrac yx}$。令 $u=\\tfrac yx$（即 $y=ux$），方程就只剩 $u$ 和 $x$，可分离。</p>
<blockquote><b>一阶线性的"降妖"思路：</b>$y\'+P y=Q$ 里捣乱的是 $Py$ 项。乘一个"驯服因子" $\\mu=e^{\\int Pdx}$ 后，左边恰好是 $(\\mu y)\'$——方程变成"直接积分"。</blockquote>`],
['def', '定义与公式',
`<p><b>① 齐次方程：</b>$\\dfrac{dy}{dx}=\\varphi\\left(\\dfrac{y}{x}\\right)$。令 $u=\\dfrac yx$，则 $\\dfrac{dy}{dx}=u+x\\dfrac{du}{dx}$，化为 $\\dfrac{du}{\\varphi(u)-u}=\\dfrac{dx}{x}$。</p>
<p><b>② 一阶线性方程通解公式（必背）：</b></p>
$$ y\'+P(x)y=Q(x) \\implies y=e^{-\\int Pdx}\\left[\\int Q e^{\\int Pdx}dx + C\\right] $$
<p class="muted">结构："e 的负指数 × (里面 Q 乘 e 的正指数积分 + C)"。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（一阶线性）解 $y\'-\\dfrac{2}{x}y=x^2$（$x>0$）</div>
<p>$P=-\\tfrac2x$，$\\int Pdx=-2\\ln x$，$e^{\\int Pdx}=x^{-2}$。</p>
$$ y=e^{2\\ln x}\\left[\\int x^2\\cdot x^{-2}dx+C\\right]=x^2(x+C)=x^3+Cx^2 $$
<p class="muted">代公式比常数变易法快；先算 $e^{\\int Pdx}$ 再代。</p></div>
<div class="ex-box"><div class="ex-t">例 2（齐次）解 $\\dfrac{dy}{dx}=\\dfrac{y}{x}+\\tan\\dfrac{y}{x}$</div>
<p>令 $u=\\tfrac yx$：$u+xu\'=u+\\tan u \\Rightarrow \\dfrac{du}{\\tan u}=\\dfrac{dx}{x}$。</p>
<p>积分：$\\ln|\\sin u|=\\ln|x|+C_1$，故 $\\sin u=Cx$，回代：</p>
$$ \\sin\\frac{y}{x}=Cx $$
</div>`],
['warn', '易错点',
`<p>• 公式中 $e^{\\int Pdx}$ 与 $e^{-\\int Pdx}$ 一正一负，位置别放反。</p>
<p>• 齐次换元后是 $y\'=u+xu\'$（乘积求导），直接写 $y\'=u\'$ 就错了。</p>
<p>• $Q(x)=0$ 的一阶线性方程就是可分离变量方程，公式照样适用（结果含 $Ce^{-\\int P}$）。</p>`]
],
quiz: [
{id:'q1', q:'方程 $y\'+y=e^{-x}$ 的通解是？', opts:['$y=(x+C)e^{-x}$', '$y=Ce^{-x}+e^x$', '$y=xe^{-x}$', '$y=e^{-x}+C$'], ans:0, exp:'$P=1$，$e^{\\int Pdx}=e^x$；$y=e^{-x}[\\int e^{-x}e^xdx+C]=e^{-x}(x+C)$。'},
{id:'q2', q:'下列方程中是齐次方程的是？', opts:['$y\'=x+y$', '$y\'=\\dfrac{x+y}{x-y}$', '$y\'+y=x$', '$y\'=x^2y$'], ans:1, exp:'B 的右边分子分母同除 $x$ 后只依赖 $\\tfrac yx$，是齐次。A 是一阶线性非齐次。'},
{id:'q3', q:'解齐次方程的核心换元是？', opts:['$u=y/x$', '$u=x/y$', '$u=y\'$', '$u=xy$'], ans:0, exp:'令 $u=\\tfrac yx$ 把方程化为可分离变量；对应 $y\'=u+xu\'$。'}
]

},

'8-3': {
title: '可降阶的高阶方程',
secs: [
['why', '为什么学这一节',
`<p>三种"缺项"的二阶方程可以降为一阶来解：缺 $y$、缺 $y\'$、两边都不缺（$y\'\'=f(y\')$）。识别缺口 → 选降元法 → 连积分两次，流程机械，是送分考点。</p>`],
['think', '直观理解',
`<p>二阶方程难在"两个未知状态"。缺谁就<b>把另一个当新未知数</b>：</p>
<blockquote>• $y\'\'=f(x,y\')$：<b>看不见 $y$</b> → 令 $p=y\'$，方程变成关于 $p$ 的一阶方程；<br>• $y\'\'=f(y,y\')$：<b>看不见 $x$</b> → 同样令 $p=y\'$，但 $y\'\'=p\\dfrac{dp}{dy}$（把 $p$ 视为 $y$ 的函数）；<br>• $y\'\'=f(x)$：直接连积两次。</blockquote>`],
['def', '定义与公式',
`<p><b>① $y^{(n)}=f(x)$ 型：</b>连续积分 $n$ 次，每积一次出一个 $C$。</p>
<p><b>② 不显含 $y$：</b>$y\'\'=f(x,y\')$，令 $p=y\'$：$p\'=f(x,p)$（一阶方程）。</p>
<p><b>③ 不显含 $x$：</b>$y\'\'=f(y,y\')$，令 $p=y\'$，则</p>
$$ y\'\'=\\frac{dp}{dx}=\\frac{dp}{dy}\\cdot\\frac{dy}{dx}=p\\frac{dp}{dy} $$
<p>方程化为 $p\\dfrac{dp}{dy}=f(y,p)$。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 解 $y\'\'=\\dfrac{y\'}{x}$（$x>0$，不显含 $y$）</div>
<p>令 $p=y\'$：$p\'=\\dfrac px \\Rightarrow \\dfrac{dp}{p}=\\dfrac{dx}{x} \\Rightarrow p=C_1x$。</p>
<p>再积：$y=\\dfrac{C_1}{2}x^2+C_2$，即 $y=C_1x^2+C_2$（常数吸收）。</p></div>
<div class="ex-box"><div class="ex-t">例 2 解 $yy\'\'-(y\')^2=0$（不显含 $x$）</div>
<p>令 $p=y\'$，$y\'\'=p\\tfrac{dp}{dy}$：$y\\cdot p\\dfrac{dp}{dy}-p^2=0 \\Rightarrow \\dfrac{dp}{p}=\\dfrac{dy}{y}$。</p>
<p>积分：$p=C_1y$，即 $\\dfrac{dy}{dx}=C_1y \\Rightarrow \\ln|y|=C_1x+C_2$，$y=C_2e^{C_1x}$。</p></div>`],
['warn', '易错点',
`<p>• "不显含 $x$"型中 $y\'\'=p\\tfrac{dp}{dy}$ 这个换算公式是命门，忘了就卡死。</p>
<p>• 降阶后解出 $p(x)$ 还要<b>再积分一次</b>才得到 $y$，两层常数别丢。</p>
<p>• $p=0$（$y\'=0$，$y$ 为常数）这类解除以 $p$ 时会丢，需补验。</p>`]
],
quiz: [
{id:'q1', q:'方程 $y\'\'=x+\\sin x$ 的通解是？', opts:['$y=\\tfrac{x^3}{6}-\\sin x+C$', '$y=\\tfrac{x^3}{6}-\\sin x+C_1x+C_2$', '$y=x-\\cos x+C$', '$y=\\tfrac{x^2}{2}-\\cos x+C_1x+C_2$'], ans:1, exp:'积分一次：$y\'=\\tfrac{x^2}{2}-\\cos x+C_1$；再积：$y=\\tfrac{x^3}{6}-\\sin x+C_1x+C_2$。'},
{id:'q2', q:'$y\'\'=f(y,y\')$ 型（不显含 $x$）降阶时令 $p=y\'$，则 $y\'\'$ 等于？', opts:['$p\'$', '$p\\dfrac{dp}{dy}$', '$\\dfrac{dp}{dy}$', '$p^2$'], ans:1, exp:'链式法则：$\\tfrac{dp}{dx}=\\tfrac{dp}{dy}\\cdot\\tfrac{dy}{dx}=p\\tfrac{dp}{dy}$。'},
{id:'q3', q:'$y\'\'=1+(y\')^2$ 属于哪种可降阶型？', opts:['不显含 $y\'$', '不显含 $y$（令 $p=y\'$ 后 $p\'=1+p^2$ 可分离）', '不显含 $x$（必须用 $y\'\'=p\\dfrac{dp}{dy}$）', '无法降阶'], ans:1, exp:'方程右边只含 $y\'$，不显含 $y$：令 $p=y\'$ 得 $p\'=1+p^2$，是可分离变量方程 $\\dfrac{dp}{1+p^2}=dx$。'}
]

},

'8-4': {
title: '二阶常系数线性微分方程',
secs: [
['why', '为什么学这一节',
`<p>这是数二微分方程大题的<b>压轴形态</b>：$y\'\'+py\'+qy=f(x)$。齐次解看特征方程（初中的二次方程），非齐次特解靠待定系数——结构清晰、模板固定，练熟就是满分题。</p>`],
['think', '直观理解',
`<p><b>齐次解 = 特征方程的根"长出来"的函数。</b>试 $y=e^{rx}$ 代入 $y\'\'+py\'+qy=0$，约去 $e^{rx}$ 得 $r^2+pr+q=0$——微分方程变成了初代二次方程！</p>
<blockquote><b>非齐次特解 = 猜形状 + 定系数。</b>右边是多项式就猜多项式，是 $e^{\\lambda x}$ 就猜 $Ae^{\\lambda x}$，是 $\\cos\\omega x$ 就猜 $A\\cos+ B\\sin$。若猜的形状撞上齐次解，就乘一个 $x$ 顶上去。</blockquote>
<p><b>叠加原理：</b>通解 = 齐次通解 + 任一特解（$Y+\\ y^*$）。</p>`],
['def', '定义与公式',
`<p><b>① 特征方程：</b>$r^2+pr+q=0$，判别式 $\\Delta=p^2-4q$。</p>
<table style="width:100%;border-collapse:collapse;font-size:14px">
<tr style="background:#f1f4f9"><th style="padding:6px;border:1px solid #e3e8f0">根的情况</th><th style="padding:6px;border:1px solid #e3e8f0">齐次通解</th></tr>
<tr><td style="padding:6px;border:1px solid #e3e8f0">两不等实根 $r_1\\neq r_2$</td><td style="padding:6px;border:1px solid #e3e8f0">$y=C_1e^{r_1x}+C_2e^{r_2x}$</td></tr>
<tr><td style="padding:6px;border:1px solid #e3e8f0">二重根 $r$</td><td style="padding:6px;border:1px solid #e3e8f0">$y=(C_1+C_2x)e^{rx}$</td></tr>
<tr><td style="padding:6px;border:1px solid #e3e8f0">共轭复根 $\\alpha\\pm\\beta i$</td><td style="padding:6px;border:1px solid #e3e8f0">$y=e^{\\alpha x}(C_1\\cos\\beta x+C_2\\sin\\beta x)$</td></tr>
</table>
<p><b>② 特解待定形式：</b>$f(x)=P_m(x)e^{\\lambda x}$ 时设 $y^*=x^k Q_m(x)e^{\\lambda x}$，$k=\\lambda$ 作为特征根的重数（0、1、2）。右端是 $e^{\\lambda x}\\cos\\omega x$ 型时 $\\lambda+\\omega i$ 按同样规则处理。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（齐次）解 $y\'\'-3y\'+2y=0$</div>
<p>特征方程 $(r-1)(r-2)=0$，$r=1,2$：</p>
$$ y=C_1e^{x}+C_2e^{2x} $$
</div>
<div class="ex-box"><div class="ex-t">例 2（非齐次）解 $y\'\'+y=2\\sin x$</div>
<p>特征根 $r=\\pm i$。右端 $\\sin x$ 对应 $\\lambda+i\\omega=i$，<b>是特征根</b>，$k=1$。</p>
<p>设 $y^*=x(A\\cos x+B\\sin x)$。代回求导整理得 $A=-1,\\ B=0$，即 $y^*=-x\\cos x$。</p>
$$ y=C_1\\cos x+C_2\\sin x-x\\cos x $$
<p class="muted">"共振了就乘 x"是本节第一高频考点。</p></div>
<div class="ex-box"><div class="ex-t">例 3（含初值）$y\'\'-4y\'=0$，$y(0)=0,\\ y\'(0)=4$</div>
<p>特征方程 $r(r-4)=0$，$r=0,4$：$y=C_1+C_2e^{4x}$。</p>
<p>$y\'=4C_2e^{4x}$；$y\'(0)=4C_2=4\\Rightarrow C_2=1$；$C_1+C_2=0\\Rightarrow C_1=-1$。</p>
$$ y=e^{4x}-1 $$
</div>`],
['warn', '易错点',
`<p>• 特解形式的 $x^k$ 因子由<b>共振重数</b>决定：$\lambda$ 是特征单根取 $k=1$，重根取 $k=2$，不是根取 $k=0$。</p>
<p>• 右端是 $\\cos/\\sin$ 时特解要<b>同时设</b> $A\\cos\\omega x+B\\sin\\omega x$ 两项，只设一项解不出来。</p>
<p>• 通解必须 = 齐次通解 + 特解，只写特解不得分。</p>`]
],
quiz: [
{id:'q1', q:'$y\'\'+2y\'+y=0$ 的通解是？', opts:['$C_1e^{-x}+C_2e^{x}$', '$(C_1+C_2x)e^{-x}$', '$C_1e^{-x}+C_2$', '$e^{-x}(C_1\\cos x+C_2\\sin x)$'], ans:1, exp:'特征方程 $(r+1)^2=0$ 二重根 $r=-1$，通解 $(C_1+C_2x)e^{-x}$。'},
{id:'q2', q:'$y\'\'-y=e^x$ 的特解应设为？', opts:['$y^*=Ae^x$', '$y^*=Axe^x$', '$y^*=Ax^2e^x$', '$y^*=A\\cos x$'], ans:1, exp:'$r=1$ 是特征单根（$r^2-1=(r-1)(r+1)$），共振一次：$y^*=Axe^x$。'},
{id:'q3', q:'$y\'\'+4y=0$ 的通解是？', opts:['$C_1e^{2x}+C_2e^{-2x}$', '$C_1\\cos2x+C_2\\sin2x$', '$(C_1+C_2x)e^{2x}$', '$C_1\\cos x+C_2\\sin x$'], ans:1, exp:'特征方程 $r^2+4=0$，$r=\\pm2i$，即 $\\alpha=0,\\beta=2$，通解 $e^{0x}(C_1\\cos2x+C_2\\sin2x)$。'}
]

}

}
};
