<?php
    session_start();
    if(isset($_SESSION['max_zoom'])){
        echo $_SESSION['max_zoom'];
    }
?>