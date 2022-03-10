<?php

    $notAllowed = array('"', '<', '>', "'", '\\');
    $id = str_replace($notAllowed, '', $_GET["ID"]);
    $db_benutzer = '';
    $db_passwort = '';
    $db_name = '';
    $db_server = '';

    $conn = new mysqli($db_server, $db_benutzer, $db_passwort, $db_name);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT *, Post.Bio as PostBio FROM Post, User WHERE Post.ID = ".$id." AND User.ID = Post.UserId";
    $res = $conn->query($sql);

    $arrayRes = [];
    foreach ($res as $user) {
        $user["Password"] = "Sensored";
        $user["AuthKey"] = "Sensored";
        $arrayRes = $user;
    }
    echo json_encode(["Data"=>$arrayRes, "Query"=>$sql]);