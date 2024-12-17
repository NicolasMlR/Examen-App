@echo off
:: Obtener la IP local de la máquina
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /i "IPv4"') do set IP=%%i

:: Eliminar espacios adicionales
set IP=%IP: =%

:: Verificar si se encontró la IP
if "%IP%"=="" (
    echo No se pudo obtener la IP.
    pause
    exit /b
)

:: Mostrar la IP obtenida
echo IP Local obtenida: %IP%

:: 1. Modificar el archivo angular.json con la IP local
echo Modificando angular.json para que use la IP local como host...
powershell -Command "(Get-Content 'C:\Users\cetecom\Downloads\send\prueba_nicolasyfran\angular.json') -replace '\"host\": \"localhost\"', '\"host\": \"%IP%\"' | Set-Content 'C:\Users\cetecom\Downloads\send\prueba_nicolasyfran\angular.json'"

:: 2. Iniciar json-server en el puerto 3000 (base de datos)
echo Iniciando json-server en el puerto 3000...
start /b json-server --watch db.json --port 3000

:: 3. Iniciar el servidor de Angular
echo Iniciando servidor Angular en http://%IP%:4200...
start /b ng serve --host %IP% --port 4200

:: Pausar para verificar si todo está funcionando
pause
