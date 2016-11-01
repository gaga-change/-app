/**
 * Created by qingyun2 on 16/11/1.
 */
var app = angular.module('wyApp', [
    'ngRoute',
    'ngAnimate',
    'wyApp.header'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

}]).controller('wyCtrl', ['$scope', function ($scope) {
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

$(document).ready(function () {
    hideHeadTop();
    $(window).scroll(hideHeadTop);
    /**
     * 自动隐藏头部图标
     */
    function hideHeadTop() {
        /**
         * 判断当前document.scrollTop
         */
        console.log($(document).scrollTop());
        if($(document).scrollTop() > $(window).height()*0.075){
            $('[data-id = header]').addClass('h-half');
            $('[data-id = headerTop]').addClass('h-0');
        }else {
            $('[data-id = header]').removeClass('h-half');
            $('[data-id = headerTop]').removeClass('h-0');
        }
    }

});
