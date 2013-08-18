//var campaignWrapper = $.parseJSON(localStorage['campaignWrapper']);
//var tempSurvey = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')];


$(function() {
    $('#conditionGroupCounter').val('1');
    $('.advancedCondition').val("");
    $('.conjunction').val("");

	var prevValue = jQuery("#conditionType").val();

	if (prevValue === "simple") {
		/*
		$.get("promptModals/simpleCondition.html", function(data){
			$("#conditionData").append(data);
		});*/
		$("#simpleCondition").show();
		$("#advancedCondition").hide();
		
	} else if (prevValue === "advanced") {
		/*
		$.get("promptModals/advancedCondition.html", function(data){
			$("#conditionData").append(data);
		});
		*/
		$("#simpleCondition").hide();
		$("#advancedCondition").show();
	} else {
		$("#conditionData").empty();
		$("#simpleCondition").hide();
		$("#advancedCondition").hide();
	}
	jQuery("#conditionType").focus(function() {
		prevValue = $(this).val();
	}).change(function() {
		$this = $(this);
		var source = $('#conditionSource').val();
        var changeConfirm = true;
        if ((source == 'prompt' && $('#promptCondition').val().trim() != "") || (source == 'message' && $('#messageCondition').val().trim() != "")) {
            var text = "WARNING: Choosing new condition type will clear all the data of old conditions\n Proceed ?"
            changeConfirm = confirm(text);
        }

        if (changeConfirm) {
        	if (source == 'prompt') $('#promptCondition').val(""); // clear text box
        	else if (source == 'message') $('#messageCondition').val("");
            $('#conditionData').empty();

            switch ($this.val()) {
            	case 'simple':
					$("#simpleCondition").show();
					$("#advancedCondition").hide();
					$('#conditionType').val('simple');
					
            		break
            	case 'advanced':
					$("#simpleCondition").hide();
                    //$('.advancedCondition').val("");
					$("#advancedCondition").show();
					$('#conditionType').val('advanced');
            		break
            	default:
            		$("#simpleCondition").hide();
					$("#advancedCondition").hide();
            		$("#conditionData").empty();
            		break
            }
        } else {
        	$this.val(prevValue);
        	prevValue = $this.val();
        }
	});

	function updateOptionCondition() {
		var optionNum = 0;
		$('#simpleConditionTbl tr:not(:first-child)').each(function()
        {
            $this = $(this);
            $this.find(".conditionNum").val(optionNum++);
        });
	}
	function updateConditionPromptType() {
		$this = $(this);
		var promptType = $this.val();
        $this.parents("tr:first").find(".valueRow").empty();
		$this.parents("tr:first").find(".conditionValue").val('');

		switch (promptType) {
            case 'audio':
            case 'photo':
            case 'remote_activity':
            case 'timestamp':
            case 'video':
                /*
				$this.parents("tr:first").find(".operator option").remove();
                $this.parents("tr:first").find(".operator").append('<option value="==">is equal to</option>'+
                                                                    '<option value="!=">is not equal to</option>');
                $this.parents("tr:first").find(".conditionValueChoice option").remove();
                $this.parents("tr:first").find(".conditionValueChoice").append('<option value="NOT_DISPLAYED">Not Display</option>'+
                                                                    '<option value="SKIPPED">Skipped</option>');
                */
                $this.parents("tr:first").find(".operator option").remove();
                $this.parents("tr:first").find(".operator").append(operator[0]);
                $this.parents("tr:first").find(".operator").append(operator[5]);
                $this.parents("tr:first").find(".conditionValueChoice option").remove();
                $this.parents("tr:first").find(".conditionValueChoice").append(conditionValueChoice[0]);
                $this.parents("tr:first").find(".conditionValueChoice").append(conditionValueChoice[1]);
				break;
            case 'message':
                $this.parents("tr:first").find(".operator option").remove();
                $this.parents("tr:first").find(".operator").append(operator[0]);
                $this.parents("tr:first").find(".operator").append(operator[5]);
                $this.parents("tr:first").find(".conditionValueChoice option").remove();
                $this.parents("tr:first").find(".conditionValueChoice").append(conditionValueChoice[0]);
                break;
            case 'text':
                $this.parents("tr:first").find(".operator option").remove();
                $this.parents("tr:first").find(".operator").append(operator[0]);
                $this.parents("tr:first").find(".operator").append(operator[5]);
                $this.parents("tr:first").find(".conditionValueChoice option").remove();
                $this.parents("tr:first").find(".conditionValueChoice").append(conditionValueChoice[0]);
                $this.parents("tr:first").find(".conditionValueChoice").append(conditionValueChoice[1]);
                $this.parents("tr:first").find(".conditionValueChoice").append(conditionValueChoice[2]);
                break;
			case 'multi_choice':
            case 'multi_choice_custom':
            case 'single_choice':
            case 'single_choice_custom':
            case 'number':
				$this.parents("tr:first").find(".operator option").remove();
                $this.parents("tr:first").find(".operator").append(operator[0]);
                $this.parents("tr:first").find(".operator").append(operator[1]);
                $this.parents("tr:first").find(".operator").append(operator[2]);
                $this.parents("tr:first").find(".operator").append(operator[3]);
                $this.parents("tr:first").find(".operator").append(operator[4]);
                $this.parents("tr:first").find(".operator").append(operator[5]);
                $this.parents("tr:first").find(".conditionValueChoice option").remove();
                $this.parents("tr:first").find(".conditionValueChoice").append(conditionValueChoice[0]);
                $this.parents("tr:first").find(".conditionValueChoice").append(conditionValueChoice[1]);
                $this.parents("tr:first").find(".conditionValueChoice").append(conditionValueChoice[2]);
				break;       
			case '-1':
				$this.parents("tr:first").find(".operator option").remove();
                break;
			default:
				break;
		}
	}
	function validateConditionValue() {
		// TODO
		$this = $(this);
		var promptType = $this.parents("tr:first").find(".previousPrompts").val();
        var valueChoice = $this.parents("tr:first").find(".conditionValueChoice").val();

        if (valueChoice == "USER_INPUT") {
            var value = $this.parents("tr:first").find(".conditionValue").val();
            var errorCode = 0;
            var errorMessage = "";
            console.log(value);

            // get promptID
            var promptID = $this.parents("tr:first").find(".previousPrompts option:selected").text();
            console.log(promptID);

    		switch (promptType) {
    			case 'message':
                    // cannot reach here
                    return false;
    				break;
    			case 'multi_choice':
                    if (value == "" || !isPositiveInteger(value.trim())) {
                        errorCode = 1;
                        errorMessage += "Value for Multiple Choice '" + promptID + "' must be an option key."
                    } else {
                        // find the prompt in the contentList
                        var numOption = 0;
                        for (i in campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']) {
                            
                            if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']) {
                                if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['id'] == promptID) {
                                    numOption = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['properties']['property'].length;
                                    console.log(numOption);
                                    break;
                                }
                            }
                        }
                        if (Number(value) < 0 || Number(value) >= numOption ) {
                            //console.log(numOption);
                            errorCode = 1;
                            errorMessage += "Value for Multiple Choice '" + promptID + "' must be an option key."
                            //$this.parents("tr:first").find(".conditionValue").addClass('error2');
                        }
                    }
    				break;
                case 'multi_choice_custom':
                    if (value == "" || !isPositiveInteger(value.trim())) {
                        errorCode = 1;
                        errorMessage += "Value for Multiple Choice Custom'" + promptID + "' must be an option key."

                    } else {
                        // find the prompt in the contentList
                        var numOption = 0;
                        for (i in campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']) {
                            
                            if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']) {
                                if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['id'] == promptID) {
                                    numOption = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['properties']['property'].length;
                                    console.log(numOption);
                                    break;
                                }
                            }
                        }
                        if (Number(value) < 0 || Number(value) >= numOption ) {
                            //console.log(numOption);
                            errorCode = 1;
                            errorMessage += "Value for Multiple Choice Custom'" + promptID + "' must be an option key."
                        }
                    }
                    break;
                case 'single_choice':
                    if (value == "" || !isPositiveInteger(value.trim())) {
                        errorCode = 1;
                        errorMessage += "Value for Single Choice '" + promptID + "' must be an option key."
                    } else {
                        // find the prompt in the contentList
                        var numOption = 0;
                        for (i in campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']) {
                            
                            if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']) {
                                if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['id'] == promptID) {
                                    numOption = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['properties']['property'].length;
                                    console.log(numOption);
                                    break;
                                }
                            }
                        }
                        if (Number(value) < 0 || Number(value) >= numOption ) {
                            //console.log(numOption);
                            errorCode = 1;
                            errorMessage += "Value for Single Choice '" + promptID + "' must be an option key."
                        }
                    }
    				break;
                case 'single_choice_custom':
                    if (value == "" || !isPositiveInteger(value.trim())) {
                        errorCode = 1;
                        errorMessage += "Value for Single Choice Custom '" + promptID + "' must be an option key."
                    } else {
                        // find the prompt in the contentList
                        var numOption = 0;
                        for (i in campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']) {
                            
                            if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']) {
                                if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['id'] == promptID) {
                                    numOption = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['properties']['property'].length;
                                    console.log(numOption);
                                    break;
                                }
                            }
                        }
                        if (Number(value) < 0 || Number(value) >= numOption ) {
                            //console.log(numOption);
                            errorCode = 1;
                            errorMessage += "Value for Single Choice Custom '" + promptID + "' must be an option key."
                        }
                    }
                    break;
                case 'number':
                	if (!isNumber(value)) {
            			errorCode = 1;
            			errorMessage += "Value for Number '" + promptID + "' must be an option key."
                    }
                    break;
                case 'photo':
                    // cannot reach here
                    return false;
                    break; 
                case 'remote_activity':
                    // cannot reach here
                    return false;
                    break;
                case 'text':
                    if (value != "") return true;
                    else {
                        errorCode = 1;
                        errorMessage += "Value for Text Prompt must not be empty\n";
                    }
                    break;
                case 'timestamp':
                    // cannot reach here
                    return false;
                    break;
                case 'video':
                    // cannot reach here
                    return false;
                    break;            
    			case '-1':
                    // cannot reach here
                    return false;
    				break;
    			default:
                    // cannot reach here
                    return false;
    				break;
    		}
            if (errorCode != 0) {
                alert(errorMessage);
                $this.parents("tr:first").find(".conditionValue").addClass('error2');
                return false;
            } else { 
                $this.parents("tr:first").find(".conditionValue").removeClass('error2');
                return true;
            }
        } else {
            return true;
        }
	}
	function submitValidationSimple() {
		var errorCode = 0;
		var errorMessage = "";
		$('#simpleConditionTbl tr:not(:first-child)').each(function()
        {
            $this = $(this);
            var value = $this.find(".conditionValue").val();
            var promptType = $this.find(".previousPrompts").val();
            var conjunction = $this.find(".conjunction").val();
            var valueChoice = $this.find(".conditionValueChoice").val();
            var oldErrorMessage = errorMessage;

            
            if (promptType == "") {
            	errorMessage += "Previous prompt must not be None.\n";
            	errorCode = 1;
            } else {
                if (valueChoice == "USER_INPUT") {

                // get promptID
                var promptID = $this.find(".previousPrompts option:selected").text();

                switch (promptType) {
                    case 'message':
                        // cannot reach here
                        return false;
                        break;
                    case 'multi_choice':
                    case 'multi_choice_custom':
                    case 'single_choice':
                    case 'single_choice_custom':
                        if (value == "" || !isPositiveInteger(value.trim())) {
                            errorCode = 1;
                            errorMessage += "Value for Prompt '" + promptID + "' must be an option key."
                        } else {
                            // find the prompt in the contentList
                            var numOption = 0;
                            for (i in campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']) {
                                
                                if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']) {
                                    if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['id'] == promptID) {
                                        numOption = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['properties']['property'].length;
                                        console.log(numOption);
                                        break;
                                    }
                                }
                            }
                            if (Number(value) < 0 || Number(value) >= numOption ) {
                                //console.log(numOption);
                                errorCode = 1;
                                errorMessage += "Value for Prompt '" + promptID + "' must be an option key."
                                //$this.parents("tr:first").find(".conditionValue").addClass('error2');
                            }
                        }
                        break;
                    case 'number':
                        if (!isNumber(value)) {
                            errorCode = 1;
                            errorMessage += "Value for Prompt '" + promptID + "' must be an option key."
                        }
                        break;
                    case 'photo':
                        // cannot reach here
                        return false;
                        break; 
                    case 'remote_activity':
                        // cannot reach here
                        return false;
                        break;
                    case 'text':
                        if (value != "") return true;
                        else {
                            errorCode = 1;
                            errorMessage += "Value for Prompt'" + promptID+ " must not be empty\n";
                        }
                        break;
                    case 'timestamp':
                    case 'video':
                        // cannot reach here
                        return false;
                        break; 
                    case '-1':
                        // cannot reach here
                        return false;
                        break;
                    default:
                        // cannot reach here
                        return false;
                        break;
                } // end switch
                } // end if
                if (errorCode != 0) $this.find(".conditionValue").addClass('error2');
                else $this.find(".conditionValue").removeClass('error2');
            }
            if ($(this).is(":last-child")) {
            	if (conjunction != "") {
            		errorMessage += "Last condition's conjunction must be None\n";
            		errorCode = 1;
            	}
            } else {
            	if (conjunction == "") {
            		errorMessage += "Conjunction must not be None except last condition.\n";
            		errorCode = 1;
            	}
            }
            if (oldErrorMessage != errorMessage) {
            	errorMessage += "\n";
            }
            
        });

        if (errorCode != 0) {
            alert(errorMessage);    
            return false;
        } else {
            return true;
        }
	}


	$("table[id=simpleConditionTbl] .upCondition,.downCondition,.addCondition,.deleteCondition").live("click", function(e){
    	e.preventDefault();
        var row = $(this).parents("tr:first");
        var firstrow = $('table tr:first');
        var groupNum = $(this).closest('table').find(".conditionGroupNum").val(); 
        var selector = '.group' + groupNum;
        if ($(this).is(".upCondition") && row.prevAll().length > 1) {
            row.prev().find(".conditionGroupNum").val("");
            row.insertBefore(row.prev());
            $(this).closest('table').find("tr:nth-child(2)").find(".conditionGroupNum").val(groupNum);   
        } else if ($(this).is(".downCondition") && row.nextAll().length > 0) {
            row.find(".conditionGroupNum").val("");
            row.insertAfter(row.next());
            $(this).closest('table').find("tr:nth-child(2)").find(".conditionGroupNum").val(groupNum);   
        } else if ($(this).is(".addCondition")) {
        	var $tr = $(this).closest("tr");
    		var $clone = $tr.clone();
            $clone.find(':text').val('');
            $clone.find('.valueRow').empty();
            $clone.find('.conditionValue').attr('disabled', 'disabled');
            $clone.find('.conditionValue').removeClass('error2');
        	$(this).closest("tr").after($clone);
        } else if ($(this).is(".deleteCondition")) {
            var $table = $(this).closest('table');
            console.log($table.find("tr:nth-child(2)").find(".conditionGroupNum").val());
        	if ($(this).closest('table').find('tr').length <= 2) alert("Cannot delete last condition");
        	else $(this).closest("tr").remove();
            
            // update group # in case of delete first row
            $table.find("tr:nth-child(2)").find(".conditionGroupNum").val(groupNum);             
        }

        updateOptionCondition();
        //updateSelectionMulti();
    });

    // Condition submit button
    $('#conditionSubmit').click(function(){
        if ($('#conditionType').val() == 'simple') { // simple condition
        	var validate = submitValidationSimple();
        	var source = $('#conditionSource').val();
            console.log(source);
        	if (validate) {
        		var output = "";
        		$('#simpleConditionTbl tr:not(:first-child)').each(function()
		        {
		            $this = $(this);
                    var value ="";
                    var valueType = $this.find(".conditionValueChoice").val();
                    if (valueType == 'NOT_DISPLAYED') value = "NOT_DISPLAYED";
                    else if (valueType == 'SKIPPED') value = "SKIPPED";
                    else value = $this.find(".conditionValue").val();

		            var promptID = $this.find(".previousPrompts option:selected").text();
		            var operator = $this.find(".operator").val();
		            var conjunction = $this.find(".conjunction").val();

		            output += "(" + promptID + " " + operator + " " + value + ")" + " " + conjunction + " \n"; 
		        });
		        switch (source) {
                case 'message':
                    console.log('condition' + output);
                    
                    if (editObj == null)
                        $('#messageCondition').val(output);
                    else 
                        editObj.find('.editPromptDetails').find('.messageCondition').val(output);
                    //$('.messageCondition').val(output);
                    //console.log($('#messageCondition').val());
                    break;
                case 'prompt':
                    if (editObj == null) {
                        $('#promptCondition').val(output);
                    }
                    else 
                        editObj.find('.editPromptDetails').find('.promptCondition').val(output);
                    break;
                default:
                    break;
                }
                console.log($('#messageCondition').val());
        		$('#conditionModal').modal('hide');	
        	}	     
        }
        else if ($('#conditionType').val() == 'advanced') { //advance condition
            var source = $('#conditionSource').val();
            var text = $('.advancedCondition').val();
            switch (source) {
                case 'message':
                    if (editObj == null)
                        $('#messageCondition').val(text);
                    else
                        editObj.find('.editPromptDetails').find('.messageCondition').val(text);
                    break;
                case 'prompt':
                    if (editObj == null)
                        $('#promptCondition').val(text);
                    else
                        editObj.find('.editPromptDetails').find('.promptCondition').val(text);
                    break;
                default:
                    break;
            }
            console.log($('#messageCondition').val());
            $('#conditionModal').modal('hide');
        } else {
        	var source = $('#conditionSource').val();
        	switch (source) {
                case 'message':
                    if (editObj == null)
                        $('#messageCondition').val("");
                    else
                        editObj.find('.editPromptDetails').find('.messageCondition').val("");
                    break;
                case 'prompt':
                    if (editObj == null)
                        $('#promptCondition').val("");
                    else
                        editObj.find('.editPromptDetails').find('.promptCondition').val("");
                    break;
                default:
                    break;
            }
            $('#conditionModal').modal('hide');
        }       
    });

    // delegate    
    $('#conditionModal').delegate('.previousPrompts', 'change', updateConditionPromptType);
    $('#conditionModal').delegate('.conditionValue', 'change', validateConditionValue);

    // operator selector
    jQuery(".operator").live("change", function(e){
        e.preventDefault();
        $this = $(this);
        var promptType = $this.parents("tr:first").find(".previousPrompts").val();
        if (promptType == 'multi_choice' || promptType=='multi_choice_custom'
            || promptType == 'single_choice' || promptType== 'single_choice_custom' ||
            promptType =='number') {
            switch($this.val()) {
                case '==':
                case '!=':
                    $this.parents("tr:first").find(".conditionValueChoice option").remove();
                    $this.parents("tr:first").find(".conditionValueChoice").append('<option value="NOT_DISPLAYED">Not Display</option>'+
                                                                        '<option value="SKIPPED">Skipped</option>'+
                                                                        '<option value="USER_INPUT">Specify value</option>');
                    $this.parents("tr:first").find(".conditionValue").attr('disabled', 'disabled');
                    break;
                default:
                    $this.parents("tr:first").find(".conditionValueChoice option").remove();
                    $this.parents("tr:first").find(".conditionValueChoice").append('<option value="USER_INPUT">Specify value</option>');
                    // process for different prompt type
                    var promptType = $this.parents("tr:first").find(".previousPrompts").val();
                    switch (promptType) {
                        case 'multi_choice':
                        case 'multi_choice_custom':
                        case 'single_choice':
                        case 'single_choice_custom':
                            var promptID = $this.parents("tr:first").find(".previousPrompts option:selected").text();
                            // find the prompt in the contentList
                            var numOption = 0;
                            for (i in campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']) {
                                if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']) {
                                    if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['id'] == promptID) {
                                        numOption = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['properties']['property'].length;
                                        console.log(numOption);
                                        break;
                                    }
                                }
                            }
                            $this.parents("tr:first").find(".valueRow").append('<select class="conditionValue span1" ></select>');
                            for (j=0; j<numOption; j++) {
                                var option = '<option value=' + j + '>' + j + '</option>';
                                $this.parents("tr:first").find(".conditionValue").append(option);
                            }
                            break;
                        case 'number':
                        case 'text':
                            $this.parents("tr:first").find(".valueRow").append('<input type="text" class="conditionValue span1" value="" disabled/>');
                            $this.parents("tr:first").find(".conditionValue").removeAttr('disabled');
                            $this.parents("tr:first").find(".conditionValue").val('');
                            break;
                        default:
                            // cannot reach here
                            return false;
                            break;
                    } // end switch
                    //$this.parents("tr:first").find(".conditionValue").removeAttr('disabled');
                    break;
            }
        }
    });
    // Condition value
    jQuery(".conditionValueChoice").live("change", function(e){
        e.preventDefault();
        $this = $(this);
        switch($this.val()) {
            case 'NOT_DISPLAYED':
                $this.parents("tr:first").find(".valueRow").empty();
                //$this.parents("tr:first").find(".conditionValue").attr('disabled', 'disabled');
                //$this.parents("tr:first").find(".conditionValue").val('');
                break;
            case 'SKIPPED':
                $this.parents("tr:first").find(".valueRow").empty();
                //$this.parents("tr:first").find(".conditionValue").attr('disabled', 'disabled');
                //$this.parents("tr:first").find(".conditionValue").val('');
                break;
            case 'USER_INPUT':
                // process for different prompt type
                var promptType = $this.parents("tr:first").find(".previousPrompts").val();
                switch (promptType) {
                    case 'multi_choice':
                    case 'multi_choice_custom':
                    case 'single_choice':
                    case 'single_choice_custom':
                        var promptID = $this.parents("tr:first").find(".previousPrompts option:selected").text();
                        // find the prompt in the contentList
                        var numOption = 0;
                        for (i in campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']) {
                            if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']) {
                                if (campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['id'] == promptID) {
                                    numOption = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList'][''][i]['prompt']['properties']['property'].length;
                                    console.log(numOption);
                                    break;
                                }
                            }
                        }
                        $this.parents("tr:first").find(".valueRow").append('<select class="conditionValue span1" ></select>');
                        for (j=0; j<numOption; j++) {
                            var option = '<option value=' + j + '>' + j + '</option>';
                            $this.parents("tr:first").find(".conditionValue").append(option);
                        }
                        break;
                    case 'number':
                    case 'text':
                        $this.parents("tr:first").find(".valueRow").append('<input type="text" class="conditionValue span1" value="" disabled/>');
                        $this.parents("tr:first").find(".conditionValue").removeAttr('disabled');
                        $this.parents("tr:first").find(".conditionValue").val('');
                        break;
                    default:
                        // cannot reach here
                        return false;
                        break;
                } // end switch
                //$this.parents("tr:first").find(".valueRow").append('<input type="text" class="conditionValue span2" value="" disabled/>');
                //$this.parents("tr:first").find(".conditionValue").removeAttr('disabled');
                //$this.parents("tr:first").find(".conditionValue").val('');

                break;
            default:
                break;

        }
    });

    // add new condition gropu
    jQuery(".addConditionGroup").live("click", function(e){
        e.preventDefault();
        $this = $(this);

        var currentGroup = '.group' + $('#conditionGroupCounter').val();

        var $newTable = $('#simpleConditionTbl').clone(true);
        $newTable.find("tr:gt(1)").remove();

        /*
        $newTable.find("th").each(function()
        {
        });
        */
        var counter = Number($('#conditionGroupCounter').val());
        $newTable.find(".conditionGroupNum").val(counter+1);
        $('#conditionGroupCounter').val(++counter);
        console.log($('#conditionGroupCounter').val());
        var className = 'group' + $('#conditionGroupCounter').val();
        $newTable.attr('class', className);

        //$this = $this.after($('<table align="center" id="group2"><tr></tr></table>'));
        var $tblConjuntion = '<select class="span1 conjunction" ><option value="and">AND</option><option value="or">OR</option></select>'
        $(currentGroup).after($newTable);
        $(currentGroup).after($tblConjuntion);
        //console.log($newRow);
    });
    
    $(".conditionTooltip").live({
        mouseenter: function() {
            var $this = $(this);
            $this.attr('data-original-title', simpleConditionTooltip);
            $this.tooltip('show');
           },
        mouseleave: function() {
              var $this = $(this);
            $this.tooltip('hide');
           }
       }
    );
    
    jQuery(".addThisCondition").live("click", function(e){
        e.preventDefault();
        $this = $(this);
        $row = $this.closest('tr');
        var output= "";
        var promptID = $row.find(".previousPrompts").val();

        if (promptID == "") {
            alert("Previous prompt must not be None.\n");
        } else {
            var value ="";
            var valueType = $row.find(".conditionValueChoice").val();
            if (valueType == 'NOT_DISPLAYED') value = "NOT_DISPLAYED";
            else if (valueType == 'SKIPPED') value = "SKIPPED";
            else value = $row.find(".conditionValue").val();

            var promptID = $row.find(".previousPrompts option:selected").text();
            var operator = $row.find(".operator").val();

            output += "(" + promptID + " " + operator + " " + value + ")";
            var oldVal = $('.advancedCondition').val();
            $('.advancedCondition').val(oldVal + output); 
        }
    });
    jQuery(".addConjunction").live("click", function(e){
        e.preventDefault();
        $this = $(this);
        $row = $this.closest('tr');
        
        var conjunction = $row.find(".conjunction").val();
        var oldVal = $('.advancedCondition').val();
        $('.advancedCondition').val(oldVal + conjunction + '\n'); 
    });
});