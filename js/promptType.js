$(function() {
    function displayAudioValues() {
        if ($('#maxAudioLength').val()== null || $('#maxAudioLength').val() == "") $('#maxAudioLength').val(180);
        var length = $('#maxAudioLength').val();

        var properties = "max_milliseconds:" + length;

        jsonOption = {'property':[]};
        property = {};
        property['key'] = 'max_milliseconds';
        property['label'] = length;
        jsonOption['property'].push(property);
        if (editObj == null) {
            $('#addedPrompt').val(properties);
            $('#jsonText').val(JSON.stringify(jsonOption));

            t = JSON.parse($('#jsonText').val());
            //console.log(t['property'][0]['key']);
        }
        else {
            editObj.find('.editPromptDetails').find('.addedPrompt').val(properties);
            editObj.find('.editPromptDetails').find('.jsonText').val(JSON.stringify(jsonOption));
        }
    }

    function displayMultiChoiceValues() {
        var defaultValue = $('#multiChoiceDefault').val();
        //console.log(defaultValue);
        var defaultText = $('#multiChoiceDefault option:selected').text();
        var properties = "";
        var tmp = ""; // default value

        if (defaultText == 'None' || defaultText == "") {
            if (editObj == null)
                $('#default').val("");
            else {
                editObj.find('.editPromptDetails').find('.default').val("");
            }
        } else {
            
            jQuery.each(defaultValue,function(index, item){
                tmp += item + ',';
                var child = Number(item) + 1;
                //console.log(child + ":" + $('#multiChoiceTable tr').eq(child).find('.multiLabel').val()); 
                $('#multiChoiceTable tr').eq(child).find('.isDefault').val(1);    
            });
            //console.log(tmp);
            if (editObj == null)
                $('#default').val(tmp.slice(0,-1));
            else
                editObj.find('.editPromptDetails').find('.default').val(tmp.slice(0,-1));
        }

        // process key and value pair
        var key = 0;
        var properties = ""
        jsonOption = {'property':[]};
        $('#multiChoiceTable tr:not(:first-child)').each(function()
        {
            $this = $(this);
            var option = $this.find(".multiOptionNum").val();
            var label = $this.find(".multiLabel").val();
            var value = $this.find(".multiValue").val();
            var vDefault = $this.find(".isDefault").val();
    
            // save as a json
            property = {};
            property['key'] = Number(option);
            property['label'] = label;
            if (value != "") property['value'] = value; 
            jsonOption['property'].push(property);

            if (vDefault == '1') properties += label + ":" + value + "\t (Default)\n";
            else properties += label + ":" + value + "\n";
            
            key++;
        });

        //console.log(jsonOption);
        //console.log(JSON.stringify(jsonOption));
        //j = JSON.stringify(jsonOption);
        

        if (editObj == null) {
            $('#addedPrompt').val(properties);
            $('#jsonText').val(JSON.stringify(jsonOption));
            //var t = JSON.parse($('#jsonText').val());
            //console.log(t['property'][1]['label']);
        }
        else {
            editObj.find('.editPromptDetails').find('.addedPrompt').val(properties);
            editObj.find('.editPromptDetails').find('.jsonText').val(JSON.stringify(jsonOption));
        }
    }

    function displaySingleChoiceValues() {
        var defaultValue = $('#singleChoiceDefault').val();
        
        var child = Number(defaultValue) + 1;
        $('#singleChoiceTable tr').eq(child).find('.isDefault').val(1);    
        var defaultText = $('#singleChoiceDefault option:selected').text();
        var defaultVal = "\n\nDefault: ";

        if (defaultText == 'None') {
            if (!isEditing)
                $('#default').val("");
            else {
                editObj.find('.editPromptDetails').find('.default').val("");
            }
        }
        var key = 0;
        var properties = "";
        jsonOption = {'property':[]};
        $('#singleChoiceTable tr:not(:first-child)').each(function()
        {
            $this = $(this);
            var option = $this.find(".singleOptionNum").val();
            var label = $this.find(".singleLabel").val();
            var value = $this.find(".singleValue").val();
            var vDefault = $this.find(".isDefault").val();
            if (vDefault == '1') properties += label + ":" + value + "\t(Default)\n";
            else properties += label + ":" + value + "\n";
            defaultCheck = option + ': ' + label;

            // save as a json
            property = {};
            property['key'] = Number(option);
            property['label'] = label;
            if (value != "") property['value'] = value; 
            jsonOption['property'].push(property);

            if (defaultCheck === defaultText) { 
                if (editObj == null)
                    $('#default').val(key);
                else {
                    editObj.find('.editPromptDetails').find('.default').val(key);
                }
            }
            key++;
        });
        if (defaultText == 'None') {
            if (editObj == null)
                $('#default').val("");
            else {
                editObj.find('.editPromptDetails').find('.default').val("");
            }
        }
        if (editObj == null) {
            $('#addedPrompt').val(properties);
            $('#jsonText').val(JSON.stringify(jsonOption));
            //var t = JSON.parse($('#jsonText').val());
            //console.log(t['property'][1]['label']);
        }
        else {
            editObj.find('.editPromptDetails').find('.addedPrompt').val(properties);
            editObj.find('.editPromptDetails').find('.jsonText').val(JSON.stringify(jsonOption));
        }



    }

    function displayNumberValues() {
        var minNum = $('#minNumber').val();
        var maxNum = $('#maxNumber').val();
        var defaultValue = $('#numberDefault').val();
        var defaultText = "Default: " + defaultValue;
        var properties = "min:" + minNum + "\n" + "max:" + maxNum;

        if (defaultValue != "") {
            if (editObj == null)
                $('#default').val(defaultValue);
            else {
                editObj.find('.editPromptDetails').find('.default').val(defaultValue);
            }
        } else {
            if (editObj == null)
                $('#default').val("");
            else
                editObj.find('.editPromptDetails').find('.default').val("");
        }

        jsonOption = {'property':[]};
        property = {};
        property['key'] = 'min';
        property['label'] = minNum;
        jsonOption['property'].push(property);
        property = {};
        property['key'] = 'max';
        property['label'] = maxNum;
        jsonOption['property'].push(property);

        if (editObj == null) {
            $('#addedPrompt').val(properties + '\n' + defaultText);
            $('#jsonText').val(JSON.stringify(jsonOption));

            //var t = JSON.parse($('#jsonText').val());
            //console.log(t['property'][1]['label']);           
        }
        else {
            editObj.find('.editPromptDetails').find('.addedPrompt').val(properties + '\n' + defaultText);
            editObj.find('.editPromptDetails').find('.jsonText').val(JSON.stringify(jsonOption));
        }
    }

    function displayPhotoValues() {
        var resolution = $('#maxRes').val();
        var properties = "resolution:" + resolution;

        jsonOption = {'property':[]};
        property = {};
        property['key'] = 'maxDimension';
        property['label'] = resolution;
        jsonOption['property'].push(property);

        if (editObj == null) {
            $('#addedPrompt').val(properties);
            $('#jsonText').val(JSON.stringify(jsonOption));

            //var t = JSON.parse($('#jsonText').val());
            //console.log(t['property'][0]['label']);
        }
        else {
            editObj.find('.editPromptDetails').find('.addedPrompt').val(properties);
            editObj.find('.editPromptDetails').find('.jsonText').val(JSON.stringify(jsonOption));
        }
    }

    function displayTextValues() {
        var min = $('#minTextLength').val();
        var max = $('#maxTextLength').val();
        var defaultValue = $('#textDefault').val();
        var defaultText = "Default: " + defaultValue;
        var properties = "min:" + min + "\n" + "max:" + max;

        if (defaultValue != "") {
            if (editObj == null)
                $('#default').val(defaultValue);
            else
                editObj.find('.editPromptDetails').find('.default').val(defaultValue);
        }

        jsonOption = {'property':[]};
        property = {};
        property['key'] = 'min';
        property['label'] = min;
        jsonOption['property'].push(property);
        property = {};
        property['key'] = 'max';
        property['label'] = max;
        jsonOption['property'].push(property);

        if (editObj == null) {
            $('#addedPrompt').val(properties + '\n' + defaultText);
            $('#jsonText').val(JSON.stringify(jsonOption));

            //var t = JSON.parse($('#jsonText').val());
            //console.log(t['property'][0]['label']);
        }
        else {
            editObj.find('.editPromptDetails').find('.addedPrompt').val(properties + '\n' + defaultText);
            editObj.find('.editPromptDetails').find('.jsonText').val(JSON.stringify(jsonOption));
        }
    }

    function displayRemoveActivityValues() {
        var pack = $('#packageRemote').val();
        var activity = $('#activityRemote').val();
        var action = $('#actionRemote').val();
        var auto = $('#autoLaunchRemote').val();
        var retry = $('#retriesRemote').val();
        var min = $('#minrunRemote').val();
        var input = $('#inputRemote').val();
        var properties = "Package:" + pack + "\n"
                      + "Activity:" + activity + "\n"
                      + "Action:" + action + "\n"
                      + "autolaunch:" + auto + "\n"
                      + "Retries:" + retry + "\n"
                      + "Min_runs:" + min + "\n"
                      + "Input:" + input + "\n"  

        jsonOption = {'property':[]};
        property = {};
        property['key'] = 'package';
        property['label'] = pack;
        jsonOption['property'].push(property);
        property = {};
        property['key'] = 'activity';
        property['label'] = activity;
        jsonOption['property'].push(property);     
        property = {};
        property['key'] = 'action';
        property['label'] = action;
        jsonOption['property'].push(property);
        property = {};
        property['key'] = 'autolaunch';
        property['label'] = auto;
        jsonOption['property'].push(property);
        property = {};
        property['key'] = 'retries';
        property['label'] = retry;
        jsonOption['property'].push(property);
        property = {};
        property['key'] = 'min_runs';
        property['label'] = min;
        jsonOption['property'].push(property);
        property = {};
        property['key'] = 'input';
        property['label'] = input;
        jsonOption['property'].push(property);          

        if (editObj == null) {
            $('#addedPrompt').val(properties);
            $('#jsonText').val(JSON.stringify(jsonOption));

            //var t = JSON.parse($('#jsonText').val());
            //console.log(t['property'][0]['label']);
        }
        else {
            editObj.find('.editPromptDetails').find('.addedPrompt').val(properties);
            editObj.find('.editPromptDetails').find('.jsonText').val(JSON.stringify(jsonOption));
        }
    }

    function displayVideoValues() {
        if ($('#maxVideoLength').val()== null || $('#maxVideoLength').val() == "") $('#maxVideoLength').val(180);
        var length = $('#maxVideoLength').val();

        var properties = "max_seconds:" + length;

        jsonOption = {'property':[]};
        property = {};
        property['key'] = 'max_seconds';
        property['label'] = length;
        jsonOption['property'].push(property);

        if (editObj == null) {
            $('#addedPrompt').val(properties);
            $('#jsonText').val(JSON.stringify(jsonOption));
        }
        else {
            editObj.find('.editPromptDetails').find('.addedPrompt').val(properties);
            editObj.find('.editPromptDetails').find('.jsonText').val(JSON.stringify(jsonOption));
        }
    }

    function validateSingleChoice() {
        var emptyValue = true;
        var errorCode = 0;
        var errorMessage = "";
        var labelList = new Array();
        if($('#singleChoiceTable tr:nth-child(2)').find(".singleValue").val() != "") emptyValue = false;
        $('#singleChoiceTable tr:not(:first-child)').each(function() {
            $this = $(this);
            var value = $this.find(".singleValue").val();
            var label = $this.find(".singleLabel").val();
            var option = $this.find(".singleOptionNum").val();

            if (label == "" || label == null) {
                if (errorCode >= 0) {
                    errorMessage += "Label must not be empty. Option " + option + " label is empty.\n";
                    errorCode = 1;
                } else {
                    errorMessage = "Label must not be empty. Option " + option + " label is empty.\n";
                    errorCode = 1;
                }
            } else {
                if (value == "") {
                    if (emptyValue == false) {// value should be all empty
                        if (errorCode <= 0) {
                            errorMessage = "Value fields must be all empty or all filled";
                            errorCode = -1;
                        }
                    }
                } else {
                    if (emptyValue == true) {
                        if (errorCode <= 0) {
                            errorMessage = "Value fields must be all empty or all filled";
                            errorCode = -1;
                        }
                    }
                }
                if (labelList.length == 0) labelList.push(label);
                else { // label array not empty
                    var len = labelList.length;
                    var i = 0;
                    for (i = 0; i < len; i++) {
                        if (label == labelList[i]) {// duplicate
                            errorMessage += "ERROR: Option " + option + " has the same label as Option " + (i+1) + "\n";
                            errorCode = 1;
                        }
                    }
                    if (i==len) { // no duplication
                        labelList.push(label);
                    }
                }
            }
        });
        if (errorCode != 0) {
            alert(errorMessage);
            return false;
        } else 
            return true;
    }

    function validateMultiChoice() {
        var emptyValue = true;
        var errorCode = 0;
        var errorMessage = "";
        var labelList = new Array();
        if($('#multiChoiceTable tr:nth-child(2)').find(".multiValue").val() != "") emptyValue = false;
        $('#multiChoiceTable tr:not(:first-child)').each(function() {
            $this = $(this);
            var value = $this.find(".multiValue").val();
            var label = $this.find(".multiLabel").val();
            var option = $this.find(".multiOptionNum").val();

            if (label == "" || label == null) {
                if (errorCode >= 0) {
                    errorMessage += "Label must not be empty. Option " + option + " label is empty.\n";
                    errorCode = 1;
                } else {
                    errorMessage = "Label must not be empty. Option " + option + " label is empty.\n";
                    errorCode = 1;
                }
                //return (false);
            } else {
                if (value == "") {
                    if (emptyValue == false) {// value should be all empty
                        if (errorCode <= 0) {
                            errorMessage = "Value fields must be all empty or all filled";
                            errorCode = -1;
                        }
                        //return (false);
                    }
                } else {
                    if (emptyValue == true) {
                        if (errorCode <= 0) {
                            errorMessage = "Value fields must be all empty or all filled";
                            errorCode = -1;
                        }
                        //return (false);
                    }
                }

                if (labelList.length == 0) labelList.push(label);
                else { // label array not empty
                    var len = labelList.length;
                    var i = 0;
                    for (i = 0; i < len; i++) {
                        if (label == labelList[i]) {// duplicate
                            errorMessage += "ERROR: Option " + option + " has the same label as Option " + (i+1) + "\n";
                            errorCode = 1;
                        }
                    }
                    if (i==len) { // no duplication
                        labelList.push(label);
                    }
                }
            }
        });
        if (errorCode != 0) {
            alert(errorMessage);
            return false;
        } else 
            return true;
    }

    $('#promptTypeSubmit').click(function() {
        var type;
        if (editObj == null) {
            type = jQuery("#groupPromptType").val();
            $('#choosePromptType').val(type);
        } else {
            //type = editObj.find('.editPromptDetails').find('.choosePromptType').val();
            var type = jQuery("#groupPromptType").val();
            //$("#groupPromptType").val(type);
            editObj.find('.editPromptDetails').find('.choosePromptType').val(type);
        }
        switch (type) {
        case 'audio':
            $('#promptTypeText').val("Audio");
            var len = $('#maxAudioLength').val();

            if (len == "") alert('Audio length must not be empty');
            else if (!isNumber(len)) alert('Audio length must be a number');
            else if (Number(len) < AudioPrompt['min_value']) alert('Audio length must at least be ' + AudioPrompt['min_value'] + ' miliseconds');
            else if (Number(len) > AudioPrompt['max_value']) alert('Audio length must not exceed ' + AudioPrompt['max_value'] + ' miliseconds');
            else {
                 displayAudioValues();
                $('#promptTypeModal').modal('hide');
            }
            break;      
        case 'multi_choice':
            var validate = validateMultiChoice();
            if (validate == true) {
                $('#promptTypeText').val("Multiple Choice");
                displayMultiChoiceValues();
                $('#promptTypeModal').modal('hide');
            }
            break;
        case 'multi_choice_custom':
            var validate = validateMultiChoice();
            if (validate == true) {
                $('#promptTypeText').val("Multiple Choice Custom");
                displayMultiChoiceValues();
                $('#promptTypeModal').modal('hide');
            }
            break;
        case 'single_choice':
            var validate = validateSingleChoice();
            if (validate == true) {
                $('#promptTypeText').val("Single Choice");
                
                displaySingleChoiceValues();
                $('#promptTypeModal').modal('hide');
            }
            break;
        case 'single_choice_custom':
            var validate = validateSingleChoice();
            if (validate == true) {
                $('#promptTypeText').val("Single Choice Custom");
                
                displaySingleChoiceValues();
                $('#promptTypeModal').modal('hide');
            }
            break;
        case 'number':
            $('#promptTypeText').val("Number");
            var min = $('#minNumber').val();
            var max = $('#maxNumber').val();
            var defaultValue = $('#numberDefault').val();
            var errorMessage = "Error:";
            var minError = false, maxError = false;

            if (min == "") {
                errorMessage += "\nMin value must not be empty";
                minError = true;
            }
            else if (!isNumber(min)) {
                errorMessage += "\nMin value must be a number";
                minError = true;
            }

            if (max == "") {
                errorMessage += "\nMax value must not be empty";
                maxError = true;
            }
            else if (!isNumber(max)) {
                errorMessage += "\nMax value must be a number";
                maxError = true;
            }

            if (minError || maxError) alert(errorMessage);
            else {
                if (Number(max) < Number(min)) alert('Max value must be greater than or equal min value');
                else {
                    if (defaultValue == "") {
                        displayNumberValues();
                        $('#promptTypeModal').modal('hide');
                    }
                    else if (!isNumber(defaultValue) || Number(defaultValue) > Number(max) || Number(defaultValue) < Number(min)) {
                        alert('Default value must be a number between Min and Max');
                    }
                    else {
                        displayNumberValues();
                        $('#promptTypeModal').modal('hide');
                    }
                }

            }
            break;
        case 'photo':
            $('#promptTypeText').val("Photo");
            var len = $('#maxRes').val();
            if (len == "") alert('Maximum resolution must not be empty');
            else if (!isPositiveNumber(len)) alert('Maximum resolution must be a positive whole number');
            else if (Number(len) <= 0) alert('Maximum resolution must be a positive whole number');
            else {
                displayPhotoValues();
                $('#promptTypeModal').modal('hide');
            }
            break; 
        case 'remote_activity':
            $('#promptTypeText').val("Remote Activity");
            var rPackage = $('#packageRemote').val().trim();
            var activity = $('#activityRemote').val().trim();
            var action = $('#actionRemote').val().trim();
            var autoLaunch = $('#autoLaunchRemote').val();
            var retries = $('#retriesRemote').val().trim();
            var minRun = $('#minrunRemote').val().trim();
            var input = $('#inputRemote').val().trim();
            var errorMessage = "Error:";
            var errorCode = 0;

            if (rPackage == "" || activity == "" || action == "" || autoLaunch == "" || retries =="" || minRun == "") {
                errorMessage += "\n One of the required prompt field is empty.";
                errorCode = 1;
            } else {
                if (!isPositiveInteger(retries)) {
                    errorMessage += "\n Retries must be a whole positive number.";
                    errorCode = 2;
                } else if (Number(retries) < RemoteActivityPrompt['min_retries']) {
                    errorMessage += "\n Retries must be at least " + RemoteActivityPrompt['min_retries'];
                    errorCode = 2;
                }
                if (!isPositiveInteger(minRun)) {
                    errorMessage += "\n Min Run must be a whole positive number.";
                    errorCode = 2;
                } else if (Number(retries) < RemoteActivityPrompt['min_minRun']) {
                    errorMessage += "\n Min run must be at least " + RemoteActivityPrompt['min_minRun'];
                    errorCode = 2;
                }
            }
            if (errorCode == 0) {
                displayRemoveActivityValues();
                $('#promptTypeModal').modal('hide');
            } else {
                alert(errorMessage);
                errorMessage = "Error:";
                errorCode = 0;
            }
            break;
        case 'text':
            $('#promptTypeText').val("Text");
            var min = $('#minTextLength').val();
            var defaultValue = $('#textDefault').val();
            var max = $('#maxTextLength').val();
            var errorMessage = "Error:";
            var minError = false, maxError = false;
            if (min == "") {
                errorMessage += "\nMin value must not be empty";
                minError = true;
            }
            else if (!isPositiveNumber(min)) {
                errorMessage += "\nMin value must be a number";
                minError = true;
            }
            if (max == "") {
                errorMessage += "\nMax value must not be empty";
                maxError = true;
            }
            else if (!isPositiveNumber(max)) {
                errorMessage += "\nMax value must be a number";
                maxError = true;
            }
            if (minError || maxError) alert(errorMessage);
            else {
                if (Number(max) < Number(min)) alert('Max value must be greater than or equal min value');
                else {
                    // add check for default here
                    if (defaultValue == "") {
                        displayTextValues();
                        $('#promptTypeModal').modal('hide');
                    } else if (defaultValue.length > Number(max) || defaultValue.length < Number(min)) {
                        alert('Length of default value text must be between Min and Max');
                    }
                    else {
                        displayTextValues();
                        $('#promptTypeModal').modal('hide');
                    }
                }

            }
            break;
        case 'timestamp':
            $('#promptTypeText').val("Timestamp");
            $('#promptTypeModal').modal('hide');
            break;
        case 'video':
            $('#promptTypeText').val("Video");
            var len = $('#maxVideoLength').val();

            if (len == "") alert('Video length must not be empty');
            else if (!isNumber(len)) alert('Video length must be a number');
            else if (Number(len) < VideoPrompt['min_value']) alert('Video length must at least be ' + VideoPrompt['min_value'] + ' seconds');
            else if (Number(len) > VideoPrompt['max_value']) alert('Video length must not exceed ' + VideoPrompt['max_value'] + ' seconds');
            else {
                 displayVideoValues();
                $('#promptTypeModal').modal('hide');
            }
            break;                
        default:
            break;
        }

        //editObj.find('.editPromptDetails').find('.choosePromptType').val(type);
    });
});