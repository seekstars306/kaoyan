/* ===== 数学 · 线性代数 第5章 特征值与特征向量 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['math/lach05'] = {

lessons: {

'5-1': {
title: '特征值与特征向量的概念和计算',
secs: [
['why', '为什么学这一节',
`<p>特征值刻画矩阵作用下保持在同一条直线上的特殊方向：$A\\xi=\\lambda\\xi$。当 $\\lambda>0$ 时方向不变并按 $|\\lambda|$ 倍缩放；$\\lambda<0$ 时还会反向；$\\lambda=0$ 时被压到零向量。它是相似对角化、二次型正定以及许多应用模型的共同基础。</p>`],
['think', '直观理解',
`<p><b>找“作用后仍落在原直线上的方向”。</b>一般向量经 $A$ 作用后会转向；特征向量 $\\xi$ 的像 $A\\xi$ 却仍是 $\\xi$ 的倍数。要注意：实矩阵在实数范围内未必存在这样的方向，例如平面旋转 $90^\\circ$ 的矩阵没有实特征向量。</p>
<blockquote>求法：<b>解 $(\\lambda E-A)\\mathbf x=\\mathbf0$ 的非零解。</b>齐次方程有非零解要求系数行列式为零，所以先解特征方程 $\\det(\\lambda E-A)=0$，再对每个根求对应非零解。</blockquote>
<p><b>两条性质：</b>在复数范围内按代数重数列出全部特征值，它们的和等于迹，积等于行列式。</p>`],
['def', '定义与公式',
`<p><b>① 定义：</b>$A\\xi=\\lambda\\xi\\ (\\xi\\neq\\mathbf0)$；$\\lambda$ 称为特征值，非零向量 $\\xi$ 称为对应特征向量。</p>
<p><b>② 特征方程：</b>$\\det(\\lambda E-A)=0$。在复数范围内，$n$ 次特征多项式有 $n$ 个根（按代数重数计），所以 $n$ 阶矩阵有 $n$ 个复特征值；若只在实数范围内讨论，实矩阵未必有 $n$ 个实特征值。</p>
<p><b>③ 两个恒等式：</b></p>
$$ \\sum\\lambda_i=\\mathrm{tr}(A),\\qquad \\prod\\lambda_i=\\det A $$
<p><b>④ 派生矩阵的特征值：</b>若 $A\\xi=\\lambda\\xi$，则 $kA$ 对 $\\xi$ 的特征值为 $k\\lambda$，$A^m$ 为 $\\lambda^m$，多项式 $f(A)$ 为 $f(\\lambda)$；若 $A$ 可逆，则 $A^{-1}$ 为 $\\lambda^{-1}$；若 $A$ 可逆，则 $A^*$ 为 $\\dfrac{\\det A}{\\lambda}$。这些结论中的对应特征向量仍可取 $\\xi$。</p>
<p><b>⑤ 不同特征值的特征向量线性无关；固定特征值 $\\lambda$ 的全部特征向量再加零向量构成特征子空间，其维数为 $n-r(\\lambda E-A)$。</b></p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 求 $A=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$ 的特征值与特征向量</div>
<p>$\\det(\\lambda E-A)=(\\lambda-2)^2-1=0 \\Rightarrow \\lambda=1,3$。</p>
<p>• $\\lambda=1$：$(E-A)=\\begin{pmatrix}-1&-1\\\\-1&-1\\end{pmatrix}$，方程 $x_1+x_2=0$，取 $\\xi_1=(1,-1)^T$；</p>
<p>• $\\lambda=3$：$(3E-A)=\\begin{pmatrix}1&-1\\\\-1&1\\end{pmatrix}$，方程 $x_1-x_2=0$，取 $\\xi_2=(1,1)^T$；</p>
<p><b>代回验证：</b>$A\\xi_1=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}\\begin{pmatrix}1\\\\-1\\end{pmatrix}=\\begin{pmatrix}1\\\\-1\\end{pmatrix}=1\\cdot\\xi_1$ ✓；$A\\xi_2=\\begin{pmatrix}3\\\\3\\end{pmatrix}=3\\xi_2$ ✓。</p>
$$ \\lambda_1=1:\\ \\xi_1=(1,-1)^T;\\qquad \\lambda_2=3:\\ \\xi_2=(1,1)^T $$
<p class="muted">特征向量算完<b>务必代回 $A\\xi=\\lambda\\xi$ 验证</b>——特别是 $\\lambda$ 不止一个时容易张冠李戴。</p></div>`],
['warn', '易错点',
`<p>• 特征向量 $\\xi\\neq\\mathbf0$，零向量永远不算。</p>
<p>• $f(A)$ 的特征值可用 $f(\\lambda)$，但<b> $A+kE$ 的特征向量仍是原特征向量</b>，不要重新解。</p>
<p>• 不同特征值对应特征向量无关；<b>同一</b>特征值的不同特征向量可能相关。</p>
<p>• 算完必验证 $A\\xi=\\lambda\\xi$。</p>`]
],
quiz: [
{id:'q1', q:'$\\lambda$ 是 $A$ 的特征值，则 $A^2$ 对应的特征值是？', opts:['$\\lambda$', '$\\lambda^2$', '$2\\lambda$', '$\\lambda+1$'], ans:1, exp:'$A^2\\xi=A(\\lambda\\xi)=\\lambda A\\xi=\\lambda^2\\xi$。'},
{id:'q2', q:'$A$ 为 3 阶矩阵，特征值 $1,2,3$，则 $\\det A$ 与 $\\mathrm{tr}(A)$ 是？', opts:['$\\det=6,\\ \\mathrm{tr}=6$', '$\\det=1,\\ \\mathrm{tr}=3$', '$\\det=6,\\ \\mathrm{tr}=5$', '$\\det=3,\\ \\mathrm{tr}=6$'], ans:0, exp:'积 = 1·2·3 = 6 = $\\det A$；和 = 6 = 迹。'},
{id:'q3', q:'$A$ 可逆的充要条件（用特征值表述）是？', opts:['有特征值为 0', '所有特征值非零', '特征值全为 1', '特征值互异'], ans:1, exp:'$\\det A=\\prod\\lambda_i\\neq0 \\iff$ 没有零特征值。'}
]

},

'5-2': {
title: '相似与对角化',
secs: [
['why', '为什么学这一节',
`<p>对角化把矩阵"卸妆"成最简形态：$P^{-1}AP=\\Lambda$ 后，矩阵幂 $A^m$、行列式、所有依赖 $A$ 的计算都变得轻松。"判断能否对角化"与"反求参数"是高频大题。</p>`],
['think', '直观理解',
`<p><b>相似 = 同一个人换了个观察角度。</b>$B=P^{-1}AP$ 说明 $A,B$ 本质是同一个线性变换，只是坐标架不同。相似矩阵共享：特征值、行列式、迹、秩。</p>
<blockquote><b>可对角化 = 找到 $n$ 个无关的"方向锚"拼成 $P$。</b>$n$ 个无关特征向量恰好撑起整个空间时，$A$ 在这组基下就是"纯伸缩"的对角阵。</blockquote>`],
['def', '定义与公式',
`<p><b>① 相似定义与不变量：</b>$B=P^{-1}AP$；相似 ⇒ 特征多项式相同 ⇒ 特征值、$\\det$、迹、秩、各特征值的代数重数都相同。</p>
<p><b>② 先说明数域：</b>“可对角化”必须相对于所讨论的数域而言。矩阵在数域 $\\mathbb F$ 上可对角化，要求在 $\\mathbb F$ 中找到 $n$ 个线性无关特征向量；实矩阵可能在 $\\mathbb C$ 上可对角化而在 $\\mathbb R$ 上不能对角化。</p>
<p><b>③ 可对角化充要条件：</b>在固定数域内，$A$ 有 $n$ 个线性无关的特征向量 $\\iff$ 特征多项式在该数域中完全分裂，且每个代数重数为 $k_i$ 的特征值都满足 $n-r(\\lambda_iE-A)=k_i$。</p>
<p><b>④ 充分条件：</b>$A$ 在所讨论数域内有 $n$ 个互异特征值 ⇒ 必可在该数域内对角化；实对称矩阵必可在 $\\mathbb R$ 上正交对角化。</p>
<p><b>⑤ 对角化流程：</b>求全部特征值 → 逐个求特征向量 → 拼 $P=[\\xi_1\\cdots\\xi_n]$ → 则 $P^{-1}AP=\\mathrm{diag}(\\lambda_1,\\cdots,\\lambda_n)$（$P$ 的列与 $\\Lambda$ 对角元按位置对应！）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（判断）$A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$ 能否对角化？</div>
<p>特征方程 $(\\lambda-1)^2=0$，$\\lambda=1$ 二重。求特征向量：$(E-A)\\mathbf x=\\mathbf0$ 得 $x_2=0$，只有 1 个无关向量 $\\xi=(1,0)^T$。</p>
<p>$k=2$ 重但只有 1 个无关向量 → <b>不可对角化</b>（这就是"若尔当块"的原型）。</p></div>
<div class="ex-box"><div class="ex-t">例 2（求 $A^m$）$A=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$（5-1 已求 $P$ 与 $\\Lambda$），求 $A^{10}$</div>
<p>$P=\\begin{pmatrix}1&1\\\\-1&1\\end{pmatrix},\\ \\Lambda=\\begin{pmatrix}1\\\\&3\\end{pmatrix}$（列与对角元对应）。</p>
$$ A^{10}=P\\Lambda^{10}P^{-1}=P\\begin{pmatrix}1\\\\&3^{10}\\end{pmatrix}P^{-1}=\\frac12\\begin{pmatrix}1+3^{10}&3^{10}-1\\\\3^{10}-1&1+3^{10}\\end{pmatrix} $$
<p class="muted">对角化的终极红利：$\\Lambda^m$ 只是"对角元各自乘方"。</p></div>`],
['warn', '易错点',
`<p>• $P$ 的列与 $\\Lambda$ 的对角元<b>位置一一对应</b>，顺序打乱答案全错。</p>
<p>• "互异特征值 ⇒ 可对角化"只是充分条件；重根时必须逐一检查 $n-r(\\lambda E-A)=k$。</p>
<p>• 相似不变量是"单向箭头"：特征值相同不能反推相似。</p>`]
],
quiz: [
{id:'q1', q:'$A$ 可对角化的充要条件是？', opts:['特征值互异', '有 $n$ 个线性无关的特征向量', '对称', '行列式非零'], ans:1, exp:'本质条件是"无关特征向量够 n 个"；互异只是其充分条件之一。'},
{id:'q2', q:'$A$ 与 $B$ 相似，则下列不一定成立的是？', opts:['特征值相同', '$\\det A=\\det B$', '$AB=BA$', '秩相同'], ans:2, exp:'相似矩阵一般不交换，所以 $AB=BA$ 不一定成立；其余三项都是相似不变量。'},
{id:'q3', q:'$k$ 重特征值 $\\lambda$ 对应的无关特征向量个数为 $n-r(\\lambda E-A)$，可对角化要求它？', opts:['≥1', '≥k', '=k', '=n'], ans:2, exp:'每个特征值"供给"的无关向量数必须达到其重数，加起来才有 n 个。'}
]

},

'5-3': {
title: '实对称矩阵与正交对角化',
secs: [
['why', '为什么学这一节',
`<p>实对称矩阵是"品行最好"的矩阵：必可对角化，且能用<b>正交矩阵</b>对角化——这是第 6 章二次型（用正交变换化标准形）的直接前置，大题几乎年年接力出题。</p>`],
['think', '直观理解',
`<p><b>实对称矩阵的特征向量可以"组一个正交军团"。</b>不同特征值的特征向量天然正交；同一个特征值的多重向量也能通过施密特正交化"掰正交"。</p>
<blockquote><b>正交矩阵 = 只旋转/反射、不伸缩。</b>$Q^TQ=E$，所以 $Q^{-1}=Q^T$——用 $Q$ 对角化连求逆都免了。</blockquote>`],
['def', '定义与公式',
`<p><b>① 正交向量组与正交矩阵：</b>$\\xi_i^T\\xi_j=0\\ (i\\neq j)$；$Q^TQ=E \\iff Q^{-1}=Q^T \\iff$ 列(行)向量组为标准正交组。$\\det Q=\\pm1$。</p>
<p><b>② 实对称矩阵三大性质：</b>特征值全为<b>实数</b>；不同特征值的特征向量<b>正交</b>；必可正交对角化：$Q^TAQ=\\Lambda$。</p>
<p><b>③ 施密特正交化：</b>$\\beta_1=\\alpha_1$，$\\beta_2=\\alpha_2-\\dfrac{(\\alpha_2,\\beta_1)}{(\\beta_1,\\beta_1)}\\beta_1$，再单位化。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（正交对角化）$A=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$，求正交阵 $Q$ 使 $Q^TAQ=\\Lambda$</div>
<p>特征值 $1,3$；特征向量 $(1,-1)^T$ 与 $(1,1)^T$（已天然正交）。单位化：</p>
$$ Q=\\frac{1}{\\sqrt2}\\begin{pmatrix}1&1\\\\-1&1\\end{pmatrix},\\qquad Q^TAQ=\\begin{pmatrix}1\\\\&3\\end{pmatrix} $$
</div>
<div class="ex-box"><div class="ex-t">例 2（重根情形正交化）某 $\\lambda=2$ 有两个无关特征向量 $\\alpha_1=(1,1,0)^T,\\ \\alpha_2=(0,1,1)^T$，正交化</div>
<p>$\\beta_1=\\alpha_1$；$\\beta_2=\\alpha_2-\\dfrac{(\\alpha_2,\\beta_1)}{(\\beta_1,\\beta_1)}\\beta_1=(0,1,1)-\\tfrac12(1,1,0)=\\left(-\\tfrac12,\\tfrac12,1\\right)$。再单位化即可。</p></div>`],
['warn', '易错点',
`<p>• 正交化<b>只在同一特征值内部</b>做；不同特征值的向量已正交，再正交化反而画蛇添足。</p>
<p>• $Q$ 的列要<b>单位化</b>，漏单位化 $Q^TQ\\neq E$。</p>
<p>• 实对称才有"不同特征值特征向量正交"的福利，一般矩阵没有。</p>`]
],
quiz: [
{id:'q1', q:'实对称矩阵的不同特征值对应的特征向量必然？', opts:['线性相关', '正交', '相等', '互为转置'], ans:1, exp:'这是实对称矩阵的招牌性质：异特征值特征向量正交。'},
{id:'q2', q:'$Q$ 为正交矩阵，则 $Q^{-1}$ 等于？', opts:['$Q$', '$Q^T$', '$-Q$', '$\\det Q$'], ans:1, exp:'$Q^TQ=E \\Rightarrow Q^{-1}=Q^T$。'},
{id:'q3', q:'施密特正交化 $\\beta_2=\\alpha_2-\\dfrac{(\\alpha_2,\\beta_1)}{(\\beta_1,\\beta_1)}\\beta_1$ 中减去的那一项是在？', opts:['把 $\\beta_1$ 单位化', '去掉 $\\alpha_2$ 中与 $\\beta_1$ 平行的分量', '把 $\\alpha_2$ 缩短', '交换两向量'], ans:1, exp:'投影减除：留垂直分量，消平行分量。'}
]

}

}
};
