appModule = angular.module('appModule', ['ngRoute']);
// 路由
appModule.config(function($routeProvider){
	$routeProvider.
		when("/index",{
			controller:'IndexController',
			templateUrl:'/admin/public/index'
		}).when("/containerStatus",{
			controller:'containerStatusController',
			templateUrl:'/admin/public/containerStatus'
		}).when("/unnoticed",{
			controller:'unnoticedController',
			templateUrl:'/admin/public/unnoticed'
		}).when("/backOrder",{
			controller:'backOrderController',
			templateUrl:'/admin/public/backOrder'
		}).when("/usrStatus",{
			controller:'usrStatusController',
			templateUrl:'/admin/public/usrStatus'
		}).when("/usrOrder",{
			controller:'usrOrderController',
			templateUrl:'/admin/public/usrOrder'
		}).when("/orderConf",{
			controller:'orderConfController',
			templateUrl:'/admin/public/orderConf'
		});
		
});
var IndexController = appModule.controller('IndexController',
	function($scope){
		
	}
);