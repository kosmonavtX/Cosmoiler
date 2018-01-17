set _path = ..\..\..\Phonegap\Cosmoiler\www
set cur = %cd%

copy .\dist\app.css ..\..\..\Phonegap\Cosmoiler\www\app.css
copy .\dist\app.js ..\..\..\Phonegap\Cosmoiler\www\app.js
copy .\dist\vendor.js ..\..\..\Phonegap\Cosmoiler\www\vendor.js
copy .\dist\manifest.js ..\..\..\Phonegap\Cosmoiler\www\manifest.js
copy .\src\css\fontello-embedded.css ..\..\..\Phonegap\Cosmoiler\www\fontello-embedded.css

cd ..\..\..\Phonegap\Cosmoiler\

git status
pause
git commit -m "update" -a
git push
