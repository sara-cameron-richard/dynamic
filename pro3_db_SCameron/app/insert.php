<?php

require_once "_includes/db_connect.php";
//records array to pass results back via json
$records = [];
//track how many rows we have inserted
$insertedRows = 0;


$query = "INSERT INTO pro2ex1 (name, email, borough, favourite_place, swim, swim_y, sports, sports_y, timestamp) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

if ($stmt = mysqli_prepare($link, $query)) {
    // Bind variables to the prepared statement as parameters
    mysqli_stmt_bind_param($stmt, "sssssssss", $_REQUEST['name'], $_REQUEST['email'], $_REQUEST['borough'], $_REQUEST['favourite_place'], $_REQUEST['swim'], $_REQUEST['swim_y'], $_REQUEST['sports'], $_REQUEST['sports_y'], $_REQUEST['timestamp']);

    mysqli_stmt_execute($stmt);
    $insertedRows = mysqli_stmt_affected_rows($stmt);

    if ($insertedRows > 0) {
        $records[] = [
            "insertRows" => $insertedRows,
            "id" => $link->insert_id,
            "name" => $_REQUEST['name']
        ];
    }

    echo json_encode($records);
}

?>

//test INSERT with:
//https://sara67.web582.com/dynamic/pro2_db/app/insert.php?name=Michel&email=mstjean@gmail.com&borough=PAT&favourite_place=Marina%20Montreal&swim=yes&swim_y=St.Laurence%20River&sports=yes&sports_y=St.Laurence%20River