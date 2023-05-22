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

$id = $task->id;
$name = $task->name;
$description =$task->description;
$date =$task->date;

$sqlQuery = "UPDATE tasks SET name ='$name', description = '$description', date = '$date' where id = '$id'"; 

$result= $conecction->query($sqlQuery);

if($result){
    echo'se actualizo correctamente';
}else{
    echo'erro, no se pudo actuaizar';
}

//echo 'el registro se guardo correctamente';
