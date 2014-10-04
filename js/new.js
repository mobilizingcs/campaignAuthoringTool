$(function(){
	function generateURN(){
		if($("#campaignUrn").attr("disabled")){
			var name = $("#campaignTitle").val().toLowerCase().replace(/[^a-z0-9]/gi,'');
			var class_urn = $(".classes").val().replace("urn:class:","");
			var author = $(".authors").val().replace(/[^a-z0-9]/gi,'');
			var newurn = "urn:campaign:" + class_urn + ":" + author + ":" + name;
			$("#campaignUrn").val(newurn);
		}
	}

	$("#campaignTitle").on("keyup", generateURN)
	$(".classes").on("change", generateURN)

	$("#campaignurncontrols").on("click", function(){
		$("#campaignUrn").removeAttr("disabled")
	})

});
