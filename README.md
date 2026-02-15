# ShopSync MVP

ShopSync 是一款專為台灣小店老闆設計的 Meta 平台社群管理工具。

## 🌐 線上 Demo

部署後的網址將會顯示在這裡。

## ✨ 主要功能

- 🎯 **AI 跨平台發文助手** - 一鍵將內容調整成 Facebook、Instagram、Threads 最適合的語氣
- 📅 **排程日曆** - 視覺化管理所有社群貼文排程
- 📊 **儀表板** - 快速瀏覽經營數據與平台連結狀態
- 🔗 **平台管理** - 輕鬆連結和管理 Meta 三大平台帳號
- 🔐 **登入系統** - 支援電子郵件和 Google OAuth 登入

## 🚀 快速開始

### 本地開發

```bash
# Clone 專案
git clone https://github.com/你的用戶名/shopsync-mvp.git
cd shopsync-mvp

# 安裝依賴
npm install

# 開發模式
npm run dev
```

在瀏覽器打開 http://localhost:5173

### 建置生產版本

```bash
npm run build
```

建置後的檔案會在 `dist` 目錄。

### 預覽生產版本

```bash
npm run preview
```

## 📦 部署

詳細部署指南請參考 [DEPLOYMENT.md](./DEPLOYMENT.md)

### 推薦部署平台

- **Vercel** - 一鍵部署，自動 CI/CD（推薦）
- **Netlify** - 簡單拖曳部署
- **GitHub Pages** - 免費靜態托管

## 🛠️ 技術棧

- **React 18** - UI 框架
- **Vite** - 快速建置工具
- **Tailwind CSS** - 樣式框架
- **Lucide React** - 圖標庫

## 📱 支援平台

- Facebook 粉絲專頁
- Instagram 商業帳號  
- Threads

## 🎨 功能特色

### AI 語氣轉換
- **FB 專業版** - 正式、詳細、適合公告
- **IG 網美版** - 活潑、emoji、有 hashtag
- **Threads 對話版** - 輕鬆、隨性、像在閒聊

### 即時預覽
在發布前就能看到貼文在各平台的真實呈現效果

### 排程發布
提前規劃內容，設定時間自動發布

### 登入系統
- 電子郵件 + 密碼登入
- Google 一鍵快速登入

## 📂 專案結構

```
shopsync-mvp/
├── src/
│   ├── App.jsx           # 主應用組件
│   ├── main.jsx          # React 入口
│   └── index.css         # Tailwind 樣式
├── public/               # 靜態資源
├── index.html            # HTML 模板
├── package.json          # 依賴配置
├── vite.config.js        # Vite 配置
└── tailwind.config.js    # Tailwind 配置
```

## 🔮 未來計劃

- [ ] 串接真實 Meta API
- [ ] 數據分析圖表
- [ ] 多語系支援
- [ ] 暗黑模式
- [ ] 更多社群平台支援

## 📄 授權

此專案為 MVP 原型，僅供展示使用。

## 👨‍💻 開發者

由 Claude 協助開發

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

---

**開始使用 ShopSync，讓社群經營更輕鬆！** 🚀
