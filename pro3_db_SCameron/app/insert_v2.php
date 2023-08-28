<?php

require_once "_includes/db_connect.php";

$records = [];
$insertedRows = 0;

try {
    if (!isset($_REQUEST['name']) || !isset($_REQUEST['email']) || !isset($_REQUEST['borough']) || !isset($_REQUEST['favourite_place'])) {
        throw new Exception("Required data is missing, such as: name, email, borough, favourite_place");
    }

    $query = "INSERT INTO pro2ex1 (name, email, borough, favourite_place) VALUES (?, ?, ?, ?)";

    if ($stmt = mysqli_prepare($link, $query)) {
        mysqli_stmt_bind_param($stmt, "ssss", $_REQUEST['name'], $_REQUEST['email'], $_REQUEST['borough'], $_REQUEST['favourite_place']);
        mysqli_stmt_execute($stmt);
        $insertedRows = mysqli_stmt_affected_rows($stmt);

        if ($insertedRows > 0) {
            $records[] = [
                "insertRows" => $insertedRows,
                "id" => $link->insert_id,
                "name" => $_REQUEST['name']
            ];
        } else {
            throw new Exception("Could not insert new row.");
        }

        //echo json_encode($records);

    } else {
        throw new Exception("Could not insert new record.");
    }
} catch (Exception $error) {
    $records[] = ["error" => $error->getMessage()];
} finally {
    echo json_encode($records);
}


