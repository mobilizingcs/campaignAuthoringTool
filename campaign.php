<!DOCTYPE HTML>
<?php
    session_start(); 
    include('notice.php');
    require_once('authorize.php');
    authorizeUser();
?>
<html>
    <head>
        <title>Create Campaign</title>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8"/>
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/layout.css" rel="stylesheet" type="text/css"/>
        <link href="css/navbar.css" rel="stylesheet" type="text/css"/>
        <link href="css/campaign.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery-cookie.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/alerts.js"></script>
        <script type="text/javascript" src="js/navbar.js"></script>
        <script type="text/javascript" src="js/campaign.js"></script>
        <script type="text/javascript" src="js/help-icon.js"></script>
        <script type="text/javascript" src="js/campaign-editor.js"></script>
    </head>
    <body>
        <?php
            include('navbar.php');
        ?>
        <div class="container">
            <div class="breadcrumbsNav">
                <ul class="breadcrumb">
                    <li class="active" id="homeBreadcrumb"><i class="icon-home"></i> Campaigns</li>
                </ul>
            </div>
            <div class="row">
                <div class="span12 content">
                    <div class="boxRounded boxDark">
                        <h1>Campaign Editor <small>Create a new campaign, or edit an existing one.</small></h1>
                        <div class="existing-campaigns">
                            <hr>
                            <h3>Edit an Existing Campaign</h3>
                            <form class="form-horizontal">
                                <div class="control-group">
                                    <label class="control-label" for="campaignTitle">Campaign</label>
                                    <div class="controls">
                                        <select class="campaign-select"></select>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <div class="controls">
                                        <button type="submit" id="edit-campaign" class="btn btn-primary">Edit Campaign <i class="icon-pencil icon-white"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="new-campaign">
                            <hr>
                            <form class="form-horizontal" id="campaign-form" action="survey.php">
                                <h3>Create a New Campaign</h3>
                                <div class="control-group">
                                    <label class="control-label" for="campaignTitle">Campaign Title <i class="icon-asterisk"></i></label>
                                    <div class="controls">
                                        <input type="text" class="span4" id="campaignTitle" placeholder="Campaign Title" />
                                        <i class="help-icon icon-question-sign" data-original-title="The name of your campaign." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="privacyState">Privacy State <i class="icon-asterisk"></i></label>
                                    <div class="controls">
                                        <button type="button" class="btn btn-success" id="privacyStateBtn">Shared</button>
                                        <i class="help-icon icon-question-sign" data-original-title="In private mode, individual responses cannot be viewed." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="runningState">Running State <i class="icon-asterisk"></i></label>
                                    <div class="controls">
                                        <button type="button" class="btn btn-success" id="runningStateBtn">Running</button>
                                        <i class="help-icon icon-question-sign" data-original-title="Users can only upload responses on running campaigns. This can be updated once you submit your campaign." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <div class="controls">
                                        <button type="submit" id="create-campaign" class="btn btn-primary">Create Campaign <i class="icon-plus icon-white"></i></button>
                                    </div>
                                </div>
                            </form>
                            <i class="icon-asterisk"></i> Required Fields
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
            include('footer.php');
        ?>
    </body>
</html>
