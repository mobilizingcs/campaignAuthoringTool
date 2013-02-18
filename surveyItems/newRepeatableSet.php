<div class="accordion-group">
    <div class="accordion-heading">
        <a class="accordion-toggle" data-toggle="collapse" data-parent="#addNewItemAccordion" href="#newRepeatableSet">
            Create a new repeatable set.
        </a>
    </div>
    <div id="newRepeatableSet" class="accordion-body collapse">
        <div class="accordion-inner">
            <form class="form-horizontal" id="repeatable-form">
                <div class="control-group">
                    <label class="control-label" for="terminationQuestion">Term. Question <i class="icon-asterisk"></i></label>
                    <div class="controls">
                        <input type="text" name="terminationQuestion" id="terminationQuestion" placeholder="Termination Question"/>
                        <i class="help-icon icon-question-sign" data-original-title="The text to be displayed to the user to allow them to choose to repeat the set." rel="tooltip" data-placement="right"></i>
                    </div>
                </div>
                
                <div class="control-group">
                    <label class="control-label" for="terminationTrueLabel">Term. True Label <i class="icon-asterisk"></i></label>
                    <div class="controls">
                        <input type="text" name="terminationTrueLabel" id="terminationTrueLabel" placeholder="Termination True Label"/>
                        <i class="help-icon icon-question-sign" data-original-title="The text indicating that the user does not wish to repeat the set." rel="tooltip" data-placement="right"></i>
                    </div>
                </div>
                
                <div class="control-group">
                    <label class="control-label" for="terminationFalseLabel">Term. False Label <i class="icon-asterisk"></i></label>
                    <div class="controls">
                        <input type="text" name="terminationFalseLabel" id="terminationFalseLabel" placeholder="Termination False Label"/>
                        <i class="help-icon icon-question-sign" data-original-title="The text indicating that the user does wish to repeat the set." rel="tooltip" data-placement="right"></i>
                    </div>
                </div>
                
                <div class="control-group">
                    <div class="controls">
                        <label class="checkbox">
                            <input type="checkbox" name="terminationSkipEnabled" id="terminationSkipEnabled">
                            Show Termination Skip button?
                        </label>
                    </div>
                </div> 
                <div class="control-group">
                    <label class="control-label" id="terminationSkipLabel">Skip Label</label>
                    <div class="controls">
                        <input type="text" name="terminationSkipLabel" id="terminationSkipLabel" placeholder="Skip Label" disabled="disable"/>
                    </div>
                </div>
                
                <div class="control-group">
                    <label class="control-label" for="condition">Condition</label>
                    <div class="controls">
                        <input type="text" name="Condition" id="conditionRepeatable" onclick="openConditionBox('conditionRepeatable')" placeholder="Click to edit conditions" />
                        <i class="help-icon icon-question-sign" data-original-title="The condition which determines if the repeatable set is displayed or not." rel="tooltip" data-placement="right"></i>
                    </div>
                </div>
                
                <div class="control-group">
                    <label class="control-label"for="choose">Choose prompts to add to the repeatable set</label>
                    <div class="controls">
                        <select id="repeatPromptList">
                        </select>
                        <a href="#" id="addPromptRepeatable">Add</a>
                        <p></p>
                        <p><textarea name="promptsRepeatablt" id="promptsRepeatablt" readonly></textarea></p>
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <button type="submit" class="btn btn-primary" id="createRepeatable" value="Create Repeatble">Create Repeatable Set</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>