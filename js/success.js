$(function() {
   $('.createCampaign').click(function (e) {
        window.location = ('campaign.php');
   });
   
   /*
   $('.logoutButton').click(function (e) {
        if (confirm("Are you sure you want to log out? All unsaved data will be lost.")) {
            alert('test');
            window.location = ('login.php');
            $.post("https://test.ohmage.org/app/user/logout", { client: "campaign-webapp", auth_token: $.cookie('authToken')});
            $.removeCookie('authToken');
            $.removeCookie('username');
            window.location = ('login.php');
        } else {
            e.preventDefault();
        }
   });
    */
});