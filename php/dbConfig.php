<?php
require 'vendor/autoload.php';

$dbhost = "localhost";
$dbport = "5918";
$dbuser = "##########";
$dbpass = "##########";
$db_d = "red-kite-data-test";
$db_u = "red_kite_users";


//Connect to Mongo Server and database
try{
    $conn = new MongoDB\Client("mongodb://".$dbhost.":".$dbport);
}
catch (Exception $e) {
    echo "Could not connect:" . $e->getMessage();
    exit;
}

?>
