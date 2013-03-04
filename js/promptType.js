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
    }

    function displayNumberValues() {
        var minNum = $('#minNumber').val();
        var maxNum = $('#maxNumber').val();
        var properties = "min:" + minNum + "\n" + "max:" + maxNum;

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
        var properties = "min:" + min + "\n" + "max:" + max;

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
        if ($('#maxLength').val()== null || $('#maxLength').val() == "") $('#maxLength').val(180);
        var length = $('#maxLength').val();

        var properties = "max_seconds:" + length;

        $('#addedPrompt').val(properties);

        $('#maxLength').val('');
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
        displayNumberValues();
        $('#numberModal').modal('hide');
    });

    $('#photoSubmit').click(function() {
        displayPhotoValues();
        $('#photoModal').modal('hide');
    });

    $('#textSubmit').click(function() {
        displayTextValues();
        $('#textModal').modal('hide');
    });

    $('#remoteActivitySubmit').click(function() {
        displayRemoveActivityValues();
        $('#remoteActivityModal').modal('hide');
    });

    $('#videoSubmit').click(function() {
        displayVideoValues();
        $('#videoModal').modal('hide');
    });

});