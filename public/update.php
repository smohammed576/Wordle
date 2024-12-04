<?php
    include_once '../source/database.php';
    $connection = database_connect();
    $name = $_GET['name'];
    $password = $_GET['password'];
    $score = $_GET['score'];
    $plays = 1;
    $win = $_GET['win'];
    $guess = $_GET['guess'];
    $sql = "SELECT name, password, score, plays, wins, ".$guess." FROM users WHERE name=? AND password=?;";
    $statement = $connection->prepare($sql);
    $statement->bind_param('ss', 
        $name,
        $password
    );
    $statement->execute();
    $results = $statement->get_result();

    if($results->num_rows > 0){
        $row = $results->fetch_assoc();
        $updateScore = $row["score"] + $score;
        $updatePlays = $row["plays"] + $plays;
        $updateWins = $row["wins"] + $win;
        if($win > 0){
            $updateGuess = $row[$guess] + 1;
        }
        else{
            $updateGuess = $row["wins"] + 0;
        }

        $updateSql = "UPDATE users SET score=?, plays=?, wins=?, ".$guess."=? WHERE name=?;";
        $stmt = $connection->prepare($updateSql);
        $stmt->bind_param('iiiis', 
            $updateScore,
            $updatePlays,
            $updateWins,
            $updateGuess,
            $name
        );
        $stmt->execute();
    }
?>