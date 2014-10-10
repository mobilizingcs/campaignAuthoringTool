$(function(){
	var manual = false;
	function generateURN(){
		if(!manual){
			var name = $("#campaignTitle").val().toLowerCase().replace(/[^a-z0-9]/gi,'');
			var class_urn = $(".classes").val().replace("urn:class:","");
			var author = $(".authors").val().replace(/[^a-z0-9]/gi,'');
			var newurn = "urn:campaign:" + class_urn + ":" + author + ":" + name;
			$("#campaignUrn").val(newurn);
		}
	}

	$("#campaignTitle").on("keyup", generateURN).on("blur", generateURN);
	$(".classes").on("change", generateURN).on("blur", generateURN);

	$("#campaignurncontrols").on("keypress", function(){
		manual = true;
		$("#campaignUrn").css("background-color", "white");
	})
});
