/**
 * Created by qingyun2 on 16/11/4.
 */
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('index', {
            url: "/index",
            views: {
                content: {
                    templateUrl:'com/content.html'
                }
            }
        }
    )
    $urlRouterProvider.otherwise('index');
}])