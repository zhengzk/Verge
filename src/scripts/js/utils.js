/**
 * 基础公共方法
 * Copyright 2015-2016 1VERGE Inc, verge.js
 * MIT Licensed
 * @since 2015/9/12.
 * @modify 2016/4/8.
 * @author zhengzk
 **/
var guid_prefix = new Date().getTime().toString(16).substring(4,10),
    guid_inx = 0;

/**
 *  补0 pad(1,2) ——> "01"
 * @param num
 * @param n
 * @returns {Array.<T>}
 */
function pad(num, n) {
    return (Array(n).join(0) + num).slice(-n)
}

var utils = {
    /**
     * 是否是DOM元素
     * @param ele
     * @returns {*|boolean}
     */
    isDOMElement: function(ele) {
        return ele && ele.nodeType === 1;
    },
    /**
     * 是否是Video元素
     * @param ele
     * @returns {*|boolean}
     */
    isVideoElement:function(ele){
      return utils.isDOMElement(ele) && ele.nodeName.toLowerCase() == 'video';
    },
    /**
     * 随机索引
     * @returns {string}
     */
    guid:function(){
        return guid_prefix + "_" + guid_inx ++;
    },
    /**
     * 72 —> [01,12]
     * @param time
     * @returns {Array}
     */
    long2array: function (time) {
        var rs = [], t;
        var arr = [60, 1];
        if (time >= 3600) {
            arr = [3600, 60, 1];
        }
        arr.forEach(function (p) {
            rs.push(pad(t = (time / p) | 0, 2));
            time -= t * p
        });
        return rs;
    },
    /**
     * 格式化时间 72 —> 00:01:12
     * @param long
     * @returns {string}
     */
    long2time: function (long) {
        var rs = utils.long2array(long);
        return rs.join(':');
    },
    /**
     * long2text 72 —> 1分12秒
     * @param long
     * @returns {string}
     */
    long2text: function (long) {
        var ret = [];
        var arr = utils.long2array(long);
        var inx = 2;
        for (var i = arr.length - 1; i >= 0; i--) {
            var num = parseInt(arr[i]);
            ret.unshift(num + uint[unitIndex[inx]]);
            inx--;
        }
        return ret.join('');
    },
    /**
     * 将00:01:22的时间转换成 82
     * @param str
     * @returns {number}
     */
    time2long: function (str) {
        var arr = str.split(':');
        var r = 0;
        var len = arr.length;
        for (var k = len - 1; k >= 0; k--) {
            var t = parseInt(arr[k]);
            if (!isNaN(t)) {
                var w = len - k - 1;
                for (var i = 0; i < w; i++) {
                    t *= 60;
                }
                r += t;
            }
        }
        return r;
    }
};

/***
 * 拓展
 * @type {extend}
 */
utils.extend = function() {
    vQ.extend.apply(this, arguments);
};

module.exports = utils;

