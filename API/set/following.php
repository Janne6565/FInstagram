<?php 
    header("Access-Control-Allow-Origin: *");
    $notAllowed = array('"', '<', '>', "'", '\\');
    $key = str_replace($notAllowed, '', $_GET["Key"]);
    $id = str_replace($notAllowed, '', $_GET["ID"]);
    $userId = str_replace($notAllowed, '', $_GET["UserId"]);
    $state = str_replace($notAllowed, '', $_GET["State"]);
    $date = date("y-m-d");

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
            $found = 1;
            $sql = "";
            if ($state == "True" || $state == "1" || $state == 1 || $state == true || $state == 1) {
                $sql = "INSERT INTO Followings (`FollowerId`, `FollowedId`, `Date`) VALUES ('".$id."','".$userId."', '".$date."')";
            } else {
                $sql = "DELETE FROM Followings WHERE FollowerId = ".$id." AND FollowedId = ".$userId;
            }

            $res = $conn->query($sql);
        }
    } 
    if ($found == 0) {
        echo json_encode(["Result"=>"Failure", "Query"=>$sql]);
    } else {
        echo json_encode(["Result"=>"Success", "Query"=>$sql]);
    }