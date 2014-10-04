var campaignWrapper = $.parseJSON(localStorage['campaignWrapper']);

$(function() {
    $('#surveyTitle').focus();

    var index = $.cookie('currentSurvey');

    // populate the page with current survey's data
    function populateSurveyData() {
        campaign = campaignWrapper['campaign'];
        $('#surveyId').val(campaign['surveys']['survey'][index]['id']);
        $('#surveyTitle').val(campaign['surveys']['survey'][index]['title']);
        $('#surveyDescription').val(campaign['surveys']['survey'][index]['description']); // optional
        $('#surveyIntroText').val(campaign['surveys']['survey'][index]['introText']); // optional
        $('#surveySubmitText').val(campaign['surveys']['survey'][index]['submitText']);
        if (campaign['surveys']['survey'][index]['anytime'])
            $('#surveyAnytime').prop('checked', true);;
    }

    populateSurveyData();

    $('#surveyForm').submit(function(e) {
        var surveyData = {};

        // Extract all form data and show error to user if present
        surveyData['id'] = $('#surveyId').val();
        surveyData['title'] = $('#surveyTitle').val();
        surveyData['description'] = false;
        // Check if field is hidden and empty, and if so, don't include it
        if (!$('#surveyDescription').hasClass('hide')) {
            if ($('#surveyDescription').val()) surveyData['description'] = $('#surveyDescription').val();
        }
        surveyData['introText'] = false;
        // Check if field is hidden and empty, and if so, don't include it
        if (!$('#surveyIntroText').hasClass('hide')) {
            if ($('#surveyIntroText').val()) surveyData['introText'] = $('#surveyIntroText').val();
        }
        surveyData['submitText'] = $('#surveySubmitText').val();

        surveyData['anytime'] = $('#surveyAnytime').attr('checked') ? true : false;

        var success = campaignEditor.editSurvey(campaignWrapper['campaign'], surveyData, index);

        if (!success) {
            var errorAlert = '<div class="alert alert-error createSurveyError hide"><button class="close">&times;</button><strong>Error:</strong> A required field is missing!</div>';
            $(errorAlert).insertAfter('.newSurvey hr').slideToggle();
            if($('.createSurveyError').size() > 1) {
                $('.createSurveyError').slice(1).delay('1000').slideToggle('slow',function() { $(this).alert('close')});
            }
            e.preventDefault();
        } else {
            $.cookie('currentSurvey', campaignWrapper['campaign']['surveys']['survey'].length - 1);
            localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
        }
    });

});
