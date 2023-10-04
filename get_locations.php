<?php

require_once "_includes/db_connect.php";

// GET selected activity column from query parameter
$selectedActivity = $_GET["activity"];

// check selected activity column (must be one of three options)
$validActivityColumns = ["swim", "boat_ramp", "non_moto_boats"];
if (!in_array($selectedActivity, $validActivityColumns)) {
    die("Invalid activity selected.");
}

// query to retrieve locations based on the selected activity column
$sql = "SELECT id, location, swim FROM waterdb WHERE $selectedActivity = 'yes'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $locations = [];
    while ($row = $result->fetch_assoc()) {
        $locations[] = $row;
    }
    echo json_encode(["locations" => $locations]);
} else {
    echo json_encode(["message" => "No locations found for the selected activity."]);
}

$conn->close();
