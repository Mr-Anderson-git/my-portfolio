<?php

$valid_username = "admin";  // Valid username
$valid_password = "admin";  // Valid password

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get form values
    $username = $_POST['fname'];  // The "name" attribute for the username input
    $password = $_POST['pass'];   // The "name" attribute for the password input

    // Validate username and password
    if ($username === $valid_username && $password === $valid_password) {
        // If credentials are correct, redirect to profile.html
        header("Location: profile.html");
        exit();  // Make sure no further code is executed after the redirect
    } else {
        // If credentials are incorrect, show an error message
        echo "Invalid username or password.";
    }
}
?>

