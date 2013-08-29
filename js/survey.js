var campaignWrapper = $.parseJSON(localStorage['campaignWrapper']);

$(function() {
    for (i in campaignWrapper['campaign']['surveys']['survey']) {
        //var surveySelect = '<option value="' + i + '">' + campaignWrapper['campaign']['surveys']['survey'][i]['title'] + '</option>';
        var surveySelect = '<li value="' + i + '"><a href="#">' + campaignWrapper['campaign']['surveys']['survey'][i]['title'] + '</option>';
        $(surveySelect).appendTo('#existingSurveys');
    }

        

    $('#surveyTitle').focus();

    $('.formToggleBtn').click(function(e) {
        var $this = $(this);
        var toToggle = $this.attr('id').replace('Add', '').replace('Remove', '');
        $('#' + toToggle + 'Add').fadeToggle('slow');
        $('.' + toToggle + 'Input').slideToggle('slow');
        e.preventDefault();
    });

    $('#showSummary').change(function() {
        $('.summaryTextInput').slideToggle('slow');
        $('.editableSummaryInput').slideToggle('slow');
    });

    $('#surveyCancel').click(function(e) {
        if (confirm('Are you sure ? All unsaved data will be lost')) {
            window.location.replace('existing-surveys.html');
        }
    });

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
        surveyData['showSummary'] = $('#showSummary').attr('checked') ? true : false;
        surveyData['summaryText'] = false;
        surveyData['editSummary'] = false;
        if (surveyData['showSummary']) {
            surveyData['summaryText'] = $('#surveySummaryText').val();
            surveyData['editSummary'] = $('#editSummary').attr('checked') ? true : false;
        }
        surveyData['anytime'] = $('#surveyAnytime').attr('checked') ? true : false;

        var success = campaignEditor.addSurvey(campaignWrapper['campaign'], surveyData);
        
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