$(function() {
    function displayMultiChoiceValues() {
        var answers = $('#multiChoiceAnswer').val().replace('\r\n', '\n').split('\n');
        var values = $('#multiChoiceValue').val().replace('\r\n', '\n').split('\n');

        var properties = "";
        for (var i = 0; i < answers.length; ++i) {
            if (i < values.length) {
                properties += answers[i] + ':' + values[i] + '\n';
            } else {
                properties += answers[i] + ':\n'
            }
        }

        $('#addedPrompt').val(properties);

        $('#multiChoiceAnswer').val('');
        $('#multiChoiceValue').val('');
    }

    function displaySingleChoiceValues() {
        /*
        var answers = $('#singleChoiceAnswer').val().replace('\r\n', '\n').split('\n');
        var values = $('#singleChoiceValue').val().replace('\r\n', '\n').split('\n');

        var properties = "";
        for (var i = 0; i < answers.length; ++i) {
            if (i < values.length) {
                properties += answers[i] + ':' + values[i] + '\n';
            } else {
                properties += answers[i] + ':\n'
            }
        }

        $('#addedPrompt').val(properties);

        $('#singleChoiceAnswer').val('');
        $('#singleChoiceValue').val('');
        */
        
        var defaultValue = $('#singleChoiceDefault').val();
        var defaultText = $('#singleChoiceDefault option:selected').text();;

        if (defaultText == 'None') {
            $('#default').val("");
        }
        var key = 0;
        var properties = "";
        $('#singleChoiceTable tr:not(:first-child)').each(function()
        {
            $this = $(this);
            var label = $this.find(".singleLabel").val();
            var value = $this.find(".singleValue").val();
            properties += label + ":" + value + "\n";
            //key++;
            //alert(Label:" + label + " Value:" + value);
            if (label === defaultText) {
                $('#default').val(key);
                alert(label);
            }
            key++;
        });

        $('#addedPrompt').val(properties);



    }

    function displayNumberValues() {
        var minNum = $('#minNumber').val();
        var maxNum = $('#maxNumber').val();
        var defaultValue = $('#numberDefault').val();
        var properties = "min:" + minNum + "\n" + "max:" + maxNum;

        if (defaultValue != "") {
            $('#default').val(defaultValue);
        }
        $('#addedPrompt').val(properties);

        $('#minNumber').val('');
        $('#maxNumber').val('');
    }

    function displayPhotoValues() {
        var resolution = $('#maxRes').val();
        var properties = "resolution:" + resolution;

        $('#addedPrompt').val(properties);

        $('#maxRes').val('');
    }

    function displayTextValues() {
        var min = $('#minTextLength').val();
        var max = $('#maxTextLength').val();
        var defaultValue = $('#textDefault').val();
        var properties = "min:" + min + "\n" + "max:" + max;

        if (defaultValue != "") {
            $('#default').val(defaultValue);
        }
        $('#addedPrompt').val(properties);

        $('#minTextLength').val('');
        $('#maxTextLength').val('');
    }

    function displayRemoveActivityValues() {
        var pack = $('#packageRemote').val();
        var activity = $('#activityRemote').val();
        var action = $('#actionRemote').val();
        var auto = $('#autolaunchRemote').val();
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

        $('#packageRemote').val('');
        $('#activityRemote').val('');
        $('#actionRemote').val('');
        $('#autolaunchRemote').val('');
        $('#retriesRemote').val('');
        $('#minrunRemote').val('');
        $('#inputRemote').val('');
    }

    function displayVideoValues() {
        if ($('#maxVideoLength').val()== null || $('#maxVideoLength').val() == "") $('#maxVideoLength').val(180);
        var length = $('#maxVideoLength').val();

        var properties = "max_seconds:" + length;

        $('#addedPrompt').val(properties);

        $('#maxVideoLength').val('');
    }

    $('#multiChoiceSubmit').click(function() {
        displayMultiChoiceValues();
        $('#multiChoiceModal').modal('hide');
    });

    $('#singleChoiceSubmit').click(function() {
        displaySingleChoiceValues();
        $('#singleChoiceModal').modal('hide');
    });

    $('#numberSubmit').click(function() {
        var min = $('#minNumber').val();
        var max = $('#maxNumber').val();
        var defaultValue = $('#numberDefault').val();

        if ((defaultValue != "" && !isNumber(defaultValue)) || Number(defaultValue) > Number(max) || Number(defaultValue) < Number(min)) {
            alert('Default value must be a number between Min and Max');
        }
        else {
            if (min==="" || max=="") {
                if (min=="") alert('Min values must not be empty');
                else alert('Max values must not be empty');
            }
            else if (!isNumber(min) || !isNumber(max)) { // not number
                if (!isNumber(min)) alert('Min values must be a number');
                else alert('Max values must be a number');
            } else { // both are numbers
                if (Number(max) >= Number(min)) {
                    displayNumberValues();
                    $('#numberModal').modal('hide');
                }
                else alert('Max value must be greater than or equal min value');
            }
        }
    });

    $('#photoSubmit').click(function() {
        var len = $('#maxRes').val();

        if (len == "") alert('Maximum resolution must not be empty');
        else if (!isPositiveNumber(len)) alert('Maximum resolution must be a positive number');
        else {
            displayPhotoValues();
            $('#photoModal').modal('hide');
        }
    });

    $('#textSubmit').click(function() {
        var min = $('#minTextLength').val();
        var max = $('#maxTextLength').val();
        

        if (min==="" || max=="") {
            if (min=="") alert('Min values must not be empty');
            else alert('Max values must not be empty');
        }
        else if (!isPositiveNumber(min) || !isPositiveNumber(max)) { // not number
            if (!isPositiveNumber(min)) alert('Min values must be a positive number');
            else alert('Max values must be a positive number');
        } else { // both are numbers
            if (Number(max) >= Number(min)) {
                displayTextValues();
                $('#textModal').modal('hide');
            }
            else alert('Max value must be greater than or equal min value');
        }
    });

    $('#remoteActivitySubmit').click(function() {
        displayRemoveActivityValues();
        $('#remoteActivityModal').modal('hide');
    });

    $('#videoSubmit').click(function() {
        var len = $('#maxVideoLength').val();

        if (len == "") alert('Video length must not be empty');
        else if (!isPositiveNumber(len)) alert('Video length must be a positive number');
        else {
             displayVideoValues();
            $('#videoModal').modal('hide');
        }
    });
});