<?php

function obtenerServicios(){
    try {
        
        //Importar la conexión
        require 'database.php';
        
        //Escribir code SQL
        $sql = "SELECT * FROM servicios; ";
        $consulta = mysqli_query($db , $sql);

        // obtener data
        echo "<pre>";
            var_dump( mysqli_fetch_assoc($consulta) );
        echo "</pre>";

    } catch (\Throwable $th) {
        //throw $th;

        var_dump($th);

    }
}

obtenerServicios();