import React, { useState, createContext, useContext } from 'react';
import { Calendar, Facebook, Instagram, AtSign, TrendingUp, Image, Sparkles, Clock, Plus, ChevronRight, Settings, Check, ExternalLink, Mail, LogIn } from 'lucide-react';

// 全局狀態管理
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [platforms, setPlatforms] = useState([
    { id: 'fb', name: 'Facebook', connected: false, followers: 0, icon: Facebook, color: 'bg-blue-500' },
    { id: 'ig', name: 'Instagram', connected: false, followers: 0, icon: Instagram, color: 'bg-pink-500' },
    { id: 'threads', name: 'Threads', connected: false, followers: 0, icon: AtSign, color: 'bg-gray-800' }
  ]);

  const [scheduledPosts, setScheduledPosts] = useState([
    { id: 1, date: '2026-02-12', content: '週五限定！珍奶買一送一 🧋', platforms: ['fb', 'ig', 'threads'] },
    { id: 2, date: '2026-02-14', content: '情人節特別活動開跑囉 💕', platforms: ['fb', 'ig'] },
    { id: 3, date: '2026-02-15', content: '新品上市！必吃美食推薦', platforms: ['ig', 'threads'] }
  ]);

  return (
    <AppContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      userEmail,
      setUserEmail,
      currentPage,
      setCurrentPage,
      platforms,
      setPlatforms,
      scheduledPosts,
      setScheduledPosts
    }}>
      {children}
    </AppContext.Provider>
  );
};

// 登入頁面
const LoginPage = () => {
  const { setIsLoggedIn, setUserEmail } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('請輸入電子郵件和密碼');
      return;
    }

    setIsLoading(true);

    // 模擬登入流程
    setTimeout(() => {
      setUserEmail(email);
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);

    // 模擬 Google OAuth 登入
    setTimeout(() => {
      setUserEmail('user@gmail.com');
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-700/20 blur-[100px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[100px]"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo 和標題 */}
        <div className="text-center mb-8">
          <div className="inline-flex bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-2xl mb-6 ring-1 ring-white/20">
            <Sparkles className="text-primary-400" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">ShopSync</h1>
          <p className="text-slate-400 text-lg">Meta 平台社群管理好幫手</p>
        </div>

        {/* 登入卡片 */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">歡迎回來</h2>

          {/* Google 快速登入 */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white hover:bg-slate-50 text-slate-800 font-medium py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-3 mb-6 shadow-lg shadow-black/5 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                使用 Google 登入
              </>
            )}
          </button>

          {/* 分隔線 */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 border-t border-white/10"></div>
            <span className="text-slate-500 text-sm">或</span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>

          {/* 電子郵件登入表單 */}
          <form onSubmit={handleEmailLogin}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  電子郵件
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  密碼
                </label>
                <div className="relative group">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-primary-500 rounded bg-slate-800 border-slate-600 focus:ring-primary-500/30 ring-offset-slate-900" />
                  <span className="text-slate-400">記住我</span>
                </label>
                <a href="#" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                  忘記密碼?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-primary-900/20 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    登入中...
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    登入
                  </>
                )}
              </button>
            </div>
          </form>

          {/* 註冊連結 */}
          <p className="text-center text-slate-400 text-sm mt-8">
            還沒有帳號?{' '}
            <a href="#" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
              立即註冊
            </a>
          </p>
        </div>

        {/* 底部說明 */}
        <p className="text-center text-slate-500 text-xs mt-8">
          使用 ShopSync 即表示您同意我們的 <a href="#" className="underline hover:text-slate-400">服務條款</a> 和 <a href="#" className="underline hover:text-slate-400">隱私政策</a>
        </p>
      </div>
    </div>
  );
};

// 側邊欄導航
const Sidebar = () => {
  const { currentPage, setCurrentPage, userEmail, setIsLoggedIn } = useContext(AppContext);

  const menuItems = [
    { id: 'dashboard', name: '儀表板', icon: TrendingUp },
    { id: 'composer', name: 'AI 發文助手', icon: Sparkles },
    { id: 'calendar', name: '排程日曆', icon: Calendar },
    { id: 'settings', name: '平台設定', icon: Settings }
  ];

  const handleLogout = () => {
    if (confirm('確定要登出嗎?')) {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 min-h-screen p-6 hidden lg:flex lg:flex-col shadow-2xl z-20">
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="p-2 bg-primary-600/10 rounded-lg">
          <Sparkles className="text-primary-500" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">ShopSync</h1>
          <p className="text-slate-500 text-xs">Meta 社群管理</p>
        </div>
      </div>

      <nav className="space-y-1.5 flex-1">
        {menuItems.map(item => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative ${isActive
                ? 'bg-primary-600/10 text-primary-400'
                : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
                }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500 rounded-r-full"></div>
              )}
              <item.icon size={20} className={isActive ? 'text-primary-400' : 'text-slate-500 group-hover:text-slate-300'} />
              <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* 用戶資訊和登出 */}
      <div className="mt-auto pt-6 border-t border-slate-800">
        <div className="mb-4 px-2 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-slate-800">
            {userEmail ? userEmail[0].toUpperCase() : 'U'}
          </div>
          <div className="overflow-hidden">
            <div className="text-white text-sm font-medium truncate">{userEmail || 'user@email.com'}</div>
            <div className="text-slate-500 text-xs text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              在線
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium text-sm">登出帳號</span>
        </button>
      </div>
    </div>
  );
};

// 手機底部導航（響應式）
const MobileNav = () => {
  const { currentPage, setCurrentPage } = useContext(AppContext);

  const menuItems = [
    { id: 'dashboard', name: '儀表板', icon: TrendingUp },
    { id: 'composer', name: '發文', icon: Sparkles },
    { id: 'calendar', name: '日曆', icon: Calendar },
    { id: 'settings', name: '設定', icon: Settings }
  ];

  return (
    <div className="lg:hidden fixed bottom-6 left-4 right-4 bg-slate-900/90 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-2xl shadow-2xl z-50">
      <div className="flex justify-between items-center">
        {menuItems.map(item => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-primary-400 scale-110' : 'text-slate-500 hover:text-slate-300'
                }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && <div className="w-1 h-1 bg-primary-400 rounded-full mt-1"></div>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// 儀表板頁面
const Dashboard = () => {
  const { platforms, scheduledPosts, setCurrentPage } = useContext(AppContext);

  const connectedPlatforms = platforms.filter(p => p.connected);
  const hasConnectedPlatforms = connectedPlatforms.length > 0;

  const thisWeekPosts = scheduledPosts.filter(post => {
    const postDate = new Date(post.date);
    const today = new Date('2026-02-10');
    const weekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return postDate >= today && postDate <= weekLater;
  }).length;

  const totalFollowers = platforms.reduce((sum, p) => sum + p.followers, 0);

  // 如果沒有連結任何平台,顯示歡迎畫面
  if (!hasConnectedPlatforms) {
    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
        <div className="bg-gradient-to-br from-primary-600 to-indigo-700 rounded-3xl p-8 md:p-16 text-white text-center shadow-2xl relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              歡迎使用 ShopSync! 🎉
            </h1>
            <p className="text-xl text-primary-100 mb-10 leading-relaxed">
              開始之前,讓我們先連結您的 Meta 平台帳號，<br />
              體驗一站式社群管理的強大功能。
            </p>
            <button
              onClick={() => setCurrentPage('settings')}
              className="bg-white text-primary-600 hover:bg-primary-50 font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all inline-flex items-center gap-3 text-lg"
            >
              <Settings size={24} />
              前往平台設定
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Facebook, name: 'Facebook', desc: '管理粉絲專頁,發布專業內容', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: Instagram, name: 'Instagram', desc: '分享視覺內容,吸引年輕客群', color: 'text-pink-600', bg: 'bg-pink-50' },
            { icon: AtSign, name: 'Threads', desc: '輕鬆互動,建立親密關係', color: 'text-slate-800', bg: 'bg-slate-100' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`${item.bg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <item.icon className={item.color} size={32} />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">{item.name}</h3>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <Sparkles className="text-yellow-500" />
            ShopSync 能幫您做什麼？
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              { title: '一鍵跨平台發文', desc: '同一則內容,自動調整成各平台最適合的語氣' },
              { title: 'AI 智慧文案', desc: '幫您寫出吸引人的貼文內容,省去構思時間' },
              { title: '排程自動發布', desc: '提前規劃內容,系統準時自動發布' },
              { title: '即時預覽效果', desc: '發布前就能看到真實呈現樣貌,避免失誤' }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="bg-green-100 text-green-600 p-1.5 rounded-full mt-1">
                  <Check size={16} strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-lg mb-1">{feature.title}</div>
                  <div className="text-slate-500">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 已連結平台的儀表板
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">儀表板</h2>
        <p className="text-slate-500">快速瀏覽您的社群經營狀況</p>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-primary-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary-100 text-primary-600 rounded-lg">
                <Clock size={24} />
              </div>
              <span className="text-slate-500 font-medium">本週預計發文</span>
            </div>
            <div className="text-5xl font-bold text-slate-800">{thisWeekPosts} <span className="text-2xl text-slate-400 font-normal">則</span></div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-pink-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
                <TrendingUp size={24} />
              </div>
              <span className="text-slate-500 font-medium">總粉絲數</span>
            </div>
            <div className="text-5xl font-bold text-slate-800">{totalFollowers.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* 平台連結狀態 */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
        <h3 className="text-xl font-bold text-slate-800 mb-6">平台連結狀態</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platforms.map(platform => {
            const Icon = platform.icon;
            return (
              <div key={platform.id} className="flex items-center gap-5 p-5 border border-slate-100 bg-slate-50/50 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className={`${platform.color} p-4 rounded-xl text-white shadow-md`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-800 text-lg">{platform.name}</div>
                  <div className="text-sm text-slate-500 font-medium">
                    {platform.connected ? `${platform.followers.toLocaleString()} 粉絲` : '尚未連結'}
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${platform.connected
                  ? 'bg-green-100 text-green-700'
                  : 'bg-slate-200 text-slate-500'
                  }`}>
                  {platform.connected ? '已連結' : '未連結'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 近期排程預覽 */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-slate-800">近期排程</h3>
          <button className="text-primary-600 text-sm font-semibold hover:text-primary-700 flex items-center gap-1 group">
            查看全部 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="space-y-4">
          {scheduledPosts.slice(0, 3).map(post => (
            <div key={post.id} className="flex items-center gap-6 p-4 hover:bg-slate-50 rounded-2xl transition-colors border border-transparent hover:border-slate-100">
              <div className="text-center min-w-[70px] bg-primary-50 rounded-xl py-3 px-2">
                <div className="text-2xl font-bold text-primary-600">
                  {new Date(post.date).getDate()}
                </div>
                <div className="text-xs text-primary-400 font-medium uppercase">
                  {new Date(post.date).toLocaleDateString('zh-TW', { month: 'short' })}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-800 font-medium mb-3 truncate">{post.content}</p>
                <div className="flex gap-2">
                  {post.platforms.map(p => {
                    const platform = platforms.find(pl => pl.id === p);
                    const Icon = platform.icon;
                    return (
                      <div key={p} className={`${platform.color} p-1.5 rounded-lg text-white shadow-sm`}>
                        <Icon size={14} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="hidden md:block">
                <button className="text-slate-400 hover:text-primary-600 p-2 hover:bg-primary-50 rounded-lg transition-colors">
                  <Settings size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 手機預覽組件
const PhonePreview = ({ platform, content, imageUrl }) => {
  const currentTime = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10">
      {/* Notch */}
      <div className="absolute top-0 w-full h-6 bg-transparent z-50 flex justify-center">
        <div className="h-4 w-32 bg-black rounded-b-3xl"></div>
      </div>

      {/* 手機頂部狀態欄 */}
      <div className="bg-white text-black px-6 pt-3 pb-1 flex justify-between text-[10px] font-medium z-40">
        <span>{currentTime}</span>
        <div className="flex gap-1 items-center">
          <div className="w-3 h-3 bg-black rounded-sm"></div>
          <div className="w-3 h-3 bg-black rounded-sm"></div>
        </div>
      </div>

      {/* 平台內容區 */}
      <div className="flex-1 bg-white overflow-y-auto no-scrollbar pointer-events-none select-none">
        {platform === 'fb' ? (
          <div className="bg-[#F0F2F5] min-h-full">
            {/* FB 頂部欄 */}
            <div className="bg-white text-[#1877F2] px-4 py-3 flex items-center justify-between border-b border-gray-200 sticky top-0 z-30">
              <span className="font-bold text-lg tracking-tight">facebook</span>
              <div className="flex gap-3 text-black">
                <Plus size={20} />
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                </svg>
              </div>
            </div>

            {/* 貼文 */}
            <div className="bg-white mt-2 p-3 pb-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold ring-2 ring-white">
                  店
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm leading-tight">我的小店</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    剛剛 · <i className="fas fa-globe-americas"></i>
                  </div>
                </div>
              </div>
              <p className="text-gray-900 text-[15px] whitespace-pre-wrap mb-3 leading-normal">{content || '在這裡輸入內容,即時預覽貼文效果...'}</p>
              {imageUrl && (
                <img src={imageUrl} alt="preview" className="w-full -mx-0 rounded-none border border-gray-100" />
              )}
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-gray-500 text-sm font-medium">
                <span>讚</span>
                <span>留言</span>
                <span>分享</span>
              </div>
            </div>
          </div>
        ) : platform === 'ig' ? (
          <div className="bg-white h-full">
            {/* IG 頂部欄 */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 bg-white z-30">
              <span className="font-bold text-xl tracking-tighter" style={{ fontFamily: 'cursive' }}>Instagram</span>
              <div className="flex gap-4">
                <Plus size={24} strokeWidth={1.5} />
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>

            {/* IG 貼文 */}
            <div>
              <div className="flex items-center gap-2 p-3">
                <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full p-0.5">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center border border-white">
                    <span className="text-xs font-bold text-black">店</span>
                  </div>
                </div>
                <span className="font-semibold text-sm text-black">我的小店</span>
                <div className="ml-auto text-gray-900">...</div>
              </div>
              {imageUrl ? (
                <img src={imageUrl} alt="preview" className="w-full aspect-square object-cover" />
              ) : (
                <div className="w-full aspect-square bg-slate-50 flex items-center justify-center border-y border-slate-100">
                  <Image size={48} className="text-slate-300" />
                </div>
              )}
              <div className="p-3">
                <div className="flex gap-4 mb-2 text-black">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" /><path d="M16 6l-4-4-4 4" /><path d="M12 2v13" /></svg>
                </div>
                <p className="text-sm text-gray-900 leading-normal">
                  <span className="font-semibold mr-2">我的小店</span>
                  {content || '在這裡輸入內容,即時預覽貼文效果...'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white h-full">
            {/* Threads 頂部欄 */}
            <div className="px-4 py-4 flex items-center justify-center border-b border-gray-100 relative sticky top-0 bg-white z-30">
              <AtSign size={32} className="text-black" />
            </div>

            {/* Threads 貼文 */}
            <div className="p-4">
              <div className="flex gap-3">
                <div className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-sm">
                  店
                </div>
                <div className="flex-1 border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-semibold text-black text-sm">我的小店</div>
                    <div className="text-gray-400 text-sm">剛剛</div>
                  </div>
                  <p className="text-black whitespace-pre-wrap mb-3 text-[15px] leading-relaxed">{content || '在這裡輸入內容,即時預覽貼文效果...'}</p>
                  {imageUrl && (
                    <img src={imageUrl} alt="preview" className="w-full rounded-xl mb-3 border border-gray-200" />
                  )}
                  <div className="flex gap-4 text-gray-900">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 手機底部 Home Indicator */}
      <div className="absolute bottom-1 w-full flex justify-center pb-2 z-40 bg-white">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
};

// AI 發文助手
const PostComposer = () => {
  const { platforms } = useContext(AppContext);
  const [content, setContent] = useState('');
  const [originalContent, setOriginalContent] = useState(''); // 保存原始內容
  const [previewPlatform, setPreviewPlatform] = useState('fb');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['fb', 'ig', 'threads']);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);
  const [publishType, setPublishType] = useState('now'); // 'now' or 'schedule'
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const aiTransforms = {
    fb: '🎉 【本週限定優惠】\n\n各位親愛的顧客大家好!\n\n本週我們推出超值優惠活動,凡來店消費滿 $500 即享 9 折優惠!\n\n📍 地點:台北市大安區\n⏰ 時間:即日起至本週日\n\n歡迎大家呼朋引伴一起來!\n期待與您相見 ❤️',
    ig: '✨ 本週必衝優惠 ✨\n\n姊妹們!這週不來真的會後悔 😍\n消費滿 500 就打 9 折\n\n超划算der～\n快tag你的姊妹一起來 💕\n\n#台北美食 #限時優惠 #姊妹聚會 #必吃推薦',
    threads: '剛剛看到隔壁店排隊\n突然想到我們本週也有優惠\n\n消費滿 $500 直接 9 折 🎉\n\n說真的這個優惠連我自己都想買\n在大安區,週日前都有\n\n有人要一起嗎?'
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview('');
  };

  const togglePlatform = (platformId) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleAiTransform = (style) => {
    if (!originalContent) {
      setOriginalContent(content); // 第一次使用 AI 時保存原文
    }
    setAiSuggestion(aiTransforms[style]);
    setShowAiSuggestion(true);
  };

  const applyAiSuggestion = () => {
    setContent(aiSuggestion);
    setShowAiSuggestion(false);
  };

  const cancelAiSuggestion = () => {
    setShowAiSuggestion(false);
  };

  const restoreOriginal = () => {
    setContent(originalContent);
    setOriginalContent('');
    setShowAiSuggestion(false);
  };

  const getCharCount = () => {
    const limits = {
      fb: 63206,
      ig: 2200,
      threads: 500
    };
    return limits[previewPlatform];
  };

  const handlePublish = () => {
    if (publishType === 'schedule' && (!scheduleDate || !scheduleTime)) {
      alert('請選擇排程日期和時間');
      return;
    }

    const message = publishType === 'now'
      ? '已發布到選擇的平台!'
      : `已排程於 ${scheduleDate} ${scheduleTime} 發布!`;
    alert(message);
  };

  const handleSaveDraft = () => {
    alert('草稿已儲存!');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">AI 跨平台發文助手</h2>
        <p className="text-slate-500">一次撰寫,AI 自動調整成各平台最適合的語氣</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* 左側:輸入區 */}
        <div className="space-y-6">
          {/* 文字輸入區 */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 relative group focus-within:ring-2 focus-within:ring-primary-500/20 transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <div className="p-1.5 bg-primary-100 text-primary-600 rounded-lg">
                  <div className="w-4 h-4"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></div>
                </div>
                貼文內容
              </label>
              <div className="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-full">
                {content.length} / {getCharCount()} 字
              </div>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="輸入您想發布的內容,例如:新品芒果冰沙上市!使用愛文芒果..."
              className="w-full h-48 p-0 border-0 focus:ring-0 text-slate-700 placeholder-slate-400 bg-transparent resize-none text-lg leading-relaxed"
            />
            {originalContent && (
              <button
                onClick={restoreOriginal}
                className="absolute right-4 bottom-4 text-xs font-semibold text-primary-600 hover:text-primary-700 hover:bg-primary-50 px-3 py-1.5 rounded-full transition-all flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                還原原始內容
              </button>
            )}
          </div>

          {/* AI 建議區 */}
          {showAiSuggestion && (
            <div className="relative overflow-hidden bg-white rounded-3xl shadow-lg border border-primary-200 p-1">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 via-purple-500 to-pink-500"></div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg text-white shadow-lg shadow-primary-500/30">
                    <Sparkles size={20} />
                  </div>
                  <span className="font-bold text-slate-800 text-lg">AI 建議內容</span>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl mb-6 max-h-48 overflow-y-auto border border-slate-100">
                  <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{aiSuggestion}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={applyAiSuggestion}
                    className="flex-1 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white py-3 px-4 rounded-xl font-bold transition-all shadow-lg shadow-primary-500/25 active:scale-95"
                  >
                    套用這個版本
                  </button>
                  <button
                    onClick={cancelAiSuggestion}
                    className="flex-1 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 py-3 px-4 rounded-xl font-bold transition-all hover:shadow-md active:scale-95"
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 圖片上傳區 */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-4">
              <div className="p-1.5 bg-pink-100 text-pink-600 rounded-lg">
                <Image size={16} />
              </div>
              媒體素材
            </label>

            {!imagePreview ? (
              <label className="border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center hover:border-primary-400 hover:bg-slate-50 transition-all cursor-pointer block group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="mb-4 text-slate-300 group-hover:text-primary-500 transition-colors">
                  <Image size={48} className="mx-auto" />
                </div>
                <p className="text-slate-600 font-medium text-lg mb-1 group-hover:text-primary-600">點擊上傳或拖曳圖片到這裡</p>
                <p className="text-xs text-slate-400">支援 JPG, PNG 格式 (最大 5MB)</p>
              </label>
            ) : (
              <div className="relative group">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="w-full rounded-2xl border border-slate-100 shadow-sm"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center gap-4 backdrop-blur-sm">
                  <button
                    onClick={removeImage}
                    className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/20"
                  >
                    <Trash2 size={24} />
                  </button>
                  <label className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full cursor-pointer transition-all shadow-lg font-medium">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    更換圖片
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* AI 語氣轉換 */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-4">
              <div className="p-1.5 bg-violet-100 text-violet-600 rounded-lg">
                <Sparkles size={16} />
              </div>
              AI 語氣轉換
            </label>
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => handleAiTransform('fb')}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50/50 transition-all group text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
                    <Facebook size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-lg group-hover:text-blue-700">FB 專業版</div>
                    <div className="text-xs text-slate-500 font-medium">正式、詳細、適合公告</div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all text-transparent">
                  <Sparkles size={14} fill="currentColor" />
                </div>
              </button>

              <button
                onClick={() => handleAiTransform('ig')}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl hover:border-pink-500 hover:bg-pink-50/50 transition-all group text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-pink-100 text-pink-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-lg group-hover:text-pink-700">IG 網美版</div>
                    <div className="text-xs text-slate-500 font-medium">活潑、emoji、有hashtag</div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all text-transparent">
                  <Sparkles size={14} fill="currentColor" />
                </div>
              </button>

              <button
                onClick={() => handleAiTransform('threads')}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl hover:border-slate-800 hover:bg-slate-50 transition-all group text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-slate-100 text-slate-800 p-3 rounded-xl group-hover:scale-110 transition-transform">
                    <AtSign size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-lg group-hover:text-slate-900">Threads 對話版</div>
                    <div className="text-xs text-slate-500 font-medium">輕鬆、隨性、像在閒聊</div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-slate-800 group-hover:bg-slate-800 group-hover:text-white transition-all text-transparent">
                  <Sparkles size={14} fill="currentColor" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* 右側:預覽與發布 */}
        <div className="space-y-6 lg:sticky lg:top-8">
          {/* 選擇發布平台 */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-4">
              <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg">
                <Share2 size={16} />
              </div>
              選擇發布平台
            </label>
            <div className="flex flex-wrap gap-3">
              {platforms.map(platform => {
                const Icon = platform.icon;
                const isSelected = selectedPlatforms.includes(platform.id);
                return (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`flex items-center gap-2 pl-2 pr-4 py-2 rounded-full border transition-all ${isSelected
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                      }`}
                  >
                    <div className={`p-1.5 rounded-full text-white ${isSelected ? 'bg-primary-500' : 'bg-slate-400'}`}>
                      <Icon size={14} />
                    </div>
                    <span className="font-bold text-sm">{platform.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 手機預覽 */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-6">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <div className="p-1.5 bg-orange-100 text-orange-600 rounded-lg">
                  <Smartphone size={16} />
                </div>
                即時預覽
              </label>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                {['fb', 'ig', 'threads'].map(p => (
                  <button
                    key={p}
                    onClick={() => setPreviewPlatform(p)}
                    className={`p-2 rounded-lg transition-all ${previewPlatform === p ? 'bg-white shadow text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {p === 'fb' && <Facebook size={18} />}
                    {p === 'ig' && <Instagram size={18} />}
                    {p === 'threads' && <AtSign size={18} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="transform scale-[0.85] origin-top -mb-[80px]">
              <PhonePreview
                platform={previewPlatform}
                content={content}
                imageUrl={imagePreview}
              />
            </div>
          </div>

          {/* 發布選項 */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-4">
              <div className="p-1.5 bg-green-100 text-green-600 rounded-lg">
                <Send size={16} />
              </div>
              發布設定
            </label>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <label className={`cursor-pointer p-4 rounded-2xl border-2 transition-all text-center ${publishType === 'now' ? 'border-primary-500 bg-primary-50/50' : 'border-slate-100 hover:border-primary-200'
                }`}>
                <input type="radio" name="publishType" value="now" checked={publishType === 'now'} onChange={(e) => setPublishType(e.target.value)} className="hidden" />
                <div className="font-bold text-slate-800 mb-1">立即發布</div>
                <div className="text-xs text-slate-500">馬上發送至所有平台</div>
              </label>

              <label className={`cursor-pointer p-4 rounded-2xl border-2 transition-all text-center ${publishType === 'schedule' ? 'border-primary-500 bg-primary-50/50' : 'border-slate-100 hover:border-primary-200'
                }`}>
                <input type="radio" name="publishType" value="schedule" checked={publishType === 'schedule'} onChange={(e) => setPublishType(e.target.value)} className="hidden" />
                <div className="font-bold text-slate-800 mb-1">排程發布</div>
                <div className="text-xs text-slate-500">指定日期與時間</div>
              </label>
            </div>

            {publishType === 'schedule' && (
              <div className="grid grid-cols-2 gap-3 mb-6 animate-fade-in-up">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block ml-1">日期</label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block ml-1">時間</label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={handlePublish}
                disabled={selectedPlatforms.length === 0}
                className="w-full bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Send size={20} className={selectedPlatforms.length === 0 ? "opacity-50" : ""} />
                {publishType === 'now' ? '立即發布' : '設定排程'}
              </button>
              <button
                onClick={handleSaveDraft}
                className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-3.5 rounded-2xl transition-all"
              >
                儲存草稿
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 平台設定頁面
const PlatformSettings = () => {
  const { platforms, setPlatforms } = useContext(AppContext);
  const [connectingPlatform, setConnectingPlatform] = useState(null);

  const handleConnect = (platformId) => {
    setConnectingPlatform(platformId);

    // 模擬 OAuth 連接流程
    setTimeout(() => {
      setPlatforms(prev => prev.map(p =>
        p.id === platformId
          ? { ...p, connected: true, followers: Math.floor(Math.random() * 5000) + 500 }
          : p
      ));
      setConnectingPlatform(null);
      alert(`${platforms.find(p => p.id === platformId).name} 連結成功！`);
    }, 2000);
  };

  const handleDisconnect = (platformId) => {
    if (confirm(`確定要解除 ${platforms.find(p => p.id === platformId).name} 的連結嗎？`)) {
      setPlatforms(prev => prev.map(p =>
        p.id === platformId
          ? { ...p, connected: false, followers: 0 }
          : p
      ));
    }
  };

  const getConnectionSteps = (platformId) => {
    const steps = {
      fb: [
        '點擊「連結 Facebook」按鈕',
        '登入您的 Facebook 帳號',
        '選擇要管理的粉絲專頁',
        '授權 ShopSync 存取權限'
      ],
      ig: [
        '確保 Instagram 已連結到 Facebook',
        '點擊「連結 Instagram」按鈕',
        '選擇要連結的 IG 商業帳號',
        '完成授權'
      ],
      threads: [
        '點擊「連結 Threads」按鈕',
        '使用 Instagram 帳號登入',
        '授權 ShopSync 發布權限',
        '完成設定'
      ]
    };
    return steps[platformId] || [];
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">平台設定</h2>
        <p className="text-slate-500">連結您的 Meta 平台帳號,開始管理社群內容</p>
      </div>

      {/* 連結狀態總覽 */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">連結狀態</h3>
              <p className="text-indigo-100 font-medium">
                已連結 {platforms.filter(p => p.connected).length} / {platforms.length} 個平台
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <Settings size={32} className="text-white" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {platforms.map(platform => {
              const Icon = platform.icon;
              return (
                <div
                  key={platform.id}
                  className={`flex items-center gap-3 p-4 rounded-2xl transition-all border ${platform.connected
                      ? 'bg-white/20 border-white/30 text-white'
                      : 'bg-black/20 border-white/10 text-white/50'
                    }`}
                >
                  <Icon size={24} />
                  <div className="font-bold">
                    {platform.connected ? '已連結' : '未連結'}
                  </div>
                  {platform.connected && <Check size={16} className="ml-auto" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 各平台連結卡片 */}
      <div className="grid grid-cols-1 gap-6">
        {platforms.map(platform => {
          const Icon = platform.icon;
          const steps = getConnectionSteps(platform.id);
          const isConnecting = connectingPlatform === platform.id;

          return (
            <div key={platform.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:border-primary-200 transition-all">
              <div className={`${platform.color} p-8 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20">
                      <Icon size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{platform.name}</h3>
                      {platform.connected && (
                        <p className="text-white/90 font-medium mt-1 flex items-center gap-2">
                          <Users size={16} />
                          {platform.followers.toLocaleString()} 位粉絲
                        </p>
                      )}
                    </div>
                  </div>
                  {platform.connected && (
                    <div className="bg-white/20 backdrop-blur-md px-5 py-2 rounded-full flex items-center gap-2 border border-white/20 shadow-lg">
                      <Check size={18} strokeWidth={3} />
                      <span className="font-bold">已連結</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8">
                {!platform.connected ? (
                  <>
                    <div className="mb-8">
                      <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-primary-500 rounded-full"></div>
                        連結步驟
                      </h4>
                      <ol className="space-y-4">
                        {steps.map((step, index) => (
                          <li key={index} className="flex items-center gap-4 group/step">
                            <span className="flex-shrink-0 w-8 h-8 bg-slate-50 text-slate-500 rounded-full flex items-center justify-center text-sm font-bold border border-slate-200 group-hover/step:bg-primary-50 group-hover/step:text-primary-600 group-hover/step:border-primary-200 transition-colors">
                              {index + 1}
                            </span>
                            <span className="text-slate-600 font-medium">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <button
                      onClick={() => handleConnect(platform.id)}
                      disabled={isConnecting}
                      className={`w-full ${platform.color} hover:contrast-125 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-gray-200 active:scale-[0.98] text-lg`}
                    >
                      {isConnecting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          連接中...
                        </>
                      ) : (
                        <>
                          <ExternalLink size={20} strokeWidth={2.5} />
                          連結 {platform.name}
                        </>
                      )}
                    </button>

                    <p className="text-xs text-slate-400 text-center mt-4 font-medium">
                      點擊後將跳轉到 {platform.name} 進行安全授權
                    </p>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-start gap-4">
                      <div className="bg-green-100 text-green-600 p-2 rounded-full">
                        <Check className="flex-shrink-0" size={20} strokeWidth={3} />
                      </div>
                      <div>
                        <p className="text-green-800 font-bold text-lg mb-1">連結成功！</p>
                        <p className="text-green-700 font-medium">
                          您現在可以透過 ShopSync 管理 {platform.name} 的內容了
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                        <div className="text-slate-500 text-sm font-bold mb-2 uppercase tracking-wide">總粉絲數</div>
                        <div className="text-3xl font-bold text-slate-800">
                          {platform.followers.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                        <div className="text-slate-500 text-sm font-bold mb-2 uppercase tracking-wide">連結狀態</div>
                        <div className="text-xl font-bold text-green-600 flex items-center gap-2">
                          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                          運作中
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDisconnect(platform.id)}
                      className="w-full bg-white border border-red-200 hover:bg-red-50 text-red-600 font-bold py-4 rounded-2xl transition-all"
                    >
                      解除連結
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 安全性說明 */}
      <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
        <div className="flex items-start gap-5">
          <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
            <Shield className="flex-shrink-0" size={32} />
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-800 mb-4">安全性保證</h4>
            <ul className="text-slate-600 space-y-3 font-medium">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                我們使用 Meta 官方 OAuth 授權,不會儲存您的密碼
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                您可以隨時在平台設定中解除連結
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                所有資料傳輸都經過 256-bit SSL 加密保護
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                我們只會取得發文所需的最小權限
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// 排程日曆
const ContentCalendar = () => {
  const { scheduledPosts, setScheduledPosts, platforms } = useContext(AppContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPost, setNewPost] = useState({
    content: '',
    platforms: ['fb', 'ig', 'threads'],
    time: '10:00'
  });

  // 生成當月日曆
  const generateCalendar = () => {
    const year = 2026;
    const month = 1; // February (0-indexed)
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendar = [];
    let week = new Array(7).fill(null);

    // 填充第一週的空白
    for (let i = 0; i < firstDay; i++) {
      week[i] = null;
    }

    // 填充日期
    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeek = (firstDay + day - 1) % 7;
      week[dayOfWeek] = day;

      if (dayOfWeek === 6 || day === daysInMonth) {
        calendar.push([...week]);
        week = new Array(7).fill(null);
      }
    }

    return calendar;
  };

  const getPostsForDate = (day) => {
    if (!day) return [];
    const dateStr = `2026-02-${String(day).padStart(2, '0')}`;
    return scheduledPosts.filter(post => post.date === dateStr);
  };

  const handleDateClick = (day) => {
    if (!day) return;
    setSelectedDate(day);
    setShowAddModal(true);
  };

  const handleAddPost = () => {
    if (!newPost.content.trim()) {
      alert('請輸入貼文內容');
      return;
    }

    if (newPost.platforms.length === 0) {
      alert('請至少選擇一個平台');
      return;
    }

    const dateStr = `2026-02-${String(selectedDate).padStart(2, '0')}`;
    const post = {
      id: Date.now(),
      date: dateStr,
      time: newPost.time,
      content: newPost.content,
      platforms: newPost.platforms
    };

    setScheduledPosts([...scheduledPosts, post]);
    setShowAddModal(false);
    setNewPost({ content: '', platforms: ['fb', 'ig', 'threads'], time: '10:00' });
    setSelectedDate(null);
  };

  const handleDeletePost = (postId) => {
    if (confirm('確定要刪除這則排程嗎?')) {
      setScheduledPosts(scheduledPosts.filter(post => post.id !== postId));
    }
  };

  const togglePlatform = (platformId) => {
    setNewPost(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(id => id !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  const calendar = generateCalendar();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">排程日曆</h2>
        <p className="text-slate-500">規劃您的社群貼文行程</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-slate-800">2026 年 2 月</h3>
          <button
            onClick={() => {
              setSelectedDate(new Date().getDate());
              setShowAddModal(true);
            }}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-primary-500/20 font-bold active:scale-95"
          >
            <Plus size={20} />
            新增排程
          </button>
        </div>

        {/* 日曆表格 */}
        <div className="grid grid-cols-7 gap-4">
          {/* 星期標題 */}
          {weekDays.map(day => (
            <div key={day} className="text-center font-bold text-slate-400 py-2 uppercase text-sm tracking-wider">
              {day}
            </div>
          ))}

          {/* 日期格子 */}
          {calendar.map((week, weekIdx) => (
            week.map((day, dayIdx) => {
              const posts = getPostsForDate(day);
              const isToday = day === 10;

              return (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  className={`min-h-[140px] p-3 border rounded-3xl transition-all relative group ${day
                    ? 'bg-white hover:border-primary-300 hover:shadow-lg cursor-pointer'
                    : 'bg-slate-50 border-transparent'
                    } ${isToday ? 'border-primary-500 ring-4 ring-primary-500/10 z-10' : 'border-slate-100'}`}
                  onClick={() => handleDateClick(day)}
                >
                  {day && (
                    <>
                      <div className="flex justify-between items-start mb-2">
                        <div className={`text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full ${isToday ? 'bg-primary-600 text-white shadow-md' : 'text-slate-700 group-hover:bg-slate-100 transition-colors'
                          }`}>
                          {day}
                        </div>
                        {posts.length > 0 && <div className="bg-indigo-100 text-indigo-600 text-xs font-bold px-2 py-0.5 rounded-full">{posts.length}</div>}
                      </div>

                      <div className="space-y-1.5 overflow-hidden">
                        {posts.slice(0, 3).map(post => (
                          <div
                            key={post.id}
                            className="text-xs bg-indigo-50 text-indigo-700 font-medium px-2 py-1.5 rounded-lg truncate border border-indigo-100 hover:bg-indigo-100 transition-colors"
                            title={post.content}
                          >
                            {post.content.substring(0, 10)}...
                          </div>
                        ))}
                        {posts.length > 3 && (
                          <div className="text-xs text-slate-400 font-medium text-center bg-slate-50 rounded-lg py-1">
                            + {posts.length - 3} 更多
                          </div>
                        )}
                      </div>

                      <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none"></div>
                    </>
                  )}
                </div>
              );
            })
          ))}
        </div>
      </div>

      {/* 本月排程列表 */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        <h3 className="text-xl font-bold text-slate-800 mb-6">本月所有排程</h3>
        <div className="space-y-4">
          {scheduledPosts.length === 0 ? (
            <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-sm">
                <Calendar size={48} className="text-slate-300" />
              </div>
              <p className="font-bold text-lg text-slate-600 mb-1">還沒有任何排程</p>
              <p className="text-sm">點擊上方「新增排程」或日曆格子開始規劃</p>
            </div>
          ) : (
            scheduledPosts.map(post => (
              <div key={post.id} className="flex items-center gap-6 p-5 bg-white border border-slate-100 rounded-2xl hover:border-primary-200 hover:shadow-lg transition-all group">
                <div className="text-center min-w-[70px] bg-indigo-50 text-indigo-600 rounded-xl p-3 border border-indigo-100">
                  <div className="text-2xl font-bold">
                    {new Date(post.date).getDate()}
                  </div>
                  <div className="text-xs font-bold uppercase">
                    {new Date(post.date).toLocaleDateString('zh-TW', { month: 'short' })}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 font-bold mb-2 truncate text-lg group-hover:text-primary-600 transition-colors">{post.content}</p>
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded-lg">
                      <Clock size={14} />
                      {post.time || '10:00'}
                    </div>
                    <div className="w-px h-4 bg-slate-300"></div>
                    <div className="flex gap-1.5">
                      {post.platforms.map(p => {
                        const platform = platforms.find(pl => pl.id === p);
                        if (!platform) return null;
                        const Icon = platform.icon;
                        return (
                          <div key={p} className={`${platform.color} p-1.5 rounded-lg text-white shadow-sm scale-90`} title={platform.name}>
                            <Icon size={14} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePost(post.id);
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
                  title="刪除"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 新增排程 Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-up border border-white/20">
            <div className="p-8 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    新增排程
                  </h3>
                  <p className="text-slate-500 font-medium">
                    {selectedDate ? `2026 年 2 月 ${selectedDate} 日` : '選擇日期'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setNewPost({ content: '', platforms: ['fb', 'ig', 'threads'], time: '10:00' });
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-500 p-2 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-8">
              {/* 貼文內容 */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  貼文內容
                </label>
                <div className="relative">
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="輸入要發布的內容..."
                    className="w-full h-40 p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-lg"
                  />
                  <div className="absolute bottom-4 right-4 text-xs font-bold text-slate-400 bg-white px-2 py-1 rounded-lg shadow-sm">
                    {newPost.content.length} 字
                  </div>
                </div>
              </div>

              {/* 發布時間 */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  發布時間
                </label>
                <input
                  type="time"
                  value={newPost.time}
                  onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
                  className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 font-medium"
                />
              </div>

              {/* 選擇平台 */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  選擇發布平台
                </label>
                <div className="flex gap-3 flex-wrap">
                  {platforms.map(platform => {
                    const Icon = platform.icon;
                    const isSelected = newPost.platforms.includes(platform.id);
                    return (
                      <label
                        key={platform.id}
                        className={`flex items-center gap-3 p-3 pr-5 border rounded-xl cursor-pointer transition-all ${isSelected
                          ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => togglePlatform(platform.id)}
                          className="w-5 h-5 text-primary-600 rounded bg-slate-100 border-none focus:ring-0"
                        />
                        <div className={`${platform.color} p-2 rounded-lg text-white shadow-sm`}>
                          <Icon size={18} />
                        </div>
                        <span className="font-bold text-slate-700">{platform.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 flex gap-4 bg-slate-50/50">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewPost({ content: '', platforms: ['fb', 'ig', 'threads'], time: '10:00' });
                }}
                className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-4 rounded-2xl transition-all"
              >
                取消
              </button>
              <button
                onClick={handleAddPost}
                className="flex-1 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary-500/20 active:scale-[0.98]"
              >
                確認新增排程
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 主應用
const ShopSyncApp = () => {
  const { isLoggedIn, currentPage } = useContext(AppContext);

  // 如果未登入,顯示登入頁面
  if (!isLoggedIn) {
    return <LoginPage />;
  }

  // 已登入,顯示主應用
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 pb-32 lg:pb-12 overflow-x-hidden">
        <div className="max-w-7xl mx-auto animate-fade-in">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'composer' && <PostComposer />}
          {currentPage === 'calendar' && <ContentCalendar />}
          {currentPage === 'settings' && <PlatformSettings />}
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

// 應用入口
export default function App() {
  return (
    <AppProvider>
      <ShopSyncApp />
    </AppProvider>
  );
}
