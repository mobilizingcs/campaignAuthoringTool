$(function() {
    $('#campaignTitle').focus();


    // Get existing campaigns
    $.post("https://test.ohmage.org/app/user_info/read", { auth_token: $.cookie('authToken'), client: "campaign-webapp" },
        function(response) {
            if(response.result === "success"){
                var campaignCount = 0;
                $.each(response.data[$.cookie('username')].campaigns, function(index, val) {
                    $('.campaign-select').append('<option value="' + index + '">' + val + "</option>");
                    campaignCount++;
                });
                if(campaignCount === 0) {
                    $('.existing-campaigns').remove();
                }
            }
        }, "json");

    // Privacy State Button
    $('#runningStateBtn').click(function(e) {
        var $this = $(this);
        $this.toggleClass('btn-success btn-danger');
        if ($this.html() === 'Running') {
            $this.html('Stopped');
        } else {
            $this.html('Running')
        }
        e.preventDefault();
    });

    // Running State Button
    $('#privacyStateBtn').click(function(button) {
        var $this = $(this);
        $this.toggleClass('btn-success btn-danger');
        if ($this.html() === 'Shared') {
            $this.html('Private');
        } else {
            $this.html('Shared')
        }
        button.preventDefault();
    });

    // Create Campaign Button
    $('#create-campaign').click(function(e) {
        var title = $('#campaignTitle').val();
        if (title === '') {
            $('#campaignTitle').parent().parent().addClass('error');
        } else {
            $('#campaignTitle').parent().parent().removeClass('error');
        }
        var campaign = campaignEditor.createCampaign(title);
        if (!campaign) {
            var errorAlert = '<div class="alert alert-error create-campaign-error hide"><button class="close">&times;</button><strong>Error:</strong> A campaign needs to have a title!</div>';
            $(errorAlert).insertAfter('.new-campaign hr').slideToggle();
            if($('.create-campaign-error').size() > 1) {
                $('.create-campaign-error').slice(1).delay('1000').slideToggle('slow',function() { $(this).alert('close')});
            }
            e.preventDefault();
        } else {
            var campaignWrapper = {
                'privacyState': $('#privacyStateBtn').html().toLowerCase(),
                'runningState': $('#runningStateBtn').html().toLowerCase(),
                'campaign': campaignEditor.createCampaign(title)
            };
            $.cookie('currentCampaign', campaignWrapper['campaign']['campaignName']);
            localStorage['campaignWrapper'] = JSON.stringify(campaignWrapper);
        }
    });
});
