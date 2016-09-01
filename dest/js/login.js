/**************************
 *@author icepro
 *首页使用
 ****************************/
$(function() {
    var form = $(".login-form");

    form.css({
        opacity: 1,
        "-webkit-transform": "scale(1)",
        "transform": "scale(1)",
        "-webkit-transition": ".5s",
        "transition": ".5s"
    });
});
$(function() {
    $('.login').click(function() {
        var params = $("#login").serialize();
        $.post(
            "/api/login/va",
            params,
            function(data) {
                var json = JSON.parse(data);
                if (json.status == 1) {
                    //return true;
                    window.location = "/logined.html";
                } else {
                    alert('error');
                }
            });
    });
});