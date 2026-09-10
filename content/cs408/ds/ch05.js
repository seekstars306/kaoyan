/* ===== 408 数据结构 · 第5章 图 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['cs408/ds/ch05'] = {

lessons: {

'5-1': {
title: '图的概念与存储结构',
secs: [
['why', '为什么学这一节',
`<p>图 = 顶点 + 边，是表达"多对多关系"的结构。存储方式（邻接矩阵 vs 邻接表）直接决定遍历与各种算法的复杂度，"n 顶点 e 条边的邻接表有几个结点"这类计算年年出现。</p>`],
['think', '直观理解',
`<p><b>有向图：</b>边有箭头（微信关注）；<b>无向图：</b>边互通（微信好友）。</p>
<blockquote><b>邻接矩阵 = 一张 n×n 表格</b>，G[i][j]=1 表示 i 到 j 有边——空间 O(n²)，稠密图友好，无向图矩阵对称。<br>
<b>邻接表 = 每个顶点挂一条链</b>，链上存它的邻接点——空间 O(n+e)，稀疏图友好；有向图邻接表"出边好找入边难"（逆邻接表管入边）。</blockquote>`],
['def', '要点与公式',
`<p><b>① 基本量（无自环、无平行边的简单图）：</b>n 个顶点的无向图最多 $\\binom n2=n(n-1)/2$ 条边；有向图最多 n(n-1) 条弧。n≥1 的无向连通图至少 n-1 条边；n≥2 的强连通有向图至少 n 条弧（可构成一个有向环），单顶点图不需要边也强连通。</p>
<p><b>② 度：</b>无向图 $\\sum\\deg(v)=2e$；有向图的入度和与出度和都等于 e。</p>
<p><b>③ 存储：</b>带权图的邻接矩阵通常以权值表示边、以 $\\infty$ 表示不同顶点间无边，主对角线置 0；邻接表边结点数为有向图 e 个、无向图 <b>2e</b> 个。</p>
<p><b>④ 十字链表</b>（有向图，出入兼得）与<b>邻接多重表</b>（无向图，每边只存一次）——考概念辨析。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 n 个顶点的无向连通图最少/最多几条边？</div>
<p>最少 <b>n-1</b>（树形）；最多 <b>n(n-1)/2</b>（完全图）。</p></div>
<div class="ex-box"><div class="ex-t">例 2 有向图 G 有 5 顶点 7 条弧，邻接表中边结点数？</div>
<p>有向图一条弧一个结点 → <b>7</b> 个（无向图才是 2e=14）。</p></div>`],
['warn', '易错点',
`<p>• 无向图一条边在邻接表中存两次（2e 个边结点）。</p>
<p>• 强连通（有向）至少 n 条边 vs 连通（无向）至少 n-1 条，别混。</p>
<p>• 邻接矩阵判断"两顶点是否邻接" O(1)，但找所有邻接点 O(n)；邻接表相反。</p>`]
],
quiz: [
{id:'q1', q:'6 个顶点的无向连通图最少需要几条边？', opts:['5', '6', '15', '10'], ans:0, exp:'n-1 = 5，树形连通。'},
{id:'q2', q:'无向图采用邻接表存储，e 条边共多少个边结点？', opts:['e', '2e', 'e²', 'e/2'], ans:1, exp:'每条边在两个顶点的链表中各存一次。'},
{id:'q3', q:'判定有向图任意两顶点是否相邻，最快的存储结构是？', opts:['邻接矩阵', '邻接表', '十字链表', '邻接多重表'], ans:0, exp:'矩阵直接查 G[i][j]，O(1)。'}
]

},

'5-2': {
title: '图的遍历：DFS 与 BFS',
secs: [
['why', '为什么学这一节',
`<p>遍历是图算法的地基：连通性判断、路径查找都从 DFS/BFS 出发。辅助空间、对存储结构的依赖、生成树/森林——选择题高频。</p>`],
['think', '直观理解',
`<p><b>DFS = 走迷宫一根筋：</b>一路走到底，撞墙回退（栈/递归）。<b>BFS = 水波扩散：</b>先访问所有距离 1 的，再距离 2 的（队列）。</p>
<blockquote>两者都需要 <b>visited[] 标记数组</b>防重复访问。邻接矩阵遍历都是 <b>O(n²)</b>；邻接表都是 <b>O(n+e)</b>。</blockquote>
<p><b>遍历序列不唯一</b>（邻接点访问次序可不同）；<b>BFS 可求无权图单源最短路径</b>——这是 BFS 的招牌应用。</p>`],
['def', '要点',
`<p><b>① DFS 生成树/森林：</b>对无向连通图一次 DFS/BFS 即全访问；非连通图需多次调用，调用次数 = 连通分量数。</p>
<p><b>② BFS 空间 O(n)（队列可能很大），DFS 空间 O(n)（递归栈），最坏路径长时 DFS 栈深。</b></p>
<p><b>③ 图的遍历 vs 树的遍历：</b>图有环必须标记；树无需标记。</p>
<p><b>④ 判断有向图是否有环：</b>DFS 中遇到"回边"（指向正在递归栈中的结点）→ 有环。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例（连通分量计数）无向图 n=6, e=5 的非连通图，最少/最多连通分量？</div>
<p><b>最少 2 个</b>：非连通至少 2 个分量，让 5 条边全部聚在一个分量即可，如 5 个顶点构成树（4 条边）加 1 条边、第 6 个顶点孤立 → 2 个分量。</p>
<p><b>最多 3 个</b>：要分量尽量多，就要让边尽量"挤"在少数顶点上（省出孤立顶点）。n=6、e=5：5 条边的简单图最少占用 4 个顶点（因 C(3,2)=3 &lt; 5 ≤ C(4,2)=6），如取 4 个顶点装 5 条边（$K_4$ 去掉一条边），剩下 2 个顶点各自孤立 → 分量数 = 1 + 2 = <b>3</b>。</p>
<p class="muted">结论：最少 2 个、最多 3 个。此类"分量数极值"题画图构造最稳——关键洞察是"挤边腾点"。</p></div>`],
['warn', '易错点',
`<p>• 复杂度跟存储结构走：邻接表 O(n+e)、邻接矩阵 O(n²)——"图遍历复杂度"必须说清结构。</p>
<p>• BFS 求最短路仅限<b>无权图</b>（边数最少）；带权图用 Dijkstra。</p>
<p>• 非连通图遍历一次只覆盖一个分量。</p>`]
],
quiz: [
{id:'q1', q:'图的邻接表存储下，BFS/DFS 的时间复杂度是？', opts:['O(n²)', 'O(n+e)', 'O(e log n)', 'O(n log n)'], ans:1, exp:'每个顶点入队/入栈一次、每条边扫一次。'},
{id:'q2', q:'无向图遍历算法中调用 DFS 的次数等于？', opts:['边数', '顶点数', '连通分量数', '生成树数'], ans:2, exp:'每个分量需要一次 DFS 启动。'},
{id:'q3', q:'求无权图中单源最短路径的合适算法是？', opts:['DFS', 'BFS', 'Prim', 'KMP'], ans:1, exp:'BFS 按层扩散，第一次到达即最少边数路径。'}
]

},

'5-3': {
title: '最小生成树：Prim 与 Kruskal',
secs: [
['why', '为什么学这一节',
`<p>连通带权图的"最低成本骨架"：n 个顶点用 n-1 条边连起来且总权最小。两个算法的思想（贪心加点 vs 贪心加边）与复杂度适用场景是选择题常客。</p>`],
['think', '直观理解',
`<p><b>Prim = 撒网式：</b>从某顶点出发，每次选取一条连接“树内顶点与树外顶点”的最小权边，把新顶点拉进来。采用邻接矩阵和顺序选择时为 O(n²)，适合稠密图。</p>
<blockquote><b>Kruskal = 拣便宜：</b>把所有边从小到大处理，依次尝试加入，不成环才保留；排序主导时为 O(e log e)，适合稀疏图。</blockquote>
<p><b>共同性质：</b>连通无向图的每棵生成树都有 n-1 条边；最小总权值是确定的，但达到该权值的生成树可能不唯一。</p>`],
['def', '算法对比表',
`<table style="width:100%;border-collapse:collapse;font-size:13.5px">
<tr style="background:#f1f4f9"><th style="padding:5px;border:1px solid #e3e8f0"></th><th style="padding:5px;border:1px solid #e3e8f0">Prim</th><th style="padding:5px;border:1px solid #e3e8f0">Kruskal</th></tr>
<tr><td style="padding:5px;border:1px solid #e3e8f0">思想</td><td style="padding:5px;border:1px solid #e3e8f0">加点（顶点贪心）</td><td style="padding:5px;border:1px solid #e3e8f0">加边（边贪心）</td></tr>
<tr><td style="padding:5px;border:1px solid #e3e8f0">复杂度</td><td style="padding:5px;border:1px solid #e3e8f0">O(n²)</td><td style="padding:5px;border:1px solid #e3e8f0">O(e log e)</td></tr>
<tr><td style="padding:5px;border:1px solid #e3e8f0">适合</td><td style="padding:5px;border:1px solid #e3e8f0">稠密图</td><td style="padding:5px;border:1px solid #e3e8f0">稀疏图</td></tr>
<tr><td style="padding:5px;border:1px solid #e3e8f0">关键结构</td><td style="padding:5px;border:1px solid #e3e8f0">候选边集</td><td style="padding:5px;border:1px solid #e3e8f0">并查集（判环）</td></tr>
</table>
<p><b>构造过程手算：</b>考题给图让你写出加边顺序——Prim 每步选"树内到树外"最小边；Kruskal 全局最小边试加（成环跳过）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例（判断）最小生成树唯一吗？</div>
<p>带权连通图的 MST <b>权值和一定唯一，形态不一定唯一</b>。当存在等权边且影响选择时形态不同。反例：三角形三边权 2,2,2，任选两条都行。</p></div>
<div class="ex-box"><div class="ex-t">例（Kruskal 过程）边集 {(A,B,1),(B,C,2),(A,C,2),(C,D,3)}</div>
<p>排序：AB1 → 加入；BC2 → 加入；AC2 → 与 A-B-C 成环，跳过；CD3 → 加入。MST 权 = 1+2+3 = <b>6</b>。</p></div>`],
['warn', '易错点',
`<p>• Kruskal 加边时必须判环（并查集），跳过成环边继续找下一条。</p>
<p>• "最小生成树唯一"与"权值和唯一"是两句话，选择题偷换。</p>
<p>• Prim 可用于非连通图吗？不行——只能得到一个连通分量的生成树。</p>`]
],
quiz: [
{id:'q1', q:'稠密带权图求最小生成树，更合适的算法是？', opts:['Kruskal', 'Prim', 'Dijkstra', '拓扑排序'], ans:1, exp:'Prim O(n²) 与边数无关，稠密图占优。'},
{id:'q2', q:'带权连通无向图的最小生成树具有的性质是？', opts:['形态唯一', '权值和唯一', '边数最多', '必含最重边'], ans:1, exp:'权和唯一；形态在有等权边时可能不同。'}
]

},

'5-4': {
title: '最短路径：Dijkstra 与 Floyd',
secs: [
['why', '为什么学这一节',
`<p>导航软件的核心。Dijkstra 求单源（一个点到所有点），Floyd 求全对全。负权边禁忌、复杂度、手算过程都是高频考点。</p>`],
['think', '直观理解',
`<p><b>Dijkstra = 确定性扩张：</b>每次把"当前距离最小"且未确定的顶点定为最短，然后用它更新邻居——贪心，<b>不允许负权边</b>。O(n²)。</p>
<blockquote><b>Floyd = 动态规划：</b>依次允许"经过 1 号、2 号…n 号中转"，三重循环 <code>d[i][j] = min(d[i][j], d[i][k]+d[k][j])</code>。O(n³)，<b>可处理负权边（不能有负权回路）</b>，代码短到可以背。</blockquote>
<p><b>BFS：</b>无权图的最短路（前面讲过）——三种算法按图类型选用。</p>`],
['def', '对比与手算要点',
`<table style="width:100%;border-collapse:collapse;font-size:13.5px">
<tr style="background:#f1f4f9"><th style="padding:5px;border:1px solid #e3e8f0"></th><th style="padding:5px;border:1px solid #e3e8f0">Dijkstra</th><th style="padding:5px;border:1px solid #e3e8f0">Floyd</th></tr>
<tr><td style="padding:5px;border:1px solid #e3e8f0">求解范围</td><td style="padding:5px;border:1px solid #e3e8f0">单源</td><td style="padding:5px;border:1px solid #e3e8f0">所有点对</td></tr>
<tr><td style="padding:5px;border:1px solid #e3e8f0">复杂度</td><td style="padding:5px;border:1px solid #e3e8f0">O(n²)</td><td style="padding:5px;border:1px solid #e3e8f0">O(n³)</td></tr>
<tr><td style="padding:5px;border:1px solid #e3e8f0">负权边</td><td style="padding:5px;border:1px solid #e3e8f0">不可</td><td style="padding:5px;border:1px solid #e3e8f0">可（禁负回路）</td></tr>
<tr><td style="padding:5px;border:1px solid #e3e8f0">思路</td><td style="padding:5px;border:1px solid #e3e8f0">贪心加点</td><td style="padding:5px;border:1px solid #e3e8f0">DP 加中转点</td></tr>
</table>
<p><b>Dijkstra 手算：</b>每轮在未确定顶点中选 dist 最小者，标记确定并松弛其出边。若从源点可达全部顶点，则除源点外共确定 n-1 个顶点；若剩余最小 dist 已是 $\\infty$，说明其余顶点不可达，可以停止。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例（Dijkstra 轮次）n 个顶点带权图，从 v₀ 出发共执行几轮"确定顶点"？</div>
<p><b>n-1 轮</b>（起点自身第 0 轮已确定），每轮确定一个顶点并松弛。</p></div>
<div class="ex-box"><div class="ex-t">例（Floyd 核心）d³[i][j] 表示允许经过哪些顶点中转？</div>
<p>编号 1..k 逐步放开：d^k[i][j] = min(d^(k-1)[i][j], d^(k-1)[i][k]+d^(k-1)[k][j])——"至多经过编号 ≤k 的顶点"。</p></div>`],
['warn', '易错点',
`<p>• Dijkstra 遇负权边会"过早确定"出错——判断题高频。</p>
<p>• Floyd 的 k 循环必须<b>在最外层</b>，写错层级结果全错。</p>
<p>• "单源最短路最快的是 BFS"仅对无权图成立。</p>`]
],
quiz: [
{id:'q1', q:'Dijkstra 算法不能正确处理的情况是？', opts:['稠密图', '带负权边的图', '有向图', '完全图'], ans:1, exp:'贪心假设"确定的顶点不再变"，负权边破坏它。'},
{id:'q2', q:'Floyd 算法的时间复杂度是？', opts:['O(n²)', 'O(n³)', 'O(e log e)', 'O(n+e)'], ans:1, exp:'三重循环 n³。'}
]

},

'5-5': {
title: '拓扑排序与关键路径',
secs: [
['why', '为什么学这一节',
`<p>有向无环图（DAG）的两连招：拓扑排序给"先后顺序"（课程先修、工程工序），关键路径算"整个工程最短工期"。AOV 网与 AOE 网的区分是概念题常客。</p>`],
['think', '直观理解',
`<p><b>拓扑排序 = 排课表：</b>每学期选"没有未修先修课"的课。算法：反复摘<b>入度为 0</b> 的顶点并删其出边。结果序列不唯一（同层可任意），若中途找不到入度 0 顶点 → <b>图有环</b>。</p>
<blockquote><b>关键路径 = AOE 网中源点到汇点的最长路径</b>（工期被最长的活儿链卡死）。关键活动：<b>最早开始 = 最迟开始</b>（e=l，时间余量为 0）。缩短关键活动工期才能缩短总工期。</blockquote>`],
['def', '公式与要点',
`<p><b>① 拓扑排序实现：</b>栈或队列存入度 0 顶点均可；复杂度 O(n+e)。</p>
<p><b>② AOE 网四大量：</b></p>
<p>• 事件（顶点）最早发生 ve：正向递推 max；最迟 vl：逆向递推 min；</p>
<p>• 活动（边）e(i)=ve(起点)，l(i)=vl(终点)-时长；<b>e=l → 关键活动</b>。</p>
<p><b>③ 性质：</b>关键路径可能不止一条。要让总工期缩短，必须让<b>每一条当前关键路径</b>都被缩短：若各关键路径有公共关键活动，缩短该活动可能同时生效；若没有公共活动，就需要分别缩短各条关键路径上的活动。缩短后还要重新计算，因为关键路径可能改变。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（拓扑序列判断）图有 n 个顶点 e 条弧，拓扑排序算法的时间复杂度？</div>
<p><b>O(n+e)</b>：每个顶点出入栈一次、每条弧删一次。</p></div>
<div class="ex-box"><div class="ex-t">例 2（关键活动判断）某活动 a：ve(起点)=5，时长 3，vl(终点)=10</div>
<p>e(a) = 5，l(a) = 10-3 = 7。e≠l → <b>非关键活动</b>（有 2 单位时间余量）。</p></div>`],
['warn', '易错点',
`<p>• 拓扑序列<b>一般不唯一</b>；"唯一"仅当每轮入度 0 顶点恰好一个。</p>
<p>• AOV 网用顶点表活动（拓扑），AOE 网用边表活动带权（关键路径）——别张冠李戴。</p>
<p>• 缩短非关键活动工期对总工期<b>无效</b>。</p>`]
],
quiz: [
{id:'q1', q:'拓扑排序可以检测有向图的什么性质？', opts:['连通性', '是否有环', '是否带权', '顶点个数'], ans:1, exp:'排序中断（找不到入度0顶点）⟺ 有环。'},
{id:'q2', q:'AOE 网中关键路径是？', opts:['最短路径', '源点到汇点的最长路径', '边数最多路径', '权值最小路径'], ans:1, exp:'工期被最长活动链决定：最长路径 = 关键路径。'}
]

}

}
};
