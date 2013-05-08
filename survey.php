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
        <link href="css/survey.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery-cookie.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/navbar.js"></script>
        <script type="text/javascript" src="js/alerts.js"></script>
        <script type="text/javascript" src="js/survey.js"></script>
        <script type="text/javascript" src="js/help-icon.js"></script>
        <script type="text/javascript" src="js/json2xml.js"></script>
        <script type="text/javascript" src="js/campaign-editor.js"></script>
        <script type="text/javascript" src="js/breadcrumb.js"></script>
        <script type="text/javascript" src="js/vkbeautify.0.99.00.beta.js"></script>
    </head>
    <body>
		<?php
            include('navbar.php');
        ?>
        <div class="container">
            <div class="breadcrumbsNav">
                <ul class="breadcrumb">
                    <li id="homeBreadcrumb"><i class="icon-home"></i> <a href="campaign.php">Campaigns</a> <span class="divider"><i class="icon-chevron-right"></i></span></li>
                    <li class="active" id="campaignBreadcrumb"></li>
                </ul>
            </div>
            <div class="row">
                <div class="span3">
                    <div class="boxRounded boxDark">
                        <!--
                        <div class="addPropertiesBox centered">
                            <h4>Optional Properties</h4>
                            <hr>
                            <button type="button" class="formToggleBtn btn btn-primary btn-block" id="descriptionAdd"><i class="icon-plus icon-white"></i> Add Description</button>
                            <button type="button" class="formToggleBtn btn btn-primary btn-block" id="introTextAdd"><i class="icon-plus icon-white"></i> Add Introduction Text</button>
                        </div>
                        -->
                        <?php
                            include('promptModals/viewXmlModal.php');
                        ?>      
                        <button type="button" class="btn btn-primary btn-block" id="viewSurveyXML">View Campaign XML</button>
                    </div>
                    <div class="boxRounded boxDark">
                        <div class="centered">
                            <h4>Existing Surveys</h4>
                            <select id="existingSurveys">
                            </select>
                            <hr>
                            <button type="button" class="btn btn-primary btn-block" id="editExistingSurvey">Edit Survey</button>
                        </div>
                    </div>
                </div>
                <div class="span9 content">
                    <div class="boxRounded boxDark">
                        <h1>Survey Details <small>Create a new survey, or edit an existing one.</small></h1>
                        <div class="newSurvey">
                            <hr>
                            <form class="form-horizontal" id="surveyForm" action="prompt.php">
                                <div class="control-group">
                                    <label class="control-label" for="surveyId">Survey Id <span class="red">*</span></label>
                                    <div class="controls">
                                        <input type="text" id="surveyId" />
                                        <i class="help-icon icon-question-sign" data-original-title="A unique identifier for this survey." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>

                                <div class="control-group">
                                    <label class="control-label" for="surveyTitle">Title <span class="red">*</span></label>
                                    <div class="controls">
                                        <input type="text" id="surveyTitle" />
                                        <i class="help-icon icon-question-sign" data-original-title="A name for the survey to be displayed to the user." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>

                                <div class="descriptionInput">
                                    <!--<button type="button" class="formToggleBtn btn btn-danger pull-right btn-small" id="descriptionRemove"><i class="icon-remove icon-white"></i> Remove</button>-->
                                    <div class="control-group">
                                        <label class="control-label" for="surveyDescription">Desciption </label>
                                        <div class="controls">
                                            <textarea id="surveyDescription" class="" placeholder="Enter the description of your survey here..."></textarea>
                                            <i class="help-icon icon-question-sign" data-original-title="A user-friendly description of the survey." rel="tooltip" data-placement="right"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="introTextInput">
                                    <!--<button type="button" class="formToggleBtn btn btn-danger pull-right btn-small" id="introTextRemove"><i class="icon-remove icon-white"></i> Remove</button>-->
                                    <div class="control-group">
                                        <label class="control-label" for="surveyIntroText">Introduction Text</label>
                                        <div class="controls">
                                            <textarea id="surveyIntroText" placeholder="Text to display to the user before they begin the survey..."></textarea>
                                            <i class="help-icon icon-question-sign" data-original-title="The text to be displayed when a survey is started." rel="tooltip" data-placement="right"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="control-group">
                                    <label class="control-label" for="surveySubmitText">Submit Text <span class="red">*</span></label>
                                    <div class="controls">
                                        <textarea id="surveySubmitText" placeholder="Text to display to a user upon survey completion..."></textarea>
                                        <i class="help-icon icon-question-sign" data-original-title="The text to be displayed on the submit screen once a survey has been completed." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>     

                                
                                <div class="control-group">
                                    <label class="control-label" for="surveyAnytime">Anytime</label>
                                    <div class="controls">
                                        <label class="checkbox">
                                            <input type="checkbox" id="surveyAnytime" value="">
                                            Do you want the survey to be taken at anytime?
                                            <i class="help-icon icon-question-sign" data-original-title="A boolean value indicating whether or not the survey may be taken at any time. If false, the survey may only be taken when a trigger has fired indicating that the user may now take the survey." rel="tooltip" data-placement="right"></i>
                                        </label>
                                    </div>
                                </div>                          
                                <div class="control-group">
                                    <div class="controls">
                                        <button type="submit" class="btn btn-primary">Create Survey</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <span class="red">*</span> Required Fields
                        <hr>
                        <p><h2 class="centered">Finished editing this campaign?</h2></p>
                        <button type="button" class="btn btn-primary btn-block" id="submitCampaign"><h3>Submit Campaign to Ohmage Server</h3></button>
                    </div>
                </div>
            </div>
        </div>
        <?php
            include('footer.php');
        ?>
    </body>
</html>
