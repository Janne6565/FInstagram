<?php 

    $notAllowed = array('"', '<', '>', "'", '\\');
    $userId = str_replace($notAllowed, '', $_GET["UserId"]);

    $db_benutzer = '';
    $db_passwort = '';
    $db_name = '';
    $db_server = '';

    $conn = new mysqli($db_server, $db_benutzer, $db_passwort, $db_name);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM Post WHERE Post.UserId = ".$userId;
    $res = $conn->query($sql);
    $arrayRes = [];
    foreach ($res as $post) {
        array_push($arrayRes, $post);
    }
    echo json_encode(["Result"=>$arrayRes, "Query"=>$sql]);
    $found = 1;