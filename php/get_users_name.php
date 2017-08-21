<?php
    session_start();
    if(isset($_SESSION['user_session'])){
        echo json_encode( array($_SESSION['user_session'], $_SESSION['user_session']) );
    }
?>