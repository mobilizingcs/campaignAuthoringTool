(function(){
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

    //delete old stuff
    delete localStorage.campaignWrapper;
    $.removeCookie("currentCampaign");
    $.removeCookie("currentSurvey");

    //get data
    oh.user.whoami().done(function(username){
        oh.campaign.readall().done(function(data){
            var urns = Object.keys(data);
            var requests = $.map(urns.sort(), function(urn, i){
                var roles = data[urn]["user_roles"];
                if($.inArray("author", roles) > -1 || $.inArray("supervisor", roles) > -1) {

                    var tr = $("<tr>").appendTo("#campaigntablebody")
                    var td1 = $("<td>").appendTo(tr).text(data[urn].name);
                    var td2 = $("<td>").appendTo(tr).text(data[urn].creation_timestamp);
                    var td3 = $("<td>").appendTo(tr).text(data[urn].running_state);
                    var td4 = $("<td>").appendTo(tr);
                    var td5 = $("<td>").appendTo(tr);

                    var a = $("<a>").addClass("btn disabled").text("Update").appendTo(td5).click(function(e) {
                        var self = $(this);
                        e.preventDefault();
                        if(self.hasClass("disabled")) return;

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
                                oldclasses : campaign.classes[0],
                                description : campaign.description,
                                privacyState : campaign.privacy_state,
                                runningState : campaign.running_state,
                                username : username,
                                update : true,
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

                    return oh.survey.count(urn).done(function(counts){
                        if(!Object.keys(counts).length){
                            //no existing responses found
                            a.removeClass("disabled").addClass("btn-primary").attr("href", "campaign-edit.html");
                            td4.text(0);
                        } else {
                            var total = $.map(counts, function(val, key) {
                                return val[0].count;
                            }).reduce(function(previousValue, currentValue) {
                                return previousValue + currentValue;
                            });
                            td4.text(total);
                        }
                    });
                }
            });
            //data tables widget
            function initTable(){
                $('#campaigntable').dataTable( {
                    "lengthMenu": [[25, 50, 100, -1], [25, 50, 100, "All"]],
                    "aoColumnDefs": [
                       { 'bSortable': false, 'aTargets': [ 4 ] }
                    ]
                });
            }

            //init temporary datatable
            initTable()

            //reinit final datatable after counts have been updated
            $.when.apply($, requests).always(function() {
                $('#campaigntable').dataTable().fnDestroy();
                initTable();
            });
        });
    });
})();
