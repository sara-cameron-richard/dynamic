<?php

/*$hostname = "localhost:3306";
$username = "sara67";
$password = "*Hg2u7w17";
$database = "sara67_water_db";

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}*/

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
