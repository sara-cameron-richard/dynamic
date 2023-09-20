<?php
/*require_once "_includes/db_connect.php";

$sql = "SELECT location_opinions.*, waterdb.location
        FROM location_opinions
        INNER JOIN waterdb ON location_opinions.location_id = waterdb.id
        ORDER BY location_opinions.created_at DESC";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $opinions = [];
    while ($row = $result->fetch_assoc()) {
        $opinions[] = $row;
    }
    echo json_encode(["opinions" => $opinions]);
} else {
    echo json_encode(["message" => "No location opinions available."]);
}

$conn->close();*/
