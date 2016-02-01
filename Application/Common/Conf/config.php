<?php
return array(
	//'配置项'=>'配置值'
		// 数据库配置信息
		'DB_TYPE'			=>'mysql', 		// 数据库类型
		'DB_HOST'			=>'localhost', 	// 服务器地址
		'DB_NAME'			=>'postor', 	// 数据库名
		'DB_USER'			=>'root', 		// 用户名
		'DB_PWD'			=>'', 			// 密码
		'DB_PORT'			=>3306, 		// 端口
		'DB_PREFIX'			=>'', 			// 数据库表前缀
		'DB_CHARSET'		=>'utf8', 		// 字符集
		'DB_FIELDS_CACHE'	=>false,
		'READ_DATA_MAP'		=>true,
		
		'DEFAULT_FILTER'	=>'strip_tags',		// 默认的拦截器
		'API_KEY'			=>'',				// 设置短信平台的验证码
		
		'TMPL_PARSE_STRING' =>array(
			'_CSS_'			=>'/public/css/', 		// css文件地址
			'_SCRIPT_' 		=>'/public/script/',	// js文件地址
			'_IMAGE_'		=>'/public/image/',	// image文件地址
			'_ENTER_'		=>'/home/',	// 入口地址
			'_ADMIN_'		=>'/admin/',	// 后台入口

			
		),
		'DEFAULT_C_LAYER'	=>'Controller', 			// 默认的控制器层名称
		'MODULE_ALLOW_LIST'	=>array('Home','Admin'), 	// 分组列表
		'DEFAULT_MODULE'	=>'Home', 					// 默认分组
);