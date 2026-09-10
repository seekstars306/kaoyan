/* ===== 408 计算机网络 · 第3章 数据链路层 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['cs408/net/ch03'] = {

lessons: {

'3-1': {
title: '封装成帧与差错控制',
secs: [
['why', '为什么学这一节',
`<p>链路层三大任务之一：把比特装配成帧、检错纠错。<b>CRC 循环冗余校验的手算（模 2 除法）</b>与海明码是本章必考计算。</p>`],
['think', '直观理解',
`<p><b>组帧常见方法：</b>字符计数法、字节填充、比特填充，以及利用物理层编码中不会出现在普通数据里的信号模式作为边界。HDLC 对数据执行比特填充：每出现 5 个连续 1 就插入 0。经典 10Mb/s 以太网虽然采用曼彻斯特编码，但用前导码和帧开始定界符标识开头，不能说它靠“曼彻斯特违例码”组帧。</p>
<blockquote><b>CRC 发送方：</b>若生成多项式最高次数为 r，就在数据后补 r 个 0，再对生成多项式对应位串做模 2 除法，所得 r 位余数作为 FCS。接收方用同一多项式检查；余数为 0 只表示<b>未检测到错误</b>，不保证传输绝对无错。<br>
<b>海明码：</b>若要构造可纠正 1 位错误的基本海明码，m 个数据位与 r 个校验位需满足 $2^r\\ge m+r+1$；校验位通常放在序号为 2 的幂的位置。</blockquote>`],
['def', '计算模板',
`<p><b>例：数据 101001、生成多项式 G(x)=x³+x+1（=1011）：</b></p>
<p>补 3 个 0：101001000 ÷ 1011（模2除）→ 商 110101 余 <b>001</b> → 发送帧 101001<b>001</b>。</p>
<p><b>海明码位数：</b>m=4 数据位 → r 满足 2^r ≥ 4+r+1 → r=3，共 7 位（海明(7,4)）。</p>
<p class="muted">CRC 只能<b>检错不能纠错</b>（链路层重传交给可靠传输机制）；海明码可纠一位错。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例（比特填充）发送数据中出现 011111 111（连续 1），HDLC 如何处理？</div>
<p>每遇 5 个连续 1，发送方自动插入一个 0；接收方删去。帧定界符 01111110 不会在数据中伪装出现。</p></div>`],
['warn', '易错点',
`<p>• 模 2 除法是<b>异或</b>，不借位不减法——和算术除法完全不同。</p>
<p>• 余数位数 = 生成多项式最高次数（x³ → 3 位余数）。</p>
<p>• CRC 保证"无错"仅指检错概率极高，不是 100%。</p>`]
],
quiz: [
{id:'q1', q:'CRC 校验中，若生成多项式为 x³+x+1，FCS 为几位？', opts:['2 位', '3 位', '4 位', '8 位'], ans:1, exp:'最高次 3 → 3 位余数（补 3 个 0）。'},
{id:'q2', q:'HDLC 的比特填充规则是？', opts:['每 8 位插 0', '连续 5 个 1 后插 0', '连续 3 个 0 后插 1', '不填充'], ans:1, exp:'防帧定界符 01111110 在数据中假出现。'}
]

},

'3-2': {
title: '流量控制与可靠传输：停等、回退N、选择重传',
secs: [
['why', '为什么学这一节',
`<p>可靠传输三协议：<b>停止-等待、GBN 后退 N 帧、SR 选择重传</b>。发送/接收窗口大小限制与滑动窗口机制是 408 的经典计算题。</p>`],
['think', '直观理解',
`<p><b>停止-等待：</b>发送一帧后等待确认。若数据帧发送时间为 $T_D$，确认帧发送时间为 $T_A$，RTT 只计双向传播时延，并忽略处理时间，则利用率为 $U=T_D/(T_D+RTT+T_A)$。</p>
<blockquote><b>滑动窗口：</b>发送窗口 $W_T$ 表示最多可连续发送的未确认帧数。GBN 在某帧超时后从该帧起回退重传，接收方只按序接收；SR 分别确认并缓存窗口内乱序帧，只重传丢失或超时的帧。</blockquote>
<p><b>n 位序号的窗口限制：</b>GBN 接收窗口为 1 时，$W_T\\le 2^n-1$；SR 为避免新旧序号窗口重叠，需满足 $W_T+W_R\\le 2^n$，常取 $W_T=W_R=2^{n-1}$。</p>
<p><b>填满链路的条件：</b>忽略 ACK 发送时间时，从开始发送首帧到其 ACK 返回约为 $T_D+RTT$；窗口连续发送时要避免停顿，需 $W_TT_D\\ge T_D+RTT$，即 $W_T\\ge1+RTT/T_D$。最后按整数向上取整。</p>`],
['def', '三协议对比表',
`<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr style="background:#f1f4f9"><th style="padding:4px;border:1px solid #e3e8f0">协议</th><th style="padding:4px;border:1px solid #e3e8f0">发送窗口</th><th style="padding:4px;border:1px solid #e3e8f0">接收窗口</th><th style="padding:4px;border:1px solid #e3e8f0">出错重传</th><th style="padding:4px;border:1px solid #e3e8f0">缓存</th></tr>
<tr><td style="padding:4px;border:1px solid #e3e8f0">停等</td><td style="padding:4px;border:1px solid #e3e8f0">1</td><td style="padding:4px;border:1px solid #e3e8f0">1</td><td style="padding:4px;border:1px solid #e3e8f0">单帧</td><td style="padding:4px;border:1px solid #e3e8f0">无</td></tr>
<tr><td style="padding:4px;border:1px solid #e3e8f0">GBN</td><td style="padding:4px;border:1px solid #e3e8f0">≤2ⁿ-1</td><td style="padding:4px;border:1px solid #e3e8f0">1</td><td style="padding:4px;border:1px solid #e3e8f0">n 帧（全部重传）</td><td style="padding:4px;border:1px solid #e3e8f0">1 帧</td></tr>
<tr><td style="padding:4px;border:1px solid #e3e8f0">SR</td><td style="padding:4px;border:1px solid #e3e8f0">≤2^(n-1)</td><td style="padding:4px;border:1px solid #e3e8f0">&gt;1</td><td style="padding:4px;border:1px solid #e3e8f0">只重传出错帧</td><td style="padding:4px;border:1px solid #e3e8f0">多帧乱序缓存</td></tr>
</table>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（窗口计算）3 位编号，GBN 最大发送窗口？SR 呢？</div>
<p>GBN：2³-1 = <b>7</b>；SR：2² = <b>4</b>（W_T=W_R=4）。</p></div>
<div class="ex-box"><div class="ex-t">例 2（利用率）T_D=1ms、RTT=8ms、忽略确认帧，停等利用率？</div>
<p>U = 1/(1+8) ≈ <b>11%</b>——很低，故需要流水线式滑动窗口。</p></div>`],
['warn', '易错点',
`<p>• GBN 接收窗口 = 1（只按序接收），乱序帧一律丢弃。</p>
<p>• SR 的确认是"逐帧单独确认"；GBN 累积确认。</p>
<p>• 考题常给"信道速率、帧长、RTT"算最小窗口——先算"管道里能塞多少帧"。</p>`]
],
quiz: [
{id:'q1', q:'4 位编号下，SR 协议发送窗口最大为？', opts:['15', '8', '7', '16'], ans:1, exp:'2^(4-1) = 8。'},
{id:'q2', q:'GBN 协议接收方收到失序帧时会？', opts:['缓存等待', '丢弃并重复确认最后按序帧', '存入堆栈', '转发上层'], ans:1, exp:'接收窗口为 1：失序即弃，重发 ACK(n)。'}
]

},

'3-3': {
title: '介质访问控制：CSMA/CD 与 CSMA/CA',
secs: [
['why', '为什么学这一节',
`<p>共享信道的"抢话规则"。<b>CSMA/CD 的最小帧长计算</b>（争用期 2τ）是以太网必考计算；无线网的 CSMA/CA 与之对比出概念题。</p>`],
['think', '直观理解',
`<p><b>CSMA/CD（有线以太网）：先听后发、边发边听、冲突停发、随机重发。</b>信号往返最远 2τ 内必须能检测到冲突 → <b>帧的发送时间 ≥ 2τ（争用期）</b>，这就是最小帧长的由来。</p>
<blockquote><b>最小帧长 = 2τ × 数据率。</b>例：10Mb/s、争用期 51.2μs → 最小帧 512bit = 64B（以太网 64 字节下限的来历）。<br>
<b>截断二进制指数退避：</b>第 i 次冲突从 {0..2^min(i,10)-1} 随机选 k，等 k×2τ；16 次失败放弃报错。</blockquote>
<p><b>CSMA/CA（IEEE 802.11）：</b>无线站通常不能像共享同轴以太网那样一边发送一边可靠检测碰撞，因此通过载波侦听、帧间间隔、随机退避和 ACK 尽量避免并发现丢失；可选 RTS/CTS 能缓解隐藏站问题，但不能保证消除一切碰撞。</p>`],
['def', '计算模板',
`<p><b>例：网段长 2km、传播速率 2×10⁸m/s、数据率 10Mb/s，最小帧长？</b></p>
<p>τ = 2000/2×10⁸ = 10μs；2τ = 20μs；最小帧 = 10Mb/s × 20μs = <b>200bit = 25B</b>。</p>
<p><b>链路层设备：</b>网桥/交换机按 MAC 转发、自学习构建转发表；交换机每端口独立冲突域（全双工无冲突）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例（交换机 vs 集线器）10Mb/s 8 口交换机 vs 集线器，每主机可用带宽？</div>
<p>交换机（全双工）：每口独享 10Mb/s；集线器：共享 10Mb/s ÷ 8。</p></div>`],
['warn', '易错点',
`<p>• CSMA/CD 用于<b>半双工</b>有线网；全双工交换式以太网不需要 CD。</p>
<p>• 争用期 = 2×端到端单程传播时延（最坏情况：刚发完就撞）。</p>
<p>• CSMA/CA 的 RTS/CTS 解决<b>隐藏站问题</b>。</p>`]
],
quiz: [
{id:'q1', q:'以太网争用期 51.2μs、速率 10Mb/s，最小帧长是？', opts:['64B', '128B', '512B', '1518B'], ans:0, exp:'10M×51.2μ = 512bit = 64 字节。'},
{id:'q2', q:'无线局域网采用 CSMA/CA 而非 CSMA/CD 的根本原因是？', opts:['带宽不足', '无线信道难以边发边检测冲突', '成本高', '协议规定'], ans:1, exp:'碰撞信号被自身发送信号淹没+信号强度衰减，无法可靠检测。'}
]

},

'3-4': {
title: '局域网：以太网与交换机',
secs: [
['why', '为什么学这一节',
`<p>以太网帧格式（MAC 地址、类型、FCS）、802.11 无线局域网基础、VLAN 概念。以太网帧结构与交换机自学习是常考选择。</p>`],
['think', '直观理解',
`<p><b>以太网 II MAC 帧：</b>目的 MAC(6B) + 源 MAC(6B) + 类型(2B) + 数据及填充(46～1500B) + FCS(4B)，从目的地址到 FCS 共 64～1518B。物理层发送的 7B 前导码和 1B SFD 位于 MAC 帧之前，不计入 64B 最小帧长。</p>
<p><b>MAC 地址字段为 48 bit。</b>IEEE 分配体系通常由组织标识与组织自行分配部分组成，但并非每个地址都能简单称为“全球唯一”：单播/组播位和全局/本地管理位会改变含义；全 1 地址 <code>FF:FF:FF:FF:FF:FF</code> 是广播地址。</p>
<p><b>交换机自学习：</b>收到帧记“源 MAC → 入端口”；查表转发“目的 MAC”，查不到则泛洪。</p>
<p><b>802.11 无线网：</b>BSS（基本服务集）+ AP 接入点；CSMA/CA；802.11 帧有四个地址字段（含 AP 地址）——概念。</p>
<p><b>VLAN：</b>在交换机上逻辑划分广播域（802.1Q 标签帧），隔离广播风暴。</p>`],
['def', '要点',
`<p><b>① 1500B = MTU 上限</b>（数据字段最大），46B 下限（不足填充）——与最小帧长 64B 呼应。</p>
<p><b>② 透明网桥/交换机生成树协议 STP</b>：解决环路风暴（自学习+泛洪在环形拓扑成灾）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例（自学习）交换机刚上电，收到 A→B 的帧，如何处理？</div>
<p>转发表记录 <b>A→端口1</b>；B 未知 → <b>泛洪</b>（除入端口外所有口转发）。</p></div>`],
['warn', '易错点',
`<p>• MAC 地址是链路层地址，IP 是网络层地址——ARP 负责"翻译"（第 4 章）。</p>
<p>• 交换机隔离冲突域，<b>VLAN 隔离广播域</b>；普通交换机不隔离广播。</p>`]
],
quiz: [
{id:'q1', q:'以太网 MAC 地址长度是？', opts:['32 位', '48 位', '64 位', '128 位'], ans:1, exp:'48 位 = 6 字节。'},
{id:'q2', q:'交换机收到目的 MAC 未知的帧会？', opts:['丢弃', '泛洪到所有其他端口', '存入缓冲区', '回送错误'], ans:1, exp:'未知单播泛洪，让目标自己"现身"以学习。'}
]

}

}
};
