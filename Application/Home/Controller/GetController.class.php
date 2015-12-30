<?php
namespace Home\Controller;
use Think\Controller;
class GetController extends Controller {
	/*
	*此控制器用于ajax获取各种类型的数据
	*不包含验证信息在内的相关数据
	*函数名遵循getXXX
	*/
	/*sdas
	*获取用户名称
	*传入参数:@param token（令牌）
	*返回值@return response（错误信息提示），status（错误判断编码），name（用户名称）
	*说明:0:数据创建失败，1:用户名称返回成功，2:用户名称返回失败
	*/
	public function getUsrName(){
		$token=I('post.token');
		if(isThisTokenL($token)){
			$map['Id'] = getTokenKey($token);
			$usrs = M('usr');
			$res=array(response=>"数据创建失败,请联系管理员以解决问题。错误代码:0。",status=>"0");
			if($usrs->create($usr_info)){
				$list=$usrs->where($map)->find();
				$res=array(response=>$map['Id'],status=>"1",name=>$list['name']);
			}
		}else{
			//$this->redirect("/login/login");
		}
		$this->ajaxReturn(json_encode($res),'JSON');
	}
	/*
	*获取用户的邮件数量
	*传入参数:@param token（令牌）
	*返回值@return response（错误信息提示），status（错误判断编s码），checkedCount，uncheckedCount
	*/
	public function getOrderNumber(){
		$token=I('post.token');
		if(isThisTokenL($token)){
			$map['usrId'] = getTokenKey($token);
			$map['haveSAR'] = "0";
			$orders = M('orders');
			$uncheckedCount=$orders->where($map)->select();
			$map['haveSAR'] = "1";
			$checkedCount=$orders->field(array('orderId','orderInfo','exportTime','postorId'))->where($map)->select();
			$res=array(response=>"用户昵称",status=>"1",checkedCount=>count($checkedCount),uncheckedCount=>count($uncheckedCount));
		}else{
			//$this->redirect("/login/login");
		}
		$this->ajaxReturn(json_encode($res),'JSON');
	}
	/*
	*获取尚未收件列表
	*传入参数:@param int page @param string token
	*返回值@return array orders
	*/
	public function getUnchecked(){
		$token=I('post.token');
		$res=$token;
		if(isThisTokenL($token)){
			$map['usrId'] = getTokenKey($token);
			$map['haveSAR'] = "0";
			$orders = M('orders');
			$orderlist=$orders->field(array('orderId','orderInfo','positionId','importTime','postorId'))->where($map)->select();
			$res=array(response=>"用户昵称",status=>"1",orders=>$orderlist);
		}else{
			//$this->redirect("/login/login");
		}
		$this->ajaxReturn(json_encode($res),'JSON');
	}
	/*
	*获取已经收件列表
	*传入参数:@param int page @param string token
	*返回值@return array orders
	*/
	public function getChecked(){
		$token=I('post.token');
		$res=$token;
		if(isThisTokenL($token)){
			$map['usrId'] = getTokenKey($token);
			$map['haveSAR'] = "1";
			$orders = M('orders');
			$orderlist=$orders->where($map)->select();
			$res=array(response=>"用户昵称",status=>"1",orders=>$orderlist);
		}else{
			//$this->redirect("/login/login");
		}
		$this->ajaxReturn(json_encode($res),'JSON');
	}
	/*
	*获取load的页面
	*传入参数:@param page
	*返回值@return html
	*/
	public function load(){
		$page=I('get.page');
		$this->display($page);
	}
	

}