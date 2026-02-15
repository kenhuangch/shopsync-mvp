# ShopSync - 部署指南

## 🚀 快速部署到 Vercel (推薦)

### 方法一：從 GitHub 自動部署

1. **推送代碼到 GitHub**
   ```bash
   git remote add origin https://github.com/你的用戶名/shopsync-mvp.git
   git branch -M main
   git push -u origin main
   ```

2. **連接 Vercel**
   - 前往 https://vercel.com
   - 點擊 "New Project"
   - Import 您的 GitHub 倉庫
   - Vercel 會自動偵測到 Vite 專案
   - 點擊 "Deploy"

3. **完成！**
   - 幾分鐘後您的應用就會上線
   - Vercel 會給您一個 `.vercel.app` 網址

### 方法二：使用 Vercel CLI

```bash
# 安裝 Vercel CLI
npm install -g vercel

# 在專案目錄執行
vercel

# 跟著提示操作即可
```

---

## 🌐 其他部署選項

### Netlify

1. 前往 https://app.netlify.com
2. 拖曳整個專案資料夾
3. 或連接 GitHub 倉庫
4. Build command: `npm run build`
5. Publish directory: `dist`

### GitHub Pages (需額外設定)

1. 安裝 gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. 修改 `package.json`:
   ```json
   {
     "homepage": "https://你的用戶名.github.io/shopsync-mvp",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. 修改 `vite.config.js`:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/shopsync-mvp/'
   })
   ```

4. 部署:
   ```bash
   npm run deploy
   ```

---

## 📋 部署前檢查清單

- [x] 所有依賴都在 package.json 中
- [x] 沒有使用環境變數（或已在 .env.example 說明）
- [x] 圖片路徑正確
- [x] build 指令可以成功執行 (`npm run build`)
- [x] 本地預覽正常 (`npm run preview`)

---

## 🔧 環境需求

- Node.js 16.x 或以上
- npm 7.x 或以上

---

## 🐛 常見問題

### Q: 部署後頁面空白？
A: 檢查瀏覽器控制台，可能是路徑問題。確保 `vite.config.js` 的 `base` 設定正確。

### Q: 圖片無法顯示？
A: 確保圖片放在 `public` 資料夾，或使用絕對路徑。

### Q: Build 失敗？
A: 刪除 `node_modules` 和 `package-lock.json`，重新 `npm install`。

---

## 📞 需要協助？

開一個 GitHub Issue，我們會盡快回覆！
