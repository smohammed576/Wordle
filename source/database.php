<?php
    function database_connect(){
        $connection = new mysqli('localhost', 'root', '', 'database');
        return $connection;
    }