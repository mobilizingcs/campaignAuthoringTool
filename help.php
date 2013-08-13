<!DOCTYPE HTML>
<?php
    session_start(); 
    include('notice.php');
    require_once('authorize.php');
    authorizeUser();
?>
<html>
    <head>
        <title>Help</title>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8"/>
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/jquery-ui-1.9.1.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/jquery.powertips.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/layout.css" rel="stylesheet" type="text/css"/>
        <link href="css/navbar.css" rel="stylesheet" type="text/css"/>
        
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery-cookie.js"></script>
        <script type="text/javascript" src="js/jquery-ui-1.9.0.min.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/Constant.js"></script>
        
        <script type="text/javascript" src="js/menu.js"></script>  
        <script type="text/javascript" src="js/navbar.js"></script>
        <script type="text/javascript" src="js/alerts.js"></script>
        <script type="text/javascript" src="js/help-icon.js"></script>
        
        
        <script type="text/javascript" src="js/breadcrumb.js"></script>        
               
    </head>
    <body>
        <?php
            include('navbar.php');
        ?>
        <div class="container">
            <div class="row">
                <div class="span12">
                    <div class="boxRounded boxDark content">
                        <p><b>- How to create a new campaign ?</b></p>
                        <p><b>Step 1:</b> Create/Edit campaign info <p>
                        <p><b>Step 2:</b> Create/Edit survey(s)<p> 
                        <p class="tab"><b>Step 2.1:</b> Create/Edit survey info </p>
                        <p class="tab"><b>Step 2.2:</b> Create/Edit survey items </p>
                        <p class="tab">Note: Step 2 can be repeated as many times as the number of surveys. </p> 
                        <p><b>Step 3:</b> View campaign XML (optional) </p>
                        <p><b>Step 4:</b> Submit to the servers</p>  
                    </div>
                </div>
            </div>
        </div>
        <?php
            include('footer.php');
        ?>
    </body>
</html>

