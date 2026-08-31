/* ===== 408 计算机网络 · 第5章 传输层 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['cs408/net/ch05'] = {

lessons: {

'5-1': {
title: 'UDP 与 TCP：特点与首部',
secs: [
['why', '为什么学这一节',
`<p>传输层双雄。UDP 简单无连接、TCP 可靠面向连接；两者首部字段（尤其 TCP 的六大标志位与序号确认号）是一切 TCP 大题的基础。</p>`],
['think', '直观理解',
`<p><b>UDP：</b>无连接、尽最大努力交付、面向报文（应用给多少发多少）、支持一对多、首部 8 字节（源端口/目的端口/长度/校验和）。适合实时音视频、DNS。</p>
<blockquote><b>TCP 首部 20~60B：</b>源/目的端口、<b>序号 seq(32b)、确认号 ack(32b，期望收到的下一字节)</b>、数据偏移、<b>标志位 URG/ACK/PSH/RST/SYN/FIN</b>、窗口（流量控制）、校验和。面向字节流：<b>每个字节都有编号</b>。</blockquote>
<p><b>端口：</b>0~1023 熟知端口（HTTP 80、FTP 21/20、DNS 53、SMTP 25）；套接字 = IP:端口。</p>
<p><b>校验和：</b>都要加"伪首部"（含源/目的 IP）一起算；UDP 校验和可选、TCP 必须。</p>`],
['def', '要点',
`<p><b>① TCP 面向字节流 vs UDP 面向报文</b>：TCP 会把应用数据"拆包合包"，接收方不保证一次 read 对应一次 write。</p>
<p><b>② ACK 标志=1 时确认号才有效</b>；SYN 消耗一个序号（SYN=1 的段 seq=x，确认号=x+1）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例（首部计算）TCP 报文段首部固定 20B + 选项 8B，数据偏移字段值？</div>
<p>首部长度 28B，数据偏移单位 4B → 28/4 = <b>7</b>。</p></div>`],
['warn', '易错点',
`<p>• 确认号 ack = "已正确收到的最后一个字节的序号 + 1"（期望的下一个）。</p>
<p>• UDP 长度字段含首部 8B；TCP 无长度字段（靠 IP 层总长推算）。</p>`]
],
quiz: [
{id:'q1', q:'UDP 首部的长度是？', opts:['8 字节', '20 字节', '12 字节', '可变'], ans:0, exp:'四字段×2B = 8B。'},
{id:'q2', q:'TCP 报文段中"确认号 = 501"表示？', opts:['已收到 501 字节', '期望收到序号 501 起的字节', '发送方从 501 重传', '窗口 501'], ans:1, exp:'累积确认：499 及以前都已收到。'}
]

},

'5-2': {
title: 'TCP 连接管理：三次握手与四次挥手',
secs: [
['why', '为什么学这一节',
`<p>全卷最著名的"三次握手"。状态转换（SYN_SENT/ESTABLISHED/TIME_WAIT）、每一步的序号变化、"为什么是三次/四次"的原理阐述是简答与选择双料考点。</p>`],
['think', '直观理解',
`<p><b>三次握手（建立）：</b></p>
<blockquote>① 客户端 → SYN=1, seq=x（进入 SYN_SENT）；<br>② 服务器 → SYN=1, ACK=1, seq=y, ack=x+1（SYN_RCVD）；<br>③ 客户端 → ACK=1, seq=x+1, ack=y+1（双方 ESTABLISHED）。<br>
<b>为什么三次？</b>防止"失效的连接请求"迟到造成资源浪费；两次会让服务器单方面开门。</blockquote>
<p><b>四次挥手（释放）：</b></p>
<blockquote>① 客户端 FIN（FIN_WAIT_1）；② 服务器 ACK（CLOSE_WAIT→客户端 FIN_WAIT_2）——此时服务器还能发数据（半关闭）；③ 服务器数据发完 → FIN（LAST_ACK）；④ 客户端 ACK（<b>TIME_WAIT 等 2MSL</b>）→ CLOSED。</blockquote>
<p><b>为什么四次？</b>TCP 全双工，两个方向各关一次；②③可合并（但服务器可能还有数据）。<b>TIME_WAIT 等 2MSL：</b>保证最后的 ACK 可达 + 旧报文自然消亡。</p>`],
['def', '序号追踪',
`<p><b>例：客户端 SYN seq=100，则服务器确认 ack=101；若握手完成客户端发 100 字节数据 seq=101~200，服务器 ack=201。</b></p>
<p>SYN 与 FIN 各消耗一个序号；纯 ACK 不消耗。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例（判断）TIME_WAIT 状态出现在主动关闭方，对吗？</div>
<p><b>对</b>——主动关者最后发 ACK 后等 2MSL，防 ACK 丢失（服务器重传 FIN 时还能再确认）。</p></div>`],
['warn', '易错点',
`<p>• 第三次握手可以捎带数据；第二次握手的 ACK 与 SYN 同段。</p>
<p>• "服务器收到 FIN 后立即发 FIN"错——可能还有数据（这就是四次而非三次挥手的原因）。</p>`]
],
quiz: [
{id:'q1', q:'TCP 建立连接时，第二次握手的报文标志是？', opts:['SYN=1', 'SYN=1, ACK=1', 'ACK=1, FIN=1', '仅 ACK=1'], ans:1, exp:'服务器同时确认（ack=x+1）并同步（seq=y）。'},
{id:'q2', q:'TIME_WAIT 需要等待的时间是？', opts:['1 个 MSL', '2 个 MSL', '1 个 RTT', '无限期'], ans:1, exp:'2MSL：一去一回的最大报文生存期。'}
]

},

'5-3': {
title: 'TCP 可靠传输、流量控制与拥塞控制',
secs: [
['why', '为什么学这一节',
`<p>408 计算题之王：<b>拥塞窗口演化（慢开始/拥塞避免/快重传/快恢复）</b>给场景画 cwnd 曲线几乎年年出；流量控制与滑动窗口结合也常出计算。</p>`],
['think', '直观理解',
`<p><b>可靠传输 = 序号 + 确认（累积）+ 重传（超时 RTTs 或 3 个冗余 ACK 快重传）。</b></p>
<blockquote><b>流量控制（端到端）：接收方用 rwnd 通告"我还能收多少"；发送窗口 = min(rwnd, cwnd)。</b>零窗口时启动持续计时器发探测段防死锁。</blockquote>
<p><b>拥塞控制四大件：</b></p>
<p>• <b>慢开始：</b>cwnd 从 1 MSS 起，每 RTT <b>翻倍</b>（指数）至 ssthresh；</p>
<p>• <b>拥塞避免：</b>cwnd ≥ ssthresh 后每 RTT <b>+1</b>（线性加法增大）；</p>
<p>• <b>超时</b>：ssthresh = 当前 cwnd/2，cwnd 重置 1，重新慢开始（乘法减小）；</p>
<p>• <b>快重传+快恢复：</b>收到 3 个重复 ACK → 立即重传；ssthresh=cwnd/2，<b>cwnd=新 ssthresh</b>（不回 1），线性增长。</p>`],
['def', '经典计算模板',
`<p><b>例：初始 cwnd=1、ssthresh=8，无拥塞，问第 5 个 RTT 后 cwnd？</b></p>
<p>RTT1=1→2→4→8（慢开始到 ssthresh 停）→之后 +1：第 4 RTT=8，第 5 RTT=<b>9</b>。</p>
<p><b>超时版本：</b>到 12 时超时 → ssthresh=6，cwnd=1 → 2→4→6（慢开始到 6）→7→8…</p>
<p class="muted">画折线图：纵轴 cwnd、横轴 RTT，分段标"慢开始/拥塞避免/快恢复"。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例（快恢复）cwnd=16 时收到 3 个重复 ACK，ssthresh 原为 16，动作？</div>
<p>快重传丢失段；ssthresh = 16/2 = 8；cwnd = <b>8</b>（快恢复，不降为 1），继续拥塞避免线性增长。</p></div>`],
['warn', '易错点',
`<p>• 慢开始"翻倍"到 ssthresh 就停，不是一直翻倍。</p>
<p>• 流量控制防"接收方撑死"，拥塞控制防"网络撑死"——两个独立机制，发送窗口取 min。</p>
<p>• 超时重传的 RTTs 用加权平均（RTTs = 旧值×(1-α)+新RTT×α）。</p>`]
],
quiz: [
{id:'q1', q:'慢开始阶段 cwnd 的增长规律是？', opts:['每 RTT 加 1', '每 RTT 翻倍', '每 RTT 加倍减半', '不变'], ans:1, exp:'指数增长直至 ssthresh。'},
{id:'q2', q:'发送方的发送窗口等于？', opts:['rwnd', 'cwnd', 'min(rwnd, cwnd)', 'max(rwnd, cwnd)'], ans:2, exp:'两个"阀门"取小者。'}
]

}

}
};
