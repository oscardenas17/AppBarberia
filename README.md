# AppBarberia

--Instalar dependencias del package.json
  * npm i


  ( Fatal error: Uncaught Error: Call to undefined function mysqli_connect() in C:\Users\.........\AppSalon_fin\includes\database.php:3 Stack trace: #0 {main} thrown in C:\Users\........\AppSalon_fin\includes\database.php on line 3
  
  tienes que ir a tu archivo php.ini y quitar el ; de este texto:

    ;extension=php_mysqli.dll

solo lo quitas y guardas el archivo:

    extension=php_mysqli.dll

Si no encuentras esta linea busca este:

    ;extension=mysqli

y lo mismo, solo quitas y guardas:

    extension=mysqli)


// GULPFILE.JS 

const sass = require('gulp-dart-sass');


