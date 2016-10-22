<?php
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
	* 单表查询专用DAO
	* @param type array 类型{key:查询字段,word:关键词,type:判断符号}
	* @param map array 类型{查询字段:值,……}
	* @param table string 需要查询的数据源（也就是表）
	* @param pagination int 是否分页{int<40}大于40或小于0或其他字符认为不需要分页
	* @param query string 需要手工录入的query字段,若无则输入array()
	* @param field array 需要查询的field,默认返回所有字段
	* @param page int 当且仅当pagination生效时需要填写
	*
	*/
	function getDataByKeyWords($type,$map,$table,$pagination,$field="*",$page=1,$query=array()){
		$where=array();
		//设定查询对象
		$where[$type['key']]=array($type['type'],$type['word']);
		$model = M($table);
		//判断field是否为空，空则获取所有字段
		// $field=(empty($field))?"*":$field;
		
		if ( is_numeric( $pagination ) && ( $pagination <= 40 || $pagination >= 0 ) ) {
			$count=$model->field( array( "id" ) )->where( $where )->where($query)->where($map)->Count();
			$pages= ceil( $count / $pagination );
			//判断页数设置
			if ( isset( $page ) ){
				$page = intval($page);
			}else{
				//否则，设置为第一页
				$page = 1; 
			}
			$offset = $pagination*($page - 1);
			$limit = $offset.",".$pagination;
		}
		if(isset($limit)){
			return array("list"=>$model->field($field)->where($where)->where($query)->where($map)->limit($limit)->select(),"max"=>$pages);
		}else{
			return $model->field($field)->where($where)->where($query)->where($map)->select();
		}
		
		
	}
	function setDataByKeyWords(){
		
		$pagination = I("post.pagination");
		$count = $model->field( array( "id" ) )->where( $where )->where($query)->where($map)->Count();
		$pages = ceil( $count / $pagination );
		
		array("list"=>$model->field($field)->where($where)->where($map)->limit($limit)->select(),"max"=>$pages);
	}