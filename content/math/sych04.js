/* ===== 数学 · 数一扩展 扩4 概率论与数理统计 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['math/sych04'] = {

lessons: {

'4-1': {
title: '随机事件与概率',
secs: [
['why', '为什么学这一节',
`<p>概率论的公理化起点：把"可能性"变成可计算的数。古典概型、条件概率、全概率与贝叶斯公式是全章的语法——后面所有分布与数字特征都建立在它们之上。</p>`],
['think', '直观理解',
`<p><b>概率 = 长期频率的稳定值。</b>古典概型下 $P(A)=\\dfrac{\\text{有利结果数}}{\\text{总结果数}}$，前提是"每个结果等可能"。</p>
<blockquote><b>条件概率 $P(B|A)$ = "在 A 发生的世界里 B 的概率"。</b>全概率公式 = "分情况讨论求总概率"；贝叶斯 = "执果索因"——知道结果后反推原因概率。</blockquote>`],
['def', '定义与公式',
`<p><b>① 基本公式：</b></p>
$$ P(A\\cup B)=P(A)+P(B)-P(AB) $$
$$ P(\\bar A)=1-P(A),\\qquad P(A|B)=\\frac{P(AB)}{P(B)}\\ (P(B)>0) $$
<p><b>② 乘法与独立性：</b>$P(AB)=P(A)P(B|A)$；$A,B$ 独立 $\\iff P(AB)=P(A)P(B)$。</p>
<p><b>③ 全概率与贝叶斯：</b>$B_1,\\cdots,B_n$ 完备（互斥并全集）：</p>
$$ P(A)=\\sum_iP(B_i)P(A|B_i),\\qquad P(B_j|A)=\\frac{P(B_j)P(A|B_j)}{P(A)} $$
<p><b>④ 两大模型：</b>古典概型（有限等可能）、几何概型（区域等可能）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（古典概型）3 个人随机坐 3 个座位，甲坐 1 号的概率？</div>
<p>总排法 $3!=6$，甲固定 1 号后 $2!=2$ 种：$P=\\dfrac26=\\dfrac13$。</p></div>
<div class="ex-box"><div class="ex-t">例 2（全概率）两台机床：甲产量占 60% 次品率 1%，乙占 40% 次品率 2%。任取一件是次品，来自甲的概率？</div>
<p>$P(\\text{次})=0.6\\times0.01+0.4\\times0.02=0.014$。</p>
$$ P(\\text{甲}|\\text{次})=\\frac{0.6\\times0.01}{0.014}=\\frac{3}{7} $$
<p class="muted">全概率"由因推果"，贝叶斯"由果溯因"。</p></div>`],
['warn', '易错点',
`<p>• 独立 $\\neq$ 互斥：互斥事件一个发生则另一个必不发生，恰恰"不独立"（$P(AB)=0\\neq P(A)P(B)$，正概率时）。</p>
<p>• $P(A\\cup B)\\le P(A)+P(B)$，相减项 $P(AB)$ 别丢。</p>
<p>• 贝叶斯公式分母就是全概率 $P(A)$，别拆错。</p>`]
],
quiz: [
{id:'q1', q:'$A,B$ 独立是指？', opts:['$AB=\\varnothing$', '$P(AB)=P(A)P(B)$', '$A\\cup B=\\Omega$', '$P(A)=P(B)$'], ans:1, exp:'独立性是概率乘积关系，不是集合关系。'},
{id:'q2', q:'$P(A)=0.5,\\ P(B)=0.4,\\ P(AB)=0.2$，则 $P(A\\cup B)=$？', opts:['0.9', '0.7', '0.1', '0.2'], ans:1, exp:'$0.5+0.4-0.2=0.7$。（顺带：$P(AB)=P(A)P(B)$，恰为独立。）'}
]

},

'4-2': {
title: '一维随机变量及其分布',
secs: [
['why', '为什么学这一节',
`<p>随机变量把随机试验的结果"数字化"：离散型用分布律、连续型用密度函数 $f(x)$ 描述全貌；分布函数 $F(x)$ 统一两者。这是数一概率大题的第一计算场。</p>`],
['think', '直观理解',
`<p><b>分布函数 $F(x)=P(X\\le x)$ 是"累积到 x 的雨量"。</b>连续型里 $F$ 是密度 $f$ 的变上限积分：<b>$F\'=f$</b>——概率密度是"概率的浓度"，$f(x)$ 本身不是概率（可大于 1），$f(x)dx$ 才是小区间概率。</p>
<blockquote>$P(a<X\\le b)=F(b)-F(a)=\\displaystyle\\int_a^bf(x)dx$。三大件关系：分布律/密度 → 分布函数 → 概率计算。</blockquote>`],
['def', '定义与公式',
`<p><b>① 分布函数性质：</b>单调不减；$0\\le F\\le1$；$F(-\\infty)=0,\\ F(+\\infty)=1$；右连续（连续型处处连续）。</p>
<p><b>② 密度性质：</b>$f\\ge0$；$\\displaystyle\\int_{-\\infty}^{+\\infty}f=1$。</p>
<p><b>③ 常见离散分布：</b>二项 $B(n,p)$（$n$ 重伯努利成功次数，$P(X=k)=\\binom nkp^kq^{n-k}$）；泊松 $P(\\lambda)$（$\\dfrac{\\lambda^ke^{-\\lambda}}{k!}$）；几何分布。</p>
<p><b>④ 常见连续分布：</b>均匀 $U(a,b)$（$f=\\tfrac{1}{b-a}$）；指数 $E(\\lambda)$（$f=\\lambda e^{-\\lambda x},\\ x>0$，<b>无记忆性</b>）；正态 $N(\\mu,\\sigma^2)$（钟形，标准化 $\\dfrac{X-\\mu}{\\sigma}\\sim N(0,1)$，$\\Phi(-x)=1-\\Phi(x)$）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 设 $f(x)=\\begin{cases}ax, & 0<x<1\\\\0, & \\text{其他}\\end{cases}$，求 $a$ 与 $P(X>\\tfrac12)$</div>
<p>归一化：$\\displaystyle\\int_0^1 ax\\,dx=\\frac a2=1\\Rightarrow a=2$。</p>
$$ P\\left(X>\\frac12\\right)=\\int_{1/2}^{1}2x\\,dx=1-\\frac14=\\frac34 $$
</div>
<div class="ex-box"><div class="ex-t">例 2（正态标准化）$X\\sim N(2,4)$，求 $P(0<X<4)$</div>
<p>$\\sigma=2$。$P(0<X<4)=P\\left(-1<\\dfrac{X-2}{2}<1\\right)=\\Phi(1)-\\Phi(-1)=2\\Phi(1)-1\\approx0.6826$。</p>
<p class="muted">"一倍标准差 68%、两倍 95%、三倍 99.7%"是正态的身份证。</p></div>`],
['warn', '易错点',
`<p>• 密度值 $f(x)$ 可以大于 1，它不是概率。</p>
<p>• 正态的 $N(\\mu,\\sigma^2)$ 第二个参数是<b>方差</b>，标准化除的是 $\\sigma$ 不是 $\\sigma^2$。</p>
<p>• 连续型单点概率为 0：$P(X=a)=0$，因此 $P(X\\ge a)=P(X>a)$。</p>`]
],
quiz: [
{id:'q1', q:'连续型随机变量 $P(X=a)$ 等于？', opts:['$f(a)$', '$0$', '$F(a)$', '不确定'], ans:1, exp:'单点概率为零（$F$ 在该点连续，没有跳跃）。'},
{id:'q2', q:'$X\\sim N(0,1)$，$\\Phi(1)=0.8413$，则 $P(X<-1)=$？', opts:['0.8413', '0.1587', '0.5', '0.3174'], ans:1, exp:'对称性 $\\Phi(-1)=1-0.8413=0.1587$。'}
]

},

'4-3': {
title: '二维随机变量及其分布',
secs: [
['why', '为什么学这一节',
`<p>两个随机变量同时变化的规律由联合分布刻画；独立性判断、边缘分布、条件分布与两个函数之和的分布（卷积雏形）是数一概率的难点高地。</p>`],
['think', '直观理解',
`<p><b>联合分布 = 双变量"地形图"。</b>离散型是二维表格；连续型是曲面密度 $f(x,y)$，总体积必须为 1。</p>
<blockquote><b>边缘分布 = 沿一个方向"投影压缩"</b>：$f_X(x)=\\displaystyle\\int_{-\\infty}^{+\\infty}f(x,y)dy$。<br><b>独立性 = 地形图可分解</b>：$f(x,y)=f_X(x)f_Y(y)$ 处处成立。</blockquote>`],
['def', '定义与公式',
`<p><b>① 联合分布函数：</b>$F(x,y)=P(X\\le x, Y\\le y)$；矩形概率 $P(a<X\\le b, c<Y\\le d)=F(b,d)-F(a,d)-F(b,c)+F(a,c)$。</p>
<p><b>② 连续型：</b>$f(x,y)\\ge0$，全面积积分为 1；边缘密度按上述积分。</p>
<p><b>③ 独立性：</b>任意 $(x,y)$ 处 $F(x,y)=F_X(x)F_Y(y)$（密度：$f=f_Xf_Y$）；<b>联合正态：独立 ⟺ $\\rho=0$</b>（一般分布不成立！）。</p>
<p><b>④ 条件分布：</b>$f_{X|Y}(x|y)=\\dfrac{f(x,y)}{f_Y(y)}$。</p>
<p><b>⑤ $Z=X+Y$ 的密度（卷积）：</b>$f_Z(z)=\\displaystyle\\int_{-\\infty}^{+\\infty}f(x,z-x)dx$；独立时 $f_Z=\\int f_X(x)f_Y(z-x)dx$。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（独立性判断）$f(x,y)=\\begin{cases}6xy, & 0<x<1,\\ 0<y<1\\\\0, & \\text{其他}\\end{cases}$，$X,Y$ 独立吗？</div>
<p>$f_X(x)=\\displaystyle\\int_0^1 6xy\\,dy=3x$（$0<x<1$）；$f_Y(y)=3y$。$f_Xf_Y=9xy\\neq6xy$ → <b>不独立</b>。</p></div>
<div class="ex-box"><div class="ex-t">例 2（均匀三角形区域）$f(x,y)=1$（$0<x<y<1$），求 $P(X+Y\\le1)$</div>
<p>区域 $0<x<y,\\ x+y\\le1$ 与 $x<y$ 交于 $x<\\tfrac12$：</p>
$$ \\int_0^{1/2}dx\\int_x^{1-x}dy=\\int_0^{1/2}(1-2x)dx=\\frac14 $$
<p class="muted">二维积分先画联合密度非零区域，再定二重积分限。</p></div>`],
['warn', '易错点',
`<p>• 边缘独立才能由边缘恢复联合；"边缘都是正态 ⇒ 联合正态"是错误命题。</p>
<p>• 联合正态里 $\\rho=0$ 恰好等价独立，是特例，别推广。</p>
<p>• 求区域概率先画支撑集（密度非零范围），限要落在交集里。</p>`]
],
quiz: [
{id:'q1', q:'$X,Y$ 独立（连续型）$\\iff$？', opts:['$f(x,y)=f_X(x)f_Y(y)$ 处处成立', '$f_X=f_Y$', '$E(X)=E(Y)$', '$F(x,y)$ 连续'], ans:0, exp:'独立性 = 联合密度可分解为边缘之积。'},
{id:'q2', q:'边缘密度 $f_X(x)$ 的计算式是？', opts:['$f(x,x)$', '$\\displaystyle\\int_{-\\infty}^{+\\infty}f(x,y)dy$', '$\\dfrac{\\partial F}{\\partial y}$', '$f(x,y)dy$'], ans:1, exp:'沿另一变量积分"投影"。'}
]

},

'4-4': {
title: '期望、方差、协方差与相关系数',
secs: [
['why', '为什么学这一节',
`<p>数字特征把分布浓缩成几个关键数：期望（重心）、方差（离散度）、协方差/相关系数（联动性）。它们是"不用写出分布就能比较"的浓缩信息，选择与计算题年年出现。</p>`],
['think', '直观理解',
`<p><b>期望 = 加权平均的重心。</b>抽检平均分、彩票平均回报都是它。方差 $E[(X-EX)^2]$ 量"离重心多远"（单位平方，标准差开方还原）。</p>
<blockquote><b>相关系数 = 标准化后的协方差</b>，量"线性关联强度"：$|\\rho|=1$ 完全线性，$\\rho=0$ 不（线性）相关——但 $\\rho=0$ 不代表独立！</blockquote>`],
['def', '定义与公式',
`<p><b>① 期望：</b>离散 $\\sum x_ip_i$；连续 $\\displaystyle\\int xf(x)dx$。线性性：$E(aX+b)=aEX+b$；$E(X\\pm Y)=EX\\pm EY$（无条件成立！）。</p>
<p><b>② 方差：</b></p>
$$ D(X)=E(X^2)-[E(X)]^2\\qquad(\\text{计算主力公式}) $$
$$ D(aX+b)=a^2D(X);\\quad D(X\\pm Y)=DX+DY\\pm2\\mathrm{Cov}(X,Y) $$
<p><b>③ 常见分布的期望方差：</b>二项 $np,\\ npq$；泊松 $\\lambda,\\ \\lambda$；均匀 $\\tfrac{a+b}{2},\\ \\tfrac{(b-a)^2}{12}$；指数 $\\tfrac1\\lambda,\\ \\tfrac1{\\lambda^2}$；正态 $\\mu,\\ \\sigma^2$。</p>
<p><b>④ 协方差与相关：</b>$\\mathrm{Cov}(X,Y)=E(XY)-EX\\cdot EY$；$\\rho=\\dfrac{\\mathrm{Cov}}{\\sqrt{DX\\cdot DY}}$。独立 ⇒ 不相关（反之不然）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 $f(x)=\\begin{cases}2x, & 0<x<1\\\\0,\\text{其他}\\end{cases}$，求 $E(X)$ 与 $D(X)$</div>
<p>$E(X)=\\displaystyle\\int_0^1x\\cdot2x\\,dx=\\tfrac23$；$E(X^2)=\\displaystyle\\int_0^1x^2\\cdot2x\\,dx=\\tfrac12$。</p>
$$ D(X)=\\frac12-\\frac49=\\frac{1}{18} $$
</div>
<div class="ex-box"><div class="ex-t">例 2（性质速算）$X\\sim B(10, 0.3)$，求 $E(2X+1)$ 与 $D(2X+1)$</div>
<p>$EX=3,\\ DX=10\\times0.3\\times0.7=2.1$。</p>
$$ E(2X+1)=7,\\qquad D(2X+1)=4\\times2.1=8.4 $$
<p class="muted">线性变换下方差只乘 $a^2$，常数 $b$ 不参与。</p></div>`],
['warn', '易错点',
`<p>• $D(X\\pm Y)=DX+DY$ 只在<b>独立</b>（或不相关）时成立；期望的线性才是无条件的。</p>
<p>• "不相关 = 独立"错误；反例 $X\\sim U(-1,1)$，$Y=X^2$：$\\mathrm{Cov}=0$ 但显然不独立。</p>
<p>• 二项方差是 $npq$ 不是 $np$。</p>`]
],
quiz: [
{id:'q1', q:'$D(X)$ 的计算公式是？', opts:['$E(X^2)-E(X)$', '$E(X^2)-[E(X)]^2$', '$[E(X)]^2-E(X^2)$', '$E[(X-E(X^2))^2]$'], ans:1, exp:'平方的期望减期望的平方。'},
{id:'q2', q:'$X\\sim P(\\lambda)$（泊松），则 $E(X), D(X)$ 为？', opts:['$\\lambda,\\ \\lambda^2$', '$\\lambda,\\ \\lambda$', '$\\tfrac1\\lambda,\\ \\tfrac1{\\lambda^2}$', '$n\\lambda,\\ n\\lambda$'], ans:1, exp:'泊松分布期望方差都是 $\\lambda$。'},
{id:'q3', q:'$\\rho_{XY}=0$ 能推出 $X,Y$ 独立吗？', opts:['能', '不能（只是无线性相关）', '正态时总能', '连续型总能'], ans:1, exp:'不相关不等于独立。注：二维正态分布是例外（$\\rho=0\\iff$ 独立）。'}
]

},

'4-5': {
title: '大数定律与中心极限定理',
secs: [
['why', '为什么学这一节',
`<p>这两组定理是"频率稳定性"与"正态无处不在"的理论根基：大数定律说"样本平均趋于期望"，中心极限定理说"大量独立小扰动之和近似正态"。数一以概念选择题为主。</p>`],
['think', '直观理解',
`<p><b>大数定律 = 抛硬币抛得越多，正面频率越贴近 0.5。</b>样本均值 $\\bar X_n$ 随 $n$ 增大"挤"向期望 $\\mu$。</p>
<blockquote><b>中心极限定理 = 大自然偏爱钟形曲线。</b>不管单个变量什么分布（只要独立、方差有限），加在一起 $n$ 个后，$\\dfrac{\\bar X-\\mu}{\\sigma/\\sqrt n}\\xrightarrow{\\ \\text{近似}\\ }N(0,1)$——正态是"随机性叠加"的普适形状。</blockquote>`],
['def', '定义与公式',
`<p><b>① 切比雪夫不等式：</b></p>
$$ P(|X-EX|\\ge\\varepsilon)\\le\\frac{D(X)}{\\varepsilon^2} $$
<p>（证明大数定律的旧工具，也是直接考点。）</p>
<p><b>② 大数定律（共同骨架）：</b>$\\bar X_n=\\tfrac1n\\sum X_i\\xrightarrow{P}E(X_1)=\\mu$。版本区别在对独立同分布的要求强度：切比雪夫版（独立+方差一致有界）→ 辛钦版（独立同分布即可）→ 伯努利版（频率 → 概率）。</p>
<p><b>③ 列维—林德伯格 CLT：</b>$X_i$ 独立同分布，$E=\\mu, D=\\sigma^2$，则</p>
$$ \\frac{\\sum X_i-n\\mu}{\\sqrt n\\,\\sigma}\\ \\xrightarrow{\\text{近似}}\\ N(0,1) $$
<p><b>④ 棣莫弗—拉普拉斯 CLT：</b>二项分布的正态近似版本。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（切比雪夫）$EX=10,\\ DX=2$，估计 $P(8<X<12)$</div>
$$ P(|X-10|<2)\\ge1-\\frac{2}{4}=0.5 $$
</div>
<div class="ex-box"><div class="ex-t">例 2（CLT 估算）某系统 100 个独立部件，寿命均值 200h、标准差 20h，求总寿命超过 20200h 的概率近似值</div>
<p>$\\sum X_i\\approx N(100\\times200,\\ 100\\times20^2)=N(20000,\\ 200^2)$。</p>
$$ P\\left(\\sum X_i>20200\\right)=1-\\Phi\\left(\\frac{20200-20000}{200}\\right)=1-\\Phi(1)\\approx0.1587 $$
</div>`],
['warn', '易错点',
`<p>• CLT 标准化时分母是 $\\sqrt n\\,\\sigma$（和的）或 $\\dfrac{\\sigma}{\\sqrt n}$（均值的），两种形态别混。</p>
<p>• 大数定律收敛的是<b>依概率收敛</b>，不是逐点收敛。</p>`]
],
quiz: [
{id:'q1', q:'依概率收敛 $\\bar X_n\\xrightarrow{P}\\mu$ 的含义是？', opts:['每条样本路径都收敛', '对任意 $\\varepsilon$，$P(|\\bar X_n-\\mu|<\\varepsilon)\\to1$', '$\\bar X_n=\\mu$', '方差趋于无穷'], ans:1, exp:'偏差大于 $\\varepsilon$ 的概率趋于零。'},
{id:'q2', q:'中心极限定理的结论是大量独立同分布随机变量之和近似？', opts:['泊松分布', '正态分布', '均匀分布', '指数分布'], ans:1, exp:'和标准化后近似 $N(0,1)$——正态分布的普适来源。'}
]

},

'4-6': {
title: '数理统计基础：三大分布与抽样分布',
secs: [
['why', '为什么学这一节',
`<p>统计推断的原料是样本。正态总体下，样本均值与样本方差的精确分布（$\\chi^2$、$t$、$F$）是区间估计与假设检验的引擎，数一几乎年年出"抽样分布"小题。</p>`],
['think', '直观理解',
`<p><b>样本 $X_1,\\cdots,X_n$ 独立同分布。</b>统计量 $\\bar X,\\ S^2$ 是样本的函数（不含未知参数）。</p>
<blockquote>三大分布都是"标准正态的后代"：<b>$\\chi^2(n)$ = n 个标准正态平方和</b>（掌管方差）；<b>$t(n)$ = 标准正态 ÷ √(χ²/自由度)</b>（小样本均值）；<b>$F$ = 两个 χ² 之比的归一</b>（方差比）。</blockquote>`],
['def', '定义与公式',
`<p><b>① 核心定理（正态总体）：</b>$X\\sim N(\\mu,\\sigma^2)$，则</p>
$$ \\bar X\\sim N\\left(\\mu,\\frac{\\sigma^2}{n}\\right),\\qquad \\frac{(n-1)S^2}{\\sigma^2}\\sim\\chi^2(n-1) $$
$$ \\frac{\\bar X-\\mu}{S/\\sqrt n}\\sim t(n-1),\\qquad \\bar X\\ \\text{与}\\ S^2\\ \\text{独立} $$
<p><b>② 三大分布构造：</b>$\\chi^2(n)=\\sum_{i=1}^nZ_i^2$（$Z_i\\sim N(0,1)$ 独立）；$t(n)=\\dfrac{Z}{\\sqrt{\\chi^2(n)/n}}$；$F(m,n)=\\dfrac{\\chi^2(m)/m}{\\chi^2(n)/n}$。</p>
<p><b>③ 分位数：</b>$P\\{X>\\chi^2_\\alpha(n)\\}=\\alpha$ 等上侧分位数记法；$t$ 分布对称，$t_{1-\\alpha}(n)=-t_\\alpha(n)$。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 $X\\sim N(1,4)$，$n=16$，求 $\\bar X$ 的分布</div>
$$ \\bar X\\sim N\\left(1,\\frac{4}{16}\\right)=N\\left(1,\\ 0.25\\right) $$
<p class="muted">样本均值方差缩为 $\\tfrac{\\sigma^2}{n}$——"平均降低了波动"。</p></div>
<div class="ex-box"><div class="ex-t">例 2 $X_1,\\cdots,X_n\\sim N(0,1)$，$\\dfrac{1}{n}\\sum X_i^2$ 服从什么？</div>
<p>$\\sum X_i^2\\sim\\chi^2(n)$，除以 $n$ 即 $\\dfrac{\\chi^2(n)}{n}$。</p></div>`],
['warn', '易错点',
`<p>• $\\dfrac{(n-1)S^2}{\\sigma^2}$ 的自由度是 $n-1$（损失了 1 个自由度在 $\\bar X$ 上）。</p>
<p>• $\\bar X$ 服从的方差是 $\\dfrac{\\sigma^2}{n}$，除的是 $n$。</p>
<p>• $t$ 与 $F$ 都要求"分子分母独立"（来自正态总体的结构保证）。</p>`]
],
quiz: [
{id:'q1', q:'正态总体下 $\\dfrac{(n-1)S^2}{\\sigma^2}$ 服从？', opts:['$\\chi^2(n)$', '$\\chi^2(n-1)$', '$t(n-1)$', '$N(0,1)$'], ans:1, exp:'样本方差服从自由度 $n-1$ 的卡方分布。'},
{id:'q2', q:'$\\bar X$ 与 $S^2$（正态总体）的关系是？', opts:['相关', '相互独立', '相等', '一个收敛于另一个'], ans:1, exp:'正态总体样本均值与样本方差独立（Fisher 引理）。'}
]

},

'4-7': {
title: '参数估计：矩估计与最大似然估计',
secs: [
['why', '为什么学这一节',
`<p>点估计是"用样本反推总体参数"的两大正路：矩估计（让样本矩=总体矩，机械好算）与最大似然估计（挑让样本"最可能"出现的参数，思辨性强）。数一概率大题的收官题型。</p>`],
['think', '直观理解',
`<p><b>矩估计 = 一阶一阶对账。</b>总体期望（一阶矩）= 样本均值 $\\bar X$，总体方差（二阶）= 样本二阶矩——解方程出参数。</p>
<blockquote><b>最大似然 = 事后诸葛亮式倒推。</b>问"哪个参数值让手头这批样本出现的概率最大？"——写似然函数 $L(\\theta)=\\prod f(x_i;\\theta)$，求导找峰。</blockquote>`],
['def', '定义与公式',
`<p><b>① 矩估计流程：</b>算总体矩 $E(X)=g(\\theta)$ → 令 $=\\bar X$（必要时二阶矩令 $=\\tfrac1n\\sum X_i^2$）→ 解出 $\\hat\\theta$。</p>
<p><b>② 最大似然流程：</b></p>
<p>1) 写似然：$L(\\theta)=\\prod_i f(x_i;\\theta)$；</p>
<p>2) 取对数：$\\ln L=\\sum\\ln f(x_i;\\theta)$（连乘变连加）；</p>
<p>3) 令 $\\dfrac{d\\ln L}{d\\theta}=0$ 解出 $\\hat\\theta$；导数无零点时看单调性取端点。</p>
<p><b>③ 估计量评价：</b>无偏性 $E(\\hat\\theta)=\\theta$（$\\bar X$ 无偏；$S^2=\\tfrac{1}{n-1}\\sum(X_i-\\bar X)^2$ 无偏，除以 $n$ 有偏）；有效性（方差小者优）；一致性。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（矩估计）$X\\sim E(\\lambda)$，样本 $x_1,\\cdots,x_n$，求 $\\lambda$ 的矩估计</div>
<p>$E(X)=\\dfrac1\\lambda=\\bar X \\Rightarrow \\hat\\lambda=\\dfrac{1}{\\bar X}$。</p></div>
<div class="ex-box"><div class="ex-t">例 2（最大似然）$X\\sim E(\\lambda)$，求 $\\lambda$ 的 MLE</div>
<p>$L=\\prod\\lambda e^{-\\lambda x_i}=\\lambda^ne^{-\\lambda\\sum x_i}$，$\\ln L=n\\ln\\lambda-\\lambda\\sum x_i$。</p>
$$ \\frac{d\\ln L}{d\\lambda}=\\frac n\\lambda-\\sum x_i=0\\ \\Rightarrow\\ \\hat\\lambda=\\frac{1}{\\bar X} $$
<p class="muted">指数分布两法殊途同归；正态的 MLE 是 $\\hat\\mu=\\bar X,\\ \\hat\\sigma^2=\\tfrac1n\\sum(x_i-\\bar x)^2$（方差那项有偏）。</p></div>`],
['warn', '易错点',
`<p>• MLE 忘记<b>取对数</b>直接对连乘求导，计算量失控。</p>
<p>• 均匀分布 $U(0,\\theta)$ 的 MLE 是 $\\hat\\theta=\\max(x_i)$（导数法失效，看支撑域），不能套求导。</p>
<p>• 无偏性检验用 $E(\\hat\\theta)$，"除以 $n-1$"正是为了无偏。</p>`]
],
quiz: [
{id:'q1', q:'最大似然估计的第二步标准操作是？', opts:['求二阶导', '取对数', '平方放大', '求期望'], ans:1, exp:'连乘取对数变连加，求导找极大值点。'},
{id:'q2', q:'估计量无偏是指？', opts:['$\\hat\\theta=\\theta$', '$E(\\hat\\theta)=\\theta$', '$D(\\hat\\theta)=0$', '$\\hat\\theta$ 为整数'], ans:1, exp:'无偏 = 估计量的期望等于真值，多次平均无系统偏差。'}
]

}

}
};
