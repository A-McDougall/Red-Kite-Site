<?php
    session_start();
    if(isset($_SESSION['ulon'])){
        echo json_encode( array($_SESSION['ulon'], $_SESSION['ulat']) );
    }
?>