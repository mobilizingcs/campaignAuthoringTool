$(function() {
   $('#username').html('<i class="icon-user"></i> Logged in as ' + $.cookie('username'));
   $('.logoutButton').click(function (e) {
        if (confirm("Are you sure you want to log out? All unsaved data will be lost.")) {
            $.post("https://test.ohmage.org/app/user/logout", { client: "campaign-webapp", auth_token: $.cookie('authToken')});
            $.removeCookie('authToken');
            $.removeCookie('username');
            window.location.replace('survey.php');
        } else {
            e.preventDefault();
        }
   });
});
