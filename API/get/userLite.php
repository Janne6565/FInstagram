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

    $sql = "SELECT ID, Username, Nachname, Vorname, Geburtsdatum, Bio, VerificationState FROM User WHERE ID = ".$id;
    $res = $conn->query($sql);

    $arrayRes = [];
    foreach ($res as $user) {
        $arrayRes = $user;
    }
    echo json_encode(["Data"=>$arrayRes, "Query"=>$sql]);