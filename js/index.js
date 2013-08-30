//init page
oh.ping(function(){
	oh.user.whoami(function(x){
		oh.user.read(x, function(data){
			oh.keepalive();
		});
	});
});