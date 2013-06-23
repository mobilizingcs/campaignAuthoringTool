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
        <?php
            include('navbar.php');
            require_once('authorize.php');
        ?>
        <div class="container">
            <div class="breadcrumbsNav">
                <ul class="breadcrumb">
                    <li id="homeBreadcrumb"><i class="icon-home"></i> <a href="campaign.php">Campaigns</a> <span class="divider"><i class="icon-chevron-right"></i></span></li>
                    <li id="campaignBreadcrumb"><a href="survey.php"></a> <span class="divider"><i class="icon-chevron-right"></i></span></li>
                    <li id="surveyBreadcrumb" class="active"></li>
                </ul>
            </div>
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
                    </div>
                </div>
                <div class="span9">
                    <div class="boxRounded boxDark content">
                        <div class="accordion-heading">
                            <a class="btn btn-link left textLink accordion-toggle createItem pull-left" data-toggle="collapse" data-parent="#addNewItemAccordion" href="#newMessage">
                                <small>Create a new message.</small>
                            </a>
                            <a class="btn btn-link left textLink accordion-toggle createItem" data-toggle="collapse" data-parent="#addNewItemAccordion" href="#newPrompt">
                                <small>Create a new prompt.</small>
                            </a>
                        </div>
                        <h6 class="left">
                            Existing Survey Items
                            <small>(Prompt count: <span id="numQuestion">0</span>)</small>
                            <small>Reorder survey items by dragging!</small>
                        </h6>

                        <table>
                            <div class="previousItems" id="previousItem">
                                <ul class="previousItemsSortable" id="previousItemsSortable">
                                </ul>
                            </div>
                        </table>
                        <!--
                        <p><strong>Finish Editing ?</strong></p>
                        <a href="survey.php" class="btn" id="saveSurvey">Add These Prompts to Survey</a>
                        -->
                        <div class="addNewItem">
                            <h6 class="left">New Survey Item</h6>
                            <div class="accordion" id="addNewItemAccordion">
                                <?php
                                    include('promptModals/promptTypeModal.php');
                                    include('promptModals/conditionModal.php');
                                    include('promptModals/viewXmlModal.php');
                                    //include('promptModals/multiChoiceModal.php');
                                    //include('promptModals/singleChoiceModal.php');
                                    //include('promptModals/photoModal.php');
                                    //include('promptModals/numberModal.php');
                                    //include('promptModals/remoteActivityModal.php');
                                    //include('promptModals/textModal.php');
                                    //include('promptModals/videoModal.php');
                                    include('surveyItems/newMessage.php');
                                    include('surveyItems/newPrompt.php');
                                    //include('surveyItems/newRepeatableSet.php');
                                ?>                          
                            </div>
                        </div>
                        <span class="red">*</span> <small>Required Fields</small>
                    </div>
                </div>
            </div>
        </div>
        <?php
            include('footer.php');
        ?>
    </body>
</html>

