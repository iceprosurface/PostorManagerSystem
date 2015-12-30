<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <title>登陆</title>
	<meta charset="UTF-8">
    <link href="/public/css/metro.css" rel="stylesheet">
    <link href="/public/css/metro-icons.css" rel="stylesheet">

    <script src="/public/script/jquery-2.1.4.min.js"></script>
    <script src="/public/script/metro.js"></script>
    <script src="/public/script/public.js"></script>
 
    <style>
        .login-form {
            width: 25rem;
            height: 18.75rem;
            position: fixed;
            top: 50%;
            margin-top: -9.375rem;
            left: 50%;
            margin-left: -12.5rem;
            background-color: #ffffff;
            opacity: 0;
            -webkit-transform: scale(.8);
            transform: scale(.8);
        }
    </style>

    <script>

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
        </script>
</head>
<body class="bg-darkTeal">
    <div class="login-form padding20 block-shadow">
        <a href='index.php/login/login'><label>login</label></a>
		<a href='index.php/import/import'><label>import</label></a>
		<a href='index.php/import/check'><label>check</label></a>
		<a href='index.php/mail/email'><label>email</label></a>
    </div>
    <div id="ss"></div>
</body>
</html>