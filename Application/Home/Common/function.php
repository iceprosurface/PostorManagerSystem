<?php
	/** 
	* 检查用户是否是合法用户
	* @param array $map 含有用户id和密码的表
	* @return true合法用户，false，无效用户
	*/ 
	function checkUsr($map){
		$usrs = M('usr');
		$list = $usrs -> where($map) -> find();
		if( empty( $list ) ){
			return false;
		}else{
			return true;
		}
	}
	/** 
	* 加密字符串
	* @param string $txt
	* @param string $encrypt_key
	* @return $token
	*/ 
	function keyED($txt, $encrypt_key) {
		$encrypt_key = md5 ( $encrypt_key );
		$ctr = 0;
		$tmp = "";
		for($i = 0; $i < strlen ( $txt ); $i ++) {
			if ($ctr == strlen ( $encrypt_key ))$ctr = 0;
			$tmp .= substr ( $txt, $i, 1 ) ^ substr ( $encrypt_key, $ctr, 1 );
			$ctr ++;
		}
		return $tmp;
    }
	/** 
	* 加密字符串
	* @param $txt
	* @param $key
	* @return $token
	*/ 
	function encrypt($txt, $key) {
		$encrypt_key = md5 ( (( float ) date ( "YmdHis" ) + rand ( 10000000000000000, 99999999999999999 )) . rand ( 100000, 999999 ) );
		$ctr = 0;
		$tmp = "";
		for($i = 0; $i < strlen ( $txt ); $i ++) {
			if ($ctr == strlen ( $encrypt_key ))$ctr = 0;
			$tmp .= substr ( $encrypt_key, $ctr, 1 ) . (substr ( $txt, $i, 1 ) ^ substr ( $encrypt_key, $ctr, 1 ));
			$ctr ++;
		}
		return ( preg_replace("/\\+/s","_", base64_encode ( keyED ( $tmp, $key ) ) ));
	}
	/** 
	* 解密字符串
	* @param string $txt
	* @param string $key
	* @return txt
	*/ 
	//base64 [A-Za-z0-9\+\/=]
	function decrypt($txt, $key) {
	if($txt == ""){ return false;}
	//echo preg_replace("/_/s","+",$txt);
	$txt = keyED (base64_decode ( preg_replace("/_/s","+", $txt) ), $key );
	$tmp = "";
	for($i = 0; $i < strlen ( $txt ); $i ++) {
		$md5 = substr ( $txt, $i, 1 );
		$i ++;
		$tmp .= (substr ( $txt, $i, 1 ) ^ $md5);
	}
	return $tmp;
	}
	/**
    * 得到当前所有的token
    *
    * @return array
    */

    function getTokens(){
		$tokens = session(C('SESSION_KEY_TOKEN'));
		if (empty($tokens) && !is_array($tokens)) {
			$tokens = array();
		}
		return $tokens;
    }

	/** 
	* 生成token
	* @param string $params 加密序列
	* @return $token 
	*/ 
	function createToken($params,$key){
		$key = tokenKeyDefault($key);
		$token = encrypt($params.session_id(),$key);
		return $token;
	}
	
	/** 
	* 反解token
	* @param string $params 解密序列
	* @return false 失败 $sourse 原序列
	*/ 
    function getTokenKey($token,$key){
		$key = tokenKeyDefault($key);
		if($token == null || trim($token) == "") return false;
		$source = decrypt($token,$key);
		return $source != "" ? str_replace(session_id(),"",$source) : false;
    }
	
    /**
    * 检查是否为指定的Token
    * @param string $token 要检查的token值
    * @param string $formName
    * @param boolean $fromCheck 是否检查来路,如果为true,会判断token中附加的session_id是否和当前session_id一至.
    * @param string $key 加密密钥
    * @return boolean
    */

    function isToken($token,$formName,$key){
		$fromCheck = C('FROM_CHECK')==null ? false : C('From_Check');
		$key = tokenKeyDefault($key);
		if(empty($token)) return false;
		$tokens = getTokens();
		if (in_array($token,$tokens)) //如果存在，说明是以使用过的token
			return false;
		$source = decrypt($token,$key);
		if($fromCheck){
			return $source == $formName.session_id();
		}else{
			return strpos($source,$formName) === 0;
		}

    }
	function tokenKeyDefault($key){
		if($key==null){
			return C('ENCRYPT_KEY');
		}else{
			return $key;
		}
	}
	/**
    * 检查此次token登录是否合法
    * @param string $token 要检查的token值
    * @return boolean
    */
	function isThisTokenL($token){
		//判断是否有token若有必然在此次登录有效期内
		if(session(C('SESSION_KEY_TOKEN'))!=null){
			//判断是否和session一致，一致说明还处在本次登录有效期内
			if(session(C('SESSION_KEY_TOKEN'))==$token){
				return  true;
			}else{
				return  false;
			}
		}
		return false;
	}
	/**
    * 检查是token登录是否合法
    * @param array $token 要检查的token值
    * @return boolean/token
    */
	function isTokenL($token){
		$usr_info=array(
			'token'=>$token,
		);
		
		//判断是否有token若有必然在此次登录有效期内
		if(session(C('SESSION_KEY_TOKEN'))!=null){
			//判断是否和session一致，一致说明还处在本次登录有效期内
			if(session(C('SESSION_KEY_TOKEN'))==$usr_info['token']){
				return  true;
			}else{
				
				return  false;
			}
		}
		//查询数据库
		$usrs = M('usr');
		if($usrs->create($usr_info)){
			$map['Id']=$usr_info['Id'];
			$list=$usrs->where($map)->find();
			//若用户提交token为null，token和数据库不符，当前时间减去授予时间大于有效时间，则该token是无效的
			if( ($usr_info['token'] != null) 
				&& ($list['token']==$usr_info['token'])
				&& (time()-strtotime($list['granttime'])) <= $list['expiretime']){
				//更新token
				$token =createToken($usr_info['id']);
				//session清空token
				session(C('SESSION_KEY_TOKEN'),null);
				//session写入token
				session(C('SESSION_KEY_TOKEN'),$token);
				$usr_info['token']=$token;
				$usr_info['grantTime']=date('Y-m-d H:i:s', time());
				//更新数据库token，和授予时间
				$list=$usrs->where($map)->save($usr_info);
				return  $token;
			}else{
				return  false;
			}
		}else{
			return  false;
		}
		return  false;
	}
	/**
	 * 邮件发送函数
	 */
	function sendMail($to, $subject, $content) {
		Vendor('PHPMailer.PHPMailerAutoload'); 
		$mail = new PHPMailer();
		// 装配邮件服务器
		if (C('MAIL_SMTP')) {
			$mail->IsSMTP();
		}
		$mail->Host = C('MAIL_HOST');
		$mail->SMTPAuth = C('MAIL_SMTPAUTH');
		$mail->Username = C('MAIL_USERNAME');
		$mail->Password = C('MAIL_PASSWORD');
		$mail->SMTPSecure = C('MAIL_SECURE');
		$mail->CharSet = C('MAIL_CHARSET');
		// 装配邮件头信息
		$mail->From = C('MAIL_USERNAME');
		$mail->AddAddress($to);
		$mail->FromName = '快件管理中心';
		$mail->IsHTML(C('MAIL_ISHTML'));
		// 装配邮件正文信息
		$mail->Subject = $subject;
		$mail->Body = $content;
		// 发送邮件
		if (!$mail->Send()) {
			return FALSE;
		} else {
			return TRUE;
		}
	}
	/**
    * 从客户端获取登陆信息
    * @return $value-token
    */
	function getClientLToken(){
		$value=cookie('login');
		return $value['token'];
	}
