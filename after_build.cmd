@echo off

echo --------------------------------------
echo Run Build
echo --------------------------------------
call npm run build

pause

echo --------------------------------------
echo Upload files
echo --------------------------------------

copy .\dist\app.css ..\Phonegap\Cosmoiler\www\app.css
copy .\dist\app.js ..\Phonegap\Cosmoiler\www\app.js
copy .\dist\vendor.js ..\Phonegap\Cosmoiler\www\vendor.js
copy .\dist\manifest.js ..\Phonegap\Cosmoiler\www\manifest.js
copy .\src\css\fontello-embedded.css ..\Phonegap\Cosmoiler\www\fontello-embedded.css

curl --upload-file .\dist\app.css.gz ftp://cosmoile:tdm900A2006@ftp.cosmoiler.ru/www/fw/spiffs/
curl --upload-file .\dist\app.js.gz ftp://cosmoile:tdm900A2006@ftp.cosmoiler.ru/www/fw/spiffs/
curl --upload-file .\dist\vendor.js ftp://cosmoile:tdm900A2006@ftp.cosmoiler.ru/www/fw/spiffs/
curl --upload-file .\dist\manifest.js ftp://cosmoile:tdm900A2006@ftp.cosmoiler.ru/www/fw/spiffs/
curl --upload-file .\dist\manifest.cache ftp://cosmoile:tdm900A2006@ftp.cosmoiler.ru/www/fw/spiffs/

bin2c -d _appcssgz.h -o _appcssgz.c -n _appcssgz .\dist\app.css.gz
bin2c -d _appjsgz.h -o _appjsgz.c -n _appjsgz .\dist\app.js.gz
bin2c -d _indexhtm.h -o _indexhtm.c -n _indexhtm .\dist\index.htm
bin2c -d _manifestcache.h -o _manifestcache.c -n _manifestcache .\dist\manifest.cache
bin2c -d _manifestjs.h -o _manifestjs.c -n _manifestjs .\dist\manifest.js
bin2c -d _vendorjs.h -o _vendorjs.c -n _vendorjs .\dist\vendor.js.gz

move *.h ..\..\Firmware\cosmoiler-workspace\cosmoiler\Trubleshooting
move *.c ..\..\Firmware\cosmoiler-workspace\cosmoiler\Trubleshooting

pause 

echo --------------------------------------
echo Send to GIT
echo --------------------------------------

git status
set /p comment="Comment: "

git commit -m "%comment%" -a
rem bitbucket
git push origin2 master

copy .\dist\app.css.gz ..\..\Firmware\cosmoiler-workspace\Cosmoiler\SPIFFS\Common\app.css.gz
copy .\dist\app.js.gz ..\..\Firmware\cosmoiler-workspace\Cosmoiler\SPIFFS\Common\app.js.gz
copy .\dist\vendor.js ..\..\Firmware\cosmoiler-workspace\Cosmoiler\SPIFFS\Common\vendor.js
copy .\dist\manifest.js ..\..\Firmware\cosmoiler-workspace\Cosmoiler\SPIFFS\Common\manifest.js

cd ..\Phonegap\Cosmoiler\

git status
pause
git commit -m "%comment%" -a

rem github
git push origin master

pause

echo --------------------------------------
echo Compile for Android
echo --------------------------------------

cd ..\..\ver3\

call pgb unlock Android 269212
call pgb clone 2742181
call pgb download 2742181 Android

curl --upload-file cosmoiler-release.apk ftp://cosmoile:tdm900A2006@ftp.cosmoiler.ru/www/fw/android/
pause

