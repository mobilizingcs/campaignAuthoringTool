<div class="accordion-group">
    <!--
    <div class="accordion-heading">
        <a class="btn btn-link left textLink accordion-toggle createItem" data-toggle="collapse" data-parent="#addNewItemAccordion" href="#newMessage">
            Create a new message
        </a>
    </div>
    -->
    <div id="newMessage" class="accordion-body collapse">
        <div class="accordion-inner">
            <br>
            <form class="form-horizontal" id="messageForm">
                <input type="hidden" name="editMessageId" id="editMessageId">
                <div class="control-group">
                    <label class="control-label" for="messageId">Message ID: <span class="red">*</span></label>
                    <div class="controls">
                        <textarea name="id" id="messageId" placeholder="A unique identifier for this message."></textarea>
                        <i class="help-icon icon-question-sign" data-original-title="A unique identifier for this message." rel="tooltip" data-placement="right"></i>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="messageText">Message: <span class="red">*</span></label>
                    <div class="controls">
                        <textarea name="messageText" id="messageText" placeholder="The message to display to the user."></textarea>
                        <i class="help-icon icon-question-sign" data-original-title="The text to be displayed to the user." rel="tooltip" data-placement="right"></i>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="condition">Condition: </label>
                    <div class="controls">
                        <div class="input-append">
                            <input type="hidden" class="messageConditionType" id="messageConditionType" />
                            <input type="hidden" class="messageConditionJson" id="messageConditionJson" />
                            <textarea name="messageCondition" class="span5 messageCondition" id="messageCondition" placeholder="None." disabled></textarea>
                            <button type="button" class="btn btn-link" id="messageConditionBtn">Edit Condition <i class="help-icon icon-question-sign" data-original-title="The condition which determines if the message is displayed or not." rel="tooltip" data-placement="top"></i></button>
                        </div>
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <button type="submit" class="btn" id="createMessage">Create Message</button>
                        <button type="button" class="btn cancel" id="cancelMessage">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>