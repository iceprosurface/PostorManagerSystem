<?php
namespace Api\Model;
use Think\Model\RelationModel;
class OrdersModel extends RelationModel{
    protected $_link=array(
        'positions'=>array(
            'mapping_type'=>self::BELONGS_TO,
            'class_name'=>'positions',
            'mapping_name'=>'positions',
            'foreign_key'=>'positionId',
            'mapping_fields'=>array('haveProduct'),
        ),
    );
}
?>
