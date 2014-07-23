// campaign menu script
//
//

$(function() {

    // edit campaign button
    $('#editCampaign').click(function() {
        window.location = ('campaign-edit.html');
    });

    // create new survey button
    $('#createNewSurvey').click(function() {
        window.location.replace('survey.html');
    });

    // edit existing survey button
    $('#editExistingSurvey').click(function() {
        window.location.replace('existing-surveys.html');
    });

    // view campaign xml button
    $('#viewSurveyXML').click(function() {
        if (campaignWrapper['campaign']['surveys']['survey'].length == 0) {
            
        } else {
            deleteEditField(campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']);
        }
        var xml = '<?xml version="1.0" encoding="UTF-8"?>' + json2xml({'campaign': campaignWrapper['campaign']});
        $('#surveyXml').text(vkbeautify.xml(xml));
        $('#xmlModal').modal('show');
        

    });

    //adding keep alive call to prevent auth_token timeout while user is active.
    oh.keepalive();

    var oh2 = oh2 || {};
    oh2.call = function(path, data, datafun){

        /*
        function processError(errors){
            if(errors[0].code && errors[0].code == "0200"){
                var pattern = /(is unknown)|(authentication token)|(not provided)/i;
                if(!errors[0].text.match(pattern)) {
                    alert(errors[0].text);
                }
                if(!/login.html$/.test(window.location.pathname)){
                    oh.sendtologin();
                }
            } else {
                alert("Fail: " + path + ":\n" + errors[0].text)
            }
        }   
        */
        //input processing
        var data = data ? data : {};        

        //default parameter
        data.client = "dashboard"

        //add auth_token from cookie
        if($.cookie('auth_token')){
            data.auth_token = $.cookie('auth_token');
        }

        var myrequest = $.ajax({
            type: "POST",
            url : "/app" + path,
            data: data,
            dataType: "text",
            xhrFields: {
                withCredentials: true
            }
        }).done(function(rsptxt) {
            //in case of json
            if(myrequest.getResponseHeader("content-type") == "application/json"){
                if(!rsptxt || rsptxt == ""){
                    alert("Undefined error.")
                    return false;
                }           
                var response = jQuery.parseJSON(rsptxt);
                if(response.result == "success"){
                    if(datafun) datafun(response)
                } else if(response.result == "failure") {
                    //processError(response.errors)
                    //var jsonStart = response.indexOf('{');
                    //var json = response.substring(jsonStart, response.length);
                    //var responseJSON = JSON.parse(json);
                    alert("Error: " + response.errors[0].text);
                    return false;
                } else{
                    alert("JSON response did not contain result attribute.")
                }
            //anything else
            } else {
                datafun(rsptxt);
            }
        }).error(function(){alert("Ohmage returned an undefined error.")});     

        return(myrequest)
    }

    $('#submitCampaign').click(function() {
        deleteEditField(campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['contentList']['']);
        //test if campaign has a finished survey, don't upload if it doesnt
        if (campaignWrapper['campaign']['surveys']['survey'][0]['contentList'][''].length === 0){
        alert("It doesn't look like your campaign is finished, make sure to finish before you upload!");
        } else {
        var xmlFile = '<?xml version="1.0" encoding="UTF-8"?>' + json2xml({'campaign': campaignWrapper['campaign']});

        $.post("/app/user_info/read", { auth_token: $.cookie('auth_token'), client: 'campaign-webapp' }, function(response) {
            if (response.result === 'success') {
                var req = oh2.call("/campaign/create", {
                    xml : xmlFile,
                    privacy_state : campaignWrapper['privacyState'],
                    running_state : campaignWrapper['runningState'],
                    campaign_urn : campaignWrapper['campaign']['campaignUrn'],    
                    description : campaignWrapper['description'],
                    class_urn_list : campaignWrapper['classes']      
                }, function(response) {
                        alert("Campaign submitted successfully!");
                        window.location.replace('success.html');
                });
            } else {
                //console.log('CLASS FAILURE');
                //$('#loginModal').modal('show');
                alert('Time out! Please re-login')
                oh.sendtologin();
            }
        }, "json");
	}
    });

    $("#deleteCampaign").click(function(){
        delete localStorage.campaignWrapper
        $.removeCookie("currentCampaign");
        $.removeCookie("currentSurvey");
        window.location.replace('./');
    })

    // relogin
    $("#login-form").submit(function(e) {
        var $this = $(this);
        var inputUsername = $this.find("#inputUsername").val();
        var inputPassword = $this.find("#inputPassword").val();
        // $.post("https://test.ohmage.org/app/user/auth_token", { user: inputUsername, password: inputPassword, client: "campaign-webapp" }, function(response) {
        $.post(SERVER + "app/user/auth_token", { user: inputUsername, password: inputPassword, client: "campaign-webapp" }, function(response) {
            if (response.result === "success") {
                $.cookie("authToken", response.token, { expires: 1 });
                $.cookie("username", inputUsername, { expires: 1 });

                var xmlFile = '<?xml version="1.0" encoding="UTF-8"?>' + json2xml({'campaign': campaignWrapper['campaign']});
                // $.post("https://test.ohmage.org/app/user_info/read", { auth_token: $.cookie('authToken'), client: "campaign-webapp" },
                $.post(SERVER + "app/user_info/read", { auth_token: $.cookie('authToken'), client: "campaign-webapp" },
                    function(response) {
                        if(response.result === "success"){
                            var req = oh2.call("/campaign/create", {
                                xml : xmlFile,
                                privacy_state : campaignWrapper['privacyState'],
                                running_state : campaignWrapper['runningState'],
                                campaign_urn : campaignWrapper['campaign']['campaignUrn'],    
                                description : campaignWrapper['description'],
                                class_urn_list : campaignWrapper['classes']      
                            }, function(response) {
                                    alert("Campaign submitted successfully!");
                                    window.location.replace('success.html');
                            });
                        } else {
                            // relogin
                            alert("Unknow error")
                        }
                    }, "json");
                $('#loginModal').modal('hide');
            }
            else {
                alert("Incorrect username or password")
            }
        }, "json");
        e.preventDefault();
    });    
});

