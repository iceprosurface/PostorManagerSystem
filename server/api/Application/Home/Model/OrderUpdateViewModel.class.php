<?php 
namespace Home\Model;
use Think\Model\ViewModel;

class OrderUpdateViewModel extends ViewModel {
 public $viewFields = array(
        'orders'=>array('orderId','orderInfo','usrPhoneNumber','usrId','usrName','positionId','postorId','importTime','exportTime','haveNoticed','haveSAR'),
        'positions'=>array('haveProduct','_on'=>'orders.positionId=positions.positionId'),
        'postor'=>array('name','_on'=>'orders.postorId=postor.postorId'),
        'usr'=>array('name','id','_on'=>'usr.PhoneNumber=orders.usrPhoneNumber'),
		
    );
}
?>