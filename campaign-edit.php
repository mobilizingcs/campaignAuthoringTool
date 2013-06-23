<!DOCTYPE HTML>
<?php
    session_start(); 
    include('notice.php');
    require_once('authorize.php');
    authorizeUser();
?>
<html>
    <head>
        <title>Edit Campaign</title>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8"/>
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/layout.css" rel="stylesheet" type="text/css"/>
        <link href="css/navbar.css" rel="stylesheet" type="text/css"/>
        <link href="css/campaign.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery-cookie.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/json2xml.js"></script>
        <script type="text/javascript" src="js/jquery.xml2json.js"></script>
        <script type="text/javascript" src="js/menu.js"></script>
        <script type="text/javascript" src="js/alerts.js"></script>
        <script type="text/javascript" src="js/navbar.js"></script>
        <script type="text/javascript" src="js/campaign-edit.js"></script>
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
                    <li class="active" id="homeBreadcrumb"><i class="icon-home"></i> Home</li>
                </ul>
            </div>
            <div class="row">
                <div class="span3">
                    <div class="boxRounded boxDark" id="campaignMenu">
                        <!--<div class="center">-->
                            <h5></h5>
                            <button type="button" class="btn btn-block" id="editCampaign">Edit Campaign Info</button>
                            <button type="button" class="btn btn-block" id="createNewSurvey">Create New Survey</button>
                            <button type="button" class="btn btn-block" id="editExistingSurvey">Edit Existing Surveys</button>
                            <button type="button" class="btn btn-block" id="viewSurveyXML">View Campaign XML</button>
                            <button type="button" class="btn btn-info btn-block" id="submitCampaign">Submit Campaign to Server</button>
                        <!--</div>-->
                        <?php
                            include('promptModals/viewXmlModal.php');
                        ?>
                    </div>
                </div>
                <div class="span9 content">
                    <div class="boxRounded boxDark">
                        <h5>Edit Campaign</h5>
                        <div class="new-campaign">
                            <form class="form-horizontal" id="campaign-form" action="existing-surveys.php">
                                <div class="control-group">
                                    <label class="control-label" for="campaignTitle">Campaign Name <span class="red">*</span></label>
                                    <div class="controls">
                                        <input type="text" class="span5" id="campaignTitle" placeholder="Campaign Title" />
                                        <i class="help-icon icon-question-sign" data-original-title="A name to be displayed to the user for this campaign." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="campaignUrn">Campaign Urn <span class="red">*</span></label>
                                    <div class="controls">
                                        <input type="text" class="span5" id="campaignUrn" placeholder="Campaign Urn" />
                                        <i class="help-icon icon-question-sign" data-original-title="Every campaign in the system must have a unique URN, and it is best practice to name this in such a way that it can easily be traced back to the creator, for example: 'urn:campaign:text:describing:author:version'" rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="campaignDescription">Description</label>
                                    <div class="controls">
                                        <input type="text" class="span5" id="campaignDescription" placeholder="Description" />
                                        <i class="help-icon icon-question-sign" data-original-title="Optional campaign description that can be viewed through Ohmage main page" rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="classes">Classes <span class="red">*</span></label>
                                    <div class="controls">
                                        <select class="classes"></select>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="authors">Authors </label>
                                    <div class="controls">
                                        <input type="text" class="span5 authors" id="authors" disabled/>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="privacyState">Privacy State <span class="red">*</span></label>
                                    <div class="controls">
                                        <button type="button" class="btn btn-info" id="privacyStateBtn">Shared</button>
                                        <i class="help-icon icon-question-sign" data-original-title="In private mode, individual responses cannot be viewed." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="runningState">Running State <span class="red">*</span></label>
                                    <div class="controls">
                                        <button type="button" class="btn btn-info" id="runningStateBtn">Running</button>
                                        <i class="help-icon icon-question-sign" data-original-title="Users can only upload responses on running campaigns. This can be updated once you submit your campaign." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <div class="controls">
                                        <button type="submit" id="edit-campaign" class="btn">Edit Campaign <i class="icon-plus icon-black"></i></button>
                                    </div>
                                </div>
                            </form>
                            <span class="red">*</span> <small>Required Fields</small>
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
