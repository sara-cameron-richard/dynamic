<?php

require_once "_includes/db_connect.php";

$records = [];
$insertedRows = 0;

try {
    if (!isset($_REQUEST['name']) || !isset($_REQUEST['email']) || !isset($_REQUEST['borough']) || !isset($_REQUEST['favourite_place']) || !isset($_REQUEST['swim']) || !isset($_REQUEST['swim_y']) || !isset($_REQUEST['sports']) || !isset($_REQUEST['sports_y'])) {
        throw new Exception("Required data is missing, such as: name, email, borough, favourite_place, swim, swim_y, sports, sports_y");
    }

    $query = "INSERT INTO pro2ex1 (name, email, borough, favourite_place, swim, swim_y, sports, sports_y, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    if ($stmt = mysqli_prepare($link, $query)) {
        mysqli_stmt_bind_param($stmt, "sssssssss", $_REQUEST['name'], $_REQUEST['email'], $_REQUEST['borough'], $_REQUEST['favourite_place'], $_REQUEST['swim'], $_REQUEST['swim_y'], $_REQUEST['sports'], $_REQUEST['sports_y'], $_REQUEST['timestamp']);
        mysqli_stmt_execute($stmt);
        $insertedRows = mysqli_stmt_affected_rows($stmt);

        if ($insertedRows > 0) {
            $records[] = [
                "insertRows" => $insertedRows,
                "id" => $link->insert_id,
                "name" => $_REQUEST['name'],
                'email' => $_REQUEST['email'],
                'borough' => $_REQUEST['borough'],
                'favourite_place' => $_REQUEST['favourite_place'],
                'swim' => $_REQUEST['swim'],
                'swim_y' => $_REQUEST['swim_y'],
                'sports' => $_REQUEST['sports'],
                'sports_y' => $_REQUEST['sports_y'],
                'timestamp' => $_REQUEST['timestamp']
            ];
        }else{
            throw new Exception("Could not insert new row."); 
        }

        //echo json_encode($records);

    }else{
        throw new Exception("Could not insert new record.");
    }

} catch (Exception $error) {
    $records[] =["error" => $error->getMessage()];

} finally {
    echo json_encode($records);
}
