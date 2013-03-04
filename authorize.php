<?php
    function authorizeUser() {
        if(!isset($_COOKIE['authToken'])) {
            setNotice('You must log in to edit your campaigns!', 'error');
            header('Location: login.php');
            exit();
        }
    }
?>
