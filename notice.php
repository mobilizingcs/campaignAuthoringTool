<?php
    // Possible types are error, warning, and success
    function setNotice($message, $type) {
        if($type !== 'error' && $type !== 'warning' && $type !== 'success') {
            $type = 'warning';
        }
        $_SESSION[$type] = $message;
    }

    // Display cross-page alerts, then delete them
    function getNotice() {
        if(isset($_SESSION['error'])) {
            $alert = '<div class="alert alert-error"><button class="close">&times;</button>' . $_SESSION['error'] . '</div>'; 
            echo $alert;
            unset($_SESSION['error']);
        }
        if(isset($_SESSION['warning'])) {
            $alert = '<div class="alert"><button class="close">&times;</button>' . $_SESSION['warning'] . '</div>'; 
            echo $alert;
            unset($_SESSION['warning']);
        }
        if(isset($_SESSION['success'])) {
            $alert = '<div class="alert alert-success"><button class="close">&times;</button>' . $_SESSION['success'] . '</div>'; 
            echo $alert;
            unset($_SESSION['success']);
        }
    }
?>