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

$sqlQuery = "SELECT * FROM tasks";

$result = $conecction->query($sqlQuery, PDO::FETCH_OBJ);
if(!$result){
    echo'no se puede istar e contenido';
    die();
}

$task =[];
foreach($result as $item){
    $task[] = $item;
    //echo '<pre>';
    //print_r($task);
}

echo json_encode($task);