#!/bin/bash

# 邻加管理平台部署脚本

echo "=== 开始构建邻加管理平台 ==="

# 1. 安装依赖
echo "1. 安装依赖..."
npm install

# 2. 构建项目
echo "2. 构建项目..."
npm run build

# 3. 检查构建结果
if [ -d "dist" ]; then
    echo "✅ 构建成功！"
    echo "构建文件位于: dist/"
    echo ""
    echo "=== 部署选项 ==="
    echo "选项 1: 使用 Nginx"
    echo "  - 将 dist/ 文件夹内容复制到 Nginx 的 html 目录"
    echo "  - 配置 Nginx（参考 nginx.conf）"
    echo ""
    echo "选项 2: 使用 Node.js 静态服务器"
    echo "  - 运行: npx serve -s dist -p 3000"
    echo ""
    echo "选项 3: 使用 PM2 守护进程"
    echo "  - 运行: pm2 serve dist 3000 --name 邻加管理平台"
else
    echo "❌ 构建失败！"
    exit 1
fi
