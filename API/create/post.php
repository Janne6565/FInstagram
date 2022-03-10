<?php 
    header("Access-Control-Allow-Origin: *");
    $notAllowed = array('"', '<', '>', "'", '\\');
    $key = str_replace($notAllowed, '', $_GET["Key"]);
    $id = str_replace($notAllowed, '', $_GET["ID"]);
    $type = str_replace($notAllowed, '', $_GET["Type"]);
    $bio = str_replace($notAllowed, '', $_GET["Bio"]);
    $text = str_replace($notAllowed, '', $_GET["Text"]);
    $mediaLink = str_replace($notAllowed, '', $_GET["MediaLink"]);
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
            $sql = "INSERT INTO `Post` (`UserId`, `Type`, `MediaLink`, `Text`, `Bio`, `Date`) VALUES ('".$id."', '".$type."', '".$mediaLink."', '".$text."', '".$bio."', '".$date."')";
            $res = $conn->query($sql);
        }
    }

    if ($found == 0) {
        echo json_encode(["Result"=>"Failure", "Query"=>$sql]);
    } else {
        echo json_encode(["Result"=>"Success", "Query"=>$sql]);
    }