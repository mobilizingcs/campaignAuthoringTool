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
});
