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
        }
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
    }
    var zhibo = {
        name: 'index.zhibo',
        url: '/zhibo',
        views: {
            contentSon: {
                templateUrl: 'com/zhibo.html',
                controller: 'ZhiboCtrl'
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
        }
    };


    $stateProvider.state(index);
    $stateProvider.state(xinwen);
    $stateProvider.state(zhibo);
    $stateProvider.state(huati);
    $stateProvider.state(wo);
    $stateProvider.state(newsList);
    $stateProvider.state(xinwenDetail);
    $urlRouterProvider.otherwise('index/xinwen/jinxuan');
}])
    .run(['$rootScope', '$state', function ($rootScope, $state) {
        function addActive (str) {
            var t =$("[data-id = "+str+"]");
            console.log(t);
            t.addClass('active');
            t.siblings().removeClass('active');
        }
        $rootScope.lastNewsList = 'jinxuan';

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
        });

        // 过渡完成时触发这个事件
        $rootScope.$on('$stateChangeSuccess', function (evt, msg) {
            //判断大项是否带子项
            // console.log( 'msg',msg);
            if (msg['url'] == '/xinwen') {
                $state.go('index.xinwen.list', {xinwenList: $rootScope.lastNewsList})
            }
        });
        // 状态过渡过程中发生错误时触发, 通常是模板不能被解析或者解析promise失败时触发
        $rootScope.$on('$stateChangeError', function (evt, msg) {
        });
        // 视图开始加载时
        $rootScope.$on('$viewContentLoading', function (evt, msg) {
        });

    }]);