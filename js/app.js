/**
 * Created by qingyun2 on 16/11/1.
 */
var onUpdate = false;  //是否出发新闻的追加
var isUpdate = true; //是否完成数据的更新
var startUpdate = false; //是否启动更新
var cache = {};
var changeUpdateUpInfo; //改变下拉提示
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
    .controller('newListCtrl', ['$scope', '$routeParams', '$rootScope', '$interval', function ($scope, $routeParams, $rootScope, $interval) {
        onUpdate = false;
        isUpdate = true;
        startUpdate = false;

        $scope.data = [];

        //添加监听事件
        var len;
        $interval(function () {
            /**
             * 引擎没有启动
             *  startUpdate == false
             *    如果 item的条数大于6
             *     运行引擎 startUpdate =true
             */
            if(!startUpdate){
                if($('.item').length > 6){
                    scrollListen();
                    startUpdate = true;
                }
                return;
            }
            /**
             *  追加新闻
             *  1. onUpdate == false 没有出现在视口内
             *      不干嘛
             *  2. onUpdate == true  出现在视口内
             *      判断数据是否已经是追加完成,即长度改变  isUpdate
             *      isUpdate == false  没有追加完成
             *          不干嘛
             *      isUpdate == true  追加完成
             *          更新数据
             *          isUpdate =false
             *
             */
            if (onUpdate && isUpdate) {
                getData('down')
                isUpdate = false;
                /**
                 * 获取当前新闻的条数
                 */
                len = $('.item').length;
            }
            /**
             * 判定长度变化
             *  如果 isUpdate == false
             *     如果 条数改变
             *       isUpdate == true;
             *       onUpdate == false;
             */
            if ((!isUpdate) && (len != $('.item').length)) {
                isUpdate = true;
                onUpdate = false;
            }

        }, 10)
        getData('down'); //第一次自己更新
        //更新当前数据  参数 为up上面  down 下面
        function getData(updataMeth) {
            /**
             * 1.得到当前的新闻类别
             * 2.得到当前新闻类别的缓存
             * 3.更新缓存 (下拉更新  和 上划加载)
             * 4.更新当前数据data
             */
            var news = getIndex($scope.barList, {ename: $routeParams.listId});
            cache[news.ename] = cache[news.ename] || [];
            //追加
            if (updataMeth == 'down') {
                /**
                 * 根据条数获取响应的新闻
                 */
                var s = parseInt((cache[news.ename].length) / 10) * 10;
                d(s, 20, function (list) {
                    cache[news.ename] = cache[news.ename].concat(list);
                    $scope.data = cache[news.ename];
                })
            }

            function d(s, n, callBack) {
                var url = "http://c.3g.163.com/nc/article/list/" + news.url + "/" + s + "-" + n + ".html";
                $.post('http://localhost:8080/tools/jsonp', {url: url}, function (data) {
                    var d = data.data;
                    var list = JSON.parse(data.data)[news.url];
                    list.map(function (ele, index) {
                        var re = new RegExp(/^(http:\/\/)(.+)/, 'g')
                        var result = re.exec(ele.imgsrc);
                        if (index == 0) {
                            ele.imgsrc = "http://s.cimg.163.com/pi/" + result[2] + '.1080x2147483647.75.auto.webp'
                            return;
                        } else if (ele['imgextra']) {
                            ele.imgsrc = "http://s.cimg.163.com/pi/" + result[2] + '.322x2147483647.75.auto.webp'
                            return;
                        } else {
                            ele.imgsrc = "http://s.cimg.163.com/pi/" + result[2] + '.270x2147483647.75.auto.webp';
                        }
                    });
                    callBack(list);
                });
            }
        }

        //滚动条
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
        $scope.updateUpInfo = 1;
        changeUpdateUpInfo = function (s) {
            $scope.updateUpInfo = s;
        }


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
            if (isSlide) {
                $('[data-id = slideMenu]').removeClass('bounceInDown');
                $('[data-id = slideMenu]').addClass('bounceOutRight');

            } else {
                $('[data-id = slideMenu]').addClass('bounceInDown');
                $('[data-id = slideMenu]').removeClass('bounceOutRight');
            }
            isSlide = !isSlide;
        };
        $scope.slideUp = function () {
            // $('[data-id = bounceInDown]').addClass('bounceInDown');
        }
    }]);


//滚动监听
var scrollListen = function () {
    hideHeadTop();
    updateDown();

    $('[data-id = wyContainer]').scroll(hideHeadTop);
    $('[data-id = wyContainer]').scroll(updateDown);


    /**
     * 分析
     *  触摸点击后
     *      当前为初始点
     *          正常下拉移动改变样式
     *      当前不是初始点
     *          要等到为初始点
     *   解决
     *      触摸先获取con的scrollTop()的值,和初始触摸点
     *          移动时计算差值  还要减去scrollTop()的值
     *
     *
     * @type {any}
     */
    var con = $('[data-id = wyContainer]');
    var _y = 0;
    var _s = 0
    con.on('touchstart', function (e) {
        $('[data-id = updateUp]').removeClass('goback')
        // console.log("??? touchstart");
        _y = event.targetTouches[0].pageY;
        _s = con.scrollTop();
        con.on('touchmove', touchmove);
        con.on('touchend', touchend)
    });
    /**
     * 触摸移动
     * @param event
     */
    function touchmove(event) {
        var d = event.targetTouches[0].pageY - _y - _s;
        if (d < 1) d = 0;
        if (d > $(window).height() * 0.075) {
            changeUpdateUpInfo(2)
        }else {
            changeUpdateUpInfo(1)
        }

        // console.log(d);
        $('[data-id = updateUp]').css({
            height: d + 'px'
        })
    };
    /**
     * 触摸结束
     */
    function touchend(event) {
        // console.log('???  end')
        $('[data-id = updateUp]').addClass('goback')
        $('[data-id = updateUp]').css({
            height: 0
        })
        changeUpdateUpInfo(1);
        con.off('touchmove', touchmove);
        con.off('touchend', touchend);
    }

    /**
     * 自动隐藏头部图标
     */
    function hideHeadTop() {
        /**
         * 判断当前document.scrollTop
         */
        if ($('[data-id = wyContainer]').scrollTop() > $(window).height() * 0.075) {
            $('[data-id = header]').addClass('h-half');
            $('[data-id = headerTop]').addClass('h-0');
        } else {
            $('[data-id = header]').removeClass('h-half');
            $('[data-id = headerTop]').removeClass('h-0');
        }
    }

    /**
     * 上拉刷新
     */
    function updateDown() {
        //如果正在更新中 则停止监听
        if (onUpdate)return;
        /**
         * 得到刷新动画相对父窗口底部的偏移
         */
        var offsize = $('[data-id = updateDown]').offset().top - $(window).height();
        // console.log(offsize);
        if (offsize < 0) {
            console.log('get data');
            onUpdate = true;
        }
    }
};

/**
 * 根据参数获取具体的 一个 对象
 * @param arr   目标数组
 * @param obj   过滤的条件
 * @returns {*}  得到的一个 数组中的元素
 */
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