@echo off
cd /d "%~dp0"
echo Starting Discord Clone...
start "Discord Clone Server" cmd /k "cd /d %~dp0 && npm run dev:server"
timeout /t 2 /nobreak >nul
start "Discord Clone App" cmd /k "cd /d %~dp0 && npm run dev:client"
echo.
echo Open in browser: http://localhost:5173
echo Keep both windows open while using the app.
pause
