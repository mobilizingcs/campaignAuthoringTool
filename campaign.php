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
        <script type="text/javascript" src="js/json2xml.js"></script>
        <script type="text/javascript" src="js/jquery.xml2json.js"></script>
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
                        <!--
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
                        -->
                        <div class="new-campaign">
                            <hr>
                            <form class="form-horizontal" id="campaign-form" action="survey.php">
                                <h3>Create a New Campaign</h3>
                                <div class="control-group">
                                    <label class="control-label" for="campaignTitle">Campaign Name <span class="red">*</span></label>
                                    <div class="controls">
                                        <input type="text" class="span4" id="campaignTitle" placeholder="Campaign Title" />
                                        <i class="help-icon icon-question-sign" data-original-title="A name to be displayed to the user for this campaign." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="campaignUrn">Campaign Urn <span class="red">*</span></label>
                                    <div class="controls">
                                        <input type="text" class="span4" id="campaignUrn" placeholder="Campaign Urn" />
                                        <i class="help-icon icon-question-sign" data-original-title="Every campaign in the system must have a unique URN, and it is best practice to name this in such a way that it can easily be traced back to the creator, for example: 'urn:campaign:text:describing:author:version'" rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="campaignDescription">Description</label>
                                    <div class="controls">
                                        <input type="text" class="span4" id="campaignDescription" placeholder="Description" />
                                        <i class="help-icon icon-question-sign" data-original-title="Optional campaign description that can be viewed through Ohmage main page" rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="classes">Classes <span class="red">*</span></label>
                                    <div class="controls">
                                        <!--
                                        <input type="text" class="span4" id="classes" placeholder="Classes" />
                                        <i class="help-icon icon-question-sign" data-original-title="Classes that use this campaign" rel="tooltip" data-placement="right"></i>
                                    -->
                                        <select class="classes"></select>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="authors">Authors </label>
                                    <div class="controls">
                                        <input type="text" class="span4 authors" id="authors" disabled/>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="privacyState">Privacy State <span class="red">*</span></label>
                                    <div class="controls">
                                        <button type="button" class="btn btn-success" id="privacyStateBtn">Shared</button>
                                        <i class="help-icon icon-question-sign" data-original-title="In private mode, individual responses cannot be viewed." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="runningState">Running State <span class="red">*</span></label>
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
                            <span class="red">*</span> Required Fields
                        </div>
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


                        <div class="testing-campaigns">
                            <hr>
                            <h3>Campaign from XML (for testing purpose only)</h3>
                            <form class="form-horizontal" id="test-campaign" action="survey.php">
                                <div class="control-group">
                                    <label class="control-label" for="campaignXml">XML</label>
                                    <div class="controls">
                                        <textarea id="campaignXml" class="campaignXml"></textarea>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <div class="controls">
                                        <button type="submit" id="test-campaign" class="btn btn-primary">Test Campaign <i class="icon-pencil icon-white"></i></button>
                                    </div>
                                </div>
                            </form>
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
