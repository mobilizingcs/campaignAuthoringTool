$(function() {
    var username = "";
    oh.user.whoami(function(x) {
                                username = x;
                                  });
    //$('#username').html('<i class="icon-user"></i> Logged in as ' + $.cookie('username'));
    $('#username').html('<i class="icon-user"></i> Logged in as ' + username);
    $('.logoutButton').click(function (e) {
        if (confirm("Are you sure you want to log out? All unsaved data will be lost.")) {
            $.post("https://test.ohmage.org/app/user/logout", { client: "campaign-webapp", auth_token: $.cookie('authToken')});
            $.removeCookie('authToken');
            $.removeCookie('username');
            window.location.replace('login.html');
        } else {
            e.preventDefault();
        }
   });
});
