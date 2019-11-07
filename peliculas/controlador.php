<?php
    require("conexion.php");
    //en funcion de la accion solicitada relaizaremos la acción correspondiente
    //AÑADIR
    if(isset($_POST['add'])){
        
        $conexion = conectar("2daw");
        $conexion->query("SET NAMES utf8");
    

    //deberiamos filtrar lo que recibimos de POST
    $titulo = $_POST['titulo'];
    $genero = $_POST['genero'];
    $director = $_POST['director'];
    $fecha = $_POST['fecha'];
    $sinopsis = $_POST['sinopsis'];
    $cartel = $_POST['cartel'];
    
    //insertamos lo recibido del formulario. Todos los varchar con comillas
    $consulta = "INSERT INTO peliculas (titulo,genero,director,fecha,sinopsis,cartel) VALUES ('$titulo','$genero','$director',$fecha,'$sinopsis','$cartel')";

   
    //si da error lo pintamos directamente, sino redireigiomos a index.php
    if(!$conexion->query($consulta)){
        echo "Error insertando ".$conexion->error;
    }else{
        $conexion->close();
        header("Location:index.php");
    }
}

//ELIMINAR
    if(isset($_GET['delete'])){
        echo "id de pelicula ".$_GET['delete'];
        
        $conexion = conectar("2daw");
        $consulta = "DELETE FROM peliculas WHERE id_pelicula =".$_GET['delete'];

        if(!$conexion->query($consulta)){
            echo "Error insertando ".$conexion->error;
        }else{
            $conexion->close();
            header("Location:index.php");

    }
}

//editar
    if(isset($_POST['edit'])){
        
        $idPelicula = $_POST['id_pelicula'];
        $titulo = $_POST['titulo'];
        $genero = $_POST['genero'];
        $director = $_POST['director'];
        $fecha = $_POST['fecha'];
        $sinopsis = $_POST['sinopsis'];
        $cartel = $_POST['cartel'];
        $conexion = conectar("2daw");
        $consulta = "UPDATE peliculas SET id_pelicula='$idPelicula' titulo='$titulo', genero='$genero', director='$direcor' fecha= $fecha sinopsis = '$sinopsis'";

        if(!$conexion->query($consulta)){
            echo "Error insertando ".$conexion->error;
        }else{
            $conexion->close();
            header("Location:index.php");

    }
}
?>