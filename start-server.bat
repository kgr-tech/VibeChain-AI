@echo off
echo ========================================
echo  Vibechain AI - Dev Server Startup
echo ========================================
echo.

cd /d "d:\Vibechain AI"

:: Refresh PATH to include newly installed Node.js
set PATH=%PATH%;C:\Program Files\nodejs;%APPDATA%\npm

echo Verifying Node.js installation...
node --version
npm --version

echo.
echo Installing dependencies...
call npm install

echo.
echo Starting development server...
call npm run dev

pause
