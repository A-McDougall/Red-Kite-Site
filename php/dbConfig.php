<?php
require 'vendor/autoload.php';

$dbhost = "localhost";
$dbport = "28017";
$dbuser = "redkiteuser";
$dbpass = "Heir2iok";
$db_d = "red-kite-data-test";
$db_u = "red_kite_users";

//Connect to Mongo Server and database
try{
    $conn = new MongoDB\Client("mongodb://".$dbuser.":".$dbpass."@".$dbhost.":".$dbport."/".$db_d);
}
catch (Exception $e) {
    echo "Could not connect:" . $e->getMessage();
    exit;
}

try{
    $conn_u = new MongoDB\Client("mongodb://".$dbuser.":".$dbpass."@".$dbhost.":".$dbport."/".$db_u);
}
catch (Exception $e) {
    echo "Could not connect:" . $e->getMessage();
    exit;
}


?>
