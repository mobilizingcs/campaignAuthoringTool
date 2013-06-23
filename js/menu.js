// campaign menu script
//
//

$(function() {

    // edit campaign button
    $('#editCampaign').click(function() {
        window.location = ('campaign-edit.php');
    });

    // create new survey button
    $('#createNewSurvey').click(function() {
        window.location.replace('survey.php');
    });

    // edit existing survey button
    $('#editExistingSurvey').click(function() {
        window.location.replace('existing-surveys.php');
    });

    // view campaign xml button
    $('#viewSurveyXML').click(function() {
        //deleteEditField(campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']);
        var xml = '<?xml version="1.0" encoding="UTF-8"?>' + json2xml({'campaign': campaignWrapper['campaign']});
        $('#surveyXml').text(vkbeautify.xml(xml));
        $('#xmlModal').modal('show');
    });

    // submit campaign button
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

