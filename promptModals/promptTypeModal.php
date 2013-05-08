<div id="promptTypeModal" class="modal hide fade" tabindex="-1" aria-labelledby="promptTypeModal" aria-hidden="true">
    <div class="modal-header">
        <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>-->
        <h3 class="centered">Prompt Type</h3> </br>
        <div class="centered">
            <span class="centered">Choose a prompt type from the dropdown list: </span>
            <select id="groupPromptType" class="promptType">
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
        </div>
    </div>
    <div class="modal-body centered">
        <div class="container">
            <div class="control-group">
                <div class="controls">

                </div>
                <div class="controls" id="promptData">
                </div>    
            </div>    
        </div>                 
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary submit" id="promptTypeSubmit">Save changes</button>
        <!--<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>-->
    </div>
</div>