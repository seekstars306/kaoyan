/* ===== 数学 · 线性代数 第2章 矩阵 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['math/lach02'] = {

lessons: {

'2-1': {
title: '矩阵的概念与运算',
secs: [
['why', '为什么学这一节',
`<p>矩阵是线代的"舞台"：方程组的系数、图形的变换、图的连接关系都装在矩阵里。运算规则里藏着几条与"数的运算"截然不同的红线（不满足交换律、零因子存在），是选择题的常设陷阱。</p>`],
['think', '直观理解',
`<p><b>矩阵 = 数的表格</b>；$m\\times n$ 矩阵有 $m$ 行 $n$ 列。</p>
<blockquote>乘法规则"行乘列"：$C$ 的第 $i$ 行第 $j$ 列 = $A$ 的第 $i$ 行与 $B$ 的第 $j$ 列对应相乘再相加。<br>形象比喻：$A$ 发出"左脚右脚"，$B$ 给出"每人两只鞋"，相乘就是配对清点。</blockquote>
<p><b>红线一：$AB\\neq BA$</b>（一般不交换）。<b>红线二：$AB=O \\nRightarrow A=O$ 或 $B=O$</b>（存在"非零零因子"）。<b>红线三：$AB=AC \\nRightarrow B=C$</b>（不能随便消去）。</p>`],
['def', '定义与公式',
`<p><b>① 乘法可乘条件：</b>$A_{m\\times s}\\cdot B_{s\\times n}$——$A$ 的列数 = $B$ 的行数；结果 $m\\times n$。行×行、列×列都不可乘。</p>
<p><b>② 运算律：</b>结合律 $(AB)C=A(BC)$、分配律 $A(B+C)=AB+AC$ 成立；<b>交换律不成立</b>。</p>
<p><b>③ 转置性质：</b>$(AB)^T=B^TA^T$（穿脱原则：先穿的后脱）。$(A+B)^T=A^T+B^T$，$(kA)^T=kA^T$。</p>
<p><b>④ 重要方阵公式：</b></p>
$$ (AB)^2=ABAB\\neq A^2B^2;\\qquad (A+B)^2=A^2+AB+BA+B^2 $$
<p><b>⑤ 单位阵 $E$、数量阵 $kE$ 与任何同阶方阵可交换。</b></p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（乘法）$A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$，$B=\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$，求 $AB$ 与 $BA$</div>
$$ AB=\\begin{pmatrix}2&1\\\\4&3\\end{pmatrix},\\qquad BA=\\begin{pmatrix}3&4\\\\1&2\\end{pmatrix} $$
<p>可见 $AB\\neq BA$——交换律确实失效。</p></div>
<div class="ex-box"><div class="ex-t">例 2（零因子）$A=\\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}$，$B=\\begin{pmatrix}0&0\\\\0&1\\end{pmatrix}$，验证 $AB=O$</div>
$$ AB=\\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}=O $$
<p>但 $A\\neq O,\\ B\\neq O$。所以"$AB=O$ 推不出 $A=O$ 或 $B=O$"。</p></div>`],
['warn', '易错点',
`<p>• $(AB)^T=B^TA^T$ 顺序要倒；$(AB)^{-1}=B^{-1}A^{-1}$ 同理。</p>
<p>• "行×行"不可乘；尺寸对不上时先检查可乘性。</p>
<p>• 幂运算 $(A+B)^2$ 不能展开成 $A^2+2AB+B^2$（缺交换律）。</p>`]
],
quiz: [
{id:'q1', q:'$A_{2\\times3}$ 与 $B_{3\\times2}$，则 $AB$ 的尺寸是？', opts:['$2\\times2$', '$3\\times3$', '$2\\times3$', '不可乘'], ans:0, exp:'$A$ 列数 3 = $B$ 行数 3，可乘，结果 $2\\times2$。'},
{id:'q2', q:'$(AB)^T$ 等于？', opts:['$A^TB^T$', '$B^TA^T$', '$AB$', '$A^{-1}B$'], ans:1, exp:'转置的"穿脱原则"：顺序反转。'},
{id:'q3', q:'设 $A,B$ 为同阶方阵且 $AB=O$，正确的结论是？', opts:['$A=O$ 或 $B=O$', '$\\det A=0$ 或 $\\det B=0$（至少一个不可逆）', '$A,B$ 都可逆', '$B=A$'], ans:1, exp:'对 $AB=O$ 两边取行列式：$\\det A\\cdot\\det B=0$，故至少一个行列式为 0、至少一个矩阵不可逆。但 $A,B$ 本身都可以是非零矩阵。'}
]

},

'2-2': {
title: '逆矩阵',
secs: [
['why', '为什么学这一节',
`<p>逆矩阵就是"矩阵的倒数"：解矩阵方程 $AX=B$、化简矩阵多项式全靠它。判断可逆、求逆、用逆性质变形是客观题高频考点。</p>`],
['think', '直观理解',
`<p><b>可逆 = 信息没丢失。</b>行列式非零（没被"压扁"）的方阵才可逆。$A^{-1}$ 的作用是把 $A$ 干的事"原路撤销"：$A^{-1}AX=X$。</p>
<blockquote>定义式要刻在脑子里：<b>$AA^{-1}=A^{-1}A=E$</b>。证明题里"凑单位阵"就是一切技巧的核心。</blockquote>`],
['def', '定义与公式',
`<p><b>① 可逆充要条件：</b>$A$ 为 $n$ 阶方阵，$A$ 可逆 $\\iff \\det A\\neq0$，且 $A^{-1}=\\dfrac{1}{\\det A}A^*$（$A^*$ 为伴随矩阵：$A_{ji}$ 组成，"行变列"）。</p>
<p><b>② 运算性质：</b></p>
$$ (AB)^{-1}=B^{-1}A^{-1},\\quad (A^T)^{-1}=(A^{-1})^T,\\quad (kA)^{-1}=\\frac{1}{k}A^{-1}\\ (k\\neq0) $$
$$ (A^{-1})^{-1}=A,\\qquad \\det A^{-1}=\\frac{1}{\\det A} $$
<p><b>③ 常用二阶求逆公式（快）：</b>当 $ad-bc\\neq0$ 时，$\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}^{-1}=\\dfrac{1}{ad-bc}\\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}$（“主换位、副变号”）。</p>
<p><b>④ 矩阵方程：</b>$AX=B\\Rightarrow X=A^{-1}B$；$XA=B\\Rightarrow X=BA^{-1}$（左右位置不能乱）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（二阶求逆）求 $A=\\begin{pmatrix}2&1\\\\3&2\\end{pmatrix}^{-1}$</div>
<p>$\\det A=4-3=1$，"主换位副变号"：</p>
$$ A^{-1}=\\begin{pmatrix}2&-1\\\\-3&2\\end{pmatrix} $$
</div>
<div class="ex-box"><div class="ex-t">例 2（解矩阵方程）设 $AX=E$ 附近常见形：$A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$，求 $X$ 使 $AX=E$</div>
<p>$X=A^{-1}$。用行变换或公式：$\\det A=1$，$A^{-1}=\\begin{pmatrix}1&-1\\\\0&1\\end{pmatrix}$。</p></div>
<div class="ex-box"><div class="ex-t">例 3（抽象变形）设 $A^2-A=2E$，证 $A$ 可逆并求 $A^{-1}$</div>
<p>凑定义：$A(A-E)=2E \\Rightarrow A\\cdot\\dfrac{A-E}{2}=E$。</p>
<p>由定义，$A$ 可逆且 $A^{-1}=\\dfrac{A-E}{2}$。∎</p>
<p class="muted">抽象题套路：把关系式改写成"某矩阵 × 某矩阵 = $kE$"。</p></div>`],
['warn', '易错点',
`<p>• $(A+B)^{-1} \\neq A^{-1}+B^{-1}$！逆没有加法分配律。</p>
<p>• 只有<b>方阵</b>才谈逆；$\\det A=0$（奇异/退化）则不可逆。</p>
<p>• 矩阵方程注意乘的位置：$AX=B$ 左乘 $A^{-1}$，$XA=B$ 右乘。</p>`]
],
quiz: [
{id:'q1', q:'$A=\\begin{pmatrix}1&2\\\\3&5\\end{pmatrix}$，$\\det A$ 与可逆性？', opts:['$-1$，可逆', '$-1$，不可逆', '$1$，可逆', '$11$，可逆'], ans:0, exp:'$\\det A=5-6=-1\\neq0$，可逆。'},
{id:'q2', q:'$(AB)^{-1}$ 等于？', opts:['$A^{-1}B^{-1}$', '$B^{-1}A^{-1}$', '$BA$', '$A^TB^T$'], ans:1, exp:'逆的穿脱原则：顺序反转。'},
{id:'q3', q:'设 $\\det A=2$，则 $\\det(3A^{-1})$ 等于（$A$ 为 3 阶方阵）？', opts:['$\\dfrac{3}{2}$', '$\\dfrac{27}{2}$', '$6$', '$\\dfrac{3}{8}$'], ans:1, exp:'$\\det(3A^{-1})=3^3\\det A^{-1}=27\\times\\tfrac12=\\tfrac{27}{2}$。'}
]

},

'2-3': {
title: '初等变换与初等矩阵',
secs: [
['why', '为什么学这一节',
`<p>初等变换是"矩阵的手术刀"：求逆、求秩、解方程组、化标准形全部用它。初等矩阵把"手术动作"变成"左乘一个矩阵"，是理解"为什么行变换能求逆"的钥匙。</p>`],
['think', '直观理解',
`<p><b>三种初等（行）变换：</b>① 两行对换；② 某行乘非零常数 $k$；③ 某行的 $k$ 倍加到另一行。</p>
<blockquote>对 $A$ 做一次行变换 = 在 $A$ 的<b>左边</b>乘一个对应的初等矩阵 $P$；列变换 = 右乘。<br>"手术刀动作"本身可以写成矩阵——这就是"$PA$ 能改变 $A$ 但保持秩"的原理。</blockquote>
<p><b>求逆的标准流程：</b>$(A:E)\\xrightarrow{\\text{行变换}}(E:A^{-1})$——把左边刷成 $E$，右边顺手得到 $A^{-1}$。</p>`],
['def', '定义与公式',
`<p><b>① 初等矩阵：</b>单位阵经一次初等变换得到的矩阵。左乘 = 行变换，右乘 = 列变换。</p>
<p><b>② 性质：</b>初等矩阵都可逆，逆仍是同类初等矩阵；初等变换不改变矩阵的秩。</p>
<p><b>③ 等价标准形：</b>任何 $m\\times n$ 矩阵 $A$ 都可经初等变换化为</p>
$$ \\begin{pmatrix}E_r & O\\\\ O & O\\end{pmatrix} $$
<p>其中 $r$ 就是 $A$ 的秩。$A$ 可逆 $\\iff A$ 能化为 $E\\iff r(A)=n$。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（行变换求逆）$A=\\begin{pmatrix}1&2\\\\3&5\\end{pmatrix}$</div>
$$ \\left(\\begin{array}{cc|cc}1&2&1&0\\\\3&5&0&1\\end{array}\\right)\\xrightarrow{r_2-3r_1}\\left(\\begin{array}{cc|cc}1&2&1&0\\\\0&-1&-3&1\\end{array}\\right)\\xrightarrow{r_2\\times(-1),\\ r_1-2r_2}\\left(\\begin{array}{cc|cc}1&0&-5&2\\\\0&1&3&-1\\end{array}\\right) $$
$$ A^{-1}=\\begin{pmatrix}-5&2\\\\3&-1\\end{pmatrix} $$
</div>
<div class="ex-box"><div class="ex-t">例 2（抽象）$P$ 可逆，$r(PA)$ 与 $r(A)$ 的关系？</div>
<p>可逆矩阵左乘相当于做若干次初等行变换，不改变秩：$r(PA)=r(A)$。∎</p>
<p class="muted">"$r(AB)\\le\\min\\{r(A),r(B)\\}$"与"$r(PA)=r(A)$"是秩的证明题基础件。</p></div>`],
['warn', '易错点',
`<p>• 行变换必须<b>整行同步变</b>，跳步乱写是最常见失分点。</p>
<p>• 左乘行变换、右乘列变换，方向别搞反。</p>
<p>• 求逆时只许用<b>行</b>变换（或只用列），行列混用出错。</p>`]
],
quiz: [
{id:'q1', q:'对 $A$ 施行一次初等行变换，相当于？', opts:['右乘一个初等矩阵', '左乘一个初等矩阵', '加上一个初等矩阵', '转置一次'], ans:1, exp:'左乘 = 行变换；右乘 = 列变换。'},
{id:'q2', q:'用行变换求 $A^{-1}$ 的正确拼块是？', opts:['$(A:E)\\to(E:A^{-1})$', '$(A:E)\\to(E:E)$', '$(E:A)\\to(A:E)$', '$(A:A)\\to(E:E)$'], ans:0, exp:'左侧 $A$ 刷成 $E$ 的同时，右侧 $E$ 变成了 $A^{-1}$。'},
{id:'q3', q:'初等变换会改变矩阵的秩吗？', opts:['会，每次变 1', '不会', '行变换会、列变换不会', '不确定'], ans:1, exp:'初等变换（行或列）都不改变秩，这正是"化行简梯形读秩"的原理。'}
]

},

'2-4': {
title: '矩阵的秩',
secs: [
['why', '为什么学这一节',
`<p>秩是矩阵"信息含量"的度量：它决定方程组解的结构、向量组相关性、可否对角化。抽象证明题里，秩的公式库就是"武器库"。</p>`],
['think', '直观理解',
`<p><b>秩 = 最大无关行（列）数 = 有效信息条数。</b>行变换把矩阵化成行阶梯形，非零行的行数就是秩——冗余行（可被其他行线性表示的"废话"）都被清成零行。</p>
<blockquote>$r(A)=n$ 的 $n$ 阶方阵可逆；$r(A)<n$ 时，齐次方程组 $A\\mathbf x=\\mathbf0$ 有非零解。对非齐次方程组，还必须比较系数矩阵与增广矩阵的秩，不能只凭 $r(A)<n$ 断定有无穷多解。</blockquote>`],
['def', '定义与公式',
`<p><b>① 定义：</b>非零子式的最高阶数；行阶梯形的非零行数。</p>
<p><b>② 常用公式（背熟）：</b>以下 $r(A)=r(A^T)=r(A^TA)$ 按本教材默认的实矩阵讨论；复矩阵应把 $A^T$ 换成共轭转置 $A^H$，即 $r(A)=r(A^H A)$。</p>
$$ r(A)=r(A^T)=r(A^TA) $$
$$ r(AB)\\le\\min\\{r(A), r(B)\\} $$
$$ r(A+B)\\le r(A)+r(B) $$
$$ r\\begin{pmatrix}A&O\\\\O&B\\end{pmatrix}=r(A)+r(B) $$
<p><b>③ Sylvester 不等式：</b>若 $A$ 为 $m\\times n$ 矩阵、$B$ 为 $n\\times s$ 矩阵，则无须附加其他秩条件，恒有</p>
$$ r(AB)\\ge r(A)+r(B)-n $$
<p><b>④ $AB=O$ 时：</b>$r(A)+r(B)\\le n$（$B$ 的列都是 $Ax=0$ 的解）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（求秩）$A=\\begin{pmatrix}1&2&3\\\\2&4&6\\\\1&1&1\\end{pmatrix}$</div>
<p>$r_2-2r_1$ 得零行；$r_3-r_1=\\begin{pmatrix}0&-1&-2\\end{pmatrix}$。阶梯形非零行 2 行：</p>
$$ r(A)=2 $$
</div>
<div class="ex-box"><div class="ex-t">例 2（公式应用）$A$ 为 $4\\times3$ 矩阵且 $r(A)=3$，问 $Ax=0$ 的解空间维数？</div>
<p>$n-r(A)=3-3=0$，只有零解（这为第 4 章解的结构埋下伏笔）。</p></div>`],
['warn', '易错点',
`<p>• $r(kA)=r(A)$（$k\\neq0$），乘非零常数不变秩；$k=0$ 则秩为 0。</p>
<p>• $r(AB)$ 一般不等于 $\\min$，只是 $\\le\\min$。</p>
<p>• 求秩用初等<b>行</b>变换化阶梯形即可，不必求到最简形。</p>`]
],
quiz: [
{id:'q1', q:'行阶梯形矩阵有 3 个非零行，则秩为？', opts:['1', '2', '3', '列数'], ans:2, exp:'秩 = 阶梯形非零行数。'},
{id:'q2', q:'$A$ 为 $5\\times4$ 矩阵，$r(A)$ 最大是？', opts:['5', '4', '20', '1'], ans:1, exp:'秩不超过行数与列数的较小者，即 $\\le4$。'},
{id:'q3', q:'$A,B$ 为 $n$ 阶方阵且 $AB=O$，则？', opts:['$r(A)+r(B)\\le n$', '$r(A)+r(B)=n$', '$r(A)=r(B)$', '$A,B$ 都满秩'], ans:0, exp:'$B$ 的列全落在 $Ax=0$ 的解空间（维数 $n-r(A)$）内：$r(B)\\le n-r(A)$。'}
]

}

}
};
