<?php
    include_once '../source/database.php';
    $connection = database_connect();
    $name = $_GET['name'];
    $image = $_GET['image'];
    $password = $_GET['password'];
    echo $password;
    $sql = "SELECT name, image, password FROM users WHERE name=? AND password=?;";
    $statement = $connection->prepare($sql);
    $statement->bind_param('ss',
        $name,
        $password
    );
    $statement->execute();
    $result = $statement->get_result();
    
    if($result->num_rows > 0){
        echo "hellooo";
    }
    else{
        $q = "INSERT INTO users (name, image, password) VALUES (?, ?, ?);";
        $stmt = $connection->prepare($q);
        $stmt->bind_param('sss', 
            $name,
            $image,
            $password
        );
        $stmt->execute();
    }
?>