/**
 * Created by qingyun2 on 16/11/1.
 */
var app = angular.module('wyApp', [
    'ngRoute',
    'ngAnimate'
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
    });
    $scope.component = {
        header: 'header/header.html'
    };
    $scope.barList = [
        // {name : '头条'},
        {name: '精选', url: 'T1467284926140'},
        // {name: '娱乐', url: ''},
        // {name: '娱乐'},
        {name: '体育', url: 'T1348649079062'},
        // {name: '网易号'},
        // {name: '视屏'},
        // {name: '财经'},
        // {name: '科技'},
        // {name: '汽车'},
        {name: '时尚', url: 'T1348650593803'},
        // {name: '图片'},
        // {name: '直播'},
        // {name: '热点'},
        // {name: '跟贴'},
        // {name: '房产'},
        // {name: '股票'},
        {name: '轻松一刻', url: 'T1350383429665'},
        // {name: '段子'},
        // {name: '军事'},
        {name: '历史', url: 'T1368497029546'},
        {name: '家居', url: 'T1348654105308'},
        {name: '独家', url: 'T1370583240249'},
        // {name: '游戏'},
        // {name: '健康'},
        {name: '政务', url: 'T1414142214384'},
        {name: '漫画', url: 'T1444270454635'},
        {name: '达达趣闻', url: 'T1444289532601'},
        {name: '彩票', url: 'T1356600029035'}
        // {name: '美女'},
    ]
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
        if ($(document).scrollTop() > $(window).height() * 0.075) {
            $('[data-id = header]').addClass('h-half');
            $('[data-id = headerTop]').addClass('h-0');
        } else {
            $('[data-id = header]').removeClass('h-half');
            $('[data-id = headerTop]').removeClass('h-0');
        }
    }


});
