$(function() {
    $("#login-form").submit(function(e) {
        var $this = $(this);
        var inputUsername = $this.find("#inputUsername").val();
        var inputPassword = $this.find("#inputPassword").val();
        $.post("https://test.ohmage.org/app/user/auth_token", { user: inputUsername, password: inputPassword, client: "campaign-webapp" }, function(response) {
            if (response.result === "success") {
                $.cookie("authToken", response.token, { expires: 1 });
                $.cookie("username", inputUsername, { expires: 1 });
                window.location.replace('campaign.php'); 
            }
            else {
                var errorAlert = '<div class="alert alert-error login-error hide"><button class="close">&times;</button><strong>Login Failed: </strong>' + response.errors[0].text + '</div>';
                $(errorAlert).prependTo('.content').slideToggle();
                if($('.login-error').size() > 1) {
                    $('.login-error').slice(1).delay('1000').slideToggle('slow',function() { $(this).alert('close')});
                }
            }
        }, "json");
        e.preventDefault();
    });
});