@echo off
echo ========================================
echo  Pushing to GitHub: VibeChain-AI
echo ========================================
echo.

cd /d "d:\Vibechain AI"

echo Configuring remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/kgr-tech/VibeChain-AI.git

echo.
echo Current branch status:
git branch -M main
git status

echo.
echo Pushing to GitHub...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo  Push failed! Trying force push...
    echo ========================================
    echo.
    git push -u origin main --force
)

echo.
echo ========================================
echo  Done! Check your repository at:
echo  https://github.com/kgr-tech/VibeChain-AI
echo ========================================
echo.

pause
