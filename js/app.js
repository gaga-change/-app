/**
 * Created by qingyun2 on 16/11/1.
 */
var app = angular.module('wyApp', [
    'ngRoute',
    'ngAnimate',
    'wyApp.header'
])
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

    }])
    .controller('wyCtrl', ['$scope', function ($scope) {
        $scope.size = {
            windowH: $(window).height(),
            windowW: $(window).width()
        };
        $(window).resize(function () {
            $scope.$apply(function () {
                $scope.size = {
                    windowH: $(window).height(),
                    windowW: $(window).width()
                };
            })
        })
    }]);
