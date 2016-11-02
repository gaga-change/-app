/**
 * Created by qingyun2 on 16/11/1.
 */
var app = angular.module('wyApp', [
    'ngRoute',
    'wyApp.ptimeFilter',
    'ngAnimate'
])
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider
            .when('/list/:listId', {
                templateUrl: 'inc/news-list.html',
                controller: 'newListCtrl'
            })
            .otherwise('/list/jinxuan');
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
        });
        $scope.component = {
            header: 'inc/header.html',
            footer: 'inc/footer.html'
        };
        $scope.barList = [
            // {name : '头条'},
            {name: '精选', ename: 'jinxuan', url: 'T1467284926140'},
            // {name: '娱乐', url: ''},
            // {name: '娱乐'},
            {name: '体育', ename: 'tiyu', url: 'T1348649079062'},
            // {name: '网易号'},
            // {name: '视屏'},
            // {name: '财经'},
            // {name: '科技'},
            // {name: '汽车'},
            {name: '时尚', ename: 'shishang', url: 'T1348650593803'},
            // {name: '图片'},
            // {name: '直播'},
            // {name: '热点'},
            // {name: '跟贴'},
            // {name: '房产'},
            // {name: '股票'},
            {name: '轻松一刻', ename: 'qingsongyike', url: 'T1350383429665'},
            // {name: '段子'},
            // {name: '军事'},
            {name: '历史', ename: 'lishi', url: 'T1368497029546'},
            {name: '家居', ename: 'jiaju', url: 'T1348654105308'},
            {name: '独家', ename: 'dujia', url: 'T1370583240249'},
            // {name: '游戏'},
            // {name: '健康'},
            {name: '政务', ename: 'zhengwu', url: 'T1414142214384'},
            {name: '漫画', ename: 'manhua', url: 'T1444270454635'},
            {name: '达达趣闻', ename: 'dadaqvwen', url: 'T1444289532601'},
            {name: '彩票', ename: 'caipiao', url: 'T1356600029035'}
            // {name: '美女'},
        ]
    }])
    .controller('newListCtrl', ['$scope', '$routeParams', '$rootScope', function ($scope, $routeParams, $rootScope) {
        // $scope.param = $routeParams;
        var news = getIndex($scope.barList, {ename: $routeParams.listId});
        var url = "http://c.3g.163.com/nc/article/list/" + news.url + "/0-20.html";
        console.log(url);
        $scope.data = {};
        $.post('http://localhost:8080/tools/jsonp', {url: url}, function (data) {
            // console.log(data.data);
            var d = data.data;
            var list = JSON.parse(data.data)[news.url];
            //
            list.map(function (ele, index) {
                // console.log(ele.imgsrc);
                var re = new RegExp(/^(http:\/\/)(.+)/, 'g')
                var result = re.exec(ele.imgsrc);
                // console.log(result[1]);
                // console.log("http://s.cimg.163.com/pi/" + result[2]);
                if(index == 0){
                    ele.imgsrc = "http://s.cimg.163.com/pi/" + result[2] + '.1080x2147483647.75.auto.webp'
                    return;
                }else if (ele['imgextra']) {
                    ele.imgsrc = "http://s.cimg.163.com/pi/" + result[2] + '.322x2147483647.75.auto.webp'
                    return;
                }else{
                    ele.imgsrc = "http://s.cimg.163.com/pi/" + result[2] + '.270x2147483647.75.auto.webp';
                }

            });
            console.log(list);
            $rootScope[news.ename] = list;
            $scope.$apply(function () {
                $scope.data = list;
            })
        });
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
    }])
    .controller('headerCtrl', ['$scope', function ($scope) {
        /**
         * 设置下拉按钮
         *  点击,下拉菜单全屏
         *      给按钮下点击事件
         *  点击选项自动回收
         *      给全屏div加点击事件
         */
        var isSlide = false;
        $scope.slideDown = function () {
            if(isSlide){
                $('[data-id = slideMenu]').removeClass('bounceInDown');
                $('[data-id = slideMenu]').addClass('bounceOutRight');

            }else{
                $('[data-id = slideMenu]').addClass('bounceInDown');
                $('[data-id = slideMenu]').removeClass('bounceOutRight');
            }
            isSlide = !isSlide;
        };
        $scope.slideUp = function () {
            // $('[data-id = bounceInDown]').addClass('bounceInDown');
        }
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

function getIndex(arr, obj) {
    if (arr.length < 1)return {};
    if (obj.length < 1)return {};
    var re;
    for (var i = 0; i < arr.length; i++) {
        for (var j in obj) {
            if (obj[j] == arr[i][j])return arr[i];
        }
    }
    return {};
}