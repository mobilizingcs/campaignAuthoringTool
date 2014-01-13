$(function(){
//init page
oh.ping(function(){
	oh.user.whoami(function(x){
		oh.user.read(x, function(data){
			oh.keepalive();
		});
	});
});

$(".hastip").focus(function(){
	$(this).siblings().tooltip('show');
});
$(".hastip").focusout(function(){
        $(this).siblings().tooltip('hide');
});
//Automatically generate a campaign urn following best practices for a Mobilize use case
$("#campaignTitle").keyup(updateUrn);
$(".classes").change(updateUrn);
$("#campaignUrn").ready(updateUrn);
function updateUrn(){
	var urn_name = $("#campaignTitle").val().replace(/\s/g, "");
	var urn_class = $(".classes option:selected").val().replace(/urn:class:/g, '');
	var urn_author = $("#authors").val().replace(/[^a-z0-9\s]/gi, '_');
	var urn = "urn:campaign:"+urn_class+":"+urn_author+":"+urn_name;
	$("#campaignUrn").val(urn);
}


// Uncomment this to allow users to edit if they check the box.
//$("#campaignUrn-edit").click(function(){
//	$("#campaignUrn").prop("disabled", !$(this).attr('checked'));
//});
});
