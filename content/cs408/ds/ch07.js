/* ===== 408 数据结构 · 第7章 排序 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['cs408/ds/ch07'] = {

lessons: {

'7-1': {
title: '插入排序：直接插入与希尔',
secs: [
['why', '为什么学这一节',
`<p>排序章的开山两式。直接插入是"打牌理牌"，希尔是它的分组加速版。考法：手写一两趟排序结果、复杂度与稳定性归类——排序章的选择题全是"对号入座"。</p>`],
['think', '直观理解',
`<p><b>直接插入：</b>把第 i 个元素插到前面已有序的部分里——像摸牌插入手牌。最好情况（已有序）O(n)，平均和最坏为 O(n²)，且<b>稳定</b>。</p>
<blockquote><b>希尔排序：</b>按增量 d 分组做插入排序，逐步缩小 d，最后必须取 1。它先让远距离元素大致就位，但同值元素可能跨组改变相对次序，所以<b>不稳定</b>。时间复杂度取决于增量序列，不能脱离具体增量统一写成 $O(n^{1.3})$；采用简单折半增量时，最坏情况仍可达 O(n²)。</blockquote>`],
['def', '手算规则',
`<p><b>直接插入第 i 趟：</b>前 i-1 个已有序，将第 i 个依次与前面比较、后移腾位、插入。以下代码用 a[0] 作哨兵，有效元素放在 a[1..n]，数组必须至少有 n+1 个单元。</p>
<pre class="code">void InsertSort(int a[], int n) {
    for (int i = 2; i &lt;= n; i++) {
        if (a[i] &lt; a[i-1]) {
            int j;
            a[0] = a[i];                  /* 哨兵 */
            for (j = i-1; a[j] &gt; a[0]; j--)
                a[j+1] = a[j];            /* 后移 */
            a[j+1] = a[0];
        }
    }
}</pre>
<p><b>希尔一趟（d=4）：</b>对 1,5,9… 一组、2,6,10… 一组分别插入排序。</p>
<p><b>适用：</b>直接插入适合基本有序或 n 小；希尔适合大规模初排。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 序列 {49, 38, 65, 97, 76} 直接插入排序，写出前两趟</div>
<p>第 1 趟（插 38）：38 49 65 97 76；第 2 趟（插 65）：38 49 65 97 76（65 位置恰好合适，无移动）。</p></div>
<div class="ex-box"><div class="ex-t">例 2（稳定性辨析）直接插入排序稳定的原因？</div>
<p>后移条件是 <code>a[j] &gt; a[0]</code> 严格大于——相等元素不越过，<b>相对次序保持 → 稳定</b>。</p></div>`],
['warn', '易错点',
`<p>• 直接插入"比较次数"与"移动次数"是两个数，最好情况比较 n-1 次移动 0 次。</p>
<p>• 希尔排序<b>不稳定</b>且<b>最后一趟增量必须为 1</b>。</p>
<p>• 哨兵 a[0] 省"边界判断"——代码填空题常考。</p>`]
],
quiz: [
{id:'q1', q:'直接插入排序在输入已正序时的比较次数是？', opts:['n²', 'n-1', 'n log n', '1'], ans:1, exp:'每个元素只与前一元素比一次：n-1 次，O(n) 最好情况。'},
{id:'q2', q:'下列排序中不稳定的是？', opts:['直接插入', '冒泡', '希尔', '归并'], ans:2, exp:'希尔跨组交换会破坏同值元素相对次序；插冒归（并）稳定。'}
]

},

'7-2': {
title: '交换排序：冒泡与快速排序',
secs: [
['why', '为什么学这一节',
`<p>快排是所有内部排序中<b>平均性能冠军</b>（O(n log n) 且常数小），也是 408 大题的常驻嘉宾：手写划分、判断某序列是否为一趟快排结果、递归次数分析。</p>`],
['think', '直观理解',
`<p><b>冒泡：</b>相邻比较交换，每趟把当前最大"冒"到末尾——稳定 O(n²)。</p>
<blockquote><b>快排 = 分治：</b>选枢轴 pivot，一趟划分后 pivot 左边全 ≤ 它、右边全 ≥ 它（<b>pivot 到位！</b>），再对两边递归。平均 O(n log n)，<b>空间 O(log n)</b>（递归栈）；<b>最坏 O(n²)</b>——初始序列基本有序时，划分极度不平衡。<b>不稳定。</b></blockquote>`],
['def', '划分过程（双指针法）',
`<pre class="code">int Partition(int a[], int low, int high) {
    int pivot = a[low];          /* 取第一个为枢轴 */
    while (low &lt; high) {
        while (low &lt; high &amp;&amp; a[high] &gt;= pivot) high--;
        a[low] = a[high];        /* 右侧小的甩到左坑 */
        while (low &lt; high &amp;&amp; a[low] &lt;= pivot) low++;
        a[high] = a[low];        /* 左侧大的甩到右坑 */
    }
    a[low] = pivot;              /* 枢轴归位 */
    return low;
}</pre>
<p><b>判断"某序列是否为一趟快排结果"：</b>取出"归位元素"位置 i，检查左边全部 ≤ a[i]、右边全部 ≥ a[i]。</p>
<p><b>优化：</b>枢轴取三者取中、小规模切换插入排序、随机枢轴——防最坏情况。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 一趟划分：{49, 38, 65, 97, 76, 13, 27} 以 49 为枢轴</div>
<p>high 找到 27，放入左侧空位；low 找到 65，放入右侧空位；high 再找到 13，放入左侧空位；随后 low 与 high 相遇，最后把枢轴 49 放入相遇位置。结果为 <b>{27, 38, 13, 49, 76, 97, 65}</b>，49 归位于第 4 位。</p></div>
<div class="ex-box"><div class="ex-t">例 2（复杂度场景）快排何时最坏？</div>
<p>序列<b>基本有序（正序或逆序）</b>且枢轴取端点：每趟只划分出 1 与 n-1，递归深达 n 层，O(n²)、递归栈 O(n)。</p></div>`],
['warn', '易错点',
`<p>• 快排递归深度 = 树高：最好 log₂n，最坏 n——"空间复杂度"问的就是递归栈。</p>
<p>• 快排<b>不稳定</b>（甩动跨越相等元素）。</p>
<p>• 每趟划分<b>至少一个元素（枢轴）归位</b>——判断"n 个元素至少几趟才能确定最终位置"的依据。</p>`]
],
quiz: [
{id:'q1', q:'快速排序平均时间复杂度与平均空间复杂度是？', opts:['O(n log n)，O(1)', 'O(n log n)，O(log n)', 'O(n²)，O(log n)', 'O(n log n)，O(n)'], ans:1, exp:'时间平均 n log n；空间为递归栈 log n。'},
{id:'q2', q:'序列 {21, 25, 5, 17, 9, 23, 30} 做一趟快排（枢轴取 21）后，21 归位于第几位？', opts:['第 1 位', '第 4 位', '第 5 位', '第 7 位'], ans:1, exp:'比 21 小的元素有 {5, 17, 9} 共 3 个，枢轴落在它们之后：第 3+1 = 4 位（其左边全部小于它，右边全部大于它）。'}
]

},

'7-3': {
title: '选择排序：简单选择与堆排序',
secs: [
['why', '为什么学这一节',
`<p>堆排序是"用树加速选择"：建堆 O(n)、每次取顶 O(log n)，整体 O(n log n) 且 O(1) 空间。<b>堆的判断（给序列问是不是堆）、建堆调整、取顶后调整</b>是高频手算题。</p>`],
['think', '直观理解',
`<p><b>简单选择：</b>每趟从未排序区选最小放前面——比较次数固定 n(n-1)/2（与初始无关！），交换最多 n-1 次。<b>不稳定</b>。</p>
<blockquote><b>堆 = 完全二叉树 + 大/小根性质：</b>大根堆每个结点 ≥ 孩子（顶部最大）。<b>排序用大根堆</b>：取顶（最大）放末尾，末尾换到顶后"下坠"调整。</blockquote>
<p><b>判断序列是否大根堆：</b>逐个检查 i 与 2i、2i+1（1 起编号）的大小关系。</p>`],
['def', '堆操作三步',
`<p><b>① 建堆（自底向上）：</b>从最后一个非叶结点 ⌊n/2⌋ 到 1 依次"下坠"调整，建堆 O(n)。</p>
<p><b>② 下坠（sift-down）：</b>结点与较大孩子比较，小则交换下移，直至 ≥ 两孩子或成叶。</p>
<p><b>③ 排序循环：</b>堆顶与当前末尾交换 → 堆规模 -1 → 顶下坠 → 重复 n-1 次。总 O(n log n)。</p>
<p><b>④ 插入（上浮 sift-up）：</b>新元素放末尾，与双亲比较上升 O(log n)。</p>
<p><b>元素定位公式（1 起）：</b>孩子 2i、2i+1；双亲 ⌊i/2⌋。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（判断堆）序列 {90, 70, 80, 60, 45, 75} 是大根堆吗？</div>
<p>检查：70 的孩子 60,45 ≤ 70 ✓；80 的孩子 75 ≤ 80 ✓；90 ≥ 70,80 ✓ → <b>是大根堆</b>。</p></div>
<div class="ex-box"><div class="ex-t">例 2（取顶调整）大根堆 {90,70,80,60,45,75} 取出 90 后（末尾 75 换顶）调整</div>
<p>75 与孩子 70,80 比：与 80 交换；80 已是叶。新堆 {80,70,75,60,45} ✓。</p>
<p class="muted">每次调整至多走一条树高路径 O(log n)。</p></div>`],
['warn', '易错点',
`<p>• 堆是<b>完全二叉树的数组形态</b>，不是二叉搜索树；堆只保证父子关系不保证兄弟有序。</p>
<p>• 简单选择排序比较次数固定 n(n-1)/2，与初始序列无关——"最坏最好都一样"。</p>
<p>• 堆排序适合"只要前 k 大/小"的 TOP-K 场景。</p>`]
],
quiz: [
{id:'q1', q:'n 个元素建初始大根堆的时间复杂度是？', opts:['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'], ans:0, exp:'自底向上建堆是线性 O(n)（各层结点数×高度求和）。'},
{id:'q2', q:'堆排序的空间复杂度是？', opts:['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], ans:0, exp:'原地交换，只需常数辅助空间（非递归实现）。'}
]

},

'7-4': {
title: '归并排序与基数排序',
secs: [
['why', '为什么学这一节',
`<p>归并 = 稳定的 O(n log n)（外部排序的基石）；基数排序 = 不比较的"按位分桶"。两者与前面算法凑齐"八大金刚"，考点集中在稳定性归类与手算归并/分配趟数。</p>`],
['think', '直观理解',
`<p><b>归并排序：</b>两两合并有序段，2 路归并 ⌈log₂n⌉ 趟。<b>稳定</b>、时间稳定 O(n log n)（好坏一致）、<b>空间 O(n)</b>（辅助数组——最大的缺点）。</p>
<blockquote><b>基数排序（最低位优先 LSD）：</b>不比较！按个位分配到 10 个桶再收集，再按十位、百位……d 趟完成。时间 O(d(n+r))（r=基数 10），<b>空间 O(r)</b>，<b>稳定</b>。适合位数少、量大的整数/字符串。</blockquote>`],
['def', '手算要点',
`<p><b>① 2 路归并趟数 = ⌈log₂n⌉</b>；每趟若干次两两合并。给序列写"第 1 趟后、第 2 趟后"结果是常考题。</p>
<p><b>② 归并段合并：</b>k 路归并 r 个初始段，趟数 = ⌈log_k r⌉（外部排序核心公式）。</p>
<p><b>③ 基数排序一趟：</b>按当前位分配（进桶）+ 收集（按桶序串起）。最高位数 d 决定趟数。</p>
<p><b>④ 稳定性总表（必背）：</b></p>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr style="background:#f1f4f9"><th style="padding:4px;border:1px solid #e3e8f0">稳定</th><th style="padding:4px;border:1px solid #e3e8f0">不稳定</th></tr>
<tr><td style="padding:4px;border:1px solid #e3e8f0">直接插入、冒泡、归并、基数</td><td style="padding:4px;border:1px solid #e3e8f0">希尔、快排、简单选择、堆排</td></tr>
</table>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（归并趟数）8 个元素 2 路归并排序需要几趟？</div>
<p>⌈log₂8⌉ = <b>3 趟</b>（4 个 2-段 → 2 个 4-段 → 1 个 8-段）。</p></div>
<div class="ex-box"><div class="ex-t">例 2（基数排序趟数）排序 3 位整数序列需要几趟分配收集？</div>
<p>按个、十、百位各一趟 → <b>3 趟</b>（d=3）。</p></div>`],
['warn', '易错点',
`<p>• 归并排序时间复杂度与初始序列<b>无关</b>（永远 n log n），问"最好情况"答一样。</p>
<p>• 基数排序趟数看<b>最大值的位数</b>，不是元素个数。</p>
<p>• 稳定性总表直接决定选择题：四个不稳定"希快简堆"口诀。</p>`]
],
quiz: [
{id:'q1', q:'2 路归并排序 1000 个元素需要多少趟？', opts:['5', '8', '10', '1000'], ans:2, exp:'⌈log₂1000⌉ = 10 趟。'},
{id:'q2', q:'既有 O(n log n) 时间又稳定的排序是？', opts:['快排', '堆排', '归并', '希尔'], ans:2, exp:'稳定 + n log n 只有归并（还有基数但它是 d(n+r) 型）。'}
]

},

'7-5': {
title: '八大排序对比总结',
secs: [
['why', '为什么学这一节',
`<p>本章考试就是一张大表：给场景选算法、给性质反推算法。把八大排序的时间/空间/稳定性/特殊性质装进一张表，选择题通杀。</p>`],
['think', '直观理解',
`<p><b>总表（背诵版）：</b></p>
<table style="width:100%;border-collapse:collapse;font-size:12.5px">
<tr style="background:#f1f4f9"><th style="padding:4px;border:1px solid #e3e8f0">算法</th><th style="padding:4px;border:1px solid #e3e8f0">最好</th><th style="padding:4px;border:1px solid #e3e8f0">平均</th><th style="padding:4px;border:1px solid #e3e8f0">最坏</th><th style="padding:4px;border:1px solid #e3e8f0">空间</th><th style="padding:4px;border:1px solid #e3e8f0">稳定</th><th style="padding:4px;border:1px solid #e3e8f0">备注</th></tr>
<tr><td style="padding:4px;border:1px solid #e3e8f0">直接插入</td><td style="padding:4px;border:1px solid #e3e8f0">O(n)</td><td style="padding:4px;border:1px solid #e3e8f0">O(n²)</td><td style="padding:4px;border:1px solid #e3e8f0">O(n²)</td><td style="padding:4px;border:1px solid #e3e8f0">O(1)</td><td style="padding:4px;border:1px solid #e3e8f0">✓</td><td style="padding:4px;border:1px solid #e3e8f0">基本有序最爽</td></tr>
<tr><td style="padding:4px;border:1px solid #e3e8f0">希尔</td><td style="padding:4px;border:1px solid #e3e8f0">依增量而定</td><td style="padding:4px;border:1px solid #e3e8f0">依增量而定</td><td style="padding:4px;border:1px solid #e3e8f0">可达 O(n²)</td><td style="padding:4px;border:1px solid #e3e8f0">O(1)</td><td style="padding:4px;border:1px solid #e3e8f0">✗</td><td style="padding:4px;border:1px solid #e3e8f0">不能脱离增量给统一界</td></tr>
<tr><td style="padding:4px;border:1px solid #e3e8f0">冒泡</td><td style="padding:4px;border:1px solid #e3e8f0">O(n)</td><td style="padding:4px;border:1px solid #e3e8f0">O(n²)</td><td style="padding:4px;border:1px solid #e3e8f0">O(n²)</td><td style="padding:4px;border:1px solid #e3e8f0">O(1)</td><td style="padding:4px;border:1px solid #e3e8f0">✓</td><td style="padding:4px;border:1px solid #e3e8f0">有序可提前停</td></tr>
<tr><td style="padding:4px;border:1px solid #e3e8f0">快排</td><td style="padding:4px;border:1px solid #e3e8f0">O(n log n)</td><td style="padding:4px;border:1px solid #e3e8f0">O(n log n)</td><td style="padding:4px;border:1px solid #e3e8f0">O(n²)</td><td style="padding:4px;border:1px solid #e3e8f0">O(log n)</td><td style="padding:4px;border:1px solid #e3e8f0">✗</td><td style="padding:4px;border:1px solid #e3e8f0">平均最快；有序最坏</td></tr>
<tr><td style="padding:4px;border:1px solid #e3e8f0">简单选择</td><td style="padding:4px;border:1px solid #e3e8f0">O(n²)</td><td style="padding:4px;border:1px solid #e3e8f0">O(n²)</td><td style="padding:4px;border:1px solid #e3e8f0">O(n²)</td><td style="padding:4px;border:1px solid #e3e8f0">O(1)</td><td style="padding:4px;border:1px solid #e3e8f0">✗</td><td style="padding:4px;border:1px solid #e3e8f0">比较次数固定</td></tr>
<tr><td style="padding:4px;border:1px solid #e3e8f0">堆排</td><td style="padding:4px;border:1px solid #e3e8f0">O(n log n)</td><td style="padding:4px;border:1px solid #e3e8f0">O(n log n)</td><td style="padding:4px;border:1px solid #e3e8f0">O(n log n)</td><td style="padding:4px;border:1px solid #e3e8f0">O(1)</td><td style="padding:4px;border:1px solid #e3e8f0">✗</td><td style="padding:4px;border:1px solid #e3e8f0">TOP-K 利器</td></tr>
<tr><td style="padding:4px;border:1px solid #e3e8f0">归并</td><td style="padding:4px;border:1px solid #e3e8f0">O(n log n)</td><td style="padding:4px;border:1px solid #e3e8f0">O(n log n)</td><td style="padding:4px;border:1px solid #e3e8f0">O(n log n)</td><td style="padding:4px;border:1px solid #e3e8f0">O(n)</td><td style="padding:4px;border:1px solid #e3e8f0">✓</td><td style="padding:4px;border:1px solid #e3e8f0">外部排序基石</td></tr>
<tr><td style="padding:4px;border:1px solid #e3e8f0">基数</td><td style="padding:4px;border:1px solid #e3e8f0">O(d(n+r))</td><td style="padding:4px;border:1px solid #e3e8f0">O(d(n+r))</td><td style="padding:4px;border:1px solid #e3e8f0">O(d(n+r))</td><td style="padding:4px;border:1px solid #e3e8f0">O(r)</td><td style="padding:4px;border:1px solid #e3e8f0">✓</td><td style="padding:4px;border:1px solid #e3e8f0">不比较，按位分桶</td></tr>
</table>`],
['def', '场景选择题速答',
`<p>• n 小或基本有序 → <b>直接插入</b>；n 大通用 → <b>快排</b>；要求稳定 + 快 → <b>归并</b>；空间限制 + n log n → <b>堆排</b>；TOP-K → <b>堆</b>；整数多位数少 → <b>基数</b>；链表排序 → <b>归并/插入</b>（快排堆排依赖随机存取）。</p>
<p>• "一趟后能保证一个元素最终归位"的：快排、简单选择、冒泡（末尾冒出）、堆排（顶出）；<b>插入类（直接/希尔）与归并不能保证任何元素最终归位</b>。</p>
<p>• 比较次数与初始序列<b>无关</b>：简单选择、基数（不比较）；堆/归并趟数固定。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例（综合）要求：10⁶ 个整数、取最小的 10 个、内存紧张——选？</div>
<p>维护一个容量为 10 的<b>大根堆</b>：先放入 10 个元素；此后若新元素小于堆顶，就用它替换当前 10 个候选中的最大值并向下调整。扫描结束后，堆中就是最小的 10 个元素，时间 O(n log k)、额外空间 O(k)。若误用小根堆，堆顶是候选中的最小值，无法 O(1) 判断并淘汰当前最大候选。</p>
<p class="muted">"场景 → 算法"是最贴近真题的练习方式，每条场景都过一遍。</p></div>`],
['warn', '易错点',
`<p>• "归位元素"性质是判断"序列是否为一趟 XX 排序结果"的钥匙：插入与归并排除法最好用。</p>
<p>• 快排空间 O(log n) 常被误答 O(1)——递归栈也是空间。</p>
<p>• 冒泡最好 O(n)（带提前结束标志时），别与简单选择"固定 n²"混淆。</p>`]
],
quiz: [
{id:'q1', q:'要求排序算法稳定且平均 O(n log n)，应选？', opts:['快排', '堆排', '归并', '简单选择'], ans:2, exp:'归并是"稳定 + n log n + 通用"的唯一解。'},
{id:'q2', q:'一趟排序后不能保证任何元素处于最终位置的是？', opts:['冒泡', '快排', '直接插入', '简单选择'], ans:2, exp:'插入排序每次只是把新元素插到"当前有序区"，全局位置未定。'}
]

}

}
};
