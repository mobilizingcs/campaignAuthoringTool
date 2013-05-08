<div id="conditionModal" class="modal hide fade" tabindex="-1" aria-labelledby="conditionModalLabel" aria-hidden="true">
    <div class="modal-header">
        <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>-->
        <h3 class="centered">Edit Condition</h3>
        </br>
        <p class="centered">
            Select a way to edit condition or select "No Condition" if 
            you don't want using condition for this prompt.
        </p>
        <div class="centered controls">
            <span class="centered">Edit Condition Using: </span>
            <select id="conditionType">
                <option value="">No Condition</option>
                <option value="simple">Simple Option</option>
                <option value="advanced">Advanced Option</option>
            </select> 
        </div>
        <input type="hidden" id="conditionType">
        <input type="hidden" id="conditionSource">
    </div>
    <div class="modal-body centered">
        <div class="container">
            <div class="control-group">
                <div class="controls conditionHelpText" id="conditionHelpText">
                </div>
                <div class="controls" id="conditionData">

                </div> 
                <div class="centered" id="simpleCondition">
                    <input type="hidden" id="conditionGroupCounter" value="1"/>
                    <div class="centerd">
                        <p style="text-align:left;">
                            Create condtions using predefined operator and conjunction as below. </br>
                            If you know the condition syntax or want to create more complex condition, please choose "Advanced Option". 
                        </p>
                    </div>
                    </br>
                    </br>
                    <table class="outsideTbl">
                        <!--<button class="btn btn-primary addConditionGroup" id="addConditionGroup">Add New Group</button>-->
                        <table class="group1" id="simpleConditionTbl" align="center">
                              <tr>
                                <th>Group #</th>
                                <th>Move Up</th>
                                <th>Move Down</th>
                                <th>Prompt ID</th>
                                <th>Operator</th>
                                <th>Value</th>
                                <th></th>
                                <th>Conjunction</th>
                                <th>Add</th>
                                <th>Delete</th>
                              </tr>
                              <tr>
                                <td><input class="conditionGroupNum span1" value="1" disabled/></td>
                                <td><button class='btn btn-primary upCondition'><i class="icon-arrow-up icon-white"></i></button></td>
                                <td><button class='btn btn-primary downCondition'><i class="icon-arrow-down icon-white"></i></button></td>
                                <td><select class="span2 previousPrompts"></select></td>
                                <td>
                                    <select class="span1 operator">
                                        <option value="==">==</option>
                                        <option value="&gt;">&gt;</option>
                                        <option value="&gt;=">&gt;=</option>
                                        <option value="&lt;">&lt;</option>
                                        <option value="&lt;=">&lt;=</option>
                                        <option value="!=">!=</option>
                                    </select>
                                </td>
                                <td>
                                    <select class="span2 conditionValueChoice">
                                        <option value="NOT_DISPLAYED">Not Display</option>
                                        <option value="SKIPPED">Skipped</option>
                                        <option value="USER_INPUT">Input your own value</option>
                                    </select>
                                </td>
                                <td><input type="text" class="conditionValue span2" value="" disabled/></td>
                                <td>
                                    <select class="span1 conjunction" >
                                        <option value="">None</option>
                                        <option value="and">AND</option>
                                        <option value="or">OR</option>
                                    </select>
                                </td>
                                <td><button class='btn btn-primary addCondition'><i class="icon-plus icon-white"></i></button></td>
                                <td><button class='btn btn-primary deleteCondition'><i class="icon-remove icon-white"></i></button></td>
                              </tr>
                            
                        </table>   
                    </table>
                </div>

                <div class="centered hide" id="advancedCondition">
                    <div class="centered">
                        <p style="text-align: left;">
                            Write your own condition in the text box below</br>
                            Advanced condition option assumes that you know about condition syntax. </br>
                            If you're not sure about syntax. Visit <a href="https://github.com/cens/ohmageServer/wiki/Campaign-Definition#wiki-condition" target="_blank"><span class="blue">this site</span></a> 
                        </p>
                    </div>
                    </br>
                    </br>
                    <div class="centered">
                        <!--
                        <table class="group1" id="conditionTbl" align="center">
                              <tr>
                                <th>Prompt ID</th>
                                <th>Operator</th>
                                <th>Value</th>
                                <th></th>
                                <th></th>
                              </tr>
                              <tr>
                                <td><select class="span2 previousPrompts"></select></td>
                                <td>
                                    <select class="span2 operator">
                                        <option value="==">is equal to</option>
                                        <option value=">">is greater than</option>
                                        <option value=">=">is greater than or equal to</option>
                                        <option value="<">is less than </option>
                                        <option value="<=">is less than or equal to</option>
                                        <option value="!=">is not equal to</option>
                                    </select>
                                </td>
                                <td>
                                    <select class="span2 conditionValueChoice">
                                        <option value="NOT_DISPLAYED">Not Display</option>
                                        <option value="SKIPPED">Skipped</option>
                                        <option value="USER_INPUT">Input your own value</option>
                                    </select>
                                </td>
                                <td><input type="text" class="conditionValue span2" value="" disabled/></td>
                                <td><button class='btn btn-primary addThisCondition'>Add Condition</button></td>
                               
                              </tr>
                              <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <select class="span2 conjunction" >
                                        <option value="and">AND</option>
                                        <option value="or">OR</option>
                                    </select>
                                </td>
                                <td><button class='btn btn-primary addConjunction'>Add Conjunction</button></td>
                              </tr>  
                        </table>
                        -->
                        <p>Current condition rule :</p>
                        <textarea class="advancedCondition" id="advancedCondition"></textarea>
                    </div>
                </div>   
            </div>    
        </div>    
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
        <button class="btn btn-primary" id="conditionSubmit">Save changes</button>
    </div>
</div>