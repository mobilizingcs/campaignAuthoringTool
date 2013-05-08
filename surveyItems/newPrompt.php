<div class="accordion-group">
    <div class="accordion-heading">
        <a class="accordion-toggle" data-toggle="collapse" data-parent="#addNewItemAccordion" href="#newPrompt">
            Create a new prompt.
        </a>
    </div>
    <div id="newPrompt" class="accordion-body collapse">
        <div class="accordion-inner">
            <br>
            <form class="form-horizontal" id="promptForm">
                <input type="hidden" name="editPromptId" id="editPromptId">
                <div class="control-group">
                    <label class="control-label" for="promptId">Prompt ID <span class="red">*</span></label>
                    <div class="controls">
                        <input type="text" name="id" id="promptId" placeholder="A unique identifier for the prompt." />
                        <i class="help-icon icon-question-sign" data-original-title="A unique identifier for the prompt." rel="tooltip" data-placement="right"></i>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label" for="displayLabel">Display Label <span class="red">*</span></label>
                    <div class="controls">
                        <input type="text" name="displayLabel" id="displayLabel" placeholder="Display Label" />
                        <i class="help-icon icon-question-sign" data-original-title="The user-friendly name of this prompt used in visualizations." rel="tooltip" data-placement="right"></i>
                    </div>
                </div>
                
                <div class="control-group">
                    <label class="control-label" for="promptText">Prompt Text <span class="red">*</span></label>
                    <div class="controls">
                        <textarea type="text" name="promptText" id="promptText" placeholder="Prompt Text"></textarea>
                        <i class="help-icon icon-question-sign" data-original-title="The text to display to the user when prompting them to respond." rel="tooltip" data-placement="right"></i>
                    </div>
                </div>
                
                <!--
                <div class="control-group">
                    <label class="control-label" for="abbreviatedText">Abbreviated Text <i class="icon-asterisk"></i></label>
                    <div class="controls">
                        <textarea type="text" name="abbreviatedText" id="abbreviatedText" placeholder="Abbreviated Text"></textarea>
                        <i class="help-icon icon-question-sign" data-original-title="An abbreviated version of the prompt text for use in situations where space is limited or for display purposes." rel="tooltip" data-placement="right"></i>
                    </div>
                </div>
                -->

                <div class="control-group">
                    <label class="control-label" for="promptType">Prompt Type <span class="red">*</span></label>
                    
                    <!--
                    <div class="controls">
                        <div class="input-append">
                            <input type="text" id="promptTypeText" placeholder="None." disabled/>
                            <input type="hidden" name="promptType" id="promptType"/> 
                            <button type="button" class="linkBtn" id="promptTypeBtn">Edit Prompt Detail</button>
                        </div>
                        <i class="help-icon icon-question-sign" data-original-title="Click to edit prompt type" rel="tooltip" data-placement="right"></i>
                    </div>
                    -->
                    <div class="controls">
                        <select id="choosePromptType" class="promptType">
                            <option value="">Please choose a prompt type</option>
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
                        <input type="hidden" name="promptType" id="promptType"/> 
                        <i class="help-icon icon-question-sign" data-original-title="Choose type of your prompt" rel="tooltip" data-placement="right"></i>
                    </div>
        
                    </br>
                    <label class="control-label" for="addedPrompt">Prompt Details</label>
                    <div class="controls">  
                        <div>
                            <textarea name="properties" id="addedPrompt" readonly></textarea>
                            <button type="button" class="linkBtn" id="promptTypeBtn">Edit Prompt Detail</button>
                        </div>
                    </div>
                    <div class="control-group">
                        <!--<label type="hiden" class="control-label" for="default">Default</label>-->
                        <div class="controls">
                            <input type="hidden" name="default" id="default" placeholder="Default" />
                            <!--<i class="help-icon icon-question-sign" data-original-title="The default value for this prompt. This is type-dependent." rel="tooltip" data-placement="right"></i>-->
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="condition">Condition</label>
                        <div class="controls">
                            <div class="input-append">
                                <textarea name="promptCondition" id="promptCondition" placeholder="None." disabled></textarea>
                                <button type="button" class="linkBtn" id="promptConditionBtn">Edit Condition</button>
                            </div>
                            <i class="help-icon icon-question-sign" data-original-title="The condition which determines if the prompt is displayed or not." rel="tooltip" data-placement="right"></i>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="skippable">Skip Option:</label>
                        <div class="controls"> 
                            <label class="checkbox">
                                <input type="checkbox" name="skippable" id="skippable">
                                Can this survey be skippable?
                            </label>
                        </div>
                    </div> 
                    
                    <div class="control-group">
                        <div class="controls">
                            <input type="text" name="skipLabel" id="skipLabel" placeholder="Skip Label" disabled/>
                            <i class="help-icon icon-question-sign" data-original-title="If skippable, this is the text of the button to use to skip the label." rel="tooltip" data-placement="right"></i>
                        </div> 
                    </div>   
                </div>
                
                <div class="control-group">
                    <div class="controls">
                        <button type="submit" class="btn btn-primary" id="addPrompt">Add Prompt</button>
                        <button type="button" class="btn hide" id="cancelPromptEdit">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>