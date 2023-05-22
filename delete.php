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

$id = $_GET['id'];

$sqlQuery = "DELETE FROM tasks WHERE id = '$id' " ;

$result = $conecction->query($sqlQuery, PDO::FETCH_OBJ);
if(!$result){
    echo'no se puede listar el contenido';
    die();
}

$task =[];
foreach($result as $item){
    $task[] = $item;
    //echo '<pre>';
    //print_r($task);
}

echo json_encode($task);