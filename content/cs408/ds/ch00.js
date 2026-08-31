/* ===== 408 数据结构 · 第0章 C 语言与算法预备 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['cs408/ds/ch00'] = {

lessons: {

'0-1': {
title: 'C 语言速成（一）：变量、数组与函数',
secs: [
['why', '为什么 408 要先学一点 C',
`<p>408 不直接考 C 语法的填空题，但<b>数据结构全书都用 C 代码描述算法</b>。看不懂 <code>int a[10]</code> 和 <code>p-&gt;next</code>，链表的题就一行都读不懂。好消息：你只需要"读得懂 + 写得出简单伪代码"，不需要成为 C 专家。本节目标 30 分钟：变量、数组、函数。</p>`],
['think', '直观理解',
`<p><b>变量 = 贴了标签的盒子。</b>盒子里放一个值，标签上写名字和"盒子型号"（类型）：</p>
<blockquote><code>int age = 20;</code> —— 造一个 int（整数）型盒子，标签 age，放进 20。<br><code>double score = 92.5;</code> —— double 型盒子放小数。<br><code>char c = 'A';</code> —— char 型盒子放一个字符。</blockquote>
<p><b>数组 = 一排连号的盒子。</b><code>int a[5]</code> 是 5 个紧挨着的 int 盒子，编号从 <b>0</b> 开始：a[0]、a[1]…a[4]。连号这一点是理解"顺序存储"的钥匙。</p>
<p><b>函数 = 一台封装好的机器。</b>原料（参数）从上面投入，产品（返回值）从下面出来：</p>
<blockquote><code>max(3, 5)</code> 投入两个数，机器内部比较，吐出 5。</blockquote>`],
['def', '语法要点',
`<p><b>① 变量与运算</b></p>
<pre class="code">int a = 10, b = 3;
a + b;   /* 13 */
a / b;   /* 3 ！整数除法直接丢掉小数，不是 3.33 */
a % b;   /* 1  取余数：10 = 3*3 + 1 */</pre>
<p class="muted"><code>%</code>（取余）在 408 里大量出现：判断奇偶（x%2）、哈希函数（key%13）都靠它。</p>
<p><b>② 数组</b></p>
<pre class="code">int a[5] = {3, 7, 1, 9, 4};   /* 定义并初始化 */
a[0]      /* 第 1 个元素：3 —— 下标从 0 开始 */
a[4]      /* 最后一个：4，没有 a[5]！越界是经典错误 */
for (int i = 0; i &lt; 5; i++)   /* 遍历数组的标准写法 */
    printf("%d ", a[i]);</pre>
<p><b>③ 函数</b></p>
<pre class="code">/* 返回值类型 函数名(参数列表) */
int max2(int x, int y) {
    if (x &gt; y) return x;
    else       return y;
}
int m = max2(3, 5);   /* 调用后 m = 5 */</pre>
<p class="muted"><code>return</code> 立即结束函数并交出结果；<code>void</code> 表示"不返回任何东西"。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1：这段代码输出什么？</div>
<pre class="code">int a[4] = {1, 2, 3, 4};
int s = 0;
for (int i = 0; i &lt; 4; i = i + 2)
    s = s + a[i];
printf("%d", s);</pre>
<p><b>逐步执行：</b>i=0 时 s += a[0]=1；i=2 时 s += a[2]=3；i=4 退出循环。共加下标 0 和 2，输出 <b>4</b>。</p>
<p class="muted">读代码的唯一方法就是像这样"扮演计算机"，一行一行填表格追踪每个变量。手头备一张草稿纸。</p></div>
<div class="ex-box"><div class="ex-t">例 2：写一个函数求数组元素之和</div>
<pre class="code">int sum(int a[], int n) {      /* 数组作参数 + 元素个数 */
    int s = 0;
    for (int i = 0; i &lt; n; i++)
        s = s + a[i];
    return s;
}</pre>
<p class="muted">这个 4 行模板是排序、查找等一切数组算法的骨架，考场上"写算法题"就是从它开始改。</p></div>`],
['warn', '易错点',
`<p>• <code>5/2 = 2</code> 而不是 2.5——两个 int 相除结果还是 int（向下取整）。想要小数得写 <code>5.0/2</code>。</p>
<p>• 数组下标从 <b>0</b> 开始：长度为 n 的数组，合法下标是 0 ~ n-1。<code>a[n]</code> 是越界。</p>
<p>• <code>=</code> 是赋值，<code>==</code> 才是"判断相等"。<code>if (x = 5)</code> 是把 5 赋给 x 且恒为真——408 代码阅读题的经典陷阱。</p>
<p>• <code>for (i=0; i&lt;n; i++)</code> 的边界是 <code>&lt; n</code> 不是 <code>&lt;= n</code>，多跑一轮就越界。</p>`]
],
quiz: [
{id:'q1', q:'<code>int a[5] = {1,2,3,4,5};</code> 则 <code>a[1]+a[4]</code> 的值是？', opts:['6', '7', '8', '运行出错'], ans:1, exp:'下标从 0 开始：a[1] 是第 2 个元素 2，a[4] 是第 5 个元素 5，相加为 7。这是"下标从 0 起数"最经典的坑。'},
{id:'q2', q:'<code>printf("%d", 7/2);</code> 输出？', opts:['3.5', '3', '4', '2'], ans:1, exp:'两个整数相除结果仍为整数（向零取整），7/2=3。想得到 3.5 需写成 7.0/2 或 7/2.0。'},
{id:'q3', q:'<code>int x=10; x = x % 3;</code> 之后 x 的值是？', opts:['3', '3.33', '1', '0'], ans:2, exp:'% 是取余运算：10 ÷ 3 = 3 余 1，所以 x%3 = 1。408 中判断奇偶、哈希散列都依赖它。'}
]

},

'0-2': {
title: 'C 语言速成（二）：指针与结构体',
secs: [
['why', '为什么学这一节',
`<p>链表、树、图的全部代码都建立在<b>指针</b>和<b>结构体</b>上。读懂 <code>p-&gt;next</code> 和 <code>typedef struct LNode</code>，就打开了数据结构的门。</p>`],
['think', '直观理解',
`<p><b>指针 = 存"地址"的变量。</b>普通变量盒子里放"值"，指针盒子里放"另一个盒子的门牌号"。拿着门牌号就能找到那个盒子、读写它。</p>
<blockquote><b>结构体 = 打包多种类型的名片。</b>一个"学生"有学号（int）和姓名（char 数组），打包成一个 struct Student，一个变量装下全部信息。</blockquote>
<p><b>链表节点 = 结构体 + 自引用指针：</b>节点里放数据 + <b>下一个节点的地址</b>——数据结构就这么长出来。</p>`],
['def', '语法要点',
`<p><b>① 指针基础</b></p>
<pre class="code">int a = 10;
int *p = &amp;a;    /* p 存 a 的地址，&amp; 是"取地址" */
*p = 20;        /* *p 是"顺着地址找过去"的那个人，a 变成 20 */</pre>
<p><b>② 结构体与 typedef</b></p>
<pre class="code">typedef struct LNode {
    int data;              /* 数据域 */
    struct LNode *next;    /* 指针域：指向同类型节点 */
} LNode, *LinkList;

LNode node;        node.data = 5;
LNode *p = &amp;node;
(*p).data  等价于  p-&gt;data   /* 箭头 = "顺着指针取成员" */</pre>
<p><b>③ 动态分配</b></p>
<pre class="code">p = (LNode *)malloc(sizeof(LNode));  /* 借一间新盒子 */
free(p);                             /* 还回去（防内存泄漏） */</pre>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1：这段代码输出什么？</div>
<pre class="code">int a = 3, b = 7;
int *p = &amp;a;
*p = *p + 1;
p = &amp;b;
*p = 100;
printf("%d %d", a, b);</pre>
<p><b>逐步执行：</b>p 先指向 a，<code>*p=*p+1</code> 让 a 变 4；再指向 b，*p=100 让 b 变 100。输出 <b>4 100</b>。</p>
<p class="muted">关键：改变 *p 就是改变 p 当前指向的那个变量。</p></div>
<div class="ex-box"><div class="ex-t">例 2：两个节点链接示意</div>
<pre class="code">LNode A, B;
A.data = 1;  B.data = 2;
A.next = &amp;B;  B.next = NULL;
/* 现在：A -&gt; B -&gt; NULL，一条链诞生 */
printf("%d", A.next-&gt;data);   /* 输出 2 */</pre></div>`],
['warn', '易错点',
`<p>• 野指针：未赋初值的指针乱指一气，解引用（*p）会崩溃。声明后立刻指向确定位置或 NULL。</p>
<p>• <code>p-&gt;data</code> 与 <code>(*p).data</code> 等价，但 <code>*p.data</code>（点号优先级高）是错的。</p>
<p>• malloc 的返回值要<b>强转类型</b>，节点用完该 free。</p>`]
],
quiz: [
{id:'q1', q:'<code>int *p = &amp;a;</code> 后，<code>*p = 5;</code> 的效果是？', opts:['p 变为 5', 'a 变为 5', '创建新变量 5', '编译错误'], ans:1, exp:'*p 解引用即 a 本身，赋值改变 a。'},
{id:'q2', q:'<code>p-&gt;next-&gt;data</code> 表示？', opts:['p 的 data', 'p 的下一个节点的 data', 'next 变量的 data', '非法访问'], ans:1, exp:'箭头连续追踪：p→下一节点→取其数据域。链表遍历的基本形态。'},
{id:'q3', q:'链表节点中指针域的作用是？', opts:['存储数据', '存放下一个节点的地址，把节点串起来', '记录节点大小', '存放返回值'], ans:1, exp:'next 指针是链表的"链条"本身。'}
]

},

'0-3': {
title: '算法与时间复杂度分析',
secs: [
['why', '为什么学这一节',
`<p>408 每年必考时间复杂度：给一段代码问 O(?)。它也是"比较算法好坏"的通用语言——这门课开篇第一概念。</p>`],
['think', '直观理解',
`<p><b>时间复杂度 = 数据规模 n 变大时，操作次数的增长趋势。</b>不关心具体机器快慢，只关心"增长曲线的形状"：</p>
<blockquote>O(1)：翻书找目录（规模再大也是一下）<br>O(n)：整本书一页页翻<br>O(n²)：每页都要与其他页对比（双层循环）<br>O(log n)：每次淘汰一半（折半查找，快得惊人）</blockquote>
<p><b>规则：</b>只看最高阶项、去掉系数：3n²+2n+1 → O(n²)。</p>`],
['def', '常见复杂度速查',
`<p style="line-height:2.1">• 单层循环 n 次 → <b>O(n)</b>；双层嵌套各 n 次 → <b>O(n²)</b><br>
• 循环变量每次 ×2 或 ÷2 → <b>O(log n)</b>（while(n&gt;1) n/=2）<br>
• 折半查找 <b>O(log n)</b>；快排平均 O(n log n)、最坏 O(n²)；归并/堆排 <b>O(n log n)</b><br>
• 常见排序从快到慢：O(n log n)（快归堆）→ O(n²)（插冒选）<br>
• <b>空间复杂度</b>同理：辅助数组 O(n)、递归深度算空间</p>
<pre class="code">/* 例：这段是 O(n log n) */
for (int i = 1; i &lt;= n; i++)      /* n 层 */
    for (int j = 1; j &lt;= n; j *= 2)  /* log n 层 */
        printf("*");</pre>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1：分析复杂度</div>
<pre class="code">int sum = 0;
for (int i = 1; i &lt;= n; i *= 2)
    for (int j = 1; j &lt;= n; j++)
        sum++;</pre>
<p>外层 ×2 → log n 次；内层 n 次。总 = O(<b>n log n</b>）。</p></div>
<div class="ex-box"><div class="ex-t">例 2：递归复杂度</div>
<pre class="code">int f(int n) {
    if (n == 1) return 1;
    return f(n - 1) + n;   /* 每次规模减 1，共递归 n 层 */
}</pre>
<p>递归 n 层、每层 O(1) → 时间 O(n)；<b>空间也是 O(n)</b>（递归调用栈深度）。</p></div>`],
['warn', '易错点',
`<p>• 两个循环"并列"（不嵌套）是 O(n)+O(n)=<b>O(n)</b>，不是 O(n²)。</p>
<p>• 内层循环依赖外层变量（j&lt;i）时，总次数是等差数列求和 ≈ n²/2 → 还是 O(n²)。</p>
<p>• 复杂度比较只看数量级：O(n) 的算法当 n=10⁶ 未必快过 O(n²) 的 n=10——但考试按数量级答。</p>`]
],
quiz: [
{id:'q1', q:'单层 for 循环执行 n 次，时间复杂度是？', opts:['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], ans:1, exp:'线性增长即 O(n)。'},
{id:'q2', q:'<code>while(n &gt; 1) n = n / 2;</code> 的时间复杂度是？', opts:['O(n)', 'O(log n)', 'O(n log n)', 'O(√n)'], ans:1, exp:'每次规模减半，折半的节奏 → 对数级。'},
{id:'q3', q:'下列复杂度从小到大排序正确的是？', opts:['O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²)', 'O(log n) &lt; O(1) &lt; O(n²) &lt; O(n)', 'O(n) &lt; O(log n) &lt; O(n²)', 'O(n²) &lt; O(n log n) &lt; O(n)'], ans:0, exp:'标准增长阶梯：常 &lt; 对数 &lt; 线性 &lt; 线性对数 &lt; 平方。'}
]

}

}
};
