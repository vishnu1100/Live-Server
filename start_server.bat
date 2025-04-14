@echo off
title Node.js Server with Ngrok Tunnel
echo Starting Node.js server...
start cmd /k "node server.js"
timeout /t 3 >nul
echo Starting cloudflared tunnel...
start cmd /k "cloudflared tunnel --url http://localhost:3000
"
