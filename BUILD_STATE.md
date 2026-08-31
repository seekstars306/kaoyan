# 构建状态账本 —— 全部完成 ✅

## 项目总览（2026-08-30 交付）
- 平台：纯本地 SPA（file:// 直开），路由/进度/测验/错题本/SRS背词/倒计时计划/AI助手 全功能
- 内容：204 课时（全部与大纲对齐、无缺失）、480 道随堂题、126 词词库、2 个 AI 批改组件
- 公式：本地 KaTeX 离线渲染；代码块语法高亮；TTS 朗读

## 分批完成记录
1. ✅ 批次1 平台框架：index.html / main.css / app.js / ai.js / KaTeX 本地化 / curriculum / plan / 3 示范章节
2. ✅ 批次2 数学·高数 ch00~ch08：46课138题
3. ✅ 批次3 数学·线代 lach01~06 + 数一扩展 sych01~04：38课92题
4. ✅ 批次4 英语 m0~m7：37课79题 + 词库126词 + aiw×2
5. ✅ 批次5 408：数据结构 ds/ch00~07（29课71题）+ 计组 co/ch01~07（21课43题）
6. ✅ 批次6 408：OS os/ch01~05（15课26题）+ 计网 net/ch01~06（18课31题）

## 验证记录
- 全部 JS 通过 node --check；大纲 84+37+83=204 课时与内容完全对齐
- 运行时全量结构校验：无缺 secs/quiz、无非法答案索引、无控制字符转义损伤
- 浏览器实测：仪表盘/课程目录/数学课(KaTeX)/英语课(TTS+AI组件)/408课(表格+代码高亮)/背词页/计划页 全部正常

## 生成期踩过的坑（供后续扩展参考）
- 模板字符串内 LaTeX 必须 \\ 双反斜杠（\vec \tfrac 等单反斜杠会被 JS 转义）
- 对象字面量勿用中文冒号（q：''）
- aiw 段结构固定为 ['aiw', 标题, 'essay'|'translate', 数据]
- 一章一个内容文件，勿多章合写（拆分曾出错）
- app.js 修复记录：boot 误加载 manifest.js；aiWidget 参数下标 sec[3]/sec[4] → sec[2]/sec[3]

## 移动端适配（2026-08-30 追加）✅
- 设备自动判断：matchMedia(max-width:768px) + UA（Android/iPhone/Mobile/HarmonyOS），body 挂 mobile/desktop 类
- 手机版式：底部标签栏（首页/数学/英语/408/我的）+ "我的"聚合页(#/more) + 顶栏收起 + 卡片单列 + 安全区适配
- 宽表格自动包 tbl-wrap 横向滚动（≥5列 min-width 560px）；KaTeX 超宽公式横向滑动
- 390×844 实测：仪表盘/我的/知识点/背词/宽表格页全部正常，底部高亮正确；1280 桌面端无回归
- 修复：updateNav 路由映射漏 more 键导致底部高亮错误

## 账号体系（2026-08-30 追加）✅
- auth.js：加盐 SHA-256（纯 JS 同步实现，与 Node crypto 对拍通过）+ 用户/会话/系统配置存储 + 登录注册页渲染
- 内置管理员 admin/kaoyan2028（adminDefault 标记，改密后登录页提示消失）；注册默认关闭，管理员可开放或直接建号
- app.js：路由守卫（未登录渲染登录页，记录 pendingHash 登录后回跳）+ 数据层按用户隔离（kaoyan.u.<user>.<key>）+ 旧数据自动迁移 + 设置页账号/用户管理 + viewMore 退出登录 + 顶栏用户徽章 + 未登录隐藏 AI 按钮与底部导航
- 测试：33 项 Auth 单元测试全过（含 login/changePwd 的 save 别名 bug 修复）；浏览器实测登录页/设置页/徽章/移动端
- 修复：viewSettings 三元表达式后多余分号截断 html 拼接导致绑定 null 崩溃
- 提醒：__seed.html 测试文件已删除（相当于登录后门）

## 线上部署（2026-08-30）✅
- 目标：43.226.46.67:8001（Ubuntu 20.04）
- 方式：tar 打包 rsync 上传 → /opt/kaoyan → systemd 单元 kaoyan.service（python3 http.server 8001，开机自启）→ ufw allow 8001/tcp
- 验证：服务器本地 index/kaetex 200；公网 index/app.js/auth.js 200（90ms）；无头浏览器登录页渲染正常
- 待用户操作：首次登录后立即修改 admin 初始密码

## nginx 承载切换（2026-08-30）✅
- /etc/nginx/sites-available/kaoyan：listen 8001，root /opt/kaoyan，try_files SPA 回退，gzip，index no-cache，KaTeX 字体 30d immutable
- 补 /etc/nginx/mime.types woff2 → font/woff2（原为 octet-stream）
- kaoyan.service（python）已 stop+disable 作为回滚备选；nginx active，公网/127 双端 200，桌面+移动端登录页实测正常
- 服务器 sshd 对高频连接限流：运维命令合并单条执行
