$(function(){
        var form = $(".login-form");

        form.css({
            opacity: 1,
            "-webkit-transform": "scale(1)",
            "transform": "scale(1)",
            "-webkit-transition": ".5s",
            "transition": ".5s"
        });
    });
$(function(){
	$('.login').click(function(){
		var params = $("#login").serialize();
		$.post(
			"_ENTER_login/va", 
			params,
			function(data){
				json = eval('('+data+')');
				if(json.status==1){
					//return true;
					window.location="_ENTER_login/logined";
				}else{
					alert('error');
				}
			});
	});
});