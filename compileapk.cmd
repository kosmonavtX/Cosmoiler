@echo off
echo --------------------------------------
echo Compile for Android
echo --------------------------------------

set retryNumber=0
set maxRetries=3

:RETRY
cmd /c "pgb unlock Android 269212"
cmd /c "pgb clone 2742181 > pgb.log 2>&1"
for /f %%a in ('type pgb.log ^| find /c /i "ECONNREFUSED"') do set err=%%a

if "%err%" EQU "0" GOTO YAY
set /a retryNumber=%retryNumber%+1
echo error %err% was encountered during installation attempt %retryNumber%
pause
if %retryNumber% LSS %maxRetries% (GOTO RETRY)
echo --------------------------------------
echo Compile apk failed (T_T)
echo --------------------------------------
EXIT /B 1

:YAY
call pgb download 2742181 Android

curl --upload-file cosmoiler-release.apk ftp://cosmoile:tdm900A2006@ftp.cosmoiler.ru/www/fw/android/

echo --------------------------------------
echo Compile apk success (T_T)
echo --------------------------------------
EXIT /B 0
pause