<?php

    $notAllowed = array('"', '<', '>', "'", '\\');
    $id = str_replace($notAllowed, '', $_GET["ID"]);
    $db_benutzer = 'dbu2842818';
    $db_passwort = 'finstagram';
    $db_name = 'dbs5493765';
    $db_server = 'rdbms.strato.de';

    $conn = new mysqli($db_server, $db_benutzer, $db_passwort, $db_name);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM Story WHERE Story.UserId = ".$id;
    $res = $conn->query($sql);

    $arrayRes = [];
    foreach ($res as $user) {
        array_push($arrayRes, $user);
    }
    echo json_encode(["Data"=>$arrayRes, "Query"=>$sql]);