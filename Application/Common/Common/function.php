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
	