<!DOCTYPE HTML>
<?php
    session_start(); 
    include('notice.php');
    require_once('authorize.php');
    authorizeUser();
?>
<html>
    <head>
        <title>Create Surveys</title>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8"/>
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/layout.css" rel="stylesheet" type="text/css"/>
        <link href="css/navbar.css" rel="stylesheet" type="text/css"/>
        <link href="css/survey.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery-cookie.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/Constant.js"></script>
        <script type="text/javascript" src="js/configuration.js"></script>
        <script type="text/javascript" src="js/navbar.js"></script>
        <script type="text/javascript" src="js/alerts.js"></script>
        <script type="text/javascript" src="js/menu.js"></script>
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
            <!--
            <div class="breadcrumbsNav">
                <ul class="breadcrumb">
                    <li id="homeBreadcrumb"><i class="icon-home"></i> <a href="campaign.php">Home</a> <span class="divider"><i class="icon-chevron-right"></i></span></li>
                    <li class="active" id="campaignBreadcrumb"></li>
                </ul>
            </div>
        -->
            <div class="row">
                <div class="span3">
                    <div class="boxRounded boxDark" id="campaignMenu">
                        <!--
                        <div class="center">
                            <h5></h5>
                            <button type="button" class="btn btn-block" id="createNewSurvey">Create New Survey</button>
                            <div class="btn-group btn-block">
                                <button class="btn btn-block dropdown-toggle" data-toggle="dropdown" id="editExistingSurvey">Edit Existing Survey  <span class="caret"></span></button>
                                <ul class="dropdown-menu" id="existingSurveys">
                                  <li><a href="#">Action</a></li>-->
                            <!--      
                                </ul>
                            </div>
                            <?php
                            //include('promptModals/viewXmlModal.php');
                            ?>      
                            <button type="button" class="btn btn-block" id="viewSurveyXML">View Campaign XML</button>
                            <button type="button" class="btn btn-info btn-block" id="submitCampaign">Submit Campaign to Server</button>
                        </div>
                        -->
                        <div class="center">
                            <h5></h5>
                            <button type="button" class="btn btn-block" id="editCampaign">Edit Campaign Info</button>
                            <button type="button" class="btn btn-block" id="createNewSurvey">Create New Survey</button>
                            <button type="button" class="btn btn-block" id="editExistingSurvey">Edit Existing Surveys</button>
                            <button type="button" class="btn btn-block" id="viewSurveyXML">View Campaign XML</button>
                            <button type="button" class="btn btn-info btn-block" id="submitCampaign">Submit Campaign to Server</button>
                        </div>
                        <?php
                            include('promptModals/viewXmlModal.php');
                        ?>

                        <div id="loginModal" class="modal hide fade" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                            <div class="modal-header centered">
                               Time Out. Please relogin
                            </div>
                            <div class="modal-body centered">
                                <div class="">
                                    <form class="form-horizontal" id="login-form">
                                        <div class="control-group centered">
                                            <label class="control-label" for="inputUsername">Username</label>
                                            <div class="controls">
                                                <input type="text" class="span3" id="inputUsername" placeholder="Username">
                                            </div>
                                        </div>
                                        <div class="control-group centered">
                                            <label class="control-label" for="inputPassword">Password</label>
                                            <div class="controls">
                                                <input type="password" class="span3" id="inputPassword" placeholder="Password">
                                            </div>
                                        </div>
                                        <div class="control-group">
                                            <div class="controls">
                                                <button type="submit" class="btn btn-info">Login</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="modal-footer">   
                            </div>
                        </div>


                    </div>
                    <!--
                     <div class="boxRounded boxDark">
                        <?php
                            //include('promptModals/viewXmlModal.php');
                        ?>      
                        <button type="button" class="btn btn-primary btn-block" id="viewSurveyXML">View Campaign XML</button>
                    </div>
                    -->
                </div>
                <div class="span9 content">
                    <div class="boxRounded boxDark">
                        <h5 class="">Create New Survey <small>Please input survey info</small></h5>
                        <div class="newSurvey">
                            <hr>
                            <form class="form-horizontal" id="surveyForm" action="prompt.php">
                                <div class="control-group">
                                    <label class="control-label" for="surveyId">Survey ID <span class="red">*</span></label>
                                    <div class="controls">
                                        <input class="span5" type="text" id="surveyId" />
                                        <i class="help-icon icon-question-sign" data-original-title="A unique identifier for this survey." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>

                                <div class="control-group">
                                    <label class="control-label" for="surveyTitle">Title <span class="red">*</span></label>
                                    <div class="controls">
                                        <input class="span5" type="text" id="surveyTitle" />
                                        <i class="help-icon icon-question-sign" data-original-title="A name for the survey to be displayed to the user." rel="tooltip" data-placement="right"></i>
                                    </div>
                                </div>

                                <div class="descriptionInput">
                                    <!--<button type="button" class="formToggleBtn btn btn-danger pull-right btn-small" id="descriptionRemove"><i class="icon-remove icon-white"></i> Remove</button>-->
                                    <div class="control-group">
                                        <label class="control-label" for="surveyDescription">Description </label>
                                        <div class="controls">
                                            <textarea id="surveyDescription" class="span5" placeholder="Enter the description of your survey here..."></textarea>
                                            <i class="help-icon icon-question-sign" data-original-title="A user-friendly description of the survey." rel="tooltip" data-placement="right"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="introTextInput">
                                    <!--<button type="button" class="formToggleBtn btn btn-danger pull-right btn-small" id="introTextRemove"><i class="icon-remove icon-white"></i> Remove</button>-->
                                    <div class="control-group">
                                        <label class="control-label" for="surveyIntroText">Introduction Text</label>
                                        <div class="controls">
                                            <textarea id="surveyIntroText" class="span5" placeholder="Text to display to the user before they begin the survey..."></textarea>
                                            <i class="help-icon icon-question-sign" data-original-title="The text to be displayed when a survey is started." rel="tooltip" data-placement="right"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="control-group">
                                    <label class="control-label" for="surveySubmitText">Submit Text <span class="red">*</span></label>
                                    <div class="controls">
                                        <textarea class="span5" id="surveySubmitText" placeholder="Text to display to a user upon survey completion..."></textarea>
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
                                        <button type="submit" class="btn">Create Survey</button>
                                        <button type="button" class="btn" id="surveyCancel">Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <span class="red">*</span> <small>Required Fields</small>
                        <hr>
                        <!--<p><h2 class="centered">Finished editing this campaign?</h2></p>-->
                        <!--<button type="button" class="btn btn-primary btn-block" id="submitCampaign"><h3>Submit Campaign to Ohmage Server</h3></button>-->
                    </div>
                </div>
            </div>
        </div>
        <?php
            include('footer.php');
        ?>
    </body>
</html>
