(function(){
    //some global settings
    var myrole = "author"

    //initiate the client
    var oh = Ohmage("/app", "campaign-author-tool-reloaded")

    //attach global callbacks
    oh.callback("done", function(x, status, req){
        //for debugging only
        console.log(x);
    })

    //global error handler. In ohmage 200 means unauthenticated
    oh.callback("error", function(msg, code, req){
        (code == 200) ? window.location.replace("../web/#login") : alert("Error!\n" + msg);
    });

    //prevent timeout
    oh.keepalive();

    //get data
    oh.user.whoami().done(function(username){
        oh.campaign.readall().done(function(data){
            var urns = Object.keys(data);
            $.each(urns.sort(), function(i, urn){
                if(data[urn]["user_roles"].indexOf(myrole) > -1) {
                    var li = $("<li>").addClass("disabled").appendTo("#campaignlist");
                    var a = $("<a>").attr("href", "campaign-edit.html").text(data[urn].name).appendTo(li).click(function(e) {
                        var self = $(this);
                        e.preventDefault();
                        oh.campaign.readall({
                            campaign_urn_list: urn,
                            output_format:"long"
                        }).done(function(data){
                            var campaign = data[urn];
                            try {
                                var json = campaigntojson(campaign.xml.replace(/<!--[\s\S]*?-->/g, ""))
                            } catch(err){
                                alert("Error parsing XML: \n\n" + err.message)
                            }

                            var surveys = [];
                            if(json.campaign && json.campaign.surveys){
                                surveys = json.campaign.surveys;
                            } else {
                                alert("No surveys found in XML. Perhaps invalid XML.")
                            }

                            localStorage['campaignWrapper'] = JSON.stringify({
                                classes : campaign.classes[0],
                                description : campaign.description,
                                privacyState : campaign.privacy_state,
                                runningState : campaign.running_state,
                                username : username,
                                campaign : {
                                    campaignName: campaign.name,
                                    campaignUrn : urn,
                                    surveys : surveys
                                }
                            });

                            //ftw
                            $.cookie('currentSurvey', 0)
                            window.location.href = self.attr('href');
                        });
                    });

                    oh.survey.count(urn).done(function(counts){
                        if(!Object.keys(counts).length){
                            //no existing responses found
                            li.removeClass("disabled")
                        }
                    })
                }
            })
        });
    });
})();
