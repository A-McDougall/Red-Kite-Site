<?php
    session_start();
    if(isset($_SESSION['user_session'])){
        echo $_SESSION['user_session'];
    }
?>