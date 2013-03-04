<div id="conditionModal" class="modal hide fade" tabindex="-1" aria-labelledby="conditionModalLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="conditionModalLabel" class="centered">Edit Condition</h3>
    </div>
    <div class="modal-body centered">
        <div id="simpleCondition">
            <select class="span2" id="previousPrompts"></select>
            <select class="span2" id="operator">
                <option value="==">is equal to</option>
                <option value=">">is greater than</option>
                <option value=">=">is greater than or equal to</option>
                <option value="<">is less than </option>
                <option value="<=">is less than or equal to</option>
                <option value="!=">is not equal to</option>
            </select>
            <input type="hidden" id="conditionType">
            <input type="hidden" id="conditionSource">
            <input type="text" class="span2" id="conditionValue" placeholder="Value">
        </div>
        <div>
            <textarea name="advancedCondition" class="hide" id="advancedCondition"></textarea>
        </div>
        <button type="button" class="btn" id="conditionToggle">Simple</button>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
        <button class="btn btn-primary" id="conditionSubmit">Save changes</button>
    </div>
</div>