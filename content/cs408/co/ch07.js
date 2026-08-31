window.CONTENT = window.CONTENT || {};
window.CONTENT['cs408/co/ch07'] = {

lessons: {

'7-1': {
title: 'I/O 接口与编址方式',
secs: [
['why', '为什么学这一节',
`<p>I/O 接口是 CPU 与外设的"翻译官+缓冲区"。考点：<b>I/O 端口两种编址方式（统一/独立）</b>、接口的功能与结构（数据/状态/控制端口）。</p>`],
['think', '直观理解',
`<p><b>接口三大寄存器：</b>数据端口（DBR）、状态端口（忙/就绪）、控制端口（命令）——端口也有地址，CPU 按地址访问。</p>
<blockquote><b>统一编址（存储器映射）：</b>I/O 端口占用内存地址空间，用访存指令访问——方便但占内存空间；<b>独立编址：</b>专用 I/O 指令（IN/OUT）+ 独立地址空间——不占内存但需专门指令与控制线。</blockquote>`],
['def', '要点',
`<p><b>① 接口功能：</b>选址、传送命令、状态反映、数据缓冲、电平/格式转换。</p>
<p><b>② 按数据传送方式分类：</b>并行接口/串行接口；按时序：同步/异步。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例（辨析）统一编址的优点是？</div>
<p>无需专用 I/O 指令，访存指令即可操作端口、且端口有丰富的寻址方式——代价是侵占内存地址空间。</p></div>`],
['warn', '易错点',
`<p>• 独立编址的地址空间与内存地址可以<b>重叠</b>（不同空间），靠指令类型区分。</p>
<p>• 状态端口通常只读，控制端口只写。</p>`]
],
quiz: [
{id:'q1', q:'采用独立编址（专用 I/O 指令）的方式，地址总线上的地址属于？', opts:['统一内存空间', '独立的 I/O 空间', '两者混用', '仅外设内部'], ans:1, exp:'独立编址：I/O 地址空间独立，用 IN/OUT 访问。'}
]

},

'7-2': {
title: '中断系统',
secs: [
['why', '为什么学这一节',
`<p>中断是"CPU 被打断后的应急处理机制"，计组与 OS 的接壤核心。<b>中断处理流程、多重中断（中断嵌套）、屏蔽字</b>是大题标配。</p>`],
['think', '直观理解',
`<p><b>中断 = 打断当前工作去做更紧急的事，做完回来接着干。</b>断点（PC、PSW）自动保存是"回来接着干"的保证。</p>
<blockquote><b>中断处理全流程：</b>中断请求 → <b>中断判优</b> → <b>中断响应</b>（一条指令执行完毕后，关中断、保存断点、引出服务程序）→ 中断服务（保护现场→服务→恢复现场）→ 中断返回（iret 恢复 PC）。</blockquote>
<p><b>关键时点：响应中断一定在"指令执行周期结束之后"</b>（不允许指令执行到一半被打断，关中断期间除外）。</p>
<p><b>多重中断（嵌套）：</b>服务程序中开中断后，更高级中断可打断低级服务；<b>屏蔽字技术</b>动态调整响应后的处理优先级——"响应优先级"硬件固定，"处理优先级"屏蔽字可调。</p>
<p><b>中断隐指令：</b>不是指令，是硬件自动完成的操作（关中断、保存断点、引出入口）。</p>`],
['def', '计算与判断',
`<p><b>① 屏蔽字设计：</b>1 屏蔽自己及更低级。给 5 级中断改处理次序，写出各源屏蔽字——大题模板。</p>
<p><b>② 中断向量：</b>服务程序入口地址；<b>向量中断</b>由中断向量表找到入口。</p>
<p><b>③ 中断 vs 异常：</b>外中断（时钟、I/O，异步）与内异常（缺页、除零、溢出，同步）；<b>异常不可屏蔽且必须立即处理</b>。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例（嵌套判断）CPU 执行低级中断服务程序期间，出现同级与更高级请求，谁被响应？</div>
<p>同级：不响应（处理优先级相同不可嵌套自己）；更高级：开中断状态下<b>被响应</b>，形成两级嵌套。</p></div>`],
['warn', '易错点',
`<p>• "保存现场"（寄存器）由<b>服务程序（软件）</b>完成；"保存断点"（PC/PSW）由<b>中断隐指令（硬件）</b>完成——分工别混。</p>
<p>• 响应条件：允许中断（EINT=1）+ 有请求 + 一条指令执行完。</p>
<p>• DMA 与中断的关系在 7-3 辨析。</p>`]
],
quiz: [
{id:'q1', q:'CPU 响应中断的时间是？', opts:['任意时刻', '一条指令执行结束后', '每条指令取指前', '时钟中断到来时'], ans:1, exp:'指令周期边界响应，保证单条指令原子性。'},
{id:'q2', q:'中断隐指令完成的操作是？', opts:['保存通用寄存器', '关中断、保存断点、引出中断服务程序', '恢复现场', '执行中断服务'], ans:1, exp:'隐指令是硬件自动的"三件套"；保护现场是软件做的。'}
]

},

'7-3': {
title: 'DMA 方式',
secs: [
['why', '为什么学这一节',
`<p>高速外设大数据量传输的方案：<b>DMA 控制器接管总线，主存与外设直传，CPU 只在传送前（初始化）与后（结束处理）介入</b>。与程序查询、中断方式的三方对比是永恒考点。</p>`],
['think', '直观理解',
`<p><b>三种 I/O 方式对比：</b></p>
<blockquote>① <b>程序查询：</b>CPU 死等轮询——最慢最简单，CPU 与外设完全串行；<br>② <b>程序中断：</b>CPU 与外设<b>并行</b>，但每传一个数据都要打断一次 CPU（ overhead 大）；<br>③ <b>DMA：</b>数据传送由 DMA 控制器硬件完成，<b>CPU 不介入传送过程</b>，仅在结束时中断一次做善后——磁盘、网卡标配。</blockquote>
<p><b>DMA 传输数据的窃取方式：</b>停止 CPU 访存、周期挪用（窃取，最常用）、交替访问。DMA 结束时<b>向 CPU 发中断</b>请求善后（"DMA 完成也要中断"是判断题常客）。</p>
<p><b>DMA 控制器组成：</b>主存地址计数器、字计数器、数据缓冲、DMA 请求/响应触发器。</p>`],
['def', '对比表',
`<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr style="background:#f1f4f9"><th style="padding:4px;border:1px solid #e3e8f0">方式</th><th style="padding:4px;border:1px solid #e3e8f0">数据传(unit)</th><th style="padding:4px;border:1px solid #e3e8f0">CPU干预</th><th style="padding:4px;border:1px solid #e3e8f0">适用</th></tr>
<tr><td style="padding:4px;border:1px solid #e3e8f0">程序查询</td><td style="padding:4px;border:1px solid #e3e8f0">字</td><td style="padding:4px;border:1px solid #e3e8f0">全程等待</td><td style="padding:4px;border:1px solid #e3e8f0">低速设备</td></tr>
<tr><td style="padding:4px;border:1px solid #e3e8f0">中断</td><td style="padding:4px;border:1px solid #e3e8f0">字</td><td style="padding:4px;border:1px solid #e3e8f0">每数据中断一次</td><td style="padding:4px;border:1px solid #e3e8f0">中低速设备</td></tr>
<tr><td style="padding:4px;border:1px solid #e3e8f0">DMA</td><td style="padding:4px;border:1px solid #e3e8f0">数据块</td><td style="padding:4px;border:1px solid #e3e8f0">开始+结束</td><td style="padding:4px;border:1px solid #e3e8f0">高速块设备</td></tr>
</table>
<p><b>DMA 优先级高于中断请求</b>（丢失数据不可等）。</p>`],
['ex', '例题精讲',
`<div class="ex-box"><div class="ex-t">例（辨析）DMA 方式中 CPU 完全不参与数据传送，对吗？</div>
<p><b>对（传送阶段）</b>——DMA 控制器掌管总线完成主存↔外设直传；但初始化（预置地址、字数）与结束处理需 CPU 完成，且周期挪用会轻微影响 CPU 访存速度。</p></div>`],
['warn', '易错点',
`<p>• "DMA 结束不需中断"错误——传送完成必须中断通知 CPU 处理后事。</p>
<p>• 中断方式的传送仍走 CPU（外设→CPU 寄存器→主存），DMA 不经过 CPU。</p>
<p>• 周期挪用：DMA 挪用一个存取周期，CPU 慢一点点但不停摆。</p>`]
],
quiz: [
{id:'q1', q:'DMA 方式中数据的传送路径是？', opts:['外设→CPU→主存', '外设↔主存（不经过CPU）', '外设→Cache', 'CPU→CPU'], ans:1, exp:'DMA 控制器直接掌管总线完成主存与外设间的直传。'},
{id:'q2', q:'DMA 传送结束时向 CPU 发出？', opts:['复位信号', '中断请求（善后处理）', '总线授权', '时钟信号'], ans:1, exp:'数据传完由中断告知 CPU 做结束处理。'}
]

}

}
};
