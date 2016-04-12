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
    }
};

///***
// * 拓展
// * @type {extend}
// */
//utils.extend = function() {
//    vQ.extend.apply(this, arguments);
//};

module.exports = utils;

