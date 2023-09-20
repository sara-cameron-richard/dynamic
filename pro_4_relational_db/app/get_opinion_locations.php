<?php
require_once "_includes/db_connect.php";

$sql = "SELECT id, location FROM waterdb"; 
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $locations = [];
    while ($row = $result->fetch_assoc()) {
        $locations[] = $row;
    }
    echo json_encode(["locations" => $locations]);
} else {
    echo json_encode(["message" => "No locations available for opinions."]);
}

$conn->close();
