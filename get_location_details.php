<?php

require_once "_includes/db_connect.php";

// GET selected location from query parameter
$locationID = $_GET["location"];

// query to retrieve all columns based on chosen location
$sql = "SELECT * FROM waterdb WHERE id = '$locationID'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $locationDetails = $result->fetch_assoc();
    echo json_encode(["locationDetails" => $locationDetails]);
} else {
    echo json_encode(["message" => "Location not found."]);
}

$conn->close();
