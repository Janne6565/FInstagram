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

    $sql = "SELECT *, Story.ID AS StoryId FROM Story, Followings, User WHERE Followings.FollowerId = ".$id." && Story.UserId = Followings.FollowedId && Story.UserId = User.ID";
    $res = $conn->query($sql);

    $arrayRes = [];
    foreach ($res as $user) {
        array_push($arrayRes, $user);
    }
    echo json_encode(["Data"=>$arrayRes, "Query"=>$sql]);