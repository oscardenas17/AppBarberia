<?php

$db = mysqli_connect(
    'localhost', 
    'root', 
    '', 
    'appsalon' );

if(!$db){
    echo 'error en la conexión';
}else{
    // echo 'conexión';
}