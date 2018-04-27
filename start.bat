if not "%minimized%"=="" goto :minimized
set minimized=true
@echo off

cd "C:\Desktop\NodeApp"

start /min cmd /C "nodemon index.js"
goto :EOF
:minimized