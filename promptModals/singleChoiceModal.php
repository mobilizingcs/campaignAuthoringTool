<!--
<div id="singleChoiceModal" class="modal hide fade" tabindex="-1" aria-labelledby="singleChoiceModal" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 class="centered">Single-Choice Prompt</h3>
    </div>
    <div class="modal-body centered">
        <p>Type each answer on the left box and its corresponding value on the right box</p>
        <textarea type="text" placeholder="Choices" id="singleChoiceAnswer"></textarea>
        <textarea type="text" placeholder="Values" id="singleChoiceValue"></textarea>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" id="singleChoiceSubmit">Save changes</button>
        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
    </div>
</div>
-->

<div id="singleChoiceModal" class="modal hide fade" tabindex="-1" aria-labelledby="singleChoiceModal" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 class="centered">Single-Choice Prompt</h3>
        <a class="centered" href="" target="_blank">What is this ?</a>
    </div>
    <div class="modal-body centered">
        <div style="text-align:center;">
            <button class="btn btn-primary" id="addSingleBtn">Add Question</button>
        </div>
        <table id="singleChoiceTable" align="center">
          <tr>
            <th>Label</th>
            <th>Value</th>
          </tr>
          <tr>
            <td><input type="text" class="singleLabel" /></td>
            <td><input type="text" class="singleValue" /></td>
            <td><button class='btn btn-primary'>X</button></td>
          </tr>
        </table>
    </div>
    <div class="modal-body">
        <div class="control-group">
            <div class="controls">
                <label class="control-label pull-left" for="singleDefaultCheckbox">Default</label>
                <select class="pull-right" id="singleChoiceDefault">
                    <option value=-1>None</option>
                </select>
                <i class="help-icon icon-question-sign" data-original-title="The default value for this prompt. This is type-dependent." rel="tooltip" data-placement="right"></i>
            </div>    
        </div>            
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" id="singleChoiceSubmit">Save changes</button>
        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
    </div>
</div>