<?php
header("Access-Control-Allow-Origin:*");

$dsn = "mysql:dbname=todo;host=localhost";
$username = "root";
$password = "";

try{
$conecction = new PDO($dsn, $username, $password);
}catch(Exception $exception){
    print_r($exception);
}
//echo'conexion exitosa';
$content = file_get_contents("php://input");
$task =json_decode($content);

$name = $task->name;
$description =$task->description;
$date =$task->date;

$sqlQuery = "INSERT INTO tasks (name, description, date) VALUES ('$name', ' $description','$date')";

$result= $conecction->query($sqlQuery);

if($result){
    echo'se registro correctamente';
}else{
    echo'erro, no se pudo registrar';
}

//echo 'el registro se guardo correctamente';
