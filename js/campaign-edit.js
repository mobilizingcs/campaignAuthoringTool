var campaignWrapper = $.parseJSON(localStorage['campaignWrapper']);

$(function() {
    $('#campaignTitle').focus();

    // Get existing campaigns
    $('#campaignTitle').val(campaignWrapper['campaign']['campaignName']);
    $('#campaignUrn').val(campaignWrapper['campaign']['campaignUrn']);
    $('#campaignDescription').val(campaignWrapper['description']); // optional
    $('#privacyStateBtn').val(campaignWrapper['privacyState']);
    $('#runningStateBtn').val(campaignWrapper['runningState']);

    // get username
    oh.user.whoami().done(function(username) {

        $('#authors').val(username);
        populateClasses(username)

        //populateCampaignData();
        $("#test").click(function() {
            $('#loginModal').modal('show');
        });

        $("#login-form").submit(function(e) {
            var $this = $(this);
            var inputUsername = $this.find("#inputUsername").val();
            var inputPassword = $this.find("#inputPassword").val();
            $.post("https://test.ohmage.org/app/user/auth_token", { user: inputUsername, password: inputPassword, client: "campaign-webapp" }, function(response) {
                if (response.result === "success") {
                    $.cookie("authToken", response.token, { expires: 1 });
                    $.cookie("username", inputUsername, { expires: 1 });

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

        function updateAll(){
            var title = $('#campaignTitle').val();
            var urn = $('#campaignUrn').val();
            var description = $('#campaignDescription').val();
            campaignWrapper['privacyState'] = $('#privacyStateBtn').val();
            campaignWrapper['runningState'] = $('#runningStateBtn').val();
            campaignWrapper['description'] = description;
            campaignWrapper['classes'] = $('.classes').val();
            campaignWrapper['campaign']['campaignUrn'] = urn;
            campaignWrapper['campaign']['campaignName'] = title
            $.cookie('currentCampaign', campaignWrapper['campaign']['campaignName']);
            localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
            console.log("Updated localstorage.")
        }

        $("input,select").on("change", updateAll)
        $("textarea").on("blur", updateAll)
    });
});

//added by jeroen
$(function(){
    if(campaignWrapper.update){
        $("#campaignTitle").attr("disabled", "disabled");
        $("#campaignUrn").attr("disabled", "disabled")
    }
});
