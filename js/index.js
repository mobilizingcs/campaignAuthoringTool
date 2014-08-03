$(function(){
	$(".hastip").focus(function(){
		$(this).siblings().tooltip('show');
	});
	$(".hastip").focusout(function(){
	    $(this).siblings().tooltip('hide');
	});
});
