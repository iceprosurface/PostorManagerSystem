/**************************
 *@author icepro
 *首页使用
 ****************************/
$(function() {
    var form = $(".login-form");

    form.css({
        opacity: 1,
        "transform": "scale(1)",
        "-webkit-transform": "scale(1)",
        "transition": ".5s"
        "-webkit-transition": ".5s",
    });

    $('.login').click(function() {
        var params = $("#login").serialize();
        $.ajax({
            type: 'post',
            url: "/api/login/va",
            data: params,
            success: function(data) {
                window.location = "/logined.html";
            },
            error: function(data) {
                alert("login fails")
            },
            dataType: 'json'
        });
    });
});
