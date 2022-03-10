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

    $sql = "SELECT *, Post.Bio as PostBio, Post.ID as PostId FROM Post JOIN User ON Post.UserId = User.ID WHERE Post.Bio LIKE '%".$search."%' OR Text LIKE '%".$search."%'";
    $res = $conn->query($sql);
    $arrayRes = [];
    foreach ($res as $post) {
        $user["Password"] = "Censored";
        $user["AuthCode"] = "Censored";
        array_push($arrayRes, $post);
    }
    echo json_encode(["Result"=>$arrayRes, "Query"=>$sql]);