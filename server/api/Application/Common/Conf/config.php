<?php
return array(
	//'配置项'=>'配置值'
		// 数据库配置信息
		'DB_TYPE'			=>'mysql', 		// 数据库类型
		// host配置在linux/unix环境下可能需要调整为127.0.0.1
		// win环境下通常可以使用localhost访问	
		'DB_HOST'			=>'45.78.40.193', 	// 服务器地址
		'DB_NAME'			=>'postor', 	// 数据库名
		'DB_USER'			=>'root', 		// 用户名
		'DB_PWD'			=>'zxcvbnm', 			// 密码
		'DB_PORT'			=>3306, 		// 端口
		'DB_PREFIX'			=>'', 			// 数据库表前缀
		'DB_CHARSET'		=>'utf8', 		// 字符集
		'DB_FIELDS_CACHE'	=>false,
		'READ_DATA_MAP'		=>true,
		//'DB_PARAMS' => array(\PDO::ATTR_CASE => \PDO::CASE_NATURAL),
		
		'DEFAULT_FILTER'	=>'strip_tags',		// 默认的拦截器
		'API_KEY'			=>'',				// 设置短信平台的验证码
		
		'URL_CASE_INSENSITIVE' => false,
		// 'TMPL_PARSE_STRING' =>array(
		// 	'_CSS_'			=>'/public/css/', 		// css文件地址
		// 	'_SCRIPT_' 		=>'/public/script/',	// js文件地址
		// 	'_IMAGE_'		=>'/public/image/',	// image文件地址
		// 	'_ENTER_'		=>'/home/',	// 入口地址
		// 	'_ADMIN_'		=>'/admin/',	// 后台入口

			
		// ),
		'DEFAULT_C_LAYER'	=>'Controller', 			// 默认的控制器层名称
		'MODULE_ALLOW_LIST'	=>array('Admin','Api'), 	// 分组列表
		'DEFAULT_MODULE'	=>'Api', 					// 默认分组

		'URL_MODEL'=>2,  //关于URL更多说明请参考Tinkphp/Common/convention.php
);
