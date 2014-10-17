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

//populate .classes dropdown
function populateClasses(username){
	return oh.user.info().done(function(data){
        var inverse = {};
        $.each(data[username].classes, function(key, val){
            inverse[val] = key;
        });

        var classes = Object.keys(inverse).sort();
        $.each(classes, function(i, name) {
            $('.classes').append('<option value="' + inverse[name] + '">' + name + "</option>");
        });
        if(window.campaignWrapper) {
            $('.classes').val(campaignWrapper['classes']);
        }

        $.each(data[username].campaigns, function(index, val) {
            //do something with campaigns
        });
    })
}

$(function(){
    //only allow alphanumeric
    $('#surveyId,#promptId').keyup(function (e) {
        var fld = $(this);
        fld.val(fld.val().replace(/[^a-z0-9_]/gi,''));
    });
})

