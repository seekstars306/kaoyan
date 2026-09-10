/* ===== 408 数据结构 · 第1章 线性表 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['cs408/ds/ch01'] = {

lessons: {

'1-1': {
title: '顺序表',
secs: [
['why', '为什么学这一节',
`<p>线性表的两种存储之一：用<b>一段连续内存</b>装元素。它是"数组版"线性表，考插入删除移动次数、按位查找等计算题——408 的固定拿分点。</p>`],
['think', '直观理解',
`<p><b>顺序表 = 一排连座的电影院。</b>座位（地址）连续：知道第一排位置，第 i 排位置一步算出——<b>随机存取 O(1)</b>。但中间插人，后面<b>全部起立挪位</b>；删除同理，后面全部前移。</p>
<pre class="code">#define MaxSize 50
typedef struct {
    int data[MaxSize];  /* 静态分配 */
    int length;         /* 当前长度 */
} SqList;</pre>
<p class="muted">动态分配版用 <code>int *data</code> + malloc，考得少。</p>`],
['def', '核心操作与特性',
`<p><b>① 按位查找：</b>取第 i 个元素，直接 <code>L.data[i-1]</code>，O(1)。</p>
<p><b>② 按值查找：</b>从头顺序比较，O(n)。只有在“查找成功且每个位置等概率”时，平均比较次数才是 $(n+1)/2$。</p>
<p><b>③ 插入（第 i 位插 x）：</b>第 i 到第 n 个元素<b>全部后移</b>，移动 $n-i+1$ 次；若 n+1 个合法插入位置等概率，平均移动 n/2 次。表满则失败。</p>
<p><b>④ 删除（删第 i 个）：</b>第 i+1 到第 n 个<b>全部前移</b>，移动 $n-i$ 次；若 n 个删除位置等概率，平均移动 $(n-1)/2$ 次。</p>
<p><b>⑤ 存储密度高：</b>元素区没有逐结点指针开销；若忽略顺序表的长度等描述信息，教材常称元素存储密度为 1。其<b>存取方式是随机存取</b>。</p>
<pre class="code">/* 插入核心代码 */
for (int j = L.length; j &gt;= i; j--)   /* 从后往前挪，防覆盖 */
    L.data[j] = L.data[j-1];
L.data[i-1] = x;
L.length++;</pre>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（移动次数计算）长度为 100 的顺序表，在第 30 个位置插入元素需移动几个？</div>
<p>第 30~100 个元素共 <b>71 个</b>后移。公式：插入移动 n-i+1 个。</p>
<p>若删除第 30 个：第 31~100 共 <b>70 个</b>前移。公式：删除移动 n-i 个。</p></div>
<div class="ex-box"><div class="ex-t">例 2（综合题）设计算法：删除顺序表中所有值等于 x 的元素，要求 O(n) 时间 O(1) 空间</div>
<pre class="code">void del_x(SqList *L, int x) {
    int k = 0;                         /* k 记录不等于 x 的元素个数 */
    for (int i = 0; i &lt; L-&gt;length; i++)
        if (L-&gt;data[i] != x)
            L-&gt;data[k++] = L-&gt;data[i]; /* 不等 x 的前移覆盖 */
    L-&gt;length = k;
}</pre>
<p class="muted">一次扫描原地覆盖——顺序表综合算法题的标准解法风格。</p></div>`],
['warn', '易错点',
`<p>• 位序从 1 数（第 i 个元素是 data[i-1]），下标从 0 数——题目问"位序"还是"下标"要看清。</p>
<p>• 插入合法位置 1 ≤ i ≤ length+1；删除 1 ≤ i ≤ length，越界要判非法。</p>
<p>• 顺序表"插入删除慢（O(n)）、按位查找快（O(1)）"，与链表正好互补。</p>`]
],
quiz: [
{id:'q1', q:'长度为 n 的顺序表在第 1 个位置插入元素需移动几个元素？', opts:['0', '1', 'n', 'n+1'], ans:2, exp:'n-i+1 = n-1+1 = n 个全部后移。'},
{id:'q2', q:'顺序表按位查找第 i 个元素的时间复杂度？', opts:['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], ans:0, exp:'地址连续，随机存取一步到位。'},
{id:'q3', q:'顺序表删除第 i 个元素需向前移动的元素个数是？', opts:['n-i', 'n-i+1', 'i-1', 'i'], ans:0, exp:'第 i+1 到 n 共 n-i 个前移。'}
]

},

'1-2': {
title: '单链表',
secs: [
['why', '为什么学这一节',
`<p>链表是数据结构的"国民起点"：节点 + next 指针串成链。插入删除 O(1)（定位后），代价是失去随机存取。408 大题最爱的手写算法题半数围绕链表展开。</p>`],
['think', '直观理解',
`<p><b>单链表 = 寻宝游戏：</b>每个线索（节点）只告诉你下一条线索在哪。找第 5 个宝物必须从第 1 个一路顺藤——<b>只能顺序存取 O(n)</b>；但拆掉/插入一条线索只需改两个指针，<b>插入删除 O(1)</b>（找到位置后）。</p>
<pre class="code">typedef struct LNode {
    int data;
    struct LNode *next;
} LNode, *LinkList;</pre>
<p><b>带头节点 vs 不带头节点：</b>带头节点（哨兵）让"第一个位置插入/删除"与别处统一，代码更简洁——408 默认带头节点。</p>`],
['def', '核心操作代码',
`<p><b>① 头插法建表（逆序）：</b></p>
<pre class="code">s-&gt;next = L-&gt;next;   /* 新节点接在头后 */
L-&gt;next = s;         /* 头指向新节点 */</pre>
<p><b>② 尾插法建表（正序）：</b>维持尾指针 r：<code>r-&gt;next = s; r = s;</code></p>
<p><b>③ 第 i 位插入 x：</b>先找到第 i-1 个节点 p，再：</p>
<pre class="code">s-&gt;next = p-&gt;next;
p-&gt;next = s;         /* 两句顺序不能颠倒！ */</pre>
<p><b>④ 删除 p 的后继 q：</b></p>
<pre class="code">q = p-&gt;next;
p-&gt;next = q-&gt;next;
free(q);</pre>
<p><b>⑤ 复杂度：</b>查找/定位 O(n)，定位后插入删除 O(1)；存储密度 &lt; 1（指针开销）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（经典算法）带头结点单链表就地逆置</div>
<pre class="code">void Reverse(LinkList L) {
    LNode *p = L-&gt;next, *r;
    L-&gt;next = NULL;
    while (p != NULL) {
        r = p-&gt;next;          /* 先保存后继 */
        p-&gt;next = L-&gt;next;    /* 再把 p 头插 */
        L-&gt;next = p;
        p = r;
    }
}</pre>
<p class="muted">LinkList 本身已是结点指针；带头结点时传入 L 就能修改 L 指向的链。时间 O(n)，额外空间 O(1)。</p></div>
<div class="ex-box"><div class="ex-t">例 2（经典算法）找两链表公共节点</div>
<p>若两个无环单链表共享结点，则从第一个公共结点起后缀完全相同。先让长表走过“长度差”步，再让两个指针同步前进，第一次指针相等处就是公共起点；若最终同时到 NULL，则没有公共结点。时间 O(m+n)，额外空间 O(1)。</p></div>`],
['warn', '易错点',
`<p>• 插入两句 <code>s-&gt;next=p-&gt;next; p-&gt;next=s;</code> 不能颠倒，否则会形成自环并丢失原后继。</p>
<p>• 操作后要维护长度（若结构中有）以及头、尾指针。</p>
<p>• 只有当 p 不是尾结点，且允许用后继结点的数据覆盖 p 时，才能“把 p-&gt;next 的数据复制给 p，再删除后继”来实现 O(1) 删除；若外部代码依赖结点身份，这也不等价于真正删除原 p。</p>`]
],
quiz: [
{id:'q1', q:'带头节点的单链表 L 为空的判定条件是？', opts:['L == NULL', 'L-&gt;next == NULL', 'L-&gt;data == 0', 'L-&gt;next == L'], ans:1, exp:'头节点永远存在，看它的 next 是否为空。'},
{id:'q2', q:'在节点 p 之后插入 s 的正确顺序是？', opts:['p-&gt;next=s; s-&gt;next=p-&gt;next;', 's-&gt;next=p-&gt;next; p-&gt;next=s;', '任意顺序', 's-&gt;next=p; p-&gt;next=s;'], ans:1, exp:'先接后断：s 先记住 p 的后继，p 再指向 s。'},
{id:'q3', q:'单链表按序号查找第 i 个元素的时间复杂度？', opts:['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], ans:2, exp:'链表只能从头顺序数，无法随机存取。'}
]

},

'1-3': {
title: '双链表与循环链表',
secs: [
['why', '为什么学这一节',
`<p>单链表找前驱要 O(n)——双链表加一个 prior 指针解决；循环链表让"从任一节点转一圈"成为可能，特别是<b>带尾指针的循环单链表</b>：找头找尾都 O(1)。408 常考双链表插入删除的指针操作顺序。</p>`],
['think', '直观理解',
`<p><b>双链表 = 双向车道：</b>每个节点同时记 prev 和 next，前后互通。代价：每个节点多一个指针（空间换时间）。</p>
<blockquote><b>循环链表 = 首尾相接的项链：</b>尾节点的 next 指回头节点。判空：L-&gt;next == L。</blockquote>`],
['def', '双链表核心操作',
`<p><b>① 双链表插入（在 p 后插 s）：</b>下面四句假设 p 有后继（例如采用带尾哨兵的实现）；普通非循环双链表若 p 是尾结点，应跳过对空后继的 prior 赋值。</p>
<pre class="code">s-&gt;next = p-&gt;next;
s-&gt;prior = p;
p-&gt;next-&gt;prior = s;
p-&gt;next = s;</pre>
<p><b>② 双链表删除（删 p 的后继 q）：</b>先确认 q 存在；若 q 不是尾结点，再修改其后继的 prior。</p>
<pre class="code">q = p-&gt;next;
p-&gt;next = q-&gt;next;
if (q-&gt;next != NULL)
    q-&gt;next-&gt;prior = p;
free(q);</pre>
<p><b>③ 带头结点、仅设尾指针 r 的循环单链表：</b>头结点是 <code>r-&gt;next</code>，首个数据结点是 <code>r-&gt;next-&gt;next</code>。表头插入/删除和表尾插入可 O(1)，但删除尾数据结点仍需寻找前驱，为 O(n)。</p>
<p><b>④ 静态链表：</b>用数组模拟链表（游标代替指针），data + next 下标。无指针语言/外存场景用。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（判断）双链表插入四句打乱顺序，哪个必须在 p-&gt;next=s 之前？</div>
<p>必须先执行 <code>p-&gt;next-&gt;prior = s</code>，因为一旦 <code>p-&gt;next = s</code> 执行，原后继节点就"失联"了，再想改它的 prior 已经找不到人。</p>
<p class="muted">口诀：动 p-&gt;next 之前，先让原后继认新邻居。</p></div>
<div class="ex-box"><div class="ex-t">例 2 循环双链表判空</div>
<p>带头节点的循环双链表为空 ⇔ <code>L-&gt;next == L &amp;&amp; L-&gt;prior == L</code>（头的两个指针都指自己）。</p></div>`],
['warn', '易错点',
`<p>• 双链表插入四句顺序错一步，链条断一处——画图！画图！画图！</p>
<p>• 循环链表判空是 <code>L-&gt;next==L</code>，不是 NULL。</p>
<p>• 双链表删尾节点时 <code>q-&gt;next</code> 可能为空，注意与循环链表的区别。</p>`]
],
quiz: [
{id:'q1', q:'双链表在结点 p 之后插入新结点 s，下列哪句<b>不能</b>作为第一步先执行？', opts:['p-&gt;next = s;', 's-&gt;next = p-&gt;next;', 'p-&gt;next-&gt;prior = s;', 's-&gt;prior = p;'], ans:0, exp:'先执行 p-&gt;next=s 会让 p 的原后继"失联"（再也无法修改它的 prior），链就断了。B、C、D 都不破坏任何信息，均可安全先做。口诀：动 p-&gt;next 之前，先安顿原后继。'},
{id:'q2', q:'设尾指针 r 的循环单链表（带头节点），头节点的位置是？', opts:['r', 'r-&gt;next', 'r-&gt;next-&gt;next', '无法确定'], ans:1, exp:'r 是尾数据结点，r-&gt;next 才是头结点；非空时 r-&gt;next-&gt;next 是第一个数据结点。'}
]

}

}
};
