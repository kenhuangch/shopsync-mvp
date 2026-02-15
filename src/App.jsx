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
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo 和標題 */}
        <div className="text-center mb-8">
          <div className="bg-white w-20 h-20 rounded-2xl shadow-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="text-indigo-600" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">ShopSync</h1>
          <p className="text-indigo-100 text-lg">Meta 平台社群管理好幫手</p>
        </div>

        {/* 登入卡片 */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">歡迎回來</h2>

          {/* Google 快速登入 */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 hover:shadow-md text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-3 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                使用 Google 登入
              </>
            )}
          </button>

          {/* 分隔線 */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-gray-500 text-sm">或</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* 電子郵件登入表單 */}
          <form onSubmit={handleEmailLogin}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  電子郵件
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  密碼
                </label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" />
                  <span className="text-gray-600">記住我</span>
                </label>
                <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  忘記密碼?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
          <p className="text-center text-gray-600 text-sm mt-6">
            還沒有帳號?{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              立即註冊
            </a>
          </p>
        </div>

        {/* 底部說明 */}
        <p className="text-center text-indigo-100 text-sm mt-6">
          使用 ShopSync 即表示您同意我們的{' '}
          <a href="#" className="underline hover:text-white">服務條款</a>
          {' '}和{' '}
          <a href="#" className="underline hover:text-white">隱私政策</a>
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
    <div className="w-64 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white min-h-screen p-6 hidden lg:flex lg:flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">ShopSync</h1>
        <p className="text-indigo-200 text-sm">Meta 平台社群管理好幫手</p>
      </div>
      
      <nav className="space-y-2 flex-1">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentPage === item.id 
                ? 'bg-white text-indigo-600 shadow-lg' 
                : 'hover:bg-indigo-700 text-indigo-100'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>

      {/* 用戶資訊和登出 */}
      <div className="mt-auto pt-6 border-t border-indigo-500">
        <div className="mb-3 px-2">
          <div className="text-indigo-200 text-xs mb-1">登入身份</div>
          <div className="text-white text-sm font-medium truncate">{userEmail || 'user@email.com'}</div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-700 text-indigo-100 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium">登出</span>
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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg ${
              currentPage === item.id ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <item.icon size={22} />
            <span className="text-xs">{item.name}</span>
          </button>
        ))}
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
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              歡迎使用 ShopSync! 🎉
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              開始之前,讓我們先連結您的 Meta 平台帳號
            </p>
            <button
              onClick={() => setCurrentPage('settings')}
              className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-4 px-8 rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
            >
              <Settings size={24} />
              前往平台設定
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Facebook className="text-blue-600" size={32} />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Facebook</h3>
            <p className="text-sm text-gray-600">管理粉絲專頁,發布專業內容</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Instagram className="text-pink-600" size={32} />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Instagram</h3>
            <p className="text-sm text-gray-600">分享視覺內容,吸引年輕客群</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <AtSign className="text-gray-800" size={32} />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Threads</h3>
            <p className="text-sm text-gray-600">輕鬆互動,建立親密關係</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-4">✨ ShopSync 能幫您做什麼？</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Check className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <div className="font-medium text-blue-900">一鍵跨平台發文</div>
                <div className="text-sm text-blue-700">同一則內容,自動調整成各平台最適合的語氣</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <div className="font-medium text-blue-900">AI 智慧文案</div>
                <div className="text-sm text-blue-700">幫您寫出吸引人的貼文內容</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <div className="font-medium text-blue-900">排程自動發布</div>
                <div className="text-sm text-blue-700">提前規劃內容,準時自動發布</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <div className="font-medium text-blue-900">即時預覽效果</div>
                <div className="text-sm text-blue-700">發布前就能看到真實呈現樣貌</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 已連結平台的儀表板
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">儀表板</h2>
        <p className="text-gray-600">快速瀏覽您的 Meta 平台社群經營狀況</p>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="opacity-80" size={24} />
            <span className="text-indigo-100">本週預計發文</span>
          </div>
          <div className="text-4xl font-bold">{thisWeekPosts} 則</div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="opacity-80" size={24} />
            <span className="text-pink-100">總粉絲數</span>
          </div>
          <div className="text-4xl font-bold">{totalFollowers.toLocaleString()}</div>
        </div>
      </div>

      {/* 平台連結狀態 */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Meta 平台連結狀態</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {platforms.map(platform => {
            const Icon = platform.icon;
            return (
              <div key={platform.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className={`${platform.color} p-3 rounded-lg text-white`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{platform.name}</div>
                  <div className="text-sm text-gray-500">
                    {platform.connected ? `${platform.followers.toLocaleString()} 粉絲` : '尚未連結'}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  platform.connected 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {platform.connected ? '已連結' : '未連結'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 近期排程預覽 */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">近期排程</h3>
          <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
            查看全部 <ChevronRight size={16} className="inline" />
          </button>
        </div>
        <div className="space-y-3">
          {scheduledPosts.slice(0, 3).map(post => (
            <div key={post.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-center min-w-[60px]">
                <div className="text-2xl font-bold text-indigo-600">
                  {new Date(post.date).getDate()}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(post.date).toLocaleDateString('zh-TW', { month: 'short' })}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-800 mb-2">{post.content}</p>
                <div className="flex gap-2">
                  {post.platforms.map(p => {
                    const platform = platforms.find(pl => pl.id === p);
                    const Icon = platform.icon;
                    return (
                      <div key={p} className={`${platform.color} p-1 rounded text-white`}>
                        <Icon size={14} />
                      </div>
                    );
                  })}
                </div>
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
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ width: '320px', height: '600px' }}>
      {/* 手機頂部狀態欄 */}
      <div className="bg-gray-900 text-white px-6 py-2 flex justify-between text-xs">
        <span>{currentTime}</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 bg-white rounded-sm"></div>
          <div className="w-4 h-4 bg-white rounded-sm"></div>
        </div>
      </div>

      {/* 平台內容區 */}
      {platform === 'fb' ? (
        <div className="bg-white h-full overflow-auto">
          {/* FB 頂部欄 */}
          <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
            <span className="font-bold text-lg">facebook</span>
            <div className="flex gap-3">
              <Plus size={20} />
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              </svg>
            </div>
          </div>
          
          {/* 貼文 */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                店
              </div>
              <div>
                <div className="font-semibold text-gray-800">我的小店</div>
                <div className="text-xs text-gray-500">剛剛</div>
              </div>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap mb-3">{content || '在這裡輸入內容,即時預覽貼文效果...'}</p>
            {imageUrl && (
              <img src={imageUrl} alt="preview" className="w-full rounded-lg" />
            )}
          </div>
        </div>
      ) : platform === 'ig' ? (
        <div className="bg-white h-full overflow-auto">
          {/* IG 頂部欄 */}
          <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
            <span className="font-bold text-xl" style={{ fontFamily: 'cursive' }}>Instagram</span>
            <div className="flex gap-4">
              <Plus size={24} />
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>
          
          {/* IG 貼文 */}
          <div>
            <div className="flex items-center gap-3 p-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full p-0.5">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-indigo-600">店</span>
                </div>
              </div>
              <span className="font-semibold text-sm">我的小店</span>
            </div>
            {imageUrl ? (
              <img src={imageUrl} alt="preview" className="w-full aspect-square object-cover" />
            ) : (
              <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <Image size={48} className="text-gray-400" />
              </div>
            )}
            <div className="p-3">
              <p className="text-sm">
                <span className="font-semibold">我的小店 </span>
                {content || '在這裡輸入內容,即時預覽貼文效果...'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white h-full overflow-auto">
          {/* Threads 頂部欄 */}
          <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
            <AtSign size={28} className="font-bold" />
            <div className="flex gap-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          
          {/* Threads 貼文 */}
          <div className="p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                店
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800 mb-1">我的小店</div>
                <p className="text-gray-800 whitespace-pre-wrap mb-3">{content || '在這裡輸入內容,即時預覽貼文效果...'}</p>
                {imageUrl && (
                  <img src={imageUrl} alt="preview" className="w-full rounded-xl mb-3" />
                )}
                <div className="flex gap-4 text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">AI 跨平台發文助手</h2>
        <p className="text-gray-600">一次撰寫,AI 自動調整成各平台最適合的語氣</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左側:輸入區 */}
        <div className="space-y-4">
          {/* 文字輸入區 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                輸入貼文內容
              </label>
              <div className="text-xs text-gray-500">
                {content.length} / {getCharCount()} 字
              </div>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="輸入您想發布的內容,例如:新品芒果冰沙上市!使用愛文芒果..."
              className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
            {originalContent && (
              <button
                onClick={restoreOriginal}
                className="mt-2 text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                還原原始內容
              </button>
            )}
          </div>

          {/* AI 建議區 */}
          {showAiSuggestion && (
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-md p-6 border-2 border-indigo-200">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-indigo-600" size={20} />
                <span className="font-semibold text-gray-800">AI 建議內容</span>
              </div>
              <div className="bg-white p-4 rounded-lg mb-4 max-h-48 overflow-y-auto">
                <p className="text-gray-700 whitespace-pre-wrap">{aiSuggestion}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={applyAiSuggestion}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-all"
                >
                  套用這個版本
                </button>
                <button
                  onClick={cancelAiSuggestion}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-all"
                >
                  取消
                </button>
              </div>
            </div>
          )}

          {/* 圖片上傳區 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              上傳圖片
            </label>
            
            {!imagePreview ? (
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Image size={48} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">點擊上傳或拖曳圖片到這裡</p>
                <p className="text-xs text-gray-400 mt-1">支援 JPG, PNG 格式</p>
              </label>
            ) : (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="preview" 
                  className="w-full rounded-lg"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <label className="absolute bottom-2 right-2 bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg shadow-lg cursor-pointer transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  更換圖片
                </label>
              </div>
            )}
          </div>

          {/* AI 語氣轉換 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <Sparkles size={18} className="inline mr-2 text-indigo-600" />
              AI 語氣轉換
            </label>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => handleAiTransform('fb')}
                className="flex items-center justify-between p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Facebook className="text-blue-600" size={24} />
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">FB 專業版</div>
                    <div className="text-xs text-gray-500">正式、詳細、適合公告</div>
                  </div>
                </div>
                <Sparkles className="text-blue-400 group-hover:text-blue-600" size={20} />
              </button>

              <button
                onClick={() => handleAiTransform('ig')}
                className="flex items-center justify-between p-4 border-2 border-pink-200 rounded-lg hover:border-pink-400 hover:bg-pink-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Instagram className="text-pink-600" size={24} />
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">IG 網美版</div>
                    <div className="text-xs text-gray-500">活潑、emoji、有hashtag</div>
                  </div>
                </div>
                <Sparkles className="text-pink-400 group-hover:text-pink-600" size={20} />
              </button>

              <button
                onClick={() => handleAiTransform('threads')}
                className="flex items-center justify-between p-4 border-2 border-gray-300 rounded-lg hover:border-gray-500 hover:bg-gray-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <AtSign className="text-gray-800" size={24} />
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">Threads 對話版</div>
                    <div className="text-xs text-gray-500">輕鬆、隨性、像在閒聊</div>
                  </div>
                </div>
                <Sparkles className="text-gray-400 group-hover:text-gray-600" size={20} />
              </button>
            </div>
          </div>

          {/* 選擇發布平台 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              選擇發布平台
            </label>
            <div className="space-y-3">
              {platforms.map(platform => {
                const Icon = platform.icon;
                const isSelected = selectedPlatforms.includes(platform.id);
                return (
                  <label 
                    key={platform.id}
                    className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => togglePlatform(platform.id)}
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className={`${platform.color} p-2 rounded-lg text-white`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{platform.name}</div>
                      <div className="text-xs text-gray-500">{platform.followers.toLocaleString()} 粉絲</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* 右側:預覽區 */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-md p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              即時預覽
            </label>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setPreviewPlatform('fb')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  previewPlatform === 'fb'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Facebook
              </button>
              <button
                onClick={() => setPreviewPlatform('ig')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  previewPlatform === 'ig'
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Instagram
              </button>
              <button
                onClick={() => setPreviewPlatform('threads')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  previewPlatform === 'threads'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Threads
              </button>
            </div>
            <div className="flex justify-center">
              <PhonePreview 
                platform={previewPlatform} 
                content={content}
                imageUrl={imagePreview}
              />
            </div>
          </div>

          {/* 發布選項 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              發布方式
            </label>
            <div className="space-y-3 mb-4">
              <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-300 transition-all">
                <input
                  type="radio"
                  name="publishType"
                  value="now"
                  checked={publishType === 'now'}
                  onChange={(e) => setPublishType(e.target.value)}
                  className="w-4 h-4 text-indigo-600"
                />
                <div>
                  <div className="font-semibold text-gray-800">立即發布</div>
                  <div className="text-xs text-gray-500">馬上發布到選擇的平台</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-300 transition-all">
                <input
                  type="radio"
                  name="publishType"
                  value="schedule"
                  checked={publishType === 'schedule'}
                  onChange={(e) => setPublishType(e.target.value)}
                  className="w-4 h-4 text-indigo-600"
                />
                <div>
                  <div className="font-semibold text-gray-800">排程發布</div>
                  <div className="text-xs text-gray-500">選擇日期時間自動發布</div>
                </div>
              </label>
            </div>

            {publishType === 'schedule' && (
              <div className="grid grid-cols-2 gap-3 mb-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">日期</label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">時間</label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button 
                onClick={handlePublish}
                disabled={selectedPlatforms.length === 0}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl shadow-lg transition-all"
              >
                {publishType === 'now' ? '立即發布' : '設定排程'}
              </button>
              <button 
                onClick={handleSaveDraft}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all"
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">平台設定</h2>
        <p className="text-gray-600">連結您的 Meta 平台帳號,開始管理社群內容</p>
      </div>

      {/* 連結狀態總覽 */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold mb-1">連結狀態</h3>
            <p className="text-indigo-100 text-sm">
              已連結 {platforms.filter(p => p.connected).length} / {platforms.length} 個平台
            </p>
          </div>
          <div className="bg-white/20 rounded-full p-4">
            <Settings size={32} />
          </div>
        </div>
        <div className="flex gap-2">
          {platforms.map(platform => {
            const Icon = platform.icon;
            return (
              <div 
                key={platform.id}
                className={`flex-1 p-3 rounded-lg ${
                  platform.connected ? 'bg-white/30' : 'bg-white/10'
                }`}
              >
                <Icon size={20} className="mb-1" />
                <div className="text-xs font-medium">
                  {platform.connected ? '已連結' : '未連結'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 各平台連結卡片 */}
      <div className="grid grid-cols-1 gap-6">
        {platforms.map(platform => {
          const Icon = platform.icon;
          const steps = getConnectionSteps(platform.id);
          const isConnecting = connectingPlatform === platform.id;

          return (
            <div key={platform.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className={`${platform.color} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Icon size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{platform.name}</h3>
                      {platform.connected && (
                        <p className="text-white/80 text-sm mt-1">
                          {platform.followers.toLocaleString()} 位粉絲
                        </p>
                      )}
                    </div>
                  </div>
                  {platform.connected && (
                    <div className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                      <Check size={18} />
                      <span className="font-medium">已連結</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                {!platform.connected ? (
                  <>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">連結步驟：</h4>
                      <ol className="space-y-2">
                        {steps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold">
                              {index + 1}
                            </span>
                            <span className="text-gray-700 text-sm">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <button
                      onClick={() => handleConnect(platform.id)}
                      disabled={isConnecting}
                      className={`w-full ${platform.color} hover:opacity-90 disabled:opacity-50 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2`}
                    >
                      {isConnecting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          連接中...
                        </>
                      ) : (
                        <>
                          <ExternalLink size={20} />
                          連結 {platform.name}
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center mt-3">
                      點擊後將跳轉到 {platform.name} 進行授權
                    </p>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Check className="text-green-600 flex-shrink-0" size={20} />
                        <div>
                          <p className="text-green-800 font-medium mb-1">連結成功！</p>
                          <p className="text-green-700 text-sm">
                            您現在可以透過 ShopSync 管理 {platform.name} 的內容了
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-gray-600 text-sm mb-1">總粉絲數</div>
                        <div className="text-2xl font-bold text-gray-800">
                          {platform.followers.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-gray-600 text-sm mb-1">連結狀態</div>
                        <div className="text-lg font-semibold text-green-600">
                          運作中
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDisconnect(platform.id)}
                      className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 rounded-xl transition-all"
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
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">🔒 安全性保證</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• 我們使用 Meta 官方 OAuth 授權,不會儲存您的密碼</li>
              <li>• 您可以隨時在平台設定中解除連結</li>
              <li>• 所有資料傳輸都經過加密保護</li>
              <li>• 我們只會取得發文所需的最小權限</li>
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">排程日曆</h2>
        <p className="text-gray-600">規劃您的社群貼文行程</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">2026 年 2 月</h3>
          <button
            onClick={() => {
              setSelectedDate(new Date().getDate());
              setShowAddModal(true);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
          >
            <Plus size={18} />
            新增排程
          </button>
        </div>

        {/* 日曆表格 */}
        <div className="grid grid-cols-7 gap-2">
          {/* 星期標題 */}
          {weekDays.map(day => (
            <div key={day} className="text-center font-semibold text-gray-600 py-2">
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
                  className={`min-h-24 p-2 border rounded-lg transition-all ${
                    day
                      ? 'bg-white hover:shadow-md cursor-pointer'
                      : 'bg-gray-50'
                  } ${isToday ? 'border-indigo-500 border-2' : 'border-gray-200'}`}
                  onClick={() => handleDateClick(day)}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-semibold mb-1 ${
                        isToday ? 'text-indigo-600' : 'text-gray-700'
                      }`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {posts.map(post => (
                          <div
                            key={post.id}
                            className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded truncate"
                            title={post.content}
                          >
                            {post.content.substring(0, 10)}...
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })
          ))}
        </div>
      </div>

      {/* 本月排程列表 */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">本月所有排程</h3>
        <div className="space-y-3">
          {scheduledPosts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar size={48} className="mx-auto mb-3 opacity-50" />
              <p>還沒有任何排程</p>
              <p className="text-sm">點擊上方「新增排程」開始規劃</p>
            </div>
          ) : (
            scheduledPosts.map(post => (
              <div key={post.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                <div className="text-center min-w-[60px] bg-indigo-600 text-white rounded-lg p-2">
                  <div className="text-2xl font-bold">
                    {new Date(post.date).getDate()}
                  </div>
                  <div className="text-xs">
                    {new Date(post.date).toLocaleDateString('zh-TW', { month: 'short' })}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium mb-1">{post.content}</p>
                  <div className="flex gap-2 items-center">
                    <Clock size={14} className="text-gray-500" />
                    <span className="text-sm text-gray-600">{post.time || '10:00'}</span>
                    <div className="flex gap-1 ml-2">
                      {post.platforms.map(p => {
                        const platform = platforms.find(pl => pl.id === p);
                        if (!platform) return null;
                        const Icon = platform.icon;
                        return (
                          <div key={p} className={`${platform.color} p-1 rounded text-white`} title={platform.name}>
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
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 新增排程 Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">
                  新增排程 - 2 月 {selectedDate} 日
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setNewPost({ content: '', platforms: ['fb', 'ig', 'threads'], time: '10:00' });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* 貼文內容 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  貼文內容
                </label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="輸入要發布的內容..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
              </div>

              {/* 發布時間 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  發布時間
                </label>
                <input
                  type="time"
                  value={newPost.time}
                  onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* 選擇平台 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  選擇發布平台
                </label>
                <div className="space-y-2">
                  {platforms.map(platform => {
                    const Icon = platform.icon;
                    const isSelected = newPost.platforms.includes(platform.id);
                    return (
                      <label
                        key={platform.id}
                        className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          isSelected
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => togglePlatform(platform.id)}
                          className="w-5 h-5 text-indigo-600 rounded"
                        />
                        <div className={`${platform.color} p-2 rounded text-white`}>
                          <Icon size={18} />
                        </div>
                        <span className="font-medium text-gray-800">{platform.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewPost({ content: '', platforms: ['fb', 'ig', 'threads'], time: '10:00' });
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all"
              >
                取消
              </button>
              <button
                onClick={handleAddPost}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all"
              >
                確認新增
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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-4 md:p-8 pb-24 lg:pb-8">
        <div className="max-w-7xl mx-auto">
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
