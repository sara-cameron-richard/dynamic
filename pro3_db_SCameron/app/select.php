<?php

require_once "_includes/db_connect.php";

$statement = mysqli_prepare($link, "SELECT name, email, borough, favourite_place, swim, swim_y, sports, sports_y, timestamp FROM pro2ex1 ORDER BY timestamp DESC");

mysqli_stmt_execute($statement);
$queryOutput = mysqli_stmt_get_result($statement);

while ($row = mysqli_fetch_assoc($queryOutput)) {
    $records[] = $row;
}

echo json_encode($records);

mysqli_close($link);
