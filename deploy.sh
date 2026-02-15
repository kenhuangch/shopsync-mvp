#!/bin/bash

# ShopSync 快速部署腳本

echo "🚀 ShopSync 部署助手"
echo "===================="
echo ""

# 檢查是否已安裝 Vercel CLI
if ! command -v vercel &> /dev/null
then
    echo "📦 Vercel CLI 未安裝"
    echo "正在安裝 Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI 已準備好"
echo ""

# 測試建置
echo "🔨 測試建置..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 建置成功！"
    echo ""
    
    # 詢問是否部署
    read -p "是否要立即部署到 Vercel? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
        echo "🚀 開始部署..."
        vercel --prod
        
        echo ""
        echo "✨ 部署完成！"
        echo "您的應用已經上線了！"
    else
        echo "取消部署。稍後可以執行 'vercel --prod' 來部署。"
    fi
else
    echo "❌ 建置失敗，請檢查錯誤訊息"
    exit 1
fi
