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
        // Check if field is hidden, and if so, don't include it
        if (!$('#surveyDescription').hasClass('hide')) {
            surveyData['description'] = $('#surveyDescription').val();
        }
        surveyData['introText'] = false;
        // Check if field is hidden, and if so, don't include it
        if (!$('.introTextInput').hasClass('hide')) {
            surveyData['introText'] = $('#surveyIntroText').val();
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
    
    
    //Original post
    $('#submitCampaign').click(function() {
        var xmlFile = '<?xml version="1.0" encoding="UTF-8"?>' + json2xml({'campaign': campaignWrapper['campaign']});
        $.post("https://test.ohmage.org/app/user_info/read", { auth_token: $.cookie('authToken'), client: 'campaign-webapp' }, function(response) {
            if (response.result === 'success') {
                var classes = Object.keys(response['data'][$.cookie('username')]['classes']).join();
                 $.post("submitCampaign.php", { 
                    auth_token: $.cookie('authToken'), 
                    client: "campaign-webapp", 
                    running_state: campaignWrapper['runningState'],
                    privacy_state: campaignWrapper['privacyState'],
                    class_urn_list: classes,
                    xml: xmlFile }, function(response) {
                    console.log(response);
                    var responseJSON = JSON.parse(response.substring(0, response.length - 1));
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

    
    /*
    $('#submitCampaign').click(function() {
        //var xmlFile = '<?xml version="1.0" encoding="UTF-8"?>' + json2xml({'campaign': campaignWrapper['campaign']});
        var xmlFile = '@xmlCampaign.xml;type=text//xml'
        $.post("https://test.ohmage.org/app/user_info/read", { auth_token: $.cookie('authToken'), client: 'campaign-webapp' }, function(response) {
            if (response.result === 'success') {
                var classes = Object.keys(response['data'][$.cookie('username')]['classes']).join();
                var myData = {auth_token: $.cookie('authToken'), 
                        client: "campaign-webapp", 
                        running_state: campaignWrapper['runningState'],
                        privacy_state: campaignWrapper['privacyState'],
                        class_urn_list: classes,
                        xml: xmlFile };
                $.ajax ({
                    type: "POST",
                    url:"https://test.ohmage.org/app/campaign/create",
                    contentType:attr( "enctype", "multipart/form-data" ),
                    data: myData,
                    crossDomain: true
                    }).done(function(response) {
                    var responseJSON = JSON.parse(response.substring(0, response.length - 1));
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
    */
});