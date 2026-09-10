/* ===== 数学 · 线性代数 第4章 线性方程组 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['math/lach04'] = {

lessons: {

'4-1': {
title: '齐次方程组与基础解系',
secs: [
['why', '为什么学这一节',
`<p>$A\\mathbf x=\\mathbf0$ 是线代的"地基工程"：它的解空间维数 $n-r(A)$ 把秩、相关性、相似对角化串成一张网。"求基础解系"是大题每年必写的动作。</p>`],
['think', '直观理解',
`<p><b>齐次方程组永远有解</b>（全零解）。真正的问题是：除了零解还有别的吗？——有没有"非零解"取决于信息量是否"不满"：</p>
<blockquote>$n$ 个未知量、秩 $r$：自由度 $=n-r$。<b>自由度大于 0 就有非零解</b>，且有 $n-r$ 个"独立方向"——每个方向派一个代表向量，合起来就是<b>基础解系</b>。</blockquote>`],
['def', '定义与公式',
`<p><b>① 解的判定（$A$ 为 $m\\times n$）：</b></p>
$$ A\\mathbf x=\\mathbf0 \\text{ 有非零解} \\iff r(A)<n \\iff \\text{列向量组相关} $$
<p>方阵情形：有非零解 $\\iff \\det A=0$。</p>
<p><b>② 解空间与基础解系：</b>解集构成向量空间，维数 $=n-r(A)$；基础解系 = 解空间的一组基（$n-r$ 个无关解），通解：</p>
$$ \\mathbf x=k_1\\xi_1+k_2\\xi_2+\\cdots+k_{n-r}\\xi_{n-r} $$
<p><b>③ 求法：</b>行变换化行最简形 → 自由变量赋标准值（如 $(1,0,\\cdots),(0,1,\\cdots)$）→ 读出基础解系。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 求基础解系：$\\begin{cases}x_1+x_2-x_3=0\\\\ 2x_1+2x_2-2x_3=0\\end{cases}$</div>
<p>系数矩阵行变换：$r_2-2r_1$ 得 $\\begin{pmatrix}1&1&-1\\\\0&0&0\\end{pmatrix}$，$r=1$，$n-r=2$。</p>
<p>方程：$x_1=-x_2+x_3$。取自由变量 $(x_2,x_3)=(1,0)$ 与 $(0,1)$：</p>
$$ \\xi_1=\\begin{pmatrix}-1\\\\1\\\\0\\end{pmatrix},\\quad \\xi_2=\\begin{pmatrix}1\\\\0\\\\1\\end{pmatrix},\\qquad \\mathbf x=k_1\\xi_1+k_2\\xi_2 $$
</div>`],
['warn', '易错点',
`<p>• 基础解系含 <b>$n-r$ 个</b>向量，别写成 $m-r$（$m$ 是方程数）。</p>
<p>• 自由变量赋值要"标准正交式"（轮流取 1），这样挑出的解自动无关。</p>
<p>• 行最简形中主元列对应的变量不是自由变量。</p>`]
],
quiz: [
{id:'q1', q:'$A$ 为 $4\\times5$ 矩阵，$r(A)=3$，则 $A\\mathbf x=\\mathbf0$ 的基础解系含？', opts:['3 个向量', '2 个向量', '4 个向量', '1 个向量'], ans:1, exp:'$n-r=5-3=2$ 个。'},
{id:'q2', q:'齐次方程组 $A_{n\\times n}\\mathbf x=\\mathbf0$ 有非零解的充要条件（方阵）是？', opts:['$\\det A\\neq0$', '$\\det A=0$', '$r(A)=n$', '$A$ 对称'], ans:1, exp:'$\\det A=0\\iff r<n\\iff$ 列向量相关 $\\iff$ 有非零解。'},
{id:'q3', q:'基础解系中的向量必须满足？', opts:['两两正交', '是方程组的解且线性无关，且任意解可由它们表示', '全为单位向量', '分量全非零'], ans:1, exp:'基础解系 = 解空间的基：本身是解、无关、能表示全部解。正交性不要求。'}
]

},

'4-2': {
title: '非齐次方程组的解的结构',
secs: [
['why', '为什么学这一节',
`<p>$A\\mathbf x=\\mathbf b$（$\\mathbf b\\neq\\mathbf0$）的完整判定（唯一解/无解/无穷解）与"通解 = 特解 + 齐次通解"结构，是线代解答题的固定框架。</p>`],
['think', '直观理解',
`<p><b>增广矩阵说话：</b>把 $b$ 拼进系数矩阵得 $\\bar A$，行变换后看"矛盾行"：</p>
<blockquote>• $r(\\bar A)=r(A)=n$：没有自由变量 → <b>唯一解</b>；<br>• $r(\\bar A)=r(A)<n$：有自由变量 → <b>无穷多解</b>；<br>• $r(\\bar A)>r(A)$：行化简后出现 $0=d\\ (d\\neq0)$ 的矛盾行 → <b>无解</b>。由于增广矩阵只比 $A$ 多一列，此时实际有 $r(\\bar A)=r(A)+1$。</blockquote>
<p><b>解的结构像"平移"：</b>非齐次通解 = 齐次通解（过原点的解集）沿一个特解平移——两条平行线/两个平行平面的关系。</p>`],
['def', '定义与公式',
`<p><b>① 判定定理：</b>设 $A$ 有 $n$ 列。$r(\\bar A)=r(A)=n$ 时有唯一解；$r(\\bar A)=r(A)<n$ 时有无穷多解；$r(\\bar A)>r(A)$ 时无解。</p>
<p><b>② 解的结构：</b>$\\eta^*$ 为一个特解，$\\xi_1,\\cdots,\\xi_{n-r}$ 为对应齐次的基础解系：</p>
$$ \\mathbf x=\\eta^*+k_1\\xi_1+\\cdots+k_{n-r}\\xi_{n-r} $$
<p><b>③ 解的性质：</b>两非齐次解之差是齐次解；$\\eta^*+\\xi$ 仍是非齐次解。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（判解）$\\begin{cases}x_1+x_2=2\\\\ 2x_1+2x_2=5\\end{cases}$</div>
<p>$r(A)=1$，但 $r(\\bar A)=2$（第二行 $r_2-2r_1$ 得 $0=1$ 矛盾行）→ <b>无解</b>。</p></div>
<div class="ex-box"><div class="ex-t">例 2（含参）$a$ 为何值时 $\\begin{cases}x_1+x_2=1\\\\ ax_1+x_2=a\\end{cases}$ 有唯一解？</div>
<p>$\\det= a-1$。$a\\neq1$：唯一解；$a=1$：两方程相同，$r(A)=r(\\bar A)=1<2$，无穷解（$x=1-k,\\ y=k$）。</p>
<p class="muted">方阵含参优先算行列式，非方阵用秩的对比。</p></div>`],
['warn', '易错点',
`<p>• 判定用的是<b>增广矩阵</b>的秩，忘拼 $\\mathbf b$ 判不完整。</p>
<p>• "无穷多解"时通解必须写全：特解 + 基础解系的全部组合。</p>
<p>• 验特解：代回原方程检查，一个数字算错全盘皆输。</p>`]
],
quiz: [
{id:'q1', q:'$A\\mathbf x=\\mathbf b$ 无解的充要条件是？', opts:['$r(A)<n$', '$r(\\bar A)=r(A)+1$', '$r(\\bar A)=r(A)$', '$\\mathbf b=\\mathbf0$'], ans:1, exp:'增广矩阵的秩比系数矩阵多 1，说明出现矛盾行。'},
{id:'q2', q:'非齐次方程组通解的正确结构是？', opts:['两个特解之和', '齐次通解 + 非齐次特解', '两个齐次解之和', '只有特解'], ans:1, exp:'$\\mathbf x=\\eta^*+\\sum k_i\\xi_i$。'},
{id:'q3', q:'设 $\\eta_1,\\eta_2$ 是 $A\\mathbf x=\\mathbf b$ 的两个解，则 $\\eta_1-\\eta_2$ 是？', opts:['$A\\mathbf x=\\mathbf b$ 的解', '$A\\mathbf x=\\mathbf0$ 的解', '不是任何方程的解', '无法确定'], ans:1, exp:'$A(\\eta_1-\\eta_2)=\\mathbf b-\\mathbf b=\\mathbf0$。"两非齐次解之差为齐次解"是构造特解的常用工具。'}
]

},

'4-3': {
title: '公共解与同解问题',
secs: [
['why', '为什么学这一节',
`<p>"两个方程组的公共解""同解"是数一线代解答题的中高难度题型，本质都是把"解集的关系"翻译成秩与表示的语言。掌握两个标准套路即可通吃。</p>`],
['think', '直观理解',
`<p><b>公共解 = 同时满足两套规则。</b>做法一：把两个方程组拼成大方程组（上下堆叠）联立求解；做法二：解出 I 的通解，代入 II 定参数。</p>
<blockquote><b>同解 = 解集完全相同。</b>两个齐次方程组同解 $\\iff$ I 的解都能解 II 且反之 $\\iff r(A)=r(B)=r\\begin{pmatrix}A\\\\B\\end{pmatrix}$。</blockquote>`],
['def', '定义与公式',
`<p><b>① 公共解两法：</b>联立 $\\begin{pmatrix}A\\\\B\\end{pmatrix}\\mathbf x=\\mathbf0$；或将 I 的通解代入 II。</p>
<p><b>② 同解充要条件（齐次）：</b></p>
$$ r(A)=r(B)=r\\begin{pmatrix}A\\\\B\\end{pmatrix} $$
<p><b>③ 解集包含：</b>$A\\mathbf x=\\mathbf0$ 的解都是 $B\\mathbf x=\\mathbf0$ 的解，当且仅当 $B$ 的每一行都可由 $A$ 的行向量线性表示；等价地，$r\\begin{pmatrix}A\\\\B\\end{pmatrix}=r(A)$。此时必有 $r(B)\\le r(A)$，但只有这个秩不等式并不充分。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（公共解）求 $\\begin{cases}x_1+x_2=0\\\\ x_2+x_3=0\\end{cases}$ 与 $x_1+x_3=0$ 的公共解</div>
<p>联立：$x_1=-x_2,\\ x_3=-x_2$，代入第三式：$-x_2-x_2=0\\Rightarrow x_2=0$。</p>
<p>公共解只有 $\\mathbf x=\\mathbf0$。</p></div>
<div class="ex-box"><div class="ex-t">例 2（同解判定）$A\\mathbf x=\\mathbf0$ 与 $B\\mathbf x=\\mathbf0$ 均为 3 元，$r(A)=r(B)=2$ 且 $A$ 的解都满足 $B$，问是否同解？</div>
<p>$A$ 的解集维数 $=3-2=1$，$B$ 亦然。$A$ 的解集（1 维）含于 $B$ 的解集（1 维）→ 相同。同解 ✓。</p>
<p class="muted">"低维含于同维 = 相等"是这类题的收官一步。</p></div>`],
['warn', '易错点',
`<p>• 同解判定公式要求<b>三个秩都相等</b>，只比 $r(A)=r(B)$ 不够（解集可以不同维或不同向）。</p>
<p>• 公共解代入通解时，所有基础解系向量都要代入，别只代一个。</p>`]
],
quiz: [
{id:'q1', q:'求两个方程组的公共解，最直接的方法是？', opts:['把两系数矩阵上下拼成大方程组联立求解', '求逆矩阵', '转置相乘', '比较行列式'], ans:0, exp:'联立即"同时满足"，解大方程组得公共解。'},
{id:'q2', q:'两个齐次方程组同解的充要条件是？', opts:['$r(A)=r(B)$', '$r(A)=r(B)=r\\begin{pmatrix}A\\\\B\\end{pmatrix}$', '$A=B$', '未知数个数相同'], ans:1, exp:'三个秩相等 = 解集互含且维数相同 = 同解。'}
]

}

}
};
