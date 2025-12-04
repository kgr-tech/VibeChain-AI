@echo off
echo Searching for Node.js installation...

REM Check common installation paths
set NODE_PATH=

if exist "C:\Program Files\nodejs\node.exe" (
    set NODE_PATH=C:\Program Files\nodejs
    goto :found
)

if exist "C:\Program Files (x86)\nodejs\node.exe" (
    set NODE_PATH=C:\Program Files (x86)\nodejs
    goto :found
)

if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" (
    set NODE_PATH=%LOCALAPPDATA%\Programs\nodejs
    goto :found
)

if exist "%APPDATA%\npm\node.exe" (
    set NODE_PATH=%APPDATA%\npm
    goto :found
)

echo Node.js not found in common locations.
echo Please install Node.js from https://nodejs.org
pause
exit /b 1

:found
echo Found Node.js at: %NODE_PATH%
echo Adding to PATH temporarily...
set PATH=%NODE_PATH%;%PATH%

echo.
echo Verifying Node.js installation...
node --version
npm --version

echo.
echo Installing dependencies...
npm install

echo.
echo Done! Press any key to exit.
pause
