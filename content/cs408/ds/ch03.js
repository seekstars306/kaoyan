/* ===== 408 数据结构 · 第3章 串 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['cs408/ds/ch03'] = {

lessons: {

'3-1': {
title: '串与模式匹配（朴素算法与 KMP）',
secs: [
['why', '为什么学这一节',
`<p>串就是字符串。本章唯一的硬骨头是 <b>KMP 算法</b>与 next 数组——408 每两三年考一次"给模式串求 next/nextval"或模拟匹配趟数。掌握"手算 next"就拿下本章。</p>`],
['think', '直观理解',
`<p><b>模式匹配：</b>在主串里找子串（模式串）。朴素算法（BF）：主串每个位置都试一遍，失配就回退主串指针——最坏 O(mn)。</p>
<blockquote><b>KMP 的聪明之处：失配后主串指针 i 永不回退</b>，只让模式串指针 j 跳到 next[j] 继续比。next[j] 的含义："模式串前 j-1 个字符中，最长相等前后缀的长度"——失配时借助已经匹配过的信息。</blockquote>
<p>例：模式串 ababc：next = [-1(或0按约定), 0, 0, 1, 2]。看 ababc 前 3 个字符 aba：最长相等前后缀 a = 长度 1 → next[4]=1（下标约定见下）。</p>`],
['def', 'next 数组手算法',
`<p><b>① 约定（教材版）：next[1]=0（或 next[0]=-1），next[2]=1</b>（前两个固定）。之后：</p>
<pre class="code">位置 j:    1  2  3  4  5
模式串:    a  b  a  b  c
next[j]:   0  1  1  2  3</pre>
<p>求 next[j]（j≥3）：看前 j-1 个字符组成的串的"<b>最长相等前后缀长度 + 1</b>"。</p>
<p>如 j=4：前 3 个字符 "aba"：前缀 a、后缀 a 相等，长度 1 → next[4] = 1+1 = 2。</p>
<p><b>② nextval（改进版）：</b>若 <code>T[j] == T[next[j]]</code>，则 nextval[j] = nextval[next[j]]（跳过注定失配的比对）；否则 nextval[j] = next[j]。逐个左看修正。</p>
<p><b>③ KMP 复杂度：</b>主串指针不回退，时间 O(m+n)；朴素 BF 最坏 O(mn)、实际常接近 O(m+n)。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1 手算 next：模式串 aabaac</div>
<pre class="code">j:        1  2  3  4  5  6
T[j]:     a  a  b  a  a  c
next[j]:  0  1  2  1  2  3</pre>
<p>逐步：next[1]=0，next[2]=1；j=3：前 2 个字符 "aa" 的最长相等前后缀是 "a"（长 1）→ next[3]=1+1=2；j=4：前 3 个 "aab" 无相等前后缀 → next[4]=1；j=5：前 4 个 "aaba" 的最长相等前后缀 "a"（长 1）→ next[5]=2；j=6：前 5 个 "aabaa" 的最长相等前后缀 "aa"（长 2；注意前缀 "aab" ≠ 后缀 "baa" 不匹配）→ next[6]=2+1=3。</p>
<p>最终：<b>next = 0 1 2 1 2 3</b>。</p></div>
<div class="ex-box"><div class="ex-t">例 2 nextval 接着算（用上表）</div>
<p>j=2：T[2]=a，T[next[2]]=T[1]=a 相等 → nextval[2]=nextval[1]=0；j=3：T[3]=b ≠ T[next[3]]=T[2]=a → nextval[3]=2；j=4：T[4]=a=T[1] → nextval[4]=0；j=5：T[5]=a=T[next[5]=T[2]=a → nextval[5]=nextval[2]=0；j=6：T[6]=c≠T[3]=b → nextval[6]=3。</p></div>`],
['warn', '易错点',
`<p>• next 数组有下标从 0 与从 1 两套约定（差 1），考前锁定教材约定，看清题目。</p>
<p>• next[j] 看的是<b>前 j-1 个字符</b>，不含 T[j] 自己。</p>
<p>• "最长相等前后缀"中前缀与后缀<b>不能是整个串本身</b>（部分匹配）。</p>
<p>• KMP 优势场景：模式串中有较多"部分重复"；0/1 串匹配是 KMP 大放异彩的场景。</p>`]
],
quiz: [
{id:'q1', q:'模式串 "aba" 的 next 数组（下标从1起，next[1]=0）是？', opts:['0 1 2', '0 1 1', '0 0 1', '1 1 2'], ans:1, exp:'next[1]=0、next[2]=1、j=3：前2字符ab无相等前后缀→1。'},
{id:'q2', q:'KMP 算法相比朴素算法的核心改进是？', opts:['主串指针不回退', '模式串更短', '不用比较', '需要额外排序'], ans:0, exp:'利用已匹配信息把模式串指针右跳，主串 i 不回头。'},
{id:'q3', q:'KMP 算法的时间复杂度是？', opts:['O(mn)', 'O(m+n)', 'O(n²)', 'O(log n)'], ans:1, exp:'求 next O(m) + 匹配 O(n)。'}
]

}

}
};
