$(function() {
   $('.createCampaign').click(function (e) {
        window.location = ('campaign.html');
   });

   $('.logoutButton').click(function (e) {
        if (confirm("Are you sure you want to log out? All unsaved data will be lost.")) {
        	window.location.replace('index.html');
        	jQuery(document).empty();
            oh.logout(function(x){});
        } else {
            e.preventDefault();
        }
   });
});