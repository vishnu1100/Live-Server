@echo off
title Node.js Server with Ngrok Tunnel
echo Starting Node.js server...
start cmd /k "node server.js"
timeout /t 3 >nul
echo Starting Ngrok tunnel...
start cmd /k "ngrok http 3000"
