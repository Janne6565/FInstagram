<?php
    $notAllowed = array('"', '<', '>', "'", '\\');
    $nachname = str_replace($notAllowed, '', $_GET["Nachname"]);
    $vorname = str_replace($notAllowed, '', $_GET["Vorname"]);
    $geburtsdatum = str_replace($notAllowed, '', $_GET["Geburtsdatum"]);
    $bio = str_replace($notAllowed, '', $_GET["Bio"]);
    $email = str_replace($notAllowed, '', $_GET["Email"]);
    $username = str_replace($notAllowed, '', $_GET["Username"]);
    $password = password_hash(str_replace($notAllowed, '', $_GET["Password"]), PASSWORD_DEFAULT);
    $key = rand(100000000, 999999999);

    $db_benutzer = '';
    $db_passwort = '';
    $db_name = '';
    $db_server = '';

    $conn = new mysqli($db_server, $db_benutzer, $db_passwort, $db_name);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "INSERT INTO `User`(`Username`, `Nachname`, `Vorname`, `Geburtsdatum`, `VerificationState`, `Bio`, `Email`, `Password`, `AuthCode`) VALUES ('".$username."', '".$nachname."', '".$vorname."', '".$geburtsdatum."', false, '".$bio."', '".$email."', '". $password."', '".$key."')";
    $resUser = $conn->query($sql);
    $sqlGetId = "SELECT * FROM `User` WHERE Email = '".$email."' AND AuthCode = '".$key."' AND Password = '".$password."'";
    $resId = $conn->query($sqlGetId);
    $id = 0;
    foreach ($resId as $ids) {
        $id = $ids['ID'];
    }
    if ($id != null) {
        echo json_encode(["Query"=>$sql, "AuthCode"=>$key, "Id"=>$id]);
    }