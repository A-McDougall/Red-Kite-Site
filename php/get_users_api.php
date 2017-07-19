<?php
    session_start();
    if(isset($_SESSION['apikey'])){
        echo $_SESSION['apikey'];
    }
?>