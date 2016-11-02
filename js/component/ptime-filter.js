/**
 * Created by qingyun2 on 16/11/2.
 */
angular.module('wyApp.ptime-filter.js', [])
.filter('ptimeFilte', function () {
    return function (text) {
        console.log(text);
        return text;
    }
});