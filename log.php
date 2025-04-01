<?php

$valid_username = "admin";
$valid_password = "admin";


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    $username = $_POST['username'];
    $password = $_POST['password'];

   
    if ($username === $valid_username && $password === $valid_password) {
       
        header("Location: profile.html");
        exit(); 
    } else {
        echo "Invalid username or password.";
    }
}
?>

