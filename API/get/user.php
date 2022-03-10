<?php

    $notAllowed = array('"', '<', '>', "'", '\\');
    $id = str_replace($notAllowed, '', $_GET["ID"]);
    $password = str_replace($notAllowed, '', $_GET["Password"]);
    $email = str_replace($notAllowed, '', $_GET["Email"]);
    $key = str_replace($notAllowed, '', $_GET["Key"]);
    $db_benutzer = '';
    $db_passwort = '';
    $db_name = '';
    $db_server = '';

    $conn = new mysqli($db_server, $db_benutzer, $db_passwort, $db_name);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $sql = "";
    $userData = "";
    $userFound = false;
    $searchFor = "";
    if (isset($_GET["Email"])) {
        $sql = "SELECT * FROM `User` WHERE Email = '".$email."'";
        $res = $conn->query($sql);
        foreach ($res as $user) {
            if (isset($_GET["Password"])) {
                if (password_verify($password, $user["Password"])) {
                    $userData = $user;
                    $userFound = true;
                    $searchFor = "Password";
                }
            } elseif (isset($_GET["Key"])) {
                if ($key == $user["AuthCode"]) {
                    $userData = $user;
                    $searchFor = "Key";
                    $userFound = true;
                }
            }
        }
    }
    if (isset($_GET["ID"])) {
        $sql = "SELECT * FROM `User` WHERE ID = '".$id."'";
        $res = $conn->query($sql);
        foreach ($res as $user) {
            if (isset($_GET["Password"])) {
                if (password_verify($user["Password"], $password)) {
                    $userData = $user;
                    $userFound = true;
                    $searchFor = "Password";
                }
            } elseif (isset($_GET["Key"])) {
                if ($key == $user["AuthCode"]) {
                    $userData = $user;
                    $userFound = true;
                    $searchFor = "Key";
                }
            }
        }
    }
    echo json_encode(["Data"=>$userData, "Found"=>$userFound, "Query"=>$sql, "Searched"=>$searchFor]);