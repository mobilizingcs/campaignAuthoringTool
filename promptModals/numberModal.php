<div id="numberModal" class="modal hide fade" tabindex="-1" aria-labelledby="numberModal" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 class="centered">Number Prompt</h3>
    </div>
    <div class="modal-body centered">
        <p>Enter the minimum and maximum number the user can input.</p>
        <span> Min: </span>
        <input type="text" id="minNumber"/>
        <span> Max: </span>
        <input type="text" id="maxNumber"/>
    </div>
    <div class="modal-body">
        <div class="control-group">
            <div class="controls">
                <span> Default: </span>
                <input type="text" id="numberDefault"/>
                <i class="help-icon icon-question-sign" data-original-title="The default value for this prompt. This is type-dependent." rel="tooltip" data-placement="right"></i>
            </div>    
        </div>            
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" id="numberSubmit">Save changes</button>
        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
    </div>
</div>