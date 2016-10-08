<?php
namespace Home\Controller;
use Think\Controller;
// class GetController extends BaseController {
class GetController extends Controller {
	/*
	*此控制器用于ajax获取各种类型的数据
	*不包含验证信息在内的相关数据
	*函数名遵循getXXX
	*/
	public function _initialize(){
		if(C('IS_AJAX')&& !IS_AJAX ){
			$this->redirect("public/illegalRequirement");
		}
		$token=getClientLToken();
		if(!isTokenL($token)){
			$this->redirect("login/login");
		}
		$this->token=$token;
		$this->id=cookie(C('COOKIE_KEY_TOKEN'))['id'];
	}
	
	/*
	*获取用户名称
	*传入参数:@param token（令牌）
	*返回值@return response（错误信息提示），status（错误判断编码），name（用户名称）
	*说明:0:数据创建失败，1:用户名称返回成功，2:用户名称返回失败
	*/
	public function getUsrName(){
		$map['Id'] = $this->id;
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
		$map['usrId'] = $this->id;
		$map['haveSAR'] = "0";
		$orders = M('orders');
		$uncheckedCount=$orders->where($map)->select();
		$map['haveSAR'] = "1";
		$checkedCount=$orders->field(array('orderId'))->where($map)->select();
		$res=array(response=>"用户昵称",status=>"1",checkedCount=>count($checkedCount),uncheckedCount=>count($uncheckedCount));
		$this->ajaxReturn(json_encode($res),'JSON');
	}
	/*
	*获取尚未收件列表
	*传入参数:@param int page @param string token
	*返回值@return array orders
	*/
	public function getUnchecked(){
		//传入page
		$page=I('post.page');
		//设定分页数目
		$pagination=6;
		//设定查询内容
		$map['usrId'] = $this->id;
		$map['haveSAR'] = "0";
		//设定表
		$table='orders';
		//设定返回字段
		$field=array('orderId','orderInfo','positionId','importTime','postorId');
		$type=array();
		$orderlist=getDataByKeyWords($type,$map,$table,$pagination,$field,$page);
		$res=array(response=>"用户昵称",status=>"1",orders=>$orderlist["list"],page=>$page,maxPage=>$orderlist["max"]);
		$this->ajaxReturn(json_encode($res),'JSON');
	}
	/*
	*获取已经收件列表
	*传入参数:@param int page @param string token
	*返回值@return array orders
	*/
	public function getChecked(){
		//传入page
		$page=I('post.page');
		//设定分页数目
		$pagination=6;
		//设定查询内容
		$map['usrId'] = $this->id;
		$map['haveSAR'] = "1";
		//设定表
		$table='orders';
		//设定返回字段
		$field=array('orderId','orderInfo','positionId','exportTime','postorId');
		$type=array();
		$orderlist=getDataByKeyWords($type,$map,$table,$pagination,$field,$page);
		$res=array(response=>"用户昵称",status=>"1",orders=>$orderlist["list"],page=>$page,maxPage=>$orderlist["max"]);
		$this->ajaxReturn(json_encode($res),'JSON');
	}
	/*
	*获取已经收件列表
	*传入参数:@param int page @param string token
	*返回值@return array orders
	*/
	public function getAllTables(){
		//传入page
		$page=I('post.page');
		//设定分页数目
		$pagination=6;
		//设定查询内容
		$map['usrId'] = $this->id;
		//设定表
		$table='orders';
		//设定返回字段
		$field=array('orderId','orderInfo','positionId','importTime','exportTime','postorId');
		$type=array();
		$orderlist=getDataByKeyWords($type,$map,$table,$pagination,$field,$page);
		$res=array(response=>"用户昵称",status=>"1",orders=>$orderlist["list"],page=>$page,maxPage=>$orderlist["max"]);
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