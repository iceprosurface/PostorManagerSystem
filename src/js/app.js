(function(angular) {
    // the rest of your file goes here...
    var appModule = angular.module('appModule', ['ngRoute'], ['$httpProvider', function($httpProvider) {
        // 官方提供的类似于$.ajax形式的提交
        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query = '',
                name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';

                    }
                } else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    }]);
    //拉取工厂，用于从服务端拉取信息
    appModule.factory('ipcService', ['$http', '$q', function($http, $q) {

        return {
            positions: function(page) {
                page = isNaN(parseInt(page)) ? 1 : parseInt(page);
                return $http.post('/api/admin/query', {
                    "field": ["positionId", "haveProduct"],
                    "from": "positions",
                    "pagination": 40,
                    "page": page
                });
            },
            positionPages: function() {
                return $http.post('/api/admin/maxPages', {
                    "pagination": 40
                });
            },
            unnoticedOrders: function(page) {
                return $http.post('/api/admin/query', {
                    "where": [{
                        "key": "haveNoticed",
                        "value": 0
                    }],
                    "field": ["orderId", "usrPhoneNumber"],
                    "from": "orders",
                    "pagination": 20,
                    "page": page
                });
            },
            order: function(orderid) {
				return $http.post('/api/admin/query', {
                    "where": [{ "key": "orderId",
                        "value": orderid
                    }],
                    "field": ["orderId", "usrPhoneNumber", "orderInfo", "usrId", "positionId", "importTime", "exportTime"],
                    "from": "orders"
                });
            },
            usr: function(name) {
                return $http.post('/api/admin/query', {
                    "where": [{
                        "key": "name",
                        "value": name
                    }],
                    "field": ["id", "usrPhoneNumber", "psw", "lastIp", "name", "lastLogin"],
                    "from": "usr"
                });
            },
            adminName: function() {
                return $http.post('/api/admin/getRootName', {});
            }
        };
    }]);

    // 路由
    appModule.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
        when("/", {
            controller: 'IndexController',
            templateUrl: '/tpl/admin/index.html'
        }).when("/index", {
            controller: 'IndexController',
            templateUrl: '/tpl/admin/index.html'
        }).when("/containerStatus", {
            controller: 'containerStatusController',
            templateUrl: '/tpl/admin/containerStatus.html'
        }).when("/unnoticed", {
            controller: 'unnoticedController',
            templateUrl: '/tpl/admin/unnoticed.html'
        }).when("/backOrder", {
            controller: 'backOrderController',
            templateUrl: '/tpl/admin/backOrder.html'
        }).when("/usrStatus", {
            controller: 'usrStatusController',
            templateUrl: '/tpl/admin/usrStatus.html'
        }).when("/usrOrder", {
            controller: 'usrOrderController',
            templateUrl: '/tpl/admin/usrOrder.html'
        }).when("/orderConf", {
            controller: 'orderConfController',
            templateUrl: '/tpl/admin/orderConf.html'
        });

    }]);
    //库存系统控制器
    var containerStatusController = appModule.controller('containerStatusController', ['$scope', 'ipcService', function($scope, ipcService) {
        //库存箱子编号
        $scope.nowPage = "1";
        var loadPositions = function() {
            ipcService.positions($scope.nowPage).then(function(data) {
				$scope.positions = JSON.parse(data.data)['list'];
            });
            ipcService.positionPages($scope.nowPage).then(function(data) {
				$scope.pages = JSON.parse(data);
            });
        };
        //监视库存编号，如果有改变，则更新
        $scope.$watch('nowPage', loadPositions);
    }]);
    //msgController
    var msgController = appModule.controller('msgController', ['$scope', 'ipcService', function($scope, ipcService) {
        $scope.username = "root";
        ipcService.adminName().then(function(data) {
			$scope.username = JSON.parse(data.data);
        });
    }]);
    //未发送信息列表控制器
    var unnoticedController = appModule.controller('unnoticedController', ['$scope', 'ipcService', function($scope, ipcService) {
        $scope.datahave = false;
        //页码
        $scope.nowPage = "1";
        var load = function() {
            ipcService.unnoticedOrders($scope.nowPage).then(function(data) {
                $scope.unnoticedOrders = JSON.parse(data.data)['list'];
                $scope.datahave = parseInt(data.length) > 0;
            });
        };
        //监视页码，如果有改变，则更新
        $scope.$watch('nowPage', load);
    }]);
    var backOrderController = appModule.controller('backOrderController', ['$scope', function($scope) {

    }]);
    //用户信息控制器
    var usrStatusController = appModule.controller('usrStatusController', ['$scope', 'ipcService', function($scope, ipcService) {
        $scope.datahave = false;
        var load = function() {
            ipcService.usr($scope.usrid).then(function(data) {
                $scope.usr = JSON.parse(data.data)['list'];
                $scope.datahave = parseInt(data.length) > 0;
            });
        };
        $scope.$watch('usrid', load);

    }]);
    //用户订单修改控制器
    var usrOrderController = appModule.controller('usrOrderController', ['$scope', 'ipcService', '$http', function($scope, ipcService, $http) {
        //订单号
        $scope.orderid = "";
        //表单显示情况
        $scope.datahave = false;
        var load = function() {
            ipcService.order($scope.nowPage).then(function(data) {
                $scope.order = JSON.parse(data.data)['list'];
            });
        };
        // 监视订单号，如果满足12位数字则查询（减小压力）
        $scope.$watch('orderid', function(newVal) {
            var regex = /\b\d{12}\b/g; //正则表达式，可修改为需要的内容
            if (newVal.toString().match(regex) !== null) {
                load();
            }
        });
    }]);
    var orderConfController = appModule.controller('orderConfController', ['$scope', 'ipcService', '$http', function($scope, ipcService, $http) {
        // $scope.datahave = false;
        $scope.datahave = true;
        $scope.order = {
            "orderid": 115,
            "usrphonenumber": 11234511351,
            "orderinfo": "this is some infomation",
            "usrid": 1234521852,
            "positionid": 1123445,
            "importtime": "2016-17-6 13:14:55",
            "exporttime": "2016-17-6 15:14:55",

        };
        // var load = function() {
        //     ipcService.order($scope.orderid).then(function(data) {
        //         $scope.datahave = parseInt(data.length) > 0;
        //         // $scope.order = data[0];
        //     });
        // };
        //首次进入不需要重载
        load();
        //监视订单号，变化则重载
        // $scope.$watch('orderid', load);
        $scope.edit = function(type) {
            ipcService.order().then(function(data) {

            });
            //编辑完重载数据
            load();
        };
    }]);
    var IndexController = appModule.controller('IndexController', ['$scope', function($scope) {

    }]);
}(angular));
