<?php
namespace Home\Controller;
use Think\Controller;
class GetController extends BaseController {
	/*
	*此控制器用于ajax获取各种类型的数据
	*不包含验证信息在内的相关数据
	*函数名遵循getXXX
	*/
	public function _initialize(){
		if(C('IS_AJAX')&& !IS_AJAX ){
			$this->redirect("index/illegalRequirement");
		}
		$token=getClientLToken();
		$this->token=$token;
	}
	
	/*
	*获取用户名称
	*传入参数:@param token（令牌）
	*返回值@return response（错误信息提示），status（错误判断编码），name（用户名称）
	*说明:0:数据创建失败，1:用户名称返回成功，2:用户名称返回失败
	*/
	public function getUsrName(){
		$map['Id'] = getTokenKey($this->token);
		$usrs = M('usr');
		$res=array(response=>"数据创建失败,请联系管理员以解决问题。错误代码:0。",status=>"0");
		if($usrs->create($usr_info)){
			$list=$usrs->field(array('name'))->where($map)->find();
			$res=array(response=>$map['Id'],status=>"1",name=>$list['name']);
		}
		$this->ajaxReturn(json_encode($res),'JSON');
	}
	/*
	*获取用户的邮件数量
	*传入参数:@param token（令牌）
	*返回值@return response（错误信息提示），status（错误判断编s码），checkedCount，uncheckedCount
	*/
	public function getOrderNumber(){
		$map['usrId'] = getTokenKey($this->token);
		$map['haveSAR'] = "0";
		$orders = M('orders');
		$uncheckedCount=$orders->where($map)->select();
		$map['haveSAR'] = "1";
		$checkedCount=$orders->field(array('orderId','orderInfo','exportTime','postorId'))->where($map)->select();
		$res=array(response=>"用户昵称",status=>"1",checkedCount=>count($checkedCount),uncheckedCount=>count($uncheckedCount));
		$this->ajaxReturn(json_encode($res),'JSON');
	}
	/*
	*获取尚未收件列表
	*传入参数:@param int page @param string token
	*返回值@return array orders
	*/
	public function getUnchecked(){
		$page=I('post.page');
		//处理page为大于0的数字
		$page=(is_numeric($page))&&($page>0)?$page:1;
		$map['usrId'] = getTokenKey($this->token);
		$map['haveSAR'] = "0";
		$orders = M('orders');
		$orderlist=$orders->field(array('orderId','orderInfo','positionId','importTime','postorId'))->where($map)->select();
		//计算长度
		$length = count($orderlist);
		//计算页数,10为一页
		$maxPage = ceil( $length  / 10 );
		//若page大于最大页数则取最大页数
		$page= $page > $maxPage? $maxPage:$page;
		//返回orderRetuen
		for($i=10*($page-1);$i<(($page==$maxPage)?$length-10*($page-1):10*($page));$i++){
			$orderReturn[]=$orderlist[$i];
		}
		$res=array(response=>"用户昵称",status=>"1",orders=>$orderReturn,page=>$page,maxPage=>$maxPage);
		$this->ajaxReturn(json_encode($res),'JSON');
	}
	/*
	*获取已经收件列表
	*传入参数:@param int page @param string token
	*返回值@return array orders
	*/
	public function getChecked(){
		$page=I('post.page');
		//处理page为大于0的数字
		$page=(is_numeric($page))&&($page>0)?$page:1;
		$map['usrId'] = getTokenKey($this->token);
		$map['haveSAR'] = "1";
		$orders = M('orders');
		$orderlist=$orders->field(array('orderId','orderInfo','exportTime','postorId'))->where($map)->select();
		//计算长度
		$length = count($orderlist);
		//计算页数,10为一页
		$maxPage = ceil( $length  / 10 );
		//若page大于最大页数则取最大页数
		$page= $page > $maxPage? $maxPage:$page;
		//返回orderRetuen
		for($i=10*($page-1);$i<(($page==$maxPage)?$length-10*($page-1):10*($page));$i++){
			$orderReturn[]=$orderlist[$i];
		}
		$res=array(response=>"用户昵称",status=>"1",orders=>$orderReturn,page=>$page,maxPage=>$maxPage);
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
	public function error(){
		$this->show("非法的访问","utf-8","text/html");
	}

}