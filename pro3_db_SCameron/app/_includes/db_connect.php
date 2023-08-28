<?php

$host = "localhost:3306";
$db = "sara67_pro2_ex1";
$user = "sara67_pro2_ex1";
$pass = "_6Bwy46k3";


$link = mysqli_connect($host, $user, $pass, $db);

$db_response = [];
$db_response['success'] = 'not set';

if (!$link) {
    $db_response['success'] = false;
} else {
    $db_response['success'] = true;
}
//comment out when live, put back when testing connection
//echo json_encode($db_response);
