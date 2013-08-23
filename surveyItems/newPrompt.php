<div class="accordion-group">
    <!--
    <div class="accordion-heading">
        <a class="btn btn-link left textLink accordion-toggle createItem" data-toggle="collapse" data-parent="#addNewItemAccordion" href="#newPrompt">
            Create a new prompt.
        </a>
    </div>
    -->
    <div id="newPrompt" class="accordion-body collapse">
        <div class="accordion-inner">
            <br>
            <form class="form-horizontal" id="promptForm">
                <input type="hidden" name="editPromptId" id="editPromptId">
                <div class="control-group">
                    <label class="control-label" for="promptId">Prompt ID: <span class="red">*</span></label>
                    <div class="controls">
                        <input type="text" class="span4" name="id" id="promptId" placeholder="A unique identifier for the prompt." />
                        <i class="help-icon icon-question-sign" data-original-title="A unique identifier for the prompt." rel="tooltip" data-placement="right"></i>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label" for="displayLabel">Display Label: <span class="red">*</span></label>
                    <div class="controls">
                        <input type="text" class="span4" name="displayLabel" id="displayLabel" placeholder="Display Label" />
                        <i class="help-icon icon-question-sign" data-original-title="The user-friendly name of this prompt used in visualizations." rel="tooltip" data-placement="right"></i>
                    </div>
                </div>
                
                <div class="control-group">
                    <label class="control-label" for="promptText">Prompt Text: <span class="red">*</span></label>
                    <div class="controls">
                        <textarea type="text" class="span4" name="promptText" id="promptText" placeholder="Prompt Text"></textarea>
                        <i class="help-icon icon-question-sign" data-original-title="The text to display to the user when prompting them to respond." rel="tooltip" data-placement="right"></i>
                    </div>
                </div>
                
                <div class="control-group">
                    <label class="control-label" for="promptType">Prompt Type: <span class="red">*</span></label>
                    
                    <div class="controls">
                        <select id="choosePromptType" name="promptType" class="promptType span4">
                            <option value="">Please choose a prompt type</option>
                            <option value="audio">Audio</option>
                            <option value="multi_choice">Multiple Choice</option>
                            <option value="multi_choice_custom">Multiple Choice Custom</option>
                            <option value="number">Number</option>
                            <option value="photo">Photo</option>
                            <option value="remote_activity">Remote Activity</option>
                            <option value="single_choice">Single Choice</option>
                            <option value="single_choice_custom">Single Choice Custom</option>
                            <option value="text">Text</option>
                            <option value="timestamp">Timestamp</option>
                            <option value="video">Video</option>
                        </select>
                        <!--<input type="hidden" name="promptType" id="promptType"/> -->
                        <i class="help-icon icon-question-sign" data-original-title="Choose type of your prompt" rel="tooltip" data-placement="right"></i>
                    </div>
        
                    </br>
                    <label class="control-label" for="addedPrompt">Prompt Details:</label>
                    <div class="controls">  
                        <div>
                            <textarea name="properties" class="span4" id="addedPrompt" readonly></textarea>
                            <button type="button" class="btn btn-link" id="promptTypeBtn">Edit Prompt Detail</button>
                        </div>
                    </div>
                    <div class="control-group">
                        <!--<label type="hiden" class="control-label" for="default">Default</label>-->
                        <div class="controls">
                            <input type="hidden" name="default" id="default" placeholder="Default" />
                            <input type="hidden" class="jsonText" id="jsonText" />
                            <!--<i class="help-icon icon-question-sign" data-original-title="The default value for this prompt. This is type-dependent." rel="tooltip" data-placement="right"></i>-->
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="condition">Condition:</label>
                        <div class="controls">
                            <div class="input-append">
                                <input type="hidden" class="promptConditionType" id="promptConditionType" />
                                <input type="hidden" class="promptConditionJson" id="promptConditionJson" />
                                <textarea name="promptCondition"  class="span4" id="promptCondition" placeholder="None." disabled></textarea>
                                <button type="button" class="btn btn-link" id="promptConditionBtn">Edit Condition <i class="help-icon icon-question-sign" data-original-title="The condition which determines if the prompt is displayed or not." rel="tooltip" data-placement="top"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="skippable">Skip Option:</label>
                        <div class="controls"> 
                            <label class="checkbox">
                                <input type="checkbox" name="skippable" id="skippable">
                                Is this prompt skippable?
                            </label>
                        </div>
                    </div> 
                    
                    <div class="control-group">
                        <label class="control-label skipLabelText" for="skipLabel">Skip Label: </label>
                        <div class="controls">
                            <input type="text" class="span4" name="skipLabel" id="skipLabel" value="Skip" disabled/>
                            <i class="help-icon icon-question-sign" data-original-title="If skippable, this is the text of the button to use to skip the label." rel="tooltip" data-placement="right"></i>
                        </div> 
                    </div>   
                </div>
                
                <div class="control-group">
                    <div class="controls">
                        <button type="submit" class="btn" id="addPrompt">Add Prompt</button>
                        <button type="button" class="btn" id="cancelPrompt">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>