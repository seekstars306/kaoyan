/* ===== 408 计算机网络 · 第4章 网络层 ===== */
window.CONTENT = window.CONTENT || {};
window.CONTENT['cs408/net/ch04'] = {

lessons: {

'4-1': {
title: 'IPv4 协议与 IP 地址',
secs: [
['why', '为什么学这一节',
`<p>网络层核心中的核心。IPv4 分组首部字段、<b>A/B/C/D/E 类地址、子网掩码与网络前缀</b>——408 计算题第一大来源。</p>`],
['think', '直观理解',
`<p><b>IPv4 基本首部为 20B，带选项时最长 60B：</b>首部长度字段单位为 4B，总长度字段单位为字节；TTL 每经一个路由器至少减 1，减到 0 时丢弃；协议字段常见值为 TCP 6、UDP 17；IPv4 只校验首部。</p>
<blockquote><b>分类编址（历史模型）：</b>A 类首字节通常为 1～126，B 类 128～191，C 类 192～223，D 类 224～239 用于组播，E 类 240～255 保留。现代互联网主要使用 CIDR。<br>
<b>特殊地址：</b><code>0.0.0.0</code> 常表示未指定地址；<code>127.0.0.0/8</code> 用于环回；普通子网中主机位全 0 是网络地址、全 1 是定向广播地址；<code>255.255.255.255</code> 是受限广播地址。<br>
<b>私有地址：</b><code>10.0.0.0/8</code>、<code>172.16.0.0/12</code>、<code>192.168.0.0/16</code> 不在公网中路由；访问公网通常经 NAT 或应用代理。</blockquote>
<p><b>CIDR：</b>地址后的 /n 表示前 n 位是网络前缀；子网掩码对应前 n 位为 1、其余为 0。</p>`],
['def', '计算模板',
`<p><b>① 判断所属网络：</b>IP AND 掩码 = 网络地址。</p>
<p><b>② 普通 IPv4 子网的地址数：</b>/n 前缀共有 $2^{32-n}$ 个地址；在传统需要网络地址与定向广播地址的主机子网中，可分配给普通主机的数量为 $2^{32-n}-2$。点到点链路使用 /31、单主机路由 /32 等场景有专门规则，不能一律减 2。</p>
<p><b>③ IP 分片：</b>总长 3800B、MTU 1500B → 分片：每片数据 ≤1500-20=1480，1480×2+840 → 3 片，片偏移以 8B 为单位。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例 1（子网判断）192.168.10.65/26 属于哪个子网？</div>
<p>/26 → 掩码 255.255.255.192；65 → 二进制 01 000001，块大小 64：子网 192.168.10.<b>64</b>，广播 192.168.10.127，可用主机 62 台。</p></div>
<div class="ex-box"><div class="ex-t">例 2（分片）数据报 3800B（含20B首部），MTU=1500，各片长度与片偏移？</div>
<p>片1：1500B（数据1480，偏移0）；片2：1500B（数据1480，偏移1480/8=185）；片3：840B（数据820，偏移2960/8=370）。<b>DF=0, MF：前两片=1，末片=0。</b></p></div>`],
['warn', '易错点',
`<p>• 片偏移单位是 <b>8 字节</b>不是字节；总长度单位是字节；首部长度单位是 4 字节——三个单位陷阱。</p>
<p>• TTL 在路由器递减；IP 校验和只查首部。</p>
<p>• 子网可用主机数要减 2（网络地址+广播地址）。</p>`]
],
quiz: [
{id:'q1', q:'IP 地址 180.80.77.55 属于哪一类？', opts:['A 类', 'B 类', 'C 类', 'D 类'], ans:1, exp:'第一字节 180 在 128~191 → B 类。'},
{id:'q2', q:'一个 /28 子网最多接入多少台主机？', opts:['16', '14', '30', '32'], ans:1, exp:'主机位 4 → 2⁴-2 = 14。'}
]

},

'4-2': {
title: '子网划分、路由聚合与 NAT',
secs: [
['why', '为什么学这一节',
`<p>地址不够用的三板斧：<b>子网划分（借位）、路由聚合（CIDR 汇聚）、NAT 转换</b>。"划分 N 个子网需要借几位""聚合后的最短前缀"是高频计算。</p>`],
['think', '直观理解',
`<p><b>子网划分：</b>从原前缀后的地址位再取 b 位作为更长前缀，可得到 $2^b$ 个等长子网；现代 CIDR 中全 0 和全 1 子网都可使用。</p>
<blockquote><b>路由聚合：</b>若一组连续前缀恰好对齐且覆盖完整的 2 的幂个等长网络，可用它们的公共前缀表示。例如 192.168.0.0/24 与 192.168.1.0/24 可精确聚合为 192.168.0.0/23。仅仅“有公共前缀”可能得到覆盖额外地址的超集，是否允许要看题意。</blockquote>
<p><b>NAT/NAPT：</b>基本 NAT 改写 IP 地址；常见端口地址转换还会改写 TCP/UDP 端口，并维护内部端点与外部端点的映射。入向报文要有已有映射或静态转发规则才能找到内部主机。</p>`],
['def', '计算模板',
`<p><b>① 划分计算：</b>/24 需划 6 个子网 → 借 3 位（2³=8 ≥ 6）→ /27，每子网 30 台可用主机。</p>
<p><b>② 聚合判断：</b>给定 4 个 /24 求最小聚合：写成二进制找公共位。194.24.0.0~194.24.3.0 → 公共 22 位 → <b>194.24.0.0/22</b>。</p>
<p><b>③ 最长前缀匹配：</b>路由表多个匹配取前缀最长的——"更精确的优先"。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例（最长前缀匹配）目的 192.168.1.100，表中有 192.168.1.0/24 与 192.168.1.64/26，走哪条？</div>
<p>两者都匹配，/26 更长 → 走 <b>192.168.1.64/26</b>。</p></div>`],
['warn', '易错点',
`<p>• NAT 改写的是 IP+端口（传输层信息），是"破坏端到端"的争议点（选择题考过）。</p>
<p>• 路由聚合必须确认待聚合网络连续、数量为 2 的幂且按新前缀边界对齐；只找最长公共前缀可能得到包含额外网络的覆盖路由。</p>`]
],
quiz: [
{id:'q1', q:'把 192.168.1.0/24 划分为每个子网至少 50 台主机，最多划几个子网？', opts:['2', '4', '8', '16'], ans:1, exp:'50 台需主机位 6（62 台），剩 26 位网络：/24 借 2 位 → 4 个 /26 子网。'}
]

},

'4-3': {
title: 'ARP、DHCP 与 ICMP',
secs: [
['why', '为什么学这一节',
`<p>网络层的"三大助手协议"：ARP 地址解析、DHCP 动态配网、ICMP 差错报告。三个协议的工作层次与方式（广播/单播、UDP 与否）是选择题高发区。</p>`],
['think', '直观理解',
`<p><b>ARP：</b>已知同网段 IP 查 MAC。<b>广播请求（谁有这个 IP？）、单播应答</b>；结果缓存 ARP 表。跨网段则对"默认网关 IP"做 ARP。</p>
<blockquote><b>DHCP：</b>自动获取 IP/掩码/网关/DNS。<b>UDP</b> 67/68 端口；流程四步：<b>Discover（广播）→ Offer → Request（广播）→ ACK</b>。可跨网段（DHCP 中继代理）。</blockquote>
<p><b>ICMP：</b>封装在 IP 数据报中，用于差错报告和查询。常见差错包括目的不可达、时间超过、参数问题和重定向。通常不对 ICMP 差错报文再发送 ICMP 差错，也不对广播/组播数据报及非首片分片发送这类差错报告，具体例外以协议规则为准。<b>ping</b> 使用 ICMP 回显请求/应答；traceroute/tracert 的探测报文类型依实现而异，但都会利用 TTL/Hop Limit 逐步到期和返回信息来发现路径。</p>`],
['def', '要点',
`<p><b>① ARP 欺骗</b>原理级了解即可。</p>
<p><b>② traceroute：</b>发送 TTL=1,2,3… 的分组，每个路由器回 ICMP 超时，从而"画"出路径。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例（流程排序）主机 A 发分组给不同网段的 B，ARP 相关动作？</div>
<p>A 先 ARP 解析<b>默认网关</b>的 MAC（不是 B 的！），把分组发给网关，由网关逐跳转发。</p></div>`],
['warn', '易错点',
`<p>• ARP 是网络层协议（教材观点），用广播；DHCP 是应用层协议（基于 UDP）。</p>
<p>• ICMP 差错报告不包含"拥塞通告"。</p>`]
],
quiz: [
{id:'q1', q:'DHCP 协议基于的传输层协议与端口是？', opts:['TCP 67', 'UDP 67/68', 'UDP 53', 'TCP 80'], ans:1, exp:'服务器 67、客户端 68，全 UDP。'},
{id:'q2', q:'ping 程序使用的协议是？', opts:['ICMP 回送请求/应答', 'ARP', 'TCP', 'IGMP'], ans:0, exp:'类型 8/0 的 ICMP 报文。'}
]

},

'4-4': {
title: '路由协议与 IPv6',
secs: [
['why', '为什么学这一节',
`<p>自治域内外两套路由体系：<b>RIP（距离向量）、OSPF（链路状态）、BGP（路径向量）</b>对比 + IPv6 过渡。三大协议对比表是必背项。</p>`],
['think', '直观理解',
`<p><b>自治系统内部的 IGP：</b></p>
<blockquote>• <b>RIP：</b>距离向量协议，度量为跳数，15 为最大可达跳数、16 表示不可达；RIPv2 通常通过 UDP 520 与邻居周期交换路由信息，并在变化时触发更新。<br>• <b>OSPF：</b>链路状态协议，在区域内可靠泛洪链路状态通告，各路由器据此建立链路状态数据库并运行 Dijkstra 算法；OSPF 直接承载在 IP 上，协议号为 89，并支持分层区域。</blockquote>
<p><b>自治系统之间：</b><b>BGP-4</b> 是路径向量协议，使用 TCP 179，与配置的 BGP 对等体交换可达前缀及 AS_PATH 等属性。选路受策略和多项属性影响，不等同于单纯寻找跳数最少路径。</p>
<p><b>IPv6：</b>地址为 128 bit，基本首部固定 40B，取消 IPv4 首部校验和。中间路由器不对 IPv6 分组分片；源主机可使用分片扩展首部。地址用冒号分隔的十六进制表示，连续全零字段可用一次 <code>::</code> 压缩；常见过渡方法有双协议栈和隧道。</p>`],
['def', '对比表（必背）',
`<table style="width:100%;border-collapse:collapse;font-size:12.5px">
<tr style="background:#f1f4f9"><th style="padding:4px;border:1px solid #e3e8f0"></th><th style="padding:4px;border:1px solid #e3e8f0">RIP</th><th style="padding:4px;border:1px solid #e3e8f0">OSPF</th><th style="padding:4px;border:1px solid #e3e8f0">BGP</th></tr>
<tr><td style="padding:4px;border:1px solid #e3e8f0">类型</td><td style="padding:4px;border:1px solid #e3e8f0">距离向量</td><td style="padding:4px;border:1px solid #e3e8f0">链路状态</td><td style="padding:4px;border:1px solid #e3e8f0">路径向量</td></tr>
<tr><td style="padding:4px;border:1px solid #e3e8f0">交换对象</td><td style="padding:4px;border:1px solid #e3e8f0">相邻路由器</td><td style="padding:4px;border:1px solid #e3e8f0">全网泛洪</td><td style="padding:4px;border:1px solid #e3e8f0">邻居 AS</td></tr>
<tr><td style="padding:4px;border:1px solid #e3e8f0">交换内容</td><td style="padding:4px;border:1px solid #e3e8f0">整张路由表</td><td style="padding:4px;border:1px solid #e3e8f0">本路由器相邻链路状态</td><td style="padding:4px;border:1px solid #e3e8f0">可达路径</td></tr>
<tr><td style="padding:4px;border:1px solid #e3e8f0">承载</td><td style="padding:4px;border:1px solid #e3e8f0">UDP</td><td style="padding:4px;border:1px solid #e3e8f0">IP</td><td style="padding:4px;border:1px solid #e3e8f0">TCP</td></tr>
</table>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例（辨析）"OSPF 使用 UDP 传送报文"对吗？</div>
<p><b>错</b>——OSPF 报文直接封装在 IP 数据报中（协议号 89）；用 UDP 的是 RIP（520）与 BGP 用 TCP（179）。</p></div>`],
['warn', '易错点',
`<p>• RIP 最大跳数 15（16=不可达）；OSPF 无跳数限制。</p>
<p>• IPv6 地址 128 位但冒号缩写规则："::"只能出现一次。</p>
<p>• BGP 找"能到且符合策略"的路由，不是最短路。</p>`]
],
quiz: [
{id:'q1', q:'链路状态路由协议的代表性算法是？', opts:['距离向量', 'Dijkstra 最短路径', '路径向量', '洪泛'], ans:1, exp:'每结点掌握全图后跑 Dijkstra。'}
]

}

}
};
