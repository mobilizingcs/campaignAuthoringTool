<!DOCTYPE HTML>
<html>
    <head>
        <title>Create Prompt</title>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8"/>
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/campaign.css" rel="stylesheet" type="text/css"/>
        <link href="css/prompt.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery-cookie.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/prompt.js"></script>
    </head>
    <body>
		<?php
            include('navbar.php');
            require_once('authorize.php');
        ?>
        <div class="container">
            
            <div class="row">
                <div class="well span2">
                    <h2>Number of Questions</h2>
                    <p>0</p>
                </div>
                <div class="well span9 content">
					<img src="img/ohmage-logo.png">
                    <div class="previousItems">
                        <h2>Previous Items</h2>
                        PREVIOUSLY ADDED ITEMS HERE
                    </div>
                    <hr/>
                    <div class="addNewItem">
                        <h2>Add a New Item</h2>
                        <div class="accordion" id="addNewItemAccordion">
                            <div class="accordion-group">
                                <div class="accordion-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#addNewItemAccordion" href="#newMessage">
                                        Create a new message.
                                    </a>
                                </div>
                                <div id="newMessage" class="accordion-body collapse in">
                                    <div class="accordion-inner">
                                        <form class="form-horizontal" id="message-form">
                                            <div class="control-group">
                                                <label for="messageText">
                                                Message Text
                                                <span class="label label-info">Required</span>
                                                </label>
                                                <textarea id="messageText" placeholder="Message Text"></textarea>
                                            </div>
                                            <div class="control-group">
                                                <button type="submit" class="btn btn-primary">Create Message</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-group">
                                <div class="accordion-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#addNewItemAccordion" href="#newPrompt">
                                        Create a new prompt.
                                    </a>
                                </div>
                                <div id="newPrompt" class="accordion-body collapse in">
                                    <div class="accordion-inner">
                                        <form class="form-horizontal" id="campaign-form">
											<div class="control-group">
												<label for="displayLabel">
													Display Label
													<span class="label label-info">Required</span>
												</label>
												<input type="text" id="displayLabel" placeholder="Display Label" />
											</div>
											<div class="control-group">
												<label for="displayType">
													Display Type
													<span class="label label-info">Required</span>
												</label>
												<input type="radio" name="group1" value="Measurement"> Measurement<br>
												<input type="radio" name="group1" value="Event"> Event<br>
												<input type="radio" name="group1" value="Count"> Count<br>
												<input type="radio" name="group1" value="Category"> Category<br>
												<input type="radio" name="group1" value="Metadata"> Metadata<br>
											</div>
											<div class="control-group">
												<label for="promptText">
													Prompt Text
													<span class="label label-info">Required</span>
												</label>
												<textarea type="text" id="promptText" placeholder="Prompt Text"></textarea>
											</div>
											<div class="control-group">
												<label for="abbreviatedText">
													Abbreviated Text
													<span class="label label-info">Required</span>
												</label>
												<textarea type="text" id="abbreviatedText" placeholder="Abbreviated Text"></textarea>
											</div>
											<div class="control-group">
												<label for="promptType">
													Prompt Type
													<span class="label label-info">Required</span>
												</label>
												
                                                <select>
                                                    <option value="Multiple Choice">Multiple Choice</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                                <div class="btn-group">
                                                    <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                                                        Choose a prompt type
                                                        <span class="caret"></span>
                                                    </a>
                                                    <ul class="dropdown-menu">
                                                        <li><a tabindex="-1" href="#" id="Multiple Choice"> Multiple Choice</a></li>
                                                    </ul>
                                                </div>
												<div class="dropdown">
													<a class="dropdown-toggle" id="promptType" role="button" data-toggle="dropdown" data-target="#">Choose Type<b class="caret"></b></a>
														<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
															<li><a tabindex="-1" href="#">Multiple Choice</a></li>
															<li><a tabindex="-1" href="#">Multiple Choice Custom</a></li>
															<li><a tabindex="-1" href="#">Number</a></li>
															<li><a tabindex="-1" href="#">Photo</a></li>
															<li><a tabindex="-1" href="#">Remote Activity</a></li>
															<li><a tabindex="-1" href="#">Single Choice</a></li>
															<li><a tabindex="-1" href="#">Single Choice Custon</a></li>
															<li><a tabindex="-1" href="#">Text</a></li>
															<li><a tabindex="-1" href="#">Timestamp</a></li>
														</ul>
												</div>
												<!--
												<input type="radio" name="groupPromptType" id="Multiple Choice" value="Multiple Choice">Multiple Choice<br>
												<input type="radio" name="groupPromptType" id="Multiple Choice Custom" value="Multiple Choice Custom"> Multiple Choice Custom<br>
												<input type="radio" name="groupPromptType" id="Number" value="Number"> Number<br>
												<input type="radio" name="groupPromptType" id="Photo" value="Photo"> Photo<br>
												<input type="radio" name="groupPromptType" id="Remote Activity" value="Remote Activity"> Remote Activity<br>
												<input type="radio" name="groupPromptType" id="Single Choice" value="Single Choice"> Single Choice<br>
												<input type="radio" name="groupPromptType" id="Single Choice Custon" value="Single Choice Custon"> Single Choice Custon<br>
												<input type="radio" name="groupPromptType" id="Text" value="Text"> Text<br>
												<input type="radio" name="groupPromptType" id="Timestamp" value="Timestamp"> Timestamp<br>
                                                -->
                                                <!-- Overlay window section -->
                                                <div class="overlay" id="overlay" style="display:none;"></div>
 
                                                <div class="MultipleChoiceBox" id="MultipleChoiceBox">
                                                    <a class="boxclose" id="boxclose"></a>
                                                    <h2>Multiple Choice</h2>
                                                    <p>
                                                        Type each question follow by a new line
                                                    </p>
                                                    <textarea type="text" placeholder="Question"></textarea>
                                                    <div class="control-group">
                                                        <button type="button" class="btn btn-primary" data-toggle="button" id="MultipleChoiceOK">OK</button>
                                                    </div>
                                                </div>
                                                <div class="NumberBox" id="NumberBox">
                                                    <h2>Number</h2>
                                                    <p> Minumum value
                                                    <input type="number" placeholder="0"></input>
                                                    </p>
                                                    <p> Maximum value
                                                    <input type="number" placeholder="100"></input>
                                                    </p>
                                                    <div class="control-group">
                                                        <button type="button" class="btn btn-primary" data-toggle="button" id="NumberOK">OK</button>
                                                    </div>
                                                </div>
                                                
											</div>
											<div class="control-group">
												<label for="default">
													Default
												</label>
												<input type="text" id="default" placeholder="Default" />
											</div>
											<div class="control-group">
												<label for="condition">
													Condition
												</label>
												<input type="text" id="condition" placeholder="Condition" />
											</div>
											<div class="control-group">
												<label class="checkbox">
													<input type="checkbox" id="skippable" value="">
														Can this survey be skippable?
												</label>
											</div> 
											<div class="control-group">
												<label id="skipLabelLabel">
													Skip Label
												</label>
												<input type="text" id="skipLabel" placeholder="Skip Label" disabled="disable"/>
											</div>
											<div class="control-group">
												<label for="properties">
													Properties
													<span class="label label-info">Required</span>
												</label>
												<textarea type="text" id="properties" placeholder="Properties"></textarea>
											</div>
											<div class="control-group">
												<button type="button" class="btn btn-primary" data-toggle="button">Add Prompt</button>
											</div>
											</form>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-group">
                                <div class="accordion-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#addNewItemAccordion" href="#newRepeatableSet">
                                        Create a new repeatable set.
                                    </a>
                                </div>
                                <div id="newRepeatableSet" class="accordion-body collapse in">
                                    <div class="accordion-inner">
                                        NEW REPEATABLE SET FORM
                                    </div>
                                </div>
                            </div>
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

