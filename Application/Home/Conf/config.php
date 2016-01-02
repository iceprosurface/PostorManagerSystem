<?php
return array(
	//'配置项'=>'配置值'
	'ENCRYPT_KEY'=>'sdeasq1230sd1',
	'SESSION_KEY_TOKEN'=>'UsedToken',
	'FROM_CHECK'=>'ture',
	// 配置邮件发送服务器
	'MAIL_SMTP'                     =>TRUE,//smtp
	'MAIL_HOST'                     =>'smtp.yeah.net',//伺服器地址
	'MAIL_SMTPAUTH'                 =>TRUE,
	'MAIL_USERNAME'                 =>'postormanager@yeah.net',//邮箱名
	'MAIL_PASSWORD'                 =>'nsyywxnrtehbfoij',//独立smtp密码
	// 'MAIL_SECURE'                   =>'tls',//是否启用tls
	'MAIL_CHARSET'                  =>'utf-8',//文件编码
	'MAIL_ISHTML'                   =>TRUE,//是否开启html传输
	// 是否验证Ajax请求
	'IS_AJAX'=>TRUE,
);