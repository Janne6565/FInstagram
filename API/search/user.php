<?php 
    $notAllowed = array('"', '<', '>', "'", '\\');
    $search = str_replace($notAllowed, '', $_GET["Search"]);

    $db_benutzer = '';
    $db_passwort = '';
    $db_name = '';
    $db_server = '';

    $conn = new mysqli($db_server, $db_benutzer, $db_passwort, $db_name);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM User WHERE Username LIKE '%".$search."%' OR Vorname LIKE '%".$search."%' OR Nachname LIKE '%".$search."%' OR ID = '".$search."'";
    $res = $conn->query($sql);
    $arrayRes = [];
    foreach ($res as $user) {
        $user["Password"] = "Censored";
        array_push($arrayRes, $user);
    }
    echo json_encode(["Result"=> $arrayRes, "Query"=>$sql]);