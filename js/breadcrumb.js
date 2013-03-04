$(function() {
    var $campaignPage = $('#campaignBreadcrumb');
    if ($campaignPage.children('a').length > 0) {
        $campaignPage.children('a').html('<strong>Campaign: </strong>' + $.cookie('currentCampaign'));
    } else {
        $campaignPage.html('<strong>Campaign: </strong>' + $.cookie('currentCampaign'));
    }

    if (($survey = $('#surveyBreadcrumb')).length > 0) {
        $survey.html('<strong>Survey: </strong>' + campaignWrapper['campaign']['surveys']['survey'][$.cookie('currentSurvey')]['title']);
    }

    $('#campaignBreadcrumb a').click(function(e) {
        if (!confirm('All additions and changes to this survey will be lost, are you sure?')) {
            e.preventDefault();
        }
    })

    $('#homeBreadcrumb a').click(function(e) {
        if (!confirm('All additions and changes to this campaign will be lost, are you sure?')) {
            e.preventDefault();
        }
    })
});
