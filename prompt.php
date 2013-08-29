<!DOCTYPE HTML>
<?php
    session_start(); 
    include('notice.php');
    require_once('authorize.php');
    authorizeUser();
?>
<html>
    <head>
        <title>Create Prompt</title>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8"/>
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/jquery-ui-1.9.1.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/jquery.powertips.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/layout.css" rel="stylesheet" type="text/css"/>
        <link href="css/navbar.css" rel="stylesheet" type="text/css"/>
        <link href="css/prompt.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery-cookie.js"></script>
        <script type="text/javascript" src="js/jquery-ui-1.9.0.min.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/configuration.js"></script>
        <script type="text/javascript" src="js/Constant.js"></script>
        <script type="text/javascript" src="js/promptUtil.js"></script>
        
        
        <script type="text/javascript" src="js/menu.js"></script>  
        <script type="text/javascript" src="js/navbar.js"></script>
        <script type="text/javascript" src="js/alerts.js"></script>
        <script type="text/javascript" src="js/help-icon.js"></script>
        
        <script type="text/javascript" src="js/json2xml.js"></script>
        <script type="text/javascript" src="js/campaign-editor.js"></script>
        <script type="text/javascript" src="js/surveyItemDisplay.js"></script>
        <script type="text/javascript" src="js/prompt.js"></script>
        
        <script type="text/javascript" src="js/vkbeautify.0.99.00.beta.js"></script>
        <script type="text/javascript" src="js/breadcrumb.js"></script>
        <script type="text/javascript" src="js/promptType.js"></script> 
        <script type="text/javascript" src="js/modal.js"></script>   
        <script type="text/javascript" src="js/condition.js"></script>
               
               
    </head>
    <body>
        <div class="navbar navbar-fixed-top">
            <div class="navbar-inner">
                <div class="navbar-container">
                    <a class="brand" href="#"><img src="img/ohmage-logo.png" width="112"></a>

                    <a href="login.html" class="logoutButton pull-right btn btn-info">Log Out</a>
                    <p class="navbar-text pull-right" id="username"></p>
                    <a href="help.html" target="_blank" class="btn btn-link pull-right helpBtn">Help</a>
                    
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="span3">
                    <div class="boxDark boxRounded" id="campaignMenu">
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
                </div>
                <div class="span9">
                    <div class="boxRounded boxDark content">
                        <h5>Survey Items</h5>
                        <div class="accordion-heading">
                            <a class="left btn btn-link textLink accordion-toggle createItem createMessage pull-left" data-toggle="collapse" data-parent="#addNewItemAccordion" href="#newMessage">
                                <small><i class="icon-comment"></i> Create a new message.</small>
                            </a>
                            <a class="left btn btn-link textLink accordion-toggle createItem createPrompt" data-toggle="collapse" data-parent="#addNewItemAccordion" href="#newPrompt">
                                <small><i class="icon-ok-circle"></i> Create a new prompt.</small>
                            </a>
                        </div>
                        <h6 class="left">
                            Existing Items
                            <small>(Prompt count: <span id="numQuestion">0</span>)</small>
                            <small>Reorder survey items by dragging!</small>
                        </h6>

                        <table>
                            <div class="previousItems" id="previousItem">
                                <ul class="previousItemsSortable" id="previousItemsSortable">
                                </ul>
                            </div>
                        </table>
                        <div class="addNewItem">
                            <h6 class="left">New Item</h6>
                            <div class="accordion" id="addNewItemAccordion">
                                <?php
                                    include('promptModals/promptTypeModal.php');
                                    include('promptModals/conditionModal.php');
                                    //include('promptModals/viewXmlModal.php');
                                    
                                    include('surveyItems/newMessage.php');
                                    include('surveyItems/newPrompt.php');
                                    
                                ?>                          
                            </div>
                        </div>
                        <span class="red">*</span> <small>Required Fields</small>
                    </div>
                </div>
            </div>
        </div>
        <!-- footer -->
        <div id="footer">
            <div class="container">
                <div class="row">
                    <div class="span12">
                        <hr>
                        <div class="pull-right">
                            <a href="#">Back to top</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </body>
</html>

