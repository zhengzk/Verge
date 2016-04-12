/**
 * exports
 * Copyright 2016 1VERGE Inc, index.js
 * MIT Licensed
 * @since 2016/4/7.
 * @modify 2016/4/8.
 * @author zhengzk
 **/

//var vQ = require('vQ');
if('function' !== typeof vQ || !vQ.fn || !vQ.extend){
    throw new TypeError('The Verge need The vQ : npm install vQ --save');
}

// HTML5 Element Shim for IE8
if (typeof HTMLVideoElement === 'undefined') {
    document.createElement('video');
    document.createElement('audio');
    document.createElement('track');
}

var verge = require('./verge.js');
require('./verge-extend.js');

var _verge = window['@NAME'];

verge.extend({
    utils:require('./utils.js'),
    browser:require('./base/browser.js'),
    playerApi:require('./api/player-api.js'),
    fullscreenApi:require('./api/fullscreen-api'),
    log:require('./log.js'),
    ObjectCreate:require('./base/object-create.js'),
    CoreObject:require('./base/core-object.js'),
    Event:require('./base/event.js'),
    EventManager:require('./base/event-manger.js'),
    VideoPlayer:require('./video-player.js'),
    /**
     * 释放并返回vQ 解决命名冲突
     * @param flag
     * @returns {Function}
     */
    noConflict: function () {
        if (window['@NAME'] == verge) {
            window['@NAME'] = _verge;
        }
        return verge;
    }
});

module.exports = verge;