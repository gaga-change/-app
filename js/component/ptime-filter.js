/**
 * Created by qingyun2 on 16/11/2.
 */
angular.module('wyApp.ptimeFilter', [])
    .filter('ptime', function () {
        return function (text) {
            //2016-11-02 08:59:00
            var re = new RegExp(/(\d+)-(\d+)-(\d+)\s(\d+):(\d+):(\d+)/, 'g');
            // console.log();
            var result = re.exec(text);
            var d = new Date();
            d.setFullYear(result[1], result[2] - 1, result[3]);
            d.setHours(result[4], result[5], result[6], 0);
            var temp = new Date();
            var space = temp - d;
            /**
             * 当大于 24小时
             *  返回几天前
             * 当小于 24小时  大于1小时
             *  返回几小时前
             * 当小于 1小时
             *  返回几分钟前
             */
            space = parseInt(space);
            if (space < 60 * 60 * 1000) {
                return parseInt(space / (60 * 1000)) + '分钟前';
            }
            if (space > 60 * 60 * 1000 && space < 24 * 60 * 60 * 1000) {
                return parseInt(space / (60 * 60 * 1000)) + '小时前';
            }
            if (space > 24 * 60 * 60 * 1000) {
                return parseInt(space / (24 * 60 * 60 * 1000)) + '天前';
            }
            return "??"
        }
    });