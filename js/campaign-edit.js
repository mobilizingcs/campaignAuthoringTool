var campaignWrapper = $.parseJSON(localStorage['campaignWrapper']);
$(function() {
    $('#campaignTitle').focus();

    $('#authors').val($.cookie('username'));

    // relogin

    // Get existing campaigns
    $.post("https://test.ohmage.org/app/user_info/read", { auth_token: $.cookie('auth_token'), client: "campaign-webapp" },
        function(response) {
            if(response.result === "success"){
                var campaignCount = 0;
                var classes = Object.keys(response['data'][$.cookie('username')]['classes']).join();
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

                populateCampaignData();
            } else {
                // relogin
                //alert("Time Out")
                alert('Time out! Please re-login')
                oh.sendtologin();
            }
        }, "json");

    // populate the page with current survey's data
    function populateCampaignData() {
        //campaign = campaignWrapper['campaign'];
        $('#campaignTitle').val(campaignWrapper['campaign']['campaignName']);
        $('#campaignUrn').val(campaignWrapper['campaign']['campaignUrn']);
        $('#campaignDescription').val(campaignWrapper['description']); // optional
        $('.classes').val(campaignWrapper['classes']);
        $('#privacyStateBtn').val(campaignWrapper['privacyState']); 
        $('#runningStateBtn').val(campaignWrapper['runningState']);
        
    }

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

    // Create Campaign Button
    $('#edit-campaign').click(function(e) {
        var title = $('#campaignTitle').val();
        var urn = $('#campaignUrn').val();
        var description = $('#campaignDescription').val();
        
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
        var campaign = campaignEditor.editCampaign(campaignWrapper['campaign'], title, urn);
        if (!campaign) {
            var errorAlert = '<div class="alert alert-error create-campaign-error hide"><button class="close">&times;</button><strong>Error:</strong> One or more required field is missing</div>';
            $(errorAlert).insertAfter('.new-campaign hr').slideToggle();
            if($('.create-campaign-error').size() > 1) {
                $('.create-campaign-error').slice(1).delay('1000').slideToggle('slow',function() { $(this).alert('close')});
            }
            e.preventDefault();
        } else {
            campaignWrapper['privacyState'] = $('#privacyStateBtn').val();
            campaignWrapper['runningState'] = $('#runningStateBtn').val();
            campaignWrapper['description'] = description;
            campaignWrapper['classes'] = $('.classes').val();
            campaignWrapper['campaign']['campaignUrn'] = urn;
            campaignWrapper['campaign']['campaignName'] = title
            $.cookie('currentCampaign', campaignWrapper['campaign']['campaignName']);
            localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
        }
    });
});
