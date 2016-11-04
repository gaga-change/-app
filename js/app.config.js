/**
 * Created by qingyun2 on 16/11/4.
 */
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('index', {
            url: "/index",
            views: {
                content: {
                    templateUrl:'com/content.html',
                    controller: 'ContentCtrl'
                }
            }
        }
    ).state('index.xinwen', {
        url: "/xinwen",
        views:{
            contentSon:{
                templateUrl: 'com/xinwen.html'
            }
        }
    }).state('index.wo', {
        url: "/wo",
        views:{
            contentSon:{
                templateUrl: 'com/wo.html'
            }
        }
    }).state('index.huati', {
        url: "/huati",
        views:{
            contentSon:{
                templateUrl: 'com/huati.html'
            }
        }
    }).state('index.zhibo', {
        url: "/zhibo",
        views:{
            contentSon:{
                templateUrl: 'com/zhibo.html'
            }
        }
    })
    $urlRouterProvider.otherwise('index/xinwen');
}]);