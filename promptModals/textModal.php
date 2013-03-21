<div id="textModal" class="modal hide fade" tabindex="-1" aria-labelledby="textModal" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 class="centered">Text Prompt</h3>
    </div>
    <div class="modal-body centered">
        <p>What is the minimum and maximum character count you wish to allow</p>
        <span> Min: </span>
        <input type="text" id="minTextLength"/>
        <span> Max: </span>
        <input type="text" id="maxTextLength"/>
    </div>
    <div class="modal-body">
        <div class="control-group">
            <div class="controls">
                <span> Default: </span>
                <input type="text" id="textDefault"/>
                <i class="help-icon icon-question-sign" data-original-title="The default value for this prompt. This is type-dependent." rel="tooltip" data-placement="right"></i>
            </div>    
        </div>            
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" id="textSubmit">Save changes</button>
        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
    </div>
</div>