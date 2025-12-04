@echo off
echo Installing html2canvas...
cd /d "d:\Vibechain AI"
"C:\Program Files\nodejs\npm.cmd" install html2canvas zod
echo.
echo Starting dev server...
"C:\Program Files\nodejs\npm.cmd" run dev
pause
