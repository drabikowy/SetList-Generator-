<?php

//echo 'test!';

//host, user, passs, db
$mysqli = new mysqli("localhost", "root", "", "generator_ksb");
if(!$mysqli->connect_errno) {

    //wymuszam utf8
    $mysqli->query("set names 'utf8'");

    if ($result = $mysqli->query("SELECT * FROM songs")) {

        $data = array();
        while ($row = $result->fetch_object()){
            $data['songs'][] = $row;
        }

        echo json_encode($data);

        $result->close();
    }

} else {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$mysqli->close();
