/**
 * verge
 * Copyright 2016 1VERGE Inc, verge.js
 * MIT Licensed
 * @since 2016/4/7.
 * @modify 2016/4/7.
 * @author zhengzk
 **/
var utils = require('./utils.js'),
    browser = require('./base/browser.js'),
    VideoPlayer = require('./video-player.js');

var verge = function(selector, options) {
    return new verge.fn.init(selector, options);
};

var players = {};

verge.fn = {
    constructor: verge,
    length:0,
    init: function(selector, options) {
        var own = this;
        if (vQ.isFunction(selector)) {
            vQ.ready(selector);
            if(options){
                log.warn('the selector is not String or Dom Element,Options will not be applied.')
            }
        } else {
            var targets = vQ(selector);
            var Player = verge.dispatch(selector,options);
            targets.each(function(i, element) {
                if(element.nodeName){
                    var player;
                    if(element.playerId){
                        player = players[element.playerId];
                        player.options(options);
                    }else{
                        var playerId = utils.guid();
                        element.playerId = playerId;
                        player = new Player(element, options);
                        players[playerId] = player;
                    }
                    own[i] = player;
                    own.length++;
                }
            });
        }
        return this;
    },
    /**
     * 遍历
     * @param fn
     * @returns {vvp.fn}
     */
    each: function(fn) {
        var i = 0,
            length = this.length;
        for (; i < length; i += 1) {
            fn.call(this[i], i, this[i]);
        }
        return this;
    }
};
verge.fn.init.prototype = verge.fn;

verge.extend  = verge.fn.extend = function(){
    vQ.extend.apply(this, arguments);
};

verge.extend({
    version: '@VERSION',
    /*
     * 播放器选择策略
     */
    dispatch: function(selector,options) {
        if (browser.supportHTML5Video) {
            return VideoPlayer;
        } else if (browser.isSupportFlash) { //使用flash播放器
            //return FlashPlayer;
            throw new Error('Please Use Flash Player');
        } else {
            throw new Error('The Device not support');
        }
    }
});

module.exports = verge;