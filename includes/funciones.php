<?php

function obtenerServicios() : array{
    try {
        
        //Importar la conexión
        require 'database.php';
        $db->set_charset("utf8");
        
        //Escribir code SQL
        $sql = "SELECT * FROM servicios;";
        $consulta = mysqli_query($db , $sql);

         // obtener data
         //arreglo vacio
         $servicios = [];
            $i = 0;

       while($row = mysqli_fetch_assoc($consulta)) {
           $servicios[$i]['id'] = $row['id'];
           $servicios[$i]['nombre'] = $row['nombre'];
           $servicios[$i]['precio'] = $row['precio'];

           $i++;

        //    echo "<pre>";
        //    var_dump($servicios);
        //    echo "</pre>";
       }
    //    echo json_last_error_msg();
       return $servicios;

    } catch (\Throwable $th) {
        //throw $th;

        var_dump($th);

    }
}

obtenerServicios();