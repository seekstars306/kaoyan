/* ===== 课程大纲（三门课完整章节树） =====
 * 课时标记：shuyi:true = 数一扩展内容（数二不考），可全局隐藏
 */
window.CURRICULUM = {

  math: {
    name: '数学二', icon: '∑', color: '#3b82f6',
    desc: '高等数学 + 线性代数（数二考纲）。零基础从预备篇开始；「数一扩展」章节为选学内容，可在设置中隐藏。',
    parts: [
      { id:'gds', name:'高等数学', chapters:[
        { id:'ch00', title:'第0章 预备篇 · 高中衔接', lessons:[
          { id:'0-1', title:'实数与代数式：运算规则与乘法公式' },
          { id:'0-2', title:'函数的概念与基本性质' },
          { id:'0-3', title:'幂函数、指数函数、对数函数' },
          { id:'0-4', title:'三角函数与反三角函数' },
          { id:'0-5', title:'不等式、集合与映射' }
        ]},
        { id:'ch01', title:'第1章 函数 极限 连续', lessons:[
          { id:'1-1', title:'函数：复合、反函数与初等函数' },
          { id:'1-2', title:'数列的极限' },
          { id:'1-3', title:'函数极限与左右极限' },
          { id:'1-4', title:'无穷小与无穷大' },
          { id:'1-5', title:'极限存在准则与两个重要极限' },
          { id:'1-6', title:'无穷小的比较与等价替换' },
          { id:'1-7', title:'函数的连续性与间断点' },
          { id:'1-8', title:'闭区间上连续函数的性质' }
        ]},
        { id:'ch02', title:'第2章 导数与微分', lessons:[
          { id:'2-1', title:'导数的概念与几何意义' },
          { id:'2-2', title:'求导法则与基本求导公式' },
          { id:'2-3', title:'复合、隐函数与参数方程求导' },
          { id:'2-4', title:'高阶导数' },
          { id:'2-5', title:'微分的概念与近似计算' }
        ]},
        { id:'ch03', title:'第3章 微分中值定理与导数的应用', lessons:[
          { id:'3-1', title:'罗尔定理与拉格朗日中值定理' },
          { id:'3-2', title:'柯西中值定理与洛必达法则' },
          { id:'3-3', title:'泰勒公式与麦克劳林展开' },
          { id:'3-4', title:'函数的单调性与极值' },
          { id:'3-5', title:'凹凸性、拐点与渐近线' },
          { id:'3-6', title:'最值、方程的根与不等式证明' }
        ]},
        { id:'ch04', title:'第4章 不定积分', lessons:[
          { id:'4-1', title:'不定积分的概念与基本积分表' },
          { id:'4-2', title:'第一类换元法（凑微分）' },
          { id:'4-3', title:'第二类换元法与分部积分法' },
          { id:'4-4', title:'有理函数的积分' }
        ]},
        { id:'ch05', title:'第5章 定积分 · 反常积分 · 应用', lessons:[
          { id:'5-1', title:'定积分的概念与性质' },
          { id:'5-2', title:'变限积分与牛顿—莱布尼茨公式' },
          { id:'5-3', title:'定积分的换元与分部积分法' },
          { id:'5-4', title:'反常积分' },
          { id:'5-5', title:'定积分的应用：面积、旋转体、弧长' }
        ]},
        { id:'ch06', title:'第6章 多元函数微分学', lessons:[
          { id:'6-1', title:'二元函数的极限与连续' },
          { id:'6-2', title:'偏导数' },
          { id:'6-3', title:'全微分' },
          { id:'6-4', title:'复合函数与隐函数求导' },
          { id:'6-5', title:'多元函数的极值与条件极值' }
        ]},
        { id:'ch07', title:'第7章 二重积分', lessons:[
          { id:'7-1', title:'二重积分的概念与性质' },
          { id:'7-2', title:'直角坐标下的计算' },
          { id:'7-3', title:'极坐标下的计算' },
          { id:'7-4', title:'交换积分次序与对称性技巧' }
        ]},
        { id:'ch08', title:'第8章 常微分方程', lessons:[
          { id:'8-1', title:'基本概念与可分离变量方程' },
          { id:'8-2', title:'齐次方程与一阶线性方程' },
          { id:'8-3', title:'可降阶的高阶方程' },
          { id:'8-4', title:'二阶常系数线性微分方程' }
        ]}
      ]},
      { id:'la', name:'线性代数', chapters:[
        { id:'lach01', title:'第1章 行列式', lessons:[
          { id:'1-1', title:'行列式的概念与二、三阶计算' },
          { id:'1-2', title:'行列式的六大性质' },
          { id:'1-3', title:'按行(列)展开与克拉默法则' }
        ]},
        { id:'lach02', title:'第2章 矩阵', lessons:[
          { id:'2-1', title:'矩阵的概念与运算' },
          { id:'2-2', title:'逆矩阵' },
          { id:'2-3', title:'初等变换与初等矩阵' },
          { id:'2-4', title:'矩阵的秩' }
        ]},
        { id:'lach03', title:'第3章 向量组', lessons:[
          { id:'3-1', title:'线性组合与线性表示' },
          { id:'3-2', title:'向量组的线性相关性' },
          { id:'3-3', title:'极大无关组与向量组的秩' },
          { id:'3-4', title:'向量空间', shuyi:true }
        ]},
        { id:'lach04', title:'第4章 线性方程组', lessons:[
          { id:'4-1', title:'齐次方程组与基础解系' },
          { id:'4-2', title:'非齐次方程组的解的结构' },
          { id:'4-3', title:'公共解与同解问题' }
        ]},
        { id:'lach05', title:'第5章 特征值与特征向量', lessons:[
          { id:'5-1', title:'特征值与特征向量的概念和计算' },
          { id:'5-2', title:'相似与对角化' },
          { id:'5-3', title:'实对称矩阵与正交对角化' }
        ]},
        { id:'lach06', title:'第6章 二次型', lessons:[
          { id:'6-1', title:'二次型及其标准形' },
          { id:'6-2', title:'正定二次型' }
        ]}
      ]},
      { id:'sy', name:'数一扩展（选学）', shuyi:true, chapters:[
        { id:'sych01', title:'扩1 向量代数与空间解析几何', shuyi:true, lessons:[
          { id:'1-1', title:'空间向量运算与坐标系', shuyi:true },
          { id:'1-2', title:'平面方程与直线方程', shuyi:true },
          { id:'1-3', title:'旋转面、柱面与二次曲面', shuyi:true }
        ]},
        { id:'sych02', title:'扩2 三重积分与曲线曲面积分', shuyi:true, lessons:[
          { id:'2-1', title:'三重积分', shuyi:true },
          { id:'2-2', title:'对弧长与对坐标的曲线积分', shuyi:true },
          { id:'2-3', title:'格林公式', shuyi:true },
          { id:'2-4', title:'曲面积分与高斯、斯托克斯公式', shuyi:true }
        ]},
        { id:'sych03', title:'扩3 无穷级数', shuyi:true, lessons:[
          { id:'3-1', title:'常数项级数的概念与性质', shuyi:true },
          { id:'3-2', title:'正项级数的审敛法', shuyi:true },
          { id:'3-3', title:'交错级数与绝对收敛、条件收敛', shuyi:true },
          { id:'3-4', title:'幂级数与函数展开成幂级数', shuyi:true },
          { id:'3-5', title:'傅里叶级数', shuyi:true }
        ]},
        { id:'sych04', title:'扩4 概率论与数理统计', shuyi:true, lessons:[
          { id:'4-1', title:'随机事件与概率', shuyi:true },
          { id:'4-2', title:'一维随机变量及其分布', shuyi:true },
          { id:'4-3', title:'二维随机变量及其分布', shuyi:true },
          { id:'4-4', title:'期望、方差、协方差与相关系数', shuyi:true },
          { id:'4-5', title:'大数定律与中心极限定理', shuyi:true },
          { id:'4-6', title:'数理统计基础：三大分布与抽样分布', shuyi:true },
          { id:'4-7', title:'参数估计：矩估计与最大似然估计', shuyi:true }
        ]}
      ]}
    ]
  },

  english: {
    name: '英语二', icon: 'A', color: '#10b981',
    desc: '为英语零基础考生设计：从 26 个字母和音标起步 → 词汇 → 语法长难句 → 五大题型。配合「背单词」SRS 系统与 AI 助手使用。',
    parts: [
      { id:'p0', name:'零基础起步', chapters:[
        { id:'m0', title:'模块0 从字母到句子', lessons:[
          { id:'0-1', title:'26 个字母与书写规范' },
          { id:'0-2', title:'国际音标（上）：20 个元音' },
          { id:'0-3', title:'国际音标（下）：28 个辅音与拼读' },
          { id:'0-4', title:'自然拼读与音节：见词能读入门' },
          { id:'0-5', title:'英汉思维差异：英语句子怎么搭' },
          { id:'0-6', title:'入门高频词 500：使用说明（词库入口）', words:true }
        ]}
      ]},
      { id:'p1', name:'词汇基础', chapters:[
        { id:'m1', title:'模块1 词汇基础', lessons:[
          { id:'1-1', title:'词根词缀：背词的总开关' },
          { id:'1-2', title:'30 个高频词根精讲' },
          { id:'1-3', title:'高频前缀与后缀精讲' },
          { id:'1-4', title:'熟词僻义：阅读的隐形陷阱' },
          { id:'1-5', title:'背词系统使用指南（SRS + AI）', words:true }
        ]}
      ]},
      { id:'p2', name:'语法与长难句', chapters:[
        { id:'m2', title:'模块2 语法与长难句', lessons:[
          { id:'2-1', title:'句子成分：主谓宾定状补表' },
          { id:'2-2', title:'五大基本句型' },
          { id:'2-3', title:'时态与语态' },
          { id:'2-4', title:'名词性从句' },
          { id:'2-5', title:'定语从句' },
          { id:'2-6', title:'状语从句' },
          { id:'2-7', title:'非谓语动词' },
          { id:'2-8', title:'倒装、强调、省略与分隔结构' },
          { id:'2-9', title:'长难句拆解五步法实战' }
        ]}
      ]},
      { id:'p3', name:'阅读理解', chapters:[
        { id:'m3', title:'模块3 阅读理解', lessons:[
          { id:'3-1', title:'英二阅读全貌与做题总流程' },
          { id:'3-2', title:'细节题：定位是王道' },
          { id:'3-3', title:'推理题：推一步，别推三步' },
          { id:'3-4', title:'主旨题：抓首尾与高频词' },
          { id:'3-5', title:'词义句义题：看上下文，别背字典' },
          { id:'3-6', title:'态度题：抓形容词与副词' },
          { id:'3-7', title:'真题精读方法：一篇吃透胜过十篇泛读' }
        ]}
      ]},
      { id:'p4', name:'新题型', chapters:[
        { id:'m4', title:'模块4 新题型', lessons:[
          { id:'4-1', title:'多项对应题：关键词回文定位' },
          { id:'4-2', title:'小标题对应题：段落大意概括' }
        ]}
      ]},
      { id:'p5', name:'完形填空', chapters:[
        { id:'m5', title:'模块5 完形填空', lessons:[
          { id:'5-1', title:'完形的逻辑解题法：先通读，再看选项' }
        ]}
      ]},
      { id:'p6', name:'翻译', chapters:[
        { id:'m6', title:'模块6 翻译（英译汉）', lessons:[
          { id:'6-1', title:'基本方法：拆分与重组' },
          { id:'6-2', title:'难点句型处理：定从、被动、指代' },
          { id:'6-3', title:'评分标准与真题演练', ai:'translate' }
        ]}
      ]},
      { id:'p7', name:'写作', chapters:[
        { id:'m7', title:'模块7 写作', lessons:[
          { id:'7-1', title:'小作文：书信类应用文框架' },
          { id:'7-2', title:'小作文：通知、备忘录与邮件' },
          { id:'7-3', title:'大作文：图表作文三段式' },
          { id:'7-4', title:'句型升级与模板个性化', ai:'essay' }
        ]}
      ]}
    ]
  },

  cs408: {
    name: '计算机基础 408', icon: '⌨', color: '#8b5cf6',
    desc: '数据结构 + 计算机组成原理 + 操作系统 + 计算机网络。数据结构前附 C 语言预备章（408 不直接考 C 语法，但读不懂代码学不了数据结构）。',
    parts: [
      { id:'ds', name:'数据结构', chapters:[
        { id:'ds/ch00', title:'第0章 C 语言与算法预备', lessons:[
          { id:'0-1', title:'C 语言速成（一）：变量、数组与函数' },
          { id:'0-2', title:'C 语言速成（二）：指针与结构体' },
          { id:'0-3', title:'算法与时间复杂度分析' }
        ]},
        { id:'ds/ch01', title:'第1章 线性表', lessons:[
          { id:'1-1', title:'顺序表' },
          { id:'1-2', title:'单链表' },
          { id:'1-3', title:'双链表与循环链表' }
        ]},
        { id:'ds/ch02', title:'第2章 栈、队列和数组', lessons:[
          { id:'2-1', title:'栈' },
          { id:'2-2', title:'队列' },
          { id:'2-3', title:'数组与特殊矩阵的压缩存储' }
        ]},
        { id:'ds/ch03', title:'第3章 串', lessons:[
          { id:'3-1', title:'串与模式匹配（朴素算法与 KMP）' }
        ]},
        { id:'ds/ch04', title:'第4章 树与二叉树', lessons:[
          { id:'4-1', title:'树与二叉树的概念、性质与存储' },
          { id:'4-2', title:'二叉树的遍历' },
          { id:'4-3', title:'线索二叉树' },
          { id:'4-4', title:'树、森林与二叉树的转换' },
          { id:'4-5', title:'哈夫曼树与哈夫曼编码' }
        ]},
        { id:'ds/ch05', title:'第5章 图', lessons:[
          { id:'5-1', title:'图的概念与存储结构' },
          { id:'5-2', title:'图的遍历：DFS 与 BFS' },
          { id:'5-3', title:'最小生成树：Prim 与 Kruskal' },
          { id:'5-4', title:'最短路径：Dijkstra 与 Floyd' },
          { id:'5-5', title:'拓扑排序与关键路径' }
        ]},
        { id:'ds/ch06', title:'第6章 查找', lessons:[
          { id:'6-1', title:'顺序、折半与分块查找' },
          { id:'6-2', title:'二叉排序树与平衡二叉树' },
          { id:'6-3', title:'B 树与 B+ 树' },
          { id:'6-4', title:'散列表（哈希表）' }
        ]},
        { id:'ds/ch07', title:'第7章 排序', lessons:[
          { id:'7-1', title:'插入排序：直接插入与希尔' },
          { id:'7-2', title:'交换排序：冒泡与快速排序' },
          { id:'7-3', title:'选择排序：简单选择与堆排序' },
          { id:'7-4', title:'归并排序与基数排序' },
          { id:'7-5', title:'八大排序对比总结' }
        ]}
      ]},
      { id:'co', name:'计算机组成原理', chapters:[
        { id:'co/ch01', title:'第1章 计算机系统概述', lessons:[
          { id:'1-1', title:'计算机发展历程与层次结构' },
          { id:'1-2', title:'计算机的基本组成（冯·诺依曼结构）' },
          { id:'1-3', title:'计算机的性能指标' }
        ]},
        { id:'co/ch02', title:'第2章 数据的表示和运算', lessons:[
          { id:'2-1', title:'进位计数制及其相互转换' },
          { id:'2-2', title:'定点数的表示与运算' },
          { id:'2-3', title:'浮点数的表示与运算（IEEE 754）' },
          { id:'2-4', title:'算术逻辑单元 ALU 与移位运算' }
        ]},
        { id:'co/ch03', title:'第3章 存储系统', lessons:[
          { id:'3-1', title:'主存储器：RAM 与 ROM' },
          { id:'3-2', title:'高速缓冲存储器 Cache' },
          { id:'3-3', title:'虚拟存储器' }
        ]},
        { id:'co/ch04', title:'第4章 指令系统', lessons:[
          { id:'4-1', title:'指令格式与寻址方式' },
          { id:'4-2', title:'CISC 与 RISC 的对比' }
        ]},
        { id:'co/ch05', title:'第5章 中央处理器', lessons:[
          { id:'5-1', title:'CPU 的功能与基本结构' },
          { id:'5-2', title:'指令执行过程与数据通路' },
          { id:'5-3', title:'控制器：硬布线与微程序' },
          { id:'5-4', title:'指令流水线' }
        ]},
        { id:'co/ch06', title:'第6章 总线', lessons:[
          { id:'6-1', title:'总线概述与仲裁方式' },
          { id:'6-2', title:'总线操作与定时' }
        ]},
        { id:'co/ch07', title:'第7章 输入输出系统', lessons:[
          { id:'7-1', title:'I/O 接口与编址方式' },
          { id:'7-2', title:'中断系统' },
          { id:'7-3', title:'DMA 方式' }
        ]}
      ]},
      { id:'os', name:'操作系统', chapters:[
        { id:'os/ch01', title:'第1章 操作系统概述', lessons:[
          { id:'1-1', title:'操作系统的概念、特征与功能' },
          { id:'1-2', title:'操作系统的发展与分类' },
          { id:'1-3', title:'操作系统的运行环境（内核态与用户态）' }
        ]},
        { id:'os/ch02', title:'第2章 进程与线程', lessons:[
          { id:'2-1', title:'进程的概念、组成与状态转换' },
          { id:'2-2', title:'进程控制与进程通信' },
          { id:'2-3', title:'处理机调度与调度算法' },
          { id:'2-4', title:'同步与互斥：信号量机制' },
          { id:'2-5', title:'死锁：预防、避免与检测' }
        ]},
        { id:'os/ch03', title:'第3章 内存管理', lessons:[
          { id:'3-1', title:'内存管理概述与连续分配方式' },
          { id:'3-2', title:'分页与分段存储管理' },
          { id:'3-3', title:'虚拟内存与页面置换算法' }
        ]},
        { id:'os/ch04', title:'第4章 文件管理', lessons:[
          { id:'4-1', title:'文件与目录：逻辑结构与 FCB' },
          { id:'4-2', title:'文件物理结构与磁盘管理' }
        ]},
        { id:'os/ch05', title:'第5章 输入输出管理', lessons:[
          { id:'5-1', title:'I/O 管理概述与 I/O 核心子系统' },
          { id:'5-2', title:'磁盘与磁盘调度算法' }
        ]}
      ]},
      { id:'net', name:'计算机网络', chapters:[
        { id:'net/ch01', title:'第1章 计算机网络体系结构', lessons:[
          { id:'1-1', title:'网络的概念、组成与分类' },
          { id:'1-2', title:'性能指标与分层模型（OSI / TCP-IP）' }
        ]},
        { id:'net/ch02', title:'第2章 物理层', lessons:[
          { id:'2-1', title:'通信基础：码元、波特与带宽' },
          { id:'2-2', title:'编码与调制、传输介质与设备' }
        ]},
        { id:'net/ch03', title:'第3章 数据链路层', lessons:[
          { id:'3-1', title:'封装成帧与差错控制' },
          { id:'3-2', title:'流量控制与可靠传输：停等、回退N、选择重传' },
          { id:'3-3', title:'介质访问控制：CSMA/CD 与 CSMA/CA' },
          { id:'3-4', title:'局域网：以太网与交换机' }
        ]},
        { id:'net/ch04', title:'第4章 网络层', lessons:[
          { id:'4-1', title:'IPv4 协议与 IP 地址' },
          { id:'4-2', title:'子网划分、路由聚合与 NAT' },
          { id:'4-3', title:'ARP、DHCP 与 ICMP' },
          { id:'4-4', title:'路由协议与 IPv6' }
        ]},
        { id:'net/ch05', title:'第5章 传输层', lessons:[
          { id:'5-1', title:'UDP 与 TCP：特点与首部格式' },
          { id:'5-2', title:'TCP 连接管理：三次握手与四次挥手' },
          { id:'5-3', title:'TCP 可靠传输、流量控制与拥塞控制' }
        ]},
        { id:'net/ch06', title:'第6章 应用层', lessons:[
          { id:'6-1', title:'DNS 与 FTP' },
          { id:'6-2', title:'电子邮件：SMTP、POP3 与 IMAP' },
          { id:'6-3', title:'WWW 与 HTTP' }
        ]}
      ]}
    ]
  }
};
