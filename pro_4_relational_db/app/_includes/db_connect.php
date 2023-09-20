<?php

/*$host = "localhost:3306";
$user = "sara67";
$pass = "*Hg2u7w17";
$db = "sara67_water_db";

$link = mysqli_connect($host, $user, $pass, $db);

$db_response = [];
$db_response['success'] = 'not set';

if (!$link) {
    $db_response['success'] = false;
} else {
    $db_response['success'] = true;
}*/

//I don't know why the above didn't work....

$hostname = "localhost:3306";
$username = "sara67";
$password = "*Hg2u7w17";
$database = "sara67_water_db";

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
