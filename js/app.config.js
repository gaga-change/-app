/**
 * Created by qingyun2 on 16/11/4.
 */
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    var index = {
        name: 'index',
        url: "/index",
        // cache: false,
        views: {
            content: {
                templateUrl: 'com/content.html',
                controller: 'WyCtrl'
            }
        }
    };
    var xinwen = {
        name: 'index.xinwen',
        url: '/xinwen',
        views: {
            contentSon: {
                templateUrl: 'com/xinwen.html',
                controller: 'XinwenCtrl'
            }
        },
        params: {footerBar: 'xinwen'}
    };
    var newsList = {
        name: 'index.xinwen.list',
        url: '/:xinwenList',
        views: {
            newsList: {
                templateUrl: 'com/xinwen-list.html',
                controller: 'XinwenListCtrl'
            }
        },
        params: {test: 1, id: 2}
    };
    var xinwenDetail = {
        name: 'index.xinwen.list.detail',
        url: '/:docid',
        views: {
            xinwenDetail: {
                templateUrl: 'com/xinwen-detail.html',
                controller: 'XinwenDetailCtrl'
            }
        },
        params: {test: 1, id: 2}
    };
    var zhibo = {
        name: 'index.zhibo',
        url: '/zhibo',
        views: {
            contentSon: {
                templateUrl: 'com/zhibo.html',
                controller: 'ZhiboCtrl'
            }
        },
        params: {footerBar: 'zhibo'}
    };
    var zhiboList = {
        name: 'index.zhibo.list',
        url: '/:zhiboList',
        views: {
            zhiboList: {
                templateUrl: 'com/zhibo-list.html',
                controller:"ZhiboListCtrl"
            }
        }
    };
    var huati = {
        name: 'index.huati',
        url: '/huati',
        views: {
            contentSon: {
                templateUrl: 'com/huati.html',
                controller: 'HuatiCtrl'
            }
        },
        params: {footerBar: 'huati'}
    };
    var huatiList = {
        name: 'index.huati.list',
        url: '/:huatiList',
        views: {
            huatiList: {
                templateUrl: 'com/huati-list.html',
                controller:"HuatiListCtrl"
            }
        }
    };
    var wo = {
        name: 'index.wo',
        url: '/wo',
        views: {
            contentSon: {
                templateUrl: 'com/wo.html',
                controller: 'WoCtrl'
            }
        },
        params: {footerBar: 'wo'}
    };


    $stateProvider.state(index);
    $stateProvider.state(xinwen);
    $stateProvider.state(zhibo);
    $stateProvider.state(huati);
    $stateProvider.state(wo);
    $stateProvider.state(newsList);
    $stateProvider.state(xinwenDetail);
    $stateProvider.state(zhiboList);
    $stateProvider.state(huatiList);
    $urlRouterProvider.otherwise('index/xinwen/jinxuan');
}])
    .run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.lastNewsList = 'jinxuan';
        $rootScope.lastZhiboList = 'remen';
        $rootScope.lastHuatiList = 'wenba';
        $rootScope.$on('$stateChangeStart', function (evt, next, current) {
            /**
             * 如果回滚懂新闻,或者其它也好
             *  如果滚到指定的子view
             * 如果是新闻
             *   带着子
             *      则会记录新闻的子
             *   没带子,说明是从大菜单中回来的
             *      则跳转到上一次的子
             */
            // console.log('next', evt, next, current, $state);
            //每次都记录子项
            if (current['xinwenList']) {
                $rootScope.lastNewsList = current['xinwenList'];
            }
            if (current['zhiboList']) {
                $rootScope.lastZhiboList = current['zhiboList'];
            }
            if (current['huatiList']) {
                $rootScope.lastHuatiList = current['huatiList'];
            }
        });

        // 过渡完成时触发这个事件
        $rootScope.$on('$stateChangeSuccess', function (evt, msg) {
            //如果大项没有带子类别,则跳转到上一次或默认的子类
            if (msg['url'] == '/xinwen') {
                $state.go('index.xinwen.list', {xinwenList: $rootScope.lastNewsList})
            }
            if(msg['url'] == '/zhibo'){
                $state.go('index.zhibo.list', {zhiboList: $rootScope.lastZhiboList})
            }
            if(msg['url'] == '/huati'){
                $state.go('index.huati.list', {huatiList: $rootScope.lastHuatiList})
            }
        });
        // 状态过渡过程中发生错误时触发, 通常是模板不能被解析或者解析promise失败时触发
        $rootScope.$on('$stateChangeError', function (evt, msg) {
        });
        // 视图开始加载时
        $rootScope.$on('$viewContentLoading', function (evt, msg) {
        });

    }]);