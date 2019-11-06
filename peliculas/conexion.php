<?php
session_start();
function conectar($baseDeDatos)
    {
        $MySQL_host = "localhost";
        $MySQL_user = "usuario";
        $MySQL_password = "usuario";
        $conexion = new mysqli($MySQL_host, $MySQL_user, $MySQL_password, $baseDeDatos);
        
        if ($conexion->connect_error) {
            die("No ha podido realizarse la conexión");
        } else {
            echo "La conexion ha funcionado";
            return $conexion;
        }
    }
    ?>
