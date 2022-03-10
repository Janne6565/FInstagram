<?php 

    $notAllowed = array('"', '<', '>', "'", '\\');
    $id = str_replace($notAllowed, '', $_GET["ID"]);
    $key = str_replace($notAllowed, '', $_GET["Key"]);

    $db_benutzer = '';
    $db_passwort = '';
    $db_name = '';
    $db_server = '';

    $conn = new mysqli($db_server, $db_benutzer, $db_passwort, $db_name);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sqlVerify = "SELECT COUNT(*) FROM User WHERE ID = ". $id ." AND AuthCode = ". $key;
    $resUser = $conn->query($sqlVerify);
    $found = 0;
    foreach ($resUser as $user) {
        if ($user['COUNT(*)'] > 0) {
            $sql = "SELECT *, Post.Bio as PostBio, Post.ID as PostId FROM Post, User, Followings WHERE User.ID = Followings.FollowedId AND Followings.FollowerId = ". $id . " AND Post.UserId = Followings.FollowedId";
            $res = $conn->query($sql);
            $arrayRes = [];
            foreach ($res as $post) {
                $post["AuthCode"] = "Censored";
                $post["Password"] = "Censored";
                array_push($arrayRes, $post);
            }
            echo json_encode(["Result"=>$arrayRes, "Query"=>$sql, "QueryVerifyUser"=>$sqlVerify]);
            $found = 1;
        }
    } 
    if ($found == 0) {
        echo json_encode(["Result"=>"Failure", "Error"=>"No User found", "Query"=>$sqlVerify]);
    }

    