<?php
require_once "_includes/db_connect.php";

$locationId = $_GET["location_id"];
$opinionType = $_GET["opinion_type"];

if (!is_numeric($locationId) || ($opinionType !== "thumbs_up" && $opinionType !== "thumbs_down")) {
    echo json_encode(["success" => false, "message" => "Invalid input."]);
    exit();
}

// insert opinion into location_opinions tabel
$sql = "INSERT INTO location_opinions (location_id, opinion_type) VALUES (?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Database error."]);
    exit();
}

$stmt->bind_param("is", $locationId, $opinionType);
$result = $stmt->execute();
$stmt->close();

if ($result) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Error submitting opinion."]);
}
