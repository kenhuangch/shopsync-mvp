# 推送到 GitHub 指南

## 📝 步驟

### 1. 在 GitHub 上創建新倉庫

1. 前往 https://github.com/new
2. Repository name: `shopsync-mvp` (或您喜歡的名稱)
3. Description: `Meta 平台社群管理工具 MVP`
4. 選擇 **Public** 或 **Private**
5. ⚠️ **不要**勾選以下選項:
   - [ ] Add a README file
   - [ ] Add .gitignore
   - [ ] Choose a license
6. 點擊 **Create repository**

### 2. 連接本地倉庫到 GitHub

複製 GitHub 給您的倉庫 URL，然後執行:

```bash
# 添加遠端倉庫 (替換成您的 GitHub 用戶名)
git remote add origin https://github.com/你的用戶名/shopsync-mvp.git

# 檢查遠端倉庫
git remote -v

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 3. 驗證推送成功

回到 GitHub 倉庫頁面，重新整理，您應該會看到所有檔案。

---

## 🚀 自動部署到 Vercel

### 方法 A: 從 GitHub 自動部署 (推薦)

1. 前往 https://vercel.com/new
2. 點擊 "Import Git Repository"
3. 授權 Vercel 存取您的 GitHub
4. 選擇 `shopsync-mvp` 倉庫
5. 保持預設設定 (Vercel 會自動偵測 Vite)
6. 點擊 **Deploy**
7. 等待 2-3 分鐘
8. ✅ 完成！您會得到一個 `.vercel.app` 網址

### 方法 B: 使用 Vercel CLI

```bash
# 安裝 Vercel CLI (如果還沒安裝)
npm install -g vercel

# 登入
vercel login

# 部署
vercel --prod
```

---

## 🔄 未來更新流程

當您修改代碼後:

```bash
# 1. 提交變更
git add .
git commit -m "更新功能說明"

# 2. 推送到 GitHub
git push

# 3. Vercel 會自動重新部署！(如果使用方法 A)
```

---

## 📋 檢查清單

推送前確認:

- [x] 所有檔案都已提交
- [x] build 測試通過 (`npm run build`)
- [x] 沒有敏感資訊 (API keys, 密碼等)
- [x] README.md 已更新

---

## 💡 小技巧

### 查看目前的 Git 狀態
```bash
git status
```

### 查看提交歷史
```bash
git log --oneline -10
```

### 如果遠端倉庫已存在
```bash
git remote set-url origin https://github.com/你的用戶名/shopsync-mvp.git
```

---

## 🆘 遇到問題？

### 推送被拒絕
```bash
git pull origin main --rebase
git push
```

### 忘記遠端倉庫 URL
前往 GitHub 倉庫頁面，點擊綠色的 "Code" 按鈕查看。

---

準備好了嗎？開始推送吧！ 🚀
