/* ===== 认证模块：本地账号体系 =====
 * - 账号数据存 localStorage（kaoyan.users），密码加盐 SHA-256 哈希存储
 * - 内置管理员：admin / kaoyan2028（首次登录后请修改）
 * - 注册默认关闭：登录页显示"注册暂未开放"，管理员可在「设置 → 用户管理」开放或直接建号
 * - 诚实声明：纯本地应用的登录是使用门槛而非安全边界，设备可物理接触者可读本地存储
 */
window.Auth = (function(){
  var UKEY = 'kaoyan.users', SKEY = 'kaoyan.session', SYSKEY = 'kaoyan.sys';
  var DEFAULT_ADMIN = 'admin', DEFAULT_PWD = 'kaoyan2028';

  /* ---- 同步 SHA-256（纯 JS，UTF-8 安全，兼容 file:// 无 crypto.subtle 场景） ---- */
  function sha256Raw(ascii) {
    function rightRotate(value, amount) { return (value >>> amount) | (value << (32 - amount)); }
    var mathPow = Math.pow, maxWord = mathPow(2, 32), result = '';
    var words = [], asciiBitLength = ascii.length * 8;
    var hash = sha256Raw.h = sha256Raw.h || [];
    var k = sha256Raw.k = sha256Raw.k || [];
    var primeCounter = k.length, i, j, isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) isComposite[i] = candidate;
        hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }
    ascii += '\x80';
    while (ascii.length % 64 - 56) ascii += '\x00';
    for (i = 0; i < ascii.length; i++) {
      j = ascii.charCodeAt(i);
      if (j >> 8) return '';
      words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words.length] = ((asciiBitLength / maxWord) | 0);
    words[words.length] = (asciiBitLength);
    for (j = 0; j < words.length;) {
      var w = words.slice(j, j += 16), oldHash = hash;
      hash = hash.slice(0, 8);
      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15], w2 = w[i - 2];
        var a = hash[0], e = hash[4];
        var temp1 = hash[7]
          + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
          + ((e & hash[5]) ^ ((~e) & hash[6]))
          + k[i]
          + (w[i] = (i < 16) ? w[i] : (
            w[i - 16]
            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
            + w[i - 7]
            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
          ) | 0);
        var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
          + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
      }
      for (i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
    }
    for (i = 0; i < 8; i++)
      for (j = 3; j + 1; j--) {
        var b = (hash[i] >> (j * 8)) & 255;
        result += ((b < 16) ? '0' : '') + b.toString(16);
      }
    return result;
  }
  function hash(s){ return sha256Raw(unescape(encodeURIComponent(s))); }
  function rand(){ var s = ''; for (var i = 0; i < 16; i++) s += '0123456789abcdef'[Math.floor(Math.random()*16)]; return s; }

  /* ---- 存储 ---- */
  function load(k, d){ try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch(e){ return d; } }
  function save(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
  function users(){ return load(UKEY, []); }
  function saveUsers(u){ save(UKEY, u); }
  function sys(){ return load(SYSKEY, { allowRegister:false, adminDefault:true }); }
  function saveSys(s){ save(SYSKEY, s); }
  function find(name, arr){ var u = arr || users(); for (var i = 0; i < u.length; i++) if (u[i].username === name) return u[i]; return null; }
  function validName(n){ return /^[A-Za-z0-9_\u4e00-\u9fa5]{2,20}$/.test(n); }
  function verify(u, pwd){ return u.hash === hash(u.salt + pwd); }

  /* ---- 账号操作 ---- */
  function ensureSeed(){
    if (users().length === 0) {
      var salt = rand();
      saveUsers([{ username:DEFAULT_ADMIN, salt:salt, hash:hash(salt + DEFAULT_PWD), role:'admin', name:'管理员', createdAt:Date.now(), lastLogin:0 }]);
      saveSys(sys());
    }
  }
  function login(name, pwd){
    name = (name || '').trim();
    var arr = users(), u = find(name, arr);
    if (!u) return { ok:false, msg:'账号不存在' };
    if (!verify(u, pwd)) return { ok:false, msg:'密码错误' };
    u.lastLogin = Date.now(); saveUsers(arr);
    return { ok:true, user:u };
  }
  function create(name, pwd, pwd2, role){
    name = (name || '').trim();
    if (!validName(name)) return { ok:false, msg:'用户名需 2~20 位（中文/字母/数字/下划线）' };
    if (!pwd || pwd.length < 6) return { ok:false, msg:'密码至少 6 位' };
    if (pwd2 != null && pwd !== pwd2) return { ok:false, msg:'两次输入的密码不一致' };
    var arr = users();
    if (find(name, arr)) return { ok:false, msg:'该用户名已存在' };
    var salt = rand();
    arr.push({ username:name, salt:salt, hash:hash(salt + pwd), role:role || 'user', name:name, createdAt:Date.now(), lastLogin:0 });
    saveUsers(arr);
    return { ok:true };
  }
  function register(name, pwd, pwd2){
    if (!sys().allowRegister) return { ok:false, msg:'注册暂未开放，请使用管理员分配的账号登录' };
    return create(name, pwd, pwd2, 'user');
  }
  function changePwd(name, oldPwd, newPwd, newPwd2){
    var arr = users(), u = find(name, arr);
    if (!u) return { ok:false, msg:'账号不存在' };
    if (!verify(u, oldPwd)) return { ok:false, msg:'旧密码不正确' };
    if (!newPwd || newPwd.length < 6) return { ok:false, msg:'新密码至少 6 位' };
    if (newPwd2 != null && newPwd !== newPwd2) return { ok:false, msg:'两次输入的新密码不一致' };
    u.salt = rand(); u.hash = hash(u.salt + newPwd); saveUsers(arr);
    if (u.username === 'admin') { var s = sys(); s.adminDefault = false; saveSys(s); }
    return { ok:true };
  }
  function adminResetPwd(name, newPwd){
    var arr = users(), u = find(name, arr);
    if (!u) return { ok:false, msg:'用户不存在' };
    if (!newPwd || newPwd.length < 6) return { ok:false, msg:'新密码至少 6 位' };
    u.salt = rand(); u.hash = hash(u.salt + newPwd); saveUsers(arr);
    return { ok:true };
  }
  function delUser(name, current){
    if (name === current) return { ok:false, msg:'不能删除当前登录的账号' };
    if (name === DEFAULT_ADMIN) return { ok:false, msg:'内置管理员不可删除' };
    saveUsers(users().filter(function(x){ return x.username !== name; }));
    return { ok:true };
  }

  /* ---- 会话 ---- */
  function session(){ var s = load(SKEY, null); return (s && s.exp > Date.now()) ? s : null; }
  function user(){ var s = session(); return s ? s.user : null; }
  function role(){ var s = session(); return s ? s.role : 'guest'; }
  function startSession(u, remember){
    var days = remember ? 30 : 1;
    save(SKEY, { user:u.username, role:u.role, name:u.name || u.username, exp:Date.now() + days*86400000 });
  }
  function logout(){ localStorage.removeItem(SKEY); }

  /* ---- 登录 / 注册页渲染 ---- */
  function esc(s){ return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function $(sel){ return document.querySelector(sel); }
  function renderLogin(root, onLogin){
    var s = sys();
    root.innerHTML = '<div class="auth-wrap"><div class="auth-card">'
      + '<div class="auth-brand">🎯 考研上岸 <span class="brand-sub">2028</span></div>'
      + '<div class="auth-sub">英语二 · 数学二 · 408 学习平台</div>'
      + '<div class="auth-tabs"><button id="aTabL" class="on">登 录</button><button id="aTabR">注 册</button></div>'
      + '<div id="aLogin">'
      + '<label class="fld">账号</label><input type="text" id="aUser" autocomplete="username" placeholder="用户名">'
      + '<label class="fld">密码</label><input type="password" id="aPwd" autocomplete="current-password" placeholder="密码">'
      + '<label class="chk"><input type="checkbox" id="aRemember" checked> 记住我（30 天内免登录）</label>'
      + '<div class="auth-err" id="aErr"></div>'
      + '<button class="btn btn-primary auth-btn" id="aGo">登 录</button>'
      + (s.adminDefault ? '<div class="auth-hint">首次使用：内置管理员账号 <b>admin</b>，初始密码 <b>kaoyan2028</b>。登录后请在「设置 → 账号」中修改密码。</div>' : '')
      + '</div>'
      + '<div id="aReg" style="display:none">'
      + (s.allowRegister
        ? '<label class="fld">用户名</label><input type="text" id="rUser" placeholder="2~20 位：中文/字母/数字/下划线">'
          + '<label class="fld">密码</label><input type="password" id="rPwd" placeholder="至少 6 位">'
          + '<label class="fld">确认密码</label><input type="password" id="rPwd2">'
          + '<div class="auth-err" id="rErr"></div>'
          + '<button class="btn btn-primary auth-btn" id="rGo">注册并登录</button>'
        : '<div class="auth-closed">🔒 注册暂未开放</div>'
          + '<div class="auth-hint">本平台账号采用邀请制：新账号由管理员在「设置 → 用户管理」中创建，或由管理员临时开放注册。已账号者请返回登录。</div>'
          + '<button class="btn auth-btn" id="rBack">返回登录</button>')
      + '</div>'
      + '</div><div class="auth-foot">纯离线学习平台 · 学习数据保存在本机浏览器 · 按账号相互隔离</div></div>';
    var L = $('#aTabL'), R = $('#aTabR');
    function showLogin(){ $('#aLogin').style.display = ''; $('#aReg').style.display = 'none'; L.classList.add('on'); R.classList.remove('on'); }
    function showReg(){ $('#aLogin').style.display = 'none'; $('#aReg').style.display = ''; L.classList.remove('on'); R.classList.add('on'); }
    L.onclick = showLogin; R.onclick = showReg;
    var back = $('#rBack'); if (back) back.onclick = showLogin;
    function doLogin(){
      var r = login($('#aUser').value.trim(), $('#aPwd').value);
      if (!r.ok) { $('#aErr').textContent = r.msg; return; }
      startSession(r.user, $('#aRemember').checked);
      onLogin();
    }
    $('#aGo').onclick = doLogin;
    $('#aUser').addEventListener('keydown', function(e){ if (e.key === 'Enter') $('#aPwd').focus(); });
    $('#aPwd').addEventListener('keydown', function(e){ if (e.key === 'Enter') doLogin(); });
    var go = $('#rGo');
    if (go) go.onclick = function(){
      var name = $('#rUser').value.trim();
      var r = register(name, $('#rPwd').value, $('#rPwd2').value);
      if (!r.ok) { $('#rErr').textContent = r.msg; return; }
      startSession(find(name), false);
      onLogin();
    };
    setTimeout(function(){ var a = $('#aUser'); if (a) a.focus(); });
  }

  return { ensureSeed:ensureSeed, login:login, register:register, create:create, changePwd:changePwd, find:find,
    adminResetPwd:adminResetPwd, delUser:delUser, users:users, sys:sys, saveSys:saveSys,
    session:session, user:user, role:role, startSession:startSession, logout:logout,
    renderLogin:renderLogin, hash:hash };
})();
