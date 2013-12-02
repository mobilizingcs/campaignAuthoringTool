$(function() {
    var username = "";
    oh.user.whoami(function(x) { 
                                 username = x; 
                                 $('#username').html('<i class="icon-user"></i> Logged in as ' + username);});

    //$('#username').html('<i class="icon-user"></i> Logged in as ' + $.cookie('username'));
    
    $('.logoutButton').click(function (e) {
        if (confirm("Are you sure you want to log out? All unsaved data will be lost.")) {
            /*
              SN - since we don't have a final location for the tool,
              let's look up our location. then we set it to support auto redirect.
            */
            history.pushState({}, '', '/'+(window.location.pathname.split("\/",2))[1]));
            oh.logout(function(x){});
            localStorage.removeItem('campaignWrapper');
            $.removeCookie('currentCampaign');
            $.removeCookie('currentSurvey');
        } else {
            e.preventDefault();
        }
   });
});
