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
        <link href="css/layout.css" rel="stylesheet" type="text/css"/>
        <link href="css/navbar.css" rel="stylesheet" type="text/css"/>
        <link href="css/prompt.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery-cookie.js"></script>
        <script type="text/javascript" src="js/jquery-ui-1.9.0.min.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/navbar.js"></script>
        <script type="text/javascript" src="js/alerts.js"></script>
        <script type="text/javascript" src="js/promptUtil.js"></script>
        <script type="text/javascript" src="js/json2xml.js"></script>
        <script type="text/javascript" src="js/campaign-editor.js"></script>
        <script type="text/javascript" src="js/surveyItemDisplay.js"></script>
        <script type="text/javascript" src="js/prompt.js"></script>
        <script type="text/javascript" src="js/help-icon.js"></script>
        <script type="text/javascript" src="js/vkbeautify.0.99.00.beta.js"></script>
        <script type="text/javascript" src="js/breadcrumb.js"></script>
        <script type="text/javascript" src="js/promptType.js"></script>   
        <script type="text/javascript" src="js/Constant.js"></script> 
        <script type="text/javascript" src="js/modal.js"></script> 
               
               
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
                    <div class="boxDark boxRounded centered">
                        <h4>Survey Properties</h4>
                        <hr>
                        <strong>Number of Questions: </strong>
                        <span id="numQuestion">0</span>
                        <hr>
                        <button type="button" class="btn btn-primary btn-block" id="viewXML">View XML</button>
                        <div class="overlay" id="overlayXML" style="display:none;"></div>
                        <div class="OverlayBox" id="XMLBox">
                            <div class="controls" >
                                <h3>XML</h3>
                                <textarea type="text" placeholder="XML" id="XMLdata"></textarea>
                            </div>
                            <div class="control-group">
                                <button type="button" class="btn btn-primary" data-toggle="button" id="XMLBoxOK">OK</button>
                            </div>
                        </div>
                        <hr>
                        <a href="survey.php" class="btn btn-primary btn-block" id="saveSurvey">Save Survey</a>
                    </div>
                </div>
                <div class="span9">
                    <div class="boxRounded boxDark content">
                        <h2 class="centered">
                            Existing Survey Items
                            <br>
                            <small>Reorder survey items by dragging!</small>
                        </h2>

                        <table>
                            <div class="previousItems" id="previousItem">
                                <ul id="previousItemsSortable">
                                </ul>
                            </div>
                        </table>
                        <hr/>
                        <div class="addNewItem">
                            <h2 class="centered">Add a New Survey Item</h2>
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
                        <i class="icon-asterisk"></i> Required Fields
                    </div>
                </div>
            </div>
        </div>
        <?php
            include('footer.php');
        ?>
    </body>
</html>

