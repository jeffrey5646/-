@echo off
chcp 65001 >nul
echo ========================================
echo   邻加管理平台 - GitHub 快速部署脚本
echo ========================================
echo.

REM 检查是否已初始化 Git
if not exist .git (
    echo [1/5] 初始化 Git 仓库...
    git init
    echo ✓ Git 仓库初始化完成
    echo.
) else (
    echo [1/5] Git 仓库已存在，跳过初始化
    echo.
)

echo [2/5] 添加所有文件...
git add .
echo ✓ 文件添加完成
echo.

echo [3/5] 提交更改...
set /p commit_msg="请输入提交说明（直接回车使用默认）: "
if "%commit_msg%"=="" set commit_msg=更新代码
git commit -m "%commit_msg%"
echo ✓ 提交完成
echo.

echo [4/5] 检查远程仓库...
git remote -v | findstr origin >nul
if errorlevel 1 (
    echo 未找到远程仓库，请输入 GitHub 仓库地址
    echo 格式: https://github.com/你的用户名/仓库名.git
    set /p repo_url="仓库地址: "
    git remote add origin %repo_url%
    echo ✓ 远程仓库添加完成
) else (
    echo ✓ 远程仓库已配置
)
echo.

echo [5/5] 推送到 GitHub...
echo 提示：如果是首次推送，需要输入 GitHub 用户名和 Personal Access Token
git branch -M main
git push -u origin main
echo.

if errorlevel 0 (
    echo ========================================
    echo   ✓ 部署成功！
    echo ========================================
    echo.
    echo 下一步：
    echo 1. 访问 https://vercel.com
    echo 2. 导入你的 GitHub 仓库
    echo 3. 点击 Deploy
    echo.
) else (
    echo ========================================
    echo   ✗ 部署失败
    echo ========================================
    echo.
    echo 可能的原因：
    echo 1. 未配置 Git 用户信息
    echo 2. GitHub Token 无效
    echo 3. 网络连接问题
    echo.
    echo 请查看错误信息并重试
    echo.
)

pause
