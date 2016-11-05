/**
 * Created by qingyun2 on 16/11/4.
 */
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('index', {
            url: "/index",
            views: {
                content: {
                    templateUrl: 'com/content.html',
                    controller: 'ContentCtrl'
                }
            }
        }
    ).state('index.xinwen', {
        url: "/xinwen",
        views: {
            contentSon: {
                templateUrl: 'com/xinwen.html'
            }
        }
    }).state('index.xinwen.list', {
        url: "/list/:id",
        views: {
            xinwenView: {
                templateUrl: 'com/xinwen-detail.html',
                controller: 'NewsListCtrl'
            }
        },
        params: {test: 'dsa'}
    })
        .state('index.wo', {
            url: "/wo",
            views: {
                contentSon: {
                    templateUrl: 'com/wo.html'
                }
            }
        }).state('index.huati', {
        url: "/huati",
        views: {
            contentSon: {
                templateUrl: 'com/huati.html'
            }
        }
    }).state('index.zhibo', {
        url: "/zhibo",
        views: {
            contentSon: {
                templateUrl: 'com/zhibo.html'
            }
        }
    })
    //如果刚进来则默认进入 新闻 -> 精选
    // $urlRouterProvider.when('/index.xinwen', 'index/xinwen/list/jinxuan');
    // $urlRouterProvider.when('index/xinwen', 'index/xinwen/list/jinxuan');
    // $urlRouterProvider.when('index.xinwen.list', 'index/xinwen/list/jinxuan');
    $urlRouterProvider.otherwise('index/xinwen/list/jinxuan');
    // $urlRouterProvider.otherwise(function ($injector, $location) {
    //     console.log($location);
    //     $location.path('/index/xinwen/list/jinxuan');
    //
    // });
}])
    .run(['$rootScope', function ($rootScope) {

        // 从一个状态过渡到另一个状态时触发这个事件
        $rootScope.$on('$stateChangeStart', function (evt, next, current) {

            // console.log('开始过渡');
            // console.log(evt, next, current);

        });

        // 过渡完成时触发这个事件
        $rootScope.$on('$stateChangeSuccess', function (evt, msg) {
            // console.log('过渡完成');
        });

        // 状态过渡过程中发生错误时触发, 通常是模板不能被解析或者解析promise失败时触发
        $rootScope.$on('$stateChangeError', function (evt, msg) {
            // console.log('过渡发生错误');

        });

        // 视图开始加载时
        // $rootScope.$on('$viewContentLoading', function (evt, msg) {
        //     console.log("视图加载");
        //     console.log(evt);
        // });

    }]);