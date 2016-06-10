<?php
	/** 
	* 检查用户是否是合法用户
	* @param array $map 含有用户id和密码的表
	* @return true合法用户，false，无效用户
	*/ 
	function checkUsr($map){
		$usrs = M('admin');
		$list = $usrs -> where($map) -> find();
		if( empty( $list ) ){
			return false;
		}else{
			return true;
		}
	}
	/**
    * 得到当前所有的token
    *
    * @return array
    */

    function getTokens(){
		$tokens = session(C('SESSION_KEY_TOKEN_ADMIN'));
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
		if(session(C('SESSION_KEY_TOKEN_ADMIN'))!=null){
			//判断是否和session一致，一致说明还处在本次登录有效期内
			if(session(C('SESSION_KEY_TOKEN_ADMIN'))==$token){
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
    * @return boolean
    */
	function isTokenL($token){
		$admin_info=array(
			'token'=>$token,
			'id'=>cookie(C('COOKIE_KEY_TOKEN_ADMIN'))['id'],
		);
		
		//判断是否有token若有必然在此次登录有效期内
		if(session(C('SESSION_KEY_TOKEN_ADMIN'))!=null){
			//判断是否和session一致，一致说明还处在本次登录有效期内
			if(session(C('SESSION_KEY_TOKEN_ADMIN'))==$admin_info['token']){
				return  true;
			}else{
				
				return  false;
			}
		}
		
		//查询数据库
		$usrs = M('admin');
		if($usrs->create($admin_info)){
			$map['Id']=$admin_info['Id'];
			$list=$usrs->where($map)->find();
			//若用户给出的id为空,提交token为null，token和数据库不符，当前时间减去授予时间大于有效时间，则该token是无效的
			if( ($admin_info['id'] !="")
				&& ($admin_info['token'] != null) 
				&& ($list['token']==$admin_info['token'])
				&& (time()-strtotime($list['granttime'])) <= $list['expiretime']){
				//更新token
				$token =createToken($admin_info['id']);
				//session清空token
				session(C('SESSION_KEY_TOKEN_ADMIN'),null);
				//session写入token
				session(C('SESSION_KEY_TOKEN_ADMIN'),$token);
				$admin_info['token']=$token;
				$admin_info['grantTime']=date('Y-m-d H:i:s', time());
				cookie(C("COOKIE_KEY_TOKEN_ADMIN"),array(id=>$admin_info["id"],token=>$token),$list['expiretime']);
				//更新数据库token，和授予时间
				$list=$usrs->where($map)->save($admin_info);
				return  true;
			}else{
				return  false;
			}
		}
		
		
		return  false;
	}
	function isPswCurrect(){
		
	}
	/**
    * 从客户端获取登陆信息
    * @return $value-token
    */
	function getAdminClientLToken(){
		$value=cookie(C('COOKIE_KEY_TOKEN_ADMIN'));
		return $value['token'];
	}
	
	