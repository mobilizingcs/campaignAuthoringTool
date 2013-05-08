var campaignWrapper = $.parseJSON(localStorage['campaignWrapper']);

$(function() {
    for (i in campaignWrapper['campaign']['surveys']['survey']) {
        var surveySelect = '<option value="' + i + '">' + campaignWrapper['campaign']['surveys']['survey'][i]['title'] + '</option>';
        $(surveySelect).appendTo('#existingSurveys');
    }

    $('#editExistingSurvey').click(function() {
        $.cookie('currentSurvey', $('#existingSurveys').val());
        window.location.replace('prompt.php');
    });

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
    
    $('#viewSurveyXML').click(function() {
        var tmp = campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')];
    
        //var xml = json2xml({'survey': campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]});
        var xml = '<?xml version="1.0" encoding="UTF-8"?>' + json2xml({'campaign': campaignWrapper['campaign']});
        $('#surveyXml').text(vkbeautify.xml(xml));
        $('#xmlModal').modal('show');
    });    

    //sOriginal post
    $('#submitCampaign').click(function() {
        //deleteEditField(campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']);
        //console.log(campaignWrapper);
        var xmlFile = '<?xml version="1.0" encoding="UTF-8"?>' + json2xml({'campaign': campaignWrapper['campaign']});
        console.log(campaignWrapper['description']);
        $.post("https://test.ohmage.org/app/user_info/read", { auth_token: $.cookie('authToken'), client: 'campaign-webapp' }, function(response) {
            if (response.result === 'success') {
                var classes = Object.keys(response['data'][$.cookie('username')]['classes']).join();
                 $.post("submitCampaign.php", { 
                    auth_token: $.cookie('authToken'), 
                    client: "campaign-webapp", 
                    running_state: campaignWrapper['runningState'],
                    privacy_state: campaignWrapper['privacyState'],
                    description: campaignWrapper['description'],
                    class_urn_list: campaignWrapper['classes'],
                    xml: xmlFile }, function(response) {
                    var jsonStart = response.indexOf('{');
                    var json = response.substring(jsonStart, response.length);
                    var responseJSON = JSON.parse(json);
                    if (responseJSON['result'] === 'success') {
                        var successAlert = '<div class="alert alert-success createCampaignSuccess hide"><button class="close">&times;</button><strong>Campaign Submitted Successfully!</strong></div>';
                        $(successAlert).insertAfter('.newSurvey hr').slideToggle();
                        if($('.createCampaignSuccess').size() > 1) {
                            $('.createCampaignSuccess').slice(1).delay('1000').slideToggle('slow',function() { $(this).alert('close')});
                        }
                    } else {
                        var errorAlert = '<div class="alert alert-error createCampaignError hide"><button class="close">&times;</button><strong>Error:</strong> ' + responseJSON['errors'][0]['text'] + '</div>';
                        $(errorAlert).insertAfter('.newSurvey hr').slideToggle();
                        if($('.createCampaignError').size() > 1) {
                            $('.createCampaignError').slice(1).delay('1000').slideToggle('slow',function() { $(this).alert('close')});
                        }
                    }
                }, "text");
            } else {
                console.log('CLASS FAILURE');
            }
        }, "json");
    });

    
});