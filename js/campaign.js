$(function() {
    $('#campaignTitle').focus();

    $('#authors').val($.cookie('username'));

    // Get existing campaigns
    $.post("https://test.ohmage.org/app/user_info/read", { auth_token: $.cookie('authToken'), client: "campaign-webapp" },
        function(response) {
            if(response.result === "success"){
                var campaignCount = 0;
                var classes = Object.keys(response['data'][$.cookie('username')]['classes']).join();
                console.log(classes);
                $.each(response.data[$.cookie('username')]['classes'], function(index, val) {
                    $('.classes').append('<option value="' + index + '">' + val + "</option>");
                });
                $.each(response.data[$.cookie('username')].campaigns, function(index, val) {
                    $('.campaign-select').append('<option value="' + index + '">' + val + "</option>");
                    campaignCount++;
                });
                if(campaignCount === 0) {
                    $('.existing-campaigns').remove();
                }
            }
        }, "json");

    // Create Campaign Button
    $('#create-campaign').click(function(e) {
        var title = $('#campaignTitle').val();
        var urn = $('#campaignUrn').val();
        var description = $('#campaignDescription').val();
        console.log(description)
        if (title === '') {
            $('#campaignTitle').parent().parent().addClass('error');
        } else {
            $('#campaignTitle').parent().parent().removeClass('error');
        }
        if (urn === '') {
            $('#campaignUrn').parent().parent().addClass('error');
        } else {
            $('#campaignUrn').parent().parent().removeClass('error');
        }
        var campaign = campaignEditor.createCampaign(title, urn);
        if (!campaign) {
            var errorAlert = '<div class="alert alert-error create-campaign-error hide"><button class="close">&times;</button><strong>Error:</strong> One or more required field is missing</div>';
            $(errorAlert).insertAfter('.new-campaign hr').slideToggle();
            if($('.create-campaign-error').size() > 1) {
                $('.create-campaign-error').slice(1).delay('1000').slideToggle('slow',function() { $(this).alert('close')});
            }
            e.preventDefault();
        } else {
            var campaignWrapper = {
                'privacyState': $('#privacyStateBtn').val(),
                'runningState': $('#runningStateBtn').val(),
                'description': description,
                'classes': $('.classes').val(),
                'campaign': campaignEditor.createCampaign(title, urn)
            };
            $.cookie('currentCampaign', campaignWrapper['campaign']['campaignName']);
            localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
        }
    });

    // test campaign for testing purpose only
    $('#test-campaign').click(function(e) {
        //e.preventDefault();
        var xml = $('#campaignXml').val();
        var campaign = $.xml2json(xml);
        console.log(campaign);

        var title = campaign.campaignName;
        var urn = campaign.campaignUrn;
        
        var obj = campaign.surveys.survey.contentList;
        var count = 0;
        
        var xml2 = $.parseXML(xml), $xml = $( xml );
        console.log($xml);

        // campaign
        var campaignWrapper = {
            'privacyState': $('#privacyStateBtn').val(),
            'runningState': $('#runningStateBtn').val(),
            'classes': $('.classes').val(),
            'campaign': campaignEditor.createCampaign(title, urn)
        };

        // surveys
        var surveyIndex = 0;
        $(xml).find('survey').each(function(){
            var surveyData = {};
            surveyData['id'] = $(this).find("id").first().text();
            surveyData['title'] = $(this).find("title").first().text();
            surveyData['submitText'] = $(this).find("submitText").first().text();
            surveyData['anytime'] = $(this).find("anytime").first().text();

            if (typeof($(this).find("description").first().text()) != 'undefined') surveyData['description'] = $(this).find("description").first().text();
            if (typeof($(this).find("introText").first().text()) != 'undefined') surveyData['introText'] = $(this).find("introText").first().text();
            
            var success = campaignEditor.addSurvey(campaignWrapper['campaign'], surveyData);

            var count = 0;
            $(this).find('contentList').children().each(function() {
                //e.preventDefault();
                var type = this.tagName;
                
                var contentList = campaignWrapper['campaign']['surveys']['survey'][surveyIndex]['contentList'][''];
                if (type.toLowerCase() == "prompt") {
                    var promptData = {};
                    promptData['id'] = $(this).find("id").first().text();
                    promptData['displayLabel'] = $(this).find("displayLabel").first().text();
                    //promptData['displayType'] = $(this).find("displayType").first().text();
                    promptData['promptText'] = $(this).find("promptText").first().text();
                    //promptData['abbreviatedText'] = $(this).find("abbreviatedText").first().text();
                    var promptType = $(this).find("promptType").first().text();
                    promptData['promptType'] = promptType;
                    if (($(this).find("default").first().text()) != '') promptData['default'] = $(this).find("default").first().text();
                    // make sure condition save with right format
                    if (($(this).find("condition").first().text()) != '')  {
                        var text = $(this).find("condition").first().text();
                        var cond = text.replace('<', '&lt').replace('>', '&gt');
                        promptData['condition'] = cond;
                    }
                    promptData['skippable'] = $(this).find("skippable").first().text();
                    promptData['skipLabel'] = $(this).find("skipLabel").first().text();
                    console.log($(this).find("properties").first().text());
                    if (($(this).find("properties").first().text()) != '') {
                        var properties = {'property':[]};
                        $(this).find('properties').children().each(function(){
                            var property = {};
                            console.log(this.tagName);
                            $(this).children().each(function(){
                                if (this.tagName.toLowerCase() == 'key') property['key'] = $(this).text();
                                else if (this.tagName.toLowerCase() == 'label') property['label'] = $(this).text();
                                else if (this.tagName.toLowerCase() == 'value') property['value'] = $(this).text();
                            });
                            properties['property'].push(property);
                        });

                        promptData['properties'] = properties;
                    }
                    contentList.push({'prompt': promptData});
                    
                } else if (type.toLowerCase() == "message") {
                    var messageData = {};
                    messageData['id'] = $(this).find("id").first().text();
                    messageData['messageText'] = $(this).find("messageText").first().text();
                    if (($(this).find("condition").first().text()) != '')  {
                        var text = $(this).find("condition").first().text();
                        var cond = text.replace('&lt','<').replace('&gt', '>');
                        messageData['condition'] = cond;
                    }
                    contentList.push({'message': messageData});
                } else {

                }
                count++
            });
            surveyIndex++;
            console.log(count);
            console.log(campaignWrapper);
        });
        /* 
        $.each(campaign.surveys, function (i, survey) {
            // Process survey data
            var surveyData = {};
            surveyData['id'] = survey.id;
            surveyData['title'] = survey.title;
            surveyData['submitText'] = survey.submitText;
            surveyData['anytime'] = survey.anytime;

            if (typeof(survey.description) != 'undefined') surveyData['description'] = survey.description;
            if (typeof(survey.introText) != 'undefined') surveyData['introText'] = survey.introText;
            
            var success = campaignEditor.addSurvey(campaignWrapper['campaign'], surveyData);
            
            // process prompts data

        });
        */
        localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
        /*
        count = 0
        for(var s in surveys) {
            if(surveys.hasOwnProperty(s)) {
                // Process survey
                //var surveyData = {};
                //surveyData['id'] = campaign.surveys.s;
                //surveyData['title'] = $('#surveyTitle').val();
                //surveyData['description'] = false;
                console.log(s);
                //count++;
            }
        }
        */
        //console.log(count);    
    });
});
