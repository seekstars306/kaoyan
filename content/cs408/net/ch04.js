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
`<p><b>IPv4 首部 20 字节固定 + 可选：</b>版本(4b)、首部长度(4b,×4B)、总长度(16b,字节)、TTL(8b,每过一路由器减1,=0丢弃)、协议(6=TCP,17=UDP)、首部校验和、源/目的 IP。</p>
<blockquote><b>分类地址（旧）：</b>A 类 0+7位网(1~126)、B 类 10+14位(128~191)、C 类 110+21位(192~223)、D 组播 1110、E 保留。<br>
特殊地址：全 0 网络号+主机号=本机；127.x.x.x 环回；主机号全 0 = 网络地址；全 1 = 广播。<br>
<b>私有地址：</b>10/8、172.16/12、192.168/16——NAT 后才能上网。</blockquote>
<p><b>无分类 CIDR：</b>地址/前缀长度（如 192.168.1.0/24），斜线数 = 网络位；<b>地址掩码</b> = 前缀全 1。</p>`],
['def', '计算模板',
`<p><b>① 判断所属网络：</b>IP AND 掩码 = 网络地址。</p>
<p><b>② 主机数：</b>/n 网络主机位 32-n → 可用主机 = 2^(32-n) - 2（去掉网络地址与广播）。</p>
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
`<p><b>子网划分：</b>从主机位借 b 位做子网号 → 2^b 个子网（全0全1可用性看题目约定，现代 CIDR 全可用）。</p>
<blockquote><b>聚合（超网）：</b>把连续的多个前缀合并成一个更短前缀——<b>取公共前缀</b>。例：192.168.0.0/24 与 192.168.1.0/24 聚合 → 192.168.0.0/23。</blockquote>
<p><b>NAT 网络地址转换：</b>私网出口路由器把 (私有IP:端口) ↔ (公网IP:新端口) 映射（NAPT），出向改源、入向查表改目的——"一个公网 IP 带全家上网"的秘密。</p>`],
['def', '计算模板',
`<p><b>① 划分计算：</b>/24 需划 6 个子网 → 借 3 位（2³=8 ≥ 6）→ /27，每子网 30 台可用主机。</p>
<p><b>② 聚合判断：</b>给定 4 个 /24 求最小聚合：写成二进制找公共位。194.24.0.0~194.24.3.0 → 公共 22 位 → <b>194.24.0.0/22</b>。</p>
<p><b>③ 最长前缀匹配：</b>路由表多个匹配取前缀最长的——"更精确的优先"。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例（最长前缀匹配）目的 192.168.1.100，表中有 192.168.1.0/24 与 192.168.1.64/26，走哪条？</div>
<p>两者都匹配，/26 更长 → 走 <b>192.168.1.64/26</b>。</p></div>`],
['warn', '易错点',
`<p>• NAT 改写的是 IP+端口（传输层信息），是"破坏端到端"的争议点（选择题考过）。</p>
<p>• 聚合后路由器必须"公共前缀严格一致"，一位不同都不能聚合。</p>`]
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
<p><b>ICMP：</b>网络层差错与查询。差错报告：终点不可达、超时（TTL=0）、参数问题、改变路由；<b>不发送 ICMP 差错的四种情况</b>（对 ICMP 差错、对广播/组播、对分片非末片等）。应用：<b>ping（ICMP 回送请求/应答）</b>、traceroute（利用 TTL 超时）。</p>`],
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
`<p><b>IGP 内部网关协议（域内）：</b></p>
<blockquote>• <b>RIP：</b>距离向量，跳数 ≤15，与邻居<b>周期性交换整张路由表</b>，坏消息传得慢（计数到无穷）；应用层 UDP 520。<br>• <b>OSPF：</b>链路状态，向<b>全域泛洪</b>链路状态通告 LSA，每路由器算全图 Dijkstra；直接用 IP（协议号 89）；收敛快、支持分区（区域）。</blockquote>
<p><b>EGP 域间：</b><b>BGP-4</b>：路径向量策略路由（政治/经济因素），TCP 179 传送，找"较好"不找"最优"。</p>
<p><b>IPv6：</b>128 位地址、8 字节对齐首部固定 40B、取消首部校验和、<b>不允许分片</b>（源端分片）；地址冒号十六进制（零压缩 ::）；过渡：双协议栈 + 隧道。</p>`],
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
