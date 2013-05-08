$(function() {
    function displayMultiChoiceValues() {
        var defaultValue = $('#multiChoiceDefault').val();
        //console.log(defaultValue);
        var defaultText = $('#multiChoiceDefault option:selected').text();
        var properties = "";
        var tmp = ""; // default value

        if (defaultText == 'None' || defaultText == "") {
            $('#default').val("");
        } else {
            
            jQuery.each(defaultValue,function(index, item){
                tmp += item + ',';
                var child = Number(item) + 1;
                //console.log(child + ":" + $('#multiChoiceTable tr').eq(child).find('.multiLabel').val()); 
                $('#multiChoiceTable tr').eq(child).find('.isDefault').val(1);    
            });
            //console.log(tmp);
            $('#default').val(tmp.slice(0,-1));
        }

        var key = 0;
        var properties = "";
        $('#multiChoiceTable tr:not(:first-child)').each(function()
        {
            $this = $(this);
            var option = $this.find(".multiOptionNum").val();
            var label = $this.find(".multiLabel").val();
            var value = $this.find(".multiValue").val();
            var vDefault = $this.find(".isDefault").val();
    
            if (vDefault == '1') properties += label + ":" + value + "\t (Default)\n";
            else properties += label + ":" + value + "\n";
            
            key++;
        });

        $('#addedPrompt').val(properties);
    }

    function displaySingleChoiceValues() {
        var defaultValue = $('#singleChoiceDefault').val();
        console.log(defaultValue);
        var child = Number(defaultValue) + 1;
        $('#singleChoiceTable tr').eq(child).find('.isDefault').val(1);    
        var defaultText = $('#singleChoiceDefault option:selected').text();
        var defaultVal = "\n\nDefault: ";

        if (defaultText == 'None') {
            $('#default').val("");
        }
        var key = 0;
        var properties = "";
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

            if (defaultCheck === defaultText) { 
                $('#default').val(key);
            }
            key++;
        });

        $('#addedPrompt').val(properties);



    }

    function displayNumberValues() {
        var minNum = $('#minNumber').val();
        var maxNum = $('#maxNumber').val();
        var defaultValue = $('#numberDefault').val();
        var defaultText = "Default: " + defaultValue;
        var properties = "min:" + minNum + "\n" + "max:" + maxNum;

        if (defaultValue != "") {
            $('#default').val(defaultValue);

        }
        $('#addedPrompt').val(properties + '\n' + defaultText);
    }

    function displayPhotoValues() {
        var resolution = $('#maxRes').val();
        var properties = "resolution:" + resolution;

        $('#addedPrompt').val(properties);
    }

    function displayTextValues() {
        var min = $('#minTextLength').val();
        var max = $('#maxTextLength').val();
        var defaultValue = $('#textDefault').val();
        var defaultText = "Default: " + defaultValue;
        var properties = "min:" + min + "\n" + "max:" + max;

        if (defaultValue != "") {
            $('#default').val(defaultValue);
        }
        $('#addedPrompt').val(properties + '\n' + defaultText);
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
                      + "Auto:" + auto + "\n"
                      + "Retry:" + retry + "\n"
                      + "Min run:" + min + "\n"
                      + "Input:" + input + "\n"  

        $('#addedPrompt').val(properties);
    }

    function displayVideoValues() {
        if ($('#maxVideoLength').val()== null || $('#maxVideoLength').val() == "") $('#maxVideoLength').val(180);
        var length = $('#maxVideoLength').val();

        var properties = "max_seconds:" + length;

        $('#addedPrompt').val(properties);
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
        var type = jQuery("#groupPromptType").val();
        $('#choosePromptType').val(type);
        switch (type) {
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
                    displayTextValues();
                    $('#promptTypeModal').modal('hide');
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
        $('#promptType').val(type);
    });
});