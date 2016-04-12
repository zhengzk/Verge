/*! Verge <0.1.0@2016-04-12T02:42Z> | Copyright (c) 2015-2016 1VERGE, Inc | Released under the MIT license | https://github.com/vergeplayer/Verge/blob/master/LICENSE */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["verge"] = factory();
	else
		root["verge"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

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
	    throw new TypeError('The Verge need The vQ : vergequery')
	}

	// HTML5 Element Shim for IE8
	if (typeof HTMLVideoElement === 'undefined') {
	    document.createElement('video');
	    document.createElement('audio');
	    document.createElement('track');
	}

	var verge = __webpack_require__(1);
	__webpack_require__(12);

	verge.extend({
	    browser:__webpack_require__(3),
	    playerApi:__webpack_require__(9),
	    fullscreenApi:__webpack_require__(10),
	    log:__webpack_require__(11),
	    ObjectCreate:__webpack_require__(6),
	    CoreObject:__webpack_require__(5),
	    Event:__webpack_require__(13),
	    EventManager:__webpack_require__(7),
	    VideoPlayer:__webpack_require__(4)
	});

	module.exports = verge;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * verge
	 * Copyright 2016 1VERGE Inc, verge.js
	 * MIT Licensed
	 * @since 2016/4/7.
	 * @modify 2016/4/7.
	 * @author zhengzk
	 **/
	var utils = __webpack_require__(2),
	    browser = __webpack_require__(3),
	    VideoPlayer = __webpack_require__(4);

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
	    version: '0.1.0',
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
	    },
	    /**
	     * 产生一个新的uid
	     * @returns {*|string}
	     */
	    guid:function(){
	        return utils.guid();
	    }
	});

	module.exports = verge;

/***/ },
/* 2 */
/***/ function(module, exports) {

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



/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * 获取运行环境(浏览器)支持度
	 * Copyright 2015-2016 1VERGE Inc, browser.js
	 * MIT Licensed
	 * @since 2015/9/24.
	 * @modify 2016/4/7.
	 * @author zhengzk
	 **/
	/**
	 * 检查是否支持flash
	 * @returns {{f: number, v: number, e: number}}
	 */
	function flashChecker() {
	  var hasFlash = 0; //是否安装了flash
	  var flashVersion = 0;   //flash版本
	  var exception = 0;
	  try {
	    var ActiveXObject = ActiveXObject || function () {
	        return undefined;
	      };
	    if (document.all) {
	      var swf1 = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
	      if (swf1) {
	        hasFlash = 1;
	        var VSwf = swf1.GetVariable('$version');
	        flashVersion = parseInt(VSwf.split(' ')[1].split(',')[0]);
	      }
	    } else if (navigator.plugins && navigator.plugins.length > 0) {
	      var swf2 = navigator.plugins['Shockwave Flash'];
	      if (swf2) {
	        hasFlash = 1;
	        var words = swf2.description.split(' ');
	        for (var i = 0; i < words.length; ++i) {
	          if (isNaN(parseInt(words[i]))) continue;
	          flashVersion = parseInt(words[i]);
	        }
	      }
	    }
	  } catch (e) {
	    hasFlash = 1;
	    exception = 1;
	  }
	  return {f: hasFlash, v: flashVersion, e: exception};
	}

	var retObj = {};
	var video = document.createElement('video');
	var videoType = {
	  MP4: 'video/mp4',
	  OGG: 'video/ogg',
	  WEBM: 'video/webm'
	};
	var osType = {
	  isWin: 'Win',
	  isMac: 'Mac',
	  isSafari: 'Safari',
	  isChrome: 'Chrome',
	  isFirefox: 'Firefox',
	  isIPAD: 'iPad',
	  isIPAD7: 'iPad; CPU OS 7',
	  isIPHONE: 'iPhone',
	  isIPOD: 'iPod',
	  isLEPAD: 'lepad_hls',
	  isMIUI: 'MI-ONE',
	  isAndroid: 'Android',
	  isAndroid4: 'Android 4.',
	  isAndroid41: 'Android 4.1',
	  isSonyDTV: 'SonyDTV',
	  isBlackBerry: 'BlackBerry',
	  isMQQBrowser: 'MQQBrowser',
	  isMobile: 'Mobile',
	  isSamSung: 'SAMSUNG',
	  isHTC: 'HTC',
	  isLumia: 'Lumia',
	  isVIVO: 'vivo',
	  isWeixin: 'MicroMessenger'
	};
	retObj.supportHTML5Video = false;
	retObj.isIOS = false;
	retObj.os = '';
	if (video.canPlayType) {
	  retObj.supportHTML5Video = true;
	  for (var type in videoType) {
	    if (video.canPlayType(videoType[type])) {
	      retObj['canPlay' + type] = true;
	    } else {
	      retObj['canPlay' + type] = false;
	    }
	  }
	}
	var ua = navigator.userAgent;
	for (var os in osType) {
	  if (ua.indexOf(osType[os]) !== -1) {
	    retObj[os] = true;
	    retObj.os += osType[os] + ' ';
	  } else {
	    retObj[os] = false;
	  }
	  if (ua.indexOf('Android') !== -1) {
	    var ind = ua.indexOf('Android');
	    var andr = ua.substr(ind, 10);
	    if (andr > osType.isAndroid4) {
	      retObj.isAndroid4 = true;
	      retObj.os += andr + ' ';
	    }
	  }
	}

	//IOS设备
	retObj.isMobileIOS = (retObj.isIPAD || retObj.isIPHONE || retObj.isIPOD);
	retObj.isIOS = (retObj.isMobileIOS || retObj.isMac);
	// 下面三个值比较重要
	retObj.isSupportH5M3U8 = (retObj.isMobileIOS || (retObj.isMac && retObj.isSafari && !retObj.isChrome) || retObj.isLEPAD || retObj.isSonyDTV);
	retObj.isSupportH5MP4 = (retObj.isChrome || retObj.isIE10 || retObj.isAndroid41 || retObj.isAndroid4 || retObj.isLumia /*|| retObj.isMIUI*/ ) && retObj.canPlayMP4;
	var fls = flashChecker();
	// retObj.isSupportFlash  = (!retObj.isMobileIOS)||retObj.isChrome ||  fls.f ;
	retObj.isSupportFlash = fls.f && !fls.e;
	if (retObj.isMQQBrowser || retObj.isLumia) {
	  //    retObj.isSupportH5MP4 = false;
	  retObj.isSupportFlash = false;
	}
	//phone 和 pad 的类型判断
	retObj.isPhone = (retObj.isIPHONE || retObj.isIPOD || (retObj.isAndroid && retObj.isMobile));
	retObj.isAndroidPad = (retObj.isAndroid && !retObj.isMobile);
	retObj.isPad = (retObj.isIPAD || retObj.isAndroidPad);
	//添加一个是否是移动设备的判断
	//在多片mp4模式下，移动设备上是不能自动切片的，切片时需要给出提示，让用户点击播放按钮
	retObj.isMobile = (retObj.isIPAD || retObj.isIPHONE || retObj.isIPOD || retObj.isLEPAD ||
	retObj.isMIUI || retObj.isAndroid4 || retObj.isSonyDTV || retObj.isLumia);
	//return retObj;

	//retObj.supportsFullscreen = false;
	//if (typeof video.webkitEnterFullscreen == 'function') {
	//  // Seems to be broken in Chromium/Chrome && Safari in Leopard
	//  if (/Android/.test(ua) || !/Chrome|Mac OS X 10.5/.test(ua)) {
	//    retObj.supportsFullscreen = true;
	//  }
	//}

	//exports retObj;
	module.exports = retObj;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 播放器 基础类(对video进行封装)
	 * Copyright 2015-2016 1VERGE Inc, video-player.js
	 * MIT Licensed
	 * @since 2015/9/10.
	 * @modify 2016/4/12.
	 * @author zhengzk
	 *
	 *  ****************************
	 *  *       VideoPlayer        *
	 *  *    ******************    *
	 *  *    *   HTML5 video  *    *
	 *  *    ******************    *
	 *  *                          *
	 *  ****************************
	 **/

	var CoreObject = __webpack_require__(5);
	var browser = __webpack_require__(3);
	var EventManager = __webpack_require__(7);
	var utils = __webpack_require__(2);
	var slice = [].slice;
	var playerApi = __webpack_require__(9);
	var fsApi = __webpack_require__(10)(document.createElement('video'));
	var log = __webpack_require__(11);

	var VideoPlayer = CoreObject.extend({
	  /**
	   * init构造VideoPlayer对象时会执行该方法
	   * @param video
	   * @param options
	   */
	  init: function (video, options) {
	    var own = this;
	    if (video instanceof vQ) {
	      video = video[0];
	    }
	    if (!utils.isVideoElement(video)) {
	      throw new TypeError('The video not a video element');
	      return;
	    }
	    own.video = video;
	    own.options(own._initOptions(options));
	    own.bindEvents();
	  },
	  /**
	   * 获取options默认值
	   * @param options
	   * @returns {*|Map}
	   * @private
	   */
	  _initOptions: function (options) {
	    options = vQ.merge({
	      isWeixin: browser.isWeixin
	    }, options);

	    //不用merge处理 避免多余属性污染
	    var op = {
	      autoplay: options.autoplay || false, /*将会传递至video*/
	      loop: options.loop || false, /*将会传递至video*/
	      muted: options.muted || false, /*将会传递至video*/
	      preload: options.preload || false, /*将会传递至video*/
	      controls: options.controls || false
	    };
	    return vQ.merge(options, op);
	  },
	  /**
	   *设置or获取options
	   * @param arg
	   * @returns {Function}
	   */
	  options: function (arg) {
	    var own = this;
	    if (arguments.length > 0) {
	      var special = ['isWeixin', 'attr', 'plugins'].join('-') + '-';//特殊字段 单独处理
	      if (vQ.isPlainObject(arg)) {
	        //设置options
	        var op = {};
	        vQ.each(arg, function (key, val) {
	          if (special.indexOf(arg + '-') < 0) {
	            op[key] = val;
	          }
	        });

	        if (arg.isWeixin) {
	          op['webkit-playsinline'] = '';
	        }

	        if (arg.attr) {
	          if (vQ.isPlainObject(arg.attr)) {//这样attr中属性会对之前属性进行覆盖
	            vQ.each(arg.attr, function (key, val) {
	              op[key] = val;
	            });
	          } else {
	            op['attr'] = arg.attr;
	          }
	        }

	        own.attr(op);
	        // Load plugins
	        if (arg.plugins) {
	          //var plugins = options.plugins;
	          vQ.each(arg.plugins, function (name, param) {
	            if (vQ.isFunction(this[name])) {
	              this[name](param);
	            } else {
	              log.error('Unable to find plugin:', name);
	            }
	          }, this);
	        }
	        own.options = vQ.merge(own.options || {}, arg);
	      } else if (typeof arg == 'string') {
	        //单个设值or取值
	        if (arguments.length > 1) {
	          //设置
	          var op = {};
	          op[arg] = arguments[1];
	          own.options(op);
	        }
	        //取值
	        if (special.indexOf(arg + '-') >= 0) {
	          return own.options[arg];
	        }
	        return own.attr(arg);
	      }
	    }
	    return own.options;
	  },
	  /**
	   * 设置or获取当前时间方法
	   * 重新实现：增加跳转后执行callback & 容错处理
	   * @param time
	   * @param callback
	   * @returns {VideoPlayer.currentTime|VideoPlayer.currentTime|*|Number}
	   */
	  currentTime: function (time, callback) {
	    var own = this;
	    if (arguments.length > 0) {
	      var _switchTimer;
	      var clearTimer = function () {
	        if (_switchTimer) {
	          clearTimeout(_switchTimer);
	          _switchTimer = undefined;
	        }
	      };

	      var timefun = function () {
	        own.video.currentTime = time;
	        if (vQ.isFunction(callback)) {
	          callback();
	        }

	        clearTimer();
	        own.video.play();
	      };


	      var seeks = this.video.seekable;
	      //var seekTime = seeks.end(0);
	      if (seeks.length == 1 && time < seeks.end(0)) {//已加载完成
	        //debug.log('seek ct = ' + time + ',end = ' + seeks.end(0));
	        try {
	          timefun();
	        } catch (e) {
	          own.one('onCanPlay', function () {
	            timefun();
	          });
	        }

	      } else {//间隔一定时间后 重新调用当前方法
	        clearTimer();
	        var _seek = arguments.callee;
	        _switchTimer = setTimeout(function () {
	          _seek.apply(own, arguments);
	        }, 100);
	      }
	    }
	    return this.video.currentTime;
	  },
	  /**
	   * 设置视频播源
	   * @param src
	   * @returns {*}
	   */
	  src: function (src) {
	    if (arguments.length > 0) {
	      var prepaused = !this.options.autoplay;
	      if (this.video.src) {
	        prepaused = this.video.paused;
	      }
	      if (!this.video.paused) {
	        this.video.pause();
	      }
	      this.video.src = src;
	      this.video.load();

	      if (!prepaused) {
	        var own = this;
	        this.one('canplay', function () {
	          own.play();
	        });
	        this.play();
	      }
	    }
	    return this.video.src;
	  },
	  /**
	   *全屏入口
	   * @param flag
	   * @returns {boolean}
	   */
	  fullscreen: function (flag) {
	    if (arguments.length > 0 && flag != this.isFullscreen) {
	      var own = this;
	      if (flag) {
	        if (browser.isIPAD) {//PAD 走css全屏
	          own._enterFullWindow();
	          own.trigger('onFullscreenChange', [own.isFullWindow]);
	        } else {
	          this.requestFullscreen();
	        }
	      } else {
	        if (browser.isIPAD) {
	          own._exitFullWindow();
	          own.trigger('onFullscreenChange', [own.isFullWindow]);
	        } else {
	          this.exitFullscreen();
	        }
	      }
	    }
	    return this.isFullscreen;
	  },
	  /**
	   * 进入全屏状态
	   * @returns {VideoPlayer}
	   */
	  requestFullscreen: function () {
	    var own = this;
	    if (fsApi.requestFullscreen) {
	      // we can't take the video.js controls fullscreen but we can go fullscreen
	      // with native controls
	      own._enterFullscreen();
	    } else {
	      own.isFullscreen = true;
	      // fullscreen isn't supported so we'll just stretch the video element to
	      // fill the viewport
	      own._enterFullWindow();
	      own.trigger('onFullscreenChange', [own.isFullscreen]);
	      //this.trigger('fullscreenchange');
	    }

	    return this;
	  },
	  /**
	   * webkit 方式进入全屏
	   * @private
	   */
	  _enterFullscreen: function () {
	    var own = this;
	    var video = this.video;

	    //if ('webkitDisplayingFullscreen' in video) {
	    //  vQ.one(video, 'webkitbeginfullscreen', function () {
	    //    own.isFullscreen = true;
	    //
	    //    vQ.one(video, 'webkitendfullscreen', function () {
	    //      own.isFullscreen = false;
	    //      own.trigger('onFullscreenChange', [own.isFullscreen]);
	    //    });
	    //    own.trigger('onFullscreenChange', [own.isFullscreen]);
	    //  });
	    //}

	    if (video.paused && video.networkState <= video.HAVE_METADATA) {
	      // attempt to prime the video element for programmatic access
	      // this isn't necessary on the desktop but shouldn't hurt
	      video.play();

	      // playing and pausing synchronously during the transition to fullscreen
	      // can get iOS ~6.1 devices into a play/pause loop
	      setTimeout(function () {
	        video.pause();
	        video[fsApi.requestFullscreen]();
	      }, 0);
	    } else {
	      video[fsApi.exitFullscreen]();
	    }
	  },
	  /**
	   * css方式进入全屏
	   * @private
	   */
	  _enterFullWindow: function () { //无ui时css的处理还需优化
	    var own = this;
	    own.isFullWindow = true;

	    // Storing original doc overflow value to return to when fullscreen is off
	    own.docOrigOverflow = document.documentElement.style.overflow;

	    // Add listener for esc key to exit fullscreen
	    vQ.bind(document, 'keydown', own._fullWindowOnEscKey, own);

	    // Hide any scroll bars
	    document.documentElement.style.overflow = 'hidden';

	    // Apply fullscreen styles
	    vQ.addClass(document.body, 'vvp-full-window');

	    own.trigger('onFullWindowChange', [own.isFullWindow]);
	  },
	  _fullWindowOnEscKey: function (event) {
	    if (event.keyCode === 27) {
	      if (this.isFullscreen === true) {
	        this.exitFullscreen();
	      } else {
	        this._exitFullWindow();
	      }
	    }
	  },
	  /**
	   *退出全屏
	   * @returns {VideoPlayer}
	   */
	  exitFullscreen: function () {
	    var own = this;
	    own.isFullscreen = false;

	    if (fsApi.exitFullscreen) {
	      own.video[fsApi.exitFullscreen]();
	    } else {
	      this._exitFullWindow();
	      own.trigger('onFullscreenChange', [own.isFullscreen]);
	    }

	    return this;
	  },
	  /**
	   * css方式退出全屏
	   * @private
	   */
	  _exitFullWindow: function () {
	    this.isFullWindow = false;
	    vQ.unbind(document, 'keydown', this._fullWindowOnEscKey);

	    // Unhide scroll bars.
	    document.documentElement.style.overflow = this.docOrigOverflow;

	    // Remove fullscreen styles
	    vQ.removeClass(document.body, 'vvp-full-window');

	    // Resize the box, controller, and poster to original sizes
	    // this.positionAll();
	    this.trigger('onFullWindowChange', [this.isFullWindow]);
	  },
	  /**
	   * 移除已绑定的各种响应事件
	   * @private
	   */
	  removeEvent: function () {
	    var own = this;
	    //遍历事件类型及函数，开始绑定
	    vQ.each(playerApi.callbacks, function (event, fun) {
	      var _fun = own[fun].eventTarget;
	      vQ.unbind(own.video, event, _fun);
	    });
	  },
	  /**
	   * 绑定视频的各种回掉响应事件
	   * @private
	   */
	  bindEvents: function () {
	    var own = this;
	    //遍历事件类型及函数，开始绑定
	    vQ.each(playerApi.callbacks, function (event, fun) {
	      var _fun = function () {
	        var ret = own[fun].apply(own, arguments);//apply的方式 能确保当前对象是VidePlayer
	        if (ret != false) {
	          own.trigger(fun, arguments); //外部传入回掉事件 不更改当前对象
	        }
	      };
	      vQ.bind(own.video, event, _fun);
	      own[fun].eventTarget = _fun;// eventTarget解除事件绑定时用
	    });
	    //fullwindowchange: 'onFullWindowChange',//css方式全屏发生变化
	    //fullscreenchange: 'onFullscreenChange'//全屏发生变化时
	    if(fsApi.requestFullscreen){
	      vQ.bind(own.video, fsApi.fullscreenchange, function(){
	        own.trigger('onFullscreenChange',[]); //外部传入回掉事件 不更改当前对象
	      });
	      vQ.bind(own.video, fsApi.fullscreenerror, function(){
	        own.trigger('onFullscreenError', []); //外部传入回掉事件 不更改当前对象
	      });
	    }
	  },
	  /**
	   * 获取or设置属性值
	   * @returns attrValue or undefined
	   */
	  attr: function (arg) {
	    var readonlyAttrs = playerApi.attrs.readonly.concat(playerApi.attrs.specialReadonly);
	    var readwriteAttrs = playerApi.attrs.readwrite.concat(playerApi.attrs.specialReadwrite);
	    var own = this;
	    if (vQ.isPlainObject(arg)) {
	      //批量给属性赋值
	      var _arg = {};
	      vQ.each(arg, function (attr, val) {
	        var flag = false;

	        //排除只读属性
	        //该循环是否可用string的 indexof 替代？
	        for (var i = 0, len1 = readonlyAttrs.length; i < len1; i++) {
	          if (attr.toLowerCase() == readonlyAttrs[i].toLowerCase()) {
	            flag = true;
	            break;
	          }
	        }
	        //非只读属性 调用对应属性的方法
	        if (!flag) {
	          for (var j = 0, len2 = readwriteAttrs.length; j < len2; j++) {
	            if (attr.toLowerCase() == readwriteAttrs[j].toLowerCase()) {
	              flag = true;
	              own[readwriteAttrs[j]].apply(own, slice.call(arguments, 1));//apply方式 确保多个参数
	              break;
	            }
	          }
	        }

	        if (!flag) {//自定义的属性
	          _arg[attr] = val;
	        }
	      });
	      vQ.attr(this.video, _arg);
	    } else if (typeof arg == 'string') {
	      //获取属性值 or 给该属性值赋值
	      var attrs = readonlyAttrs.concat(readwriteAttrs);
	      for (var i = 0, len = attrs.length; i < len; i++) {
	        if (arg.toLowerCase() == attrs[i].toLowerCase()) {
	          //不用过滤是否可写 属性方法中已判断
	          return own[attrs[i]].apply(own, slice.call(arguments, 1));//apply方式 确保多个参数
	          //return this[attrs[i]](arguments[1]);
	        }
	      }
	      return vQ.attr.apply(vQ, [this.video].concat(slice.call(arguments)));
	    }
	  },
	  /**
	   * 为player 注册插件
	   * @param name
	   * @param init
	   * @returns {VideoPlayer}
	   */
	  plugin: function (name, init) {
	    this.expand({
	      name: init
	    });
	    return this;
	  }
	});


	//为VideoPlayer 拓展api方法
	VideoPlayer.expand(function () {
	  var extend = {},
	    methods = playerApi.methods,
	    callbacks = playerApi.callbacks,
	    attrs = playerApi.attrs;
	  events = new EventManager();//统一管理回掉 定义成局部 避免player绑定过多对象及变量污染
	  //bind unbind one 事件处理
	  vQ.each(['bind', 'unbind', 'one', 'trigger'], function (inx, fun) {
	    extend[fun] = function () {
	      var own = this;
	      var args = slice.call(arguments);
	      if (vQ.isArray(args[0])) {
	        //var funs = [];
	        vQ.each(args[0], function (inx, _fun) {
	          own[fun].apply(own, [_fun].concat(args.slice(1)));
	        });
	        //args[0] = funs;
	        //events[fun].apply(events, args);
	      } else if ('string' == typeof args[0]) {//参数合法
	        //以on开头
	        args[0] = args[0].toLowerCase();//转小写
	        if (args[0].indexOf('on') == 0) {
	          args[0] = args[0].substring(2);
	        }

	        var ret = events[fun].apply(events, args);
	        if (ret != null) {
	          return ret;
	        }
	      }
	      return own;
	    };
	  });

	  //play load pause video原生方法
	  vQ.each(methods.native.concat(methods.specialNative), function (inx, fun) {
	    extend[fun] = function () {
	      var own = this;
	      own.video[fun].apply(own.video, arguments);
	      return own;
	    };
	  });

	  //duration 等只读属性 转换为方法
	  vQ.each(attrs.readonly.concat(attrs.specialReadonly), function (inx, attr) {
	    extend[attr] = function () {
	      var ret = vQ.attr(this.video, attr);
	      if (vQ.isFunction(ret)) {
	        return ret.apply(this.video, arguments);
	      }
	      return ret;
	    };
	  });

	  //autoplay 等设置&读取属性
	  vQ.each(attrs.readwrite, function (inx, attr) {
	    extend[attr] = function (val) {
	      if (arguments.length > 0) {
	        return vQ.attr(this.video, attr, val);
	      }
	      return vQ.attr(this.video, attr);
	    };
	  });

	  //定义默认回掉函数 onPlay等
	  vQ.each(methods.callbacks.concat(methods.specialNative).concat(attrs.specialReadonly), function (inx, fun) {
	    var _fun = callbacks[fun.toLowerCase()] || fun;
	    extend[_fun] = function () {
	      log(_fun, arguments);
	    };
	  });

	  return extend;
	}());

	module.exports = VideoPlayer;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * CoreObject
	 * 基础类用于对象和类的构建 Object/Clazz
	 * 参考了 Simple JavaScript Inheritance
	 * Copyright 2015-2016 1VERGE Inc, core-object.js
	 * MIT Licensed.
	 * @Clazz
	 * @constructor
	 * @since 2015/9/24.
	 * @modify 2016/4/7.
	 * @author yuanliang,zhengzk
	 */
	var ObjectCreate = __webpack_require__(6);
	/**
	 * 这 initializing 变量意思很直接, 它是boolean来检查Clazz Function(稍后介绍)什么时候被调用.
	 * 在创建实例时设置 initializing 为true/false 或者只是返回一个对象指向当前的原型链上来达到"继承"的目的.
	 * 如果我们创建一个实例(initializing == false), 正好Clazz有一个init方法, 这样 init 会自动执行。
	 * 再或者, 如果我们仅仅将它分配给原型上(initializing == true), 将不会发生什么, init 方法不会被执行。
	 * 这样做是为了避免 每次调用构造方法都要执行 init 方法. （var prototype = new this()）;.
	 */
	var initializing = false;

	/**
	 * 这个fnTest的目的就是为了验证 Clazz method 中是否使用了 "_super()" 调用.
	 * 这种技术叫做 " function decompilation(函数反编译)" 也叫做 "function serialisation(函数序列化)"，
	 * Function serialisation 是在一个函数被转换成字符串时发生的. 现在很多浏览器都支持 toString 方法。
	 * 测试 Function serialisation, fnTest 使用一个匿名函数 funciton(){xyz;} 设置内容为 "xyz", 在转变成字符串后使用正则对 "xyz" 进行查找.
	 * 它将返回true (如果浏览器支持 function serialisation) 因为 函数将转变成字符串所以 "xyz" 也民属于字符串的一部分. 在这个例子中 fnTest 将返回 "/\b_super\b/"，
	 * 另一种则返回 "/ .* /" 如果浏览器不支持 function serialisation 则始终返回 true。(这个指的是原始代码中的fnTest.test)使用 fnTest 正则, 和 函数序列化技术,
	 * 我们能很容易方法中是否使用了 "_super" 如果它们使用, 则执行一些特殊方法. 反之正常.  这个特殊方法是为了避免在 父类与子类中同时出现同一个方法. 父类将会被覆盖.
	 * 浏览器不支持 Function serialisation 将会始终返回 true, 那么会始终对 _super 进行额外的操作,
	 * 导致这些新的方法不能在 _super 中使用. 这会有一些小的性能消耗. 但能保证在所有浏览器中 正常执行.
	 */
	var fnTest = /'xyz'/.test(function () {
	  'xyz';
	}) ? /\b_super\b/ : /.*/;

	/**
	 * 创建一个空的构造方法, 放到全局变量中. 这将会是最上层的构造方法. 它没有定义内容, 或一个原型对象.
	 * 除了下面的 extends、expand 方法. this 指的是window对象. 使 (Clazz) 变量为全局对象.
	 */
	var CoreObject = function () {
	};

	/**
	 * CoreObject.extend
	 * 创建新对象 继承和扩展对象
	 *
	 *     var Animal = CoreObject.extend();
	 *     var Dog = Animal.extend();
	 *
	 * @param {Object} 选择一个对象作为参数
	 * @return {CoreObject} 返回一个继承自CoreObject的对象
	 * @this {*}
	 */

	CoreObject.extend = function (_prop) {

	  /**
	   * 将当前对象的原型对象存储在 _super中. this.prototype是被扩展对象的原型, 它可以访问父级方法在你需要的地方,
	   * 这个变量叫什么 _super , 是因为 super 是保留字. 尽管现在还没有应用起来.
	   */
	  var _super = this.prototype,
	    length = arguments.length;

	  /**
	   *  实例 Clazz 对象存储在 prototype 变量中, 但不执行 init 方法.
	   * 之前设置 initializing 为 true 所以在 new Clazz的时候 不会 fire init 方法.
	   * prototype变量分配后, initializing 被设置回 false, 为了下一步可以正常工作. (e.g 当想要创建一个真正的实例的时候)
	   */
	  initializing = true;
	  var prototype = new this();
	  initializing = false;

	  function factory(name, fn) {
	    return function () {
	      /**
	       * 对 super 的特殊处理, 我们首先要存储 已存在 _super 属性和类的一些参数. 存储在 临时 tmp 里,
	       * 这是为了防止 _super 中已存在的方法被重写完事儿后我们将 tmp 在赋给 this._super 这样它就可以正常工作了.
	       * 下一步, 我们将 _super[name] 方法赋给 当前对象的 this._super，
	       * 这样当 fn 通过 apply 被执行的时候 this._super()就会指向 父类方法, 这个父类方法中的 this 也同样可以访问 当前对象.
	       * 最后我们将返回值存储在 ret 中， 在将 _super 设置回来后返回该对象.
	       */
	      var tmp = this._super;

	      // Add a new ._super() method that is the same method
	      // but on the super-Clazz
	      this._super = _super[name];

	      // The method only need to be bound temporarily, so we
	      // remove it when we're done executing
	      var ret = fn.apply(this, arguments);
	      this._super = tmp;
	      return ret;
	    };
	  }

	  //处理多个参数
	  for (var i = 0; i < length; i ++ ) {
	    var prop = arguments[i];

	    //继承自CoreObject的Clazz
	    if(vQ.isFunction(prop) && vQ.isFunction(prop.extend)){// && prop.extend && prop.extend== CoreObject.extend){
	      prop = prop.prototype;
	    }

	    // Copy the properties over onto the new prototype
	    /**
	     * 使用一个 for 循环, 我们迭代出 prop 里的属性和方法.
	     * 该属性是通过 extend 方法传递进来的, 除了一些对 _super 的特殊处理, 我们将值赋给 prototype 属性.
	     * 当我们遍历 prop 里的每个对象时,
	     * 如果 满足 (typeof prop[name] == 'function')  (typeof _super[name] == 'function') (fnTest.test(prop[name]) == true)
	     * 我们将会加入新的方法来处理 绑定到 父类 新的方法 以及 原始方法.
	     */
	    for (var name in prop) {
	      // Check if we're overwriting an existing function
	      prototype[name] = typeof prop[name] == 'function' &&
	      typeof _super[name] == 'function' && fnTest.test(prop[name]) ?
	        factory(name, prop[name]) :
	        //(function (name, fn) {
	        //    return function () {
	        //        /**
	        //         * 对 super 的特殊处理, 我们首先要存储 已存在 _super 属性和类的一些参数. 存储在 临时 tmp 里,
	        //         * 这是为了防止 _super 中已存在的方法被重写完事儿后我们将 tmp 在赋给 this._super 这样它就可以正常工作了.
	        //         * 下一步, 我们将 _super[name] 方法赋给 当前对象的 this._super，
	        //         * 这样当 fn 通过 apply 被执行的时候 this._super()就会指向 父类方法, 这个父类方法中的 this 也同样可以访问 当前对象.
	        //         * 最后我们将返回值存储在 ret 中， 在将 _super 设置回来后返回该对象.
	        //         */
	        //        var tmp = this._super;
	        //
	        //        // Add a new ._super() method that is the same method
	        //        // but on the super-Clazz
	        //        this._super = _super[name];
	        //
	        //        // The method only need to be bound temporarily, so we
	        //        // remove it when we're done executing
	        //        var ret = fn.apply(this, arguments);
	        //        this._super = tmp;
	        //        return ret;
	        //    };
	        //})(name, prop[name]) :
	        prop[name];
	    }
	  }

	  /**
	   * 这段代码调用 Clazz 创建一个新的构造方法, 这不同于之前创建的 this.Clazz，
	   * 作为本地的 Clazz.extend. 这个构造方法返回 Clazz.extend 的调用(比如之前 Foo.extends).
	   * new Foo() 实例后这个构造方法将被执行.构造方法将会自动执行 init() 方法(如果存在的话) 正好上面说的那样,
	   * 这个 initializing 变量来控制 init 是否被执行.
	   */
	  // The dummy Clazz constructor
	  function Clazz() {
	    // All construction is actually done in the init method
	    if (!initializing && this.init)
	      this.init.apply(this, arguments);
	  }

	  /**
	   * 最后这个 prototype,  从父类的构造方法返回一个混合后的 父类原型对象.
	   * (e.g var prototype = new this()), 这个结果是通过 extend 函数里的for循环.
	   */
	    // Populate our constructed prototype object
	  Clazz.prototype = prototype;

	  /**
	   * 因为我们重写了整个原型对象, 在这个类型中存储这个 原生的构造方法,  让它在一个实例的构造方法中能保持默认形为.
	   */
	    // Enforce the constructor to be what we expect
	  Clazz.prototype.constructor = Clazz;

	  /**
	   * 将赋其自身, 通过  arguments.callee, 在本例中表示 “自身” 其实这里我们可以 避免使用 arguments.callee ,
	   * 如果我们修改一下我的原生方法(e.g Clazz.extend = function extend(prop)) 之后我们就可以通过 使用
	   */
	    // And make this Clazz extendable
	  Clazz.extend = arguments.callee;

	  //确保子类也能使用create方法
	  Clazz.create = CoreObject.create;

	  //确保子类也能使用expand方法
	  Clazz.expand = CoreObject.expand;

	  /**
	   * 实例之后会返回, 一个原型对象, 一个构造属性, 一个 extend 方法 和一个可自执行的 方法 init.!!!
	   */
	  return Clazz;
	};

	/**
	 * CoreObject.create
	 * 创建一个Clazz的对象实例
	 *
	 *     var myAnimal = Animal.create();
	 *
	 * @return {CoreObject} 返回一个继承自CoreObject的子类
	 * @this {*}
	 */
	CoreObject.create = function () {
	  // 创建一个继承自该对象原型的新对象
	  var inst = ObjectCreate(this.prototype);

	  // 将此构造函数用语新对象
	  this.apply(inst, arguments);

	  // 返回一个新对象
	  return inst;
	};
	/***
	 * 对CoreObject进行拓展
	 * @param object
	 */
	CoreObject.expand = function (object) {
	  vQ.extend.apply(this.prototype, arguments);
	};

	module.exports = CoreObject;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * ObjectCreate
	 * Copyright 2015-2016 1VERGE Inc, object-create.js
	 * MIT Licensed
	 * @since 2015/2/19.
	 * @modify 2016/4/7.
	 * @author zhengzk
	 **/

	/**
	 * 创建一个object
	 * @param obj
	 * @returns {F}
	 * @constructor
	 */
	var ObjectCreate = Object.create || function (obj) {
	    //Create a new function called 'F' which is just an empty object.
	    function F() {
	    }

	    //the prototype of the 'F' function should point to the
	    //parameter of the anonymous function.
	    F.prototype = obj;

	    //create a new constructor function based off of the 'F' function.
	    return new F();
	  };

	module.exports = ObjectCreate;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 统一事件管理器(非DOM Event)
	 * Copyright 2015-2016 1VERGE Inc, event-manger.js
	 * MIT Licensed
	 * @since 2015/9/24.
	 * @modify 2016/4/7.
	 * @author zhengzk
	 **/
	var CoreObject = __webpack_require__(5);
	var slice = [].slice;
	var Event = __webpack_require__(8);

	//确保每个绑定的方法只有一个ID
	var guid = + new Date().getTime().toString().substring(5);

	var EventManager = CoreObject.extend({
	  /**
	   * Constructor
	   * @param data
	   * @param target
	   */
	  init: function (data,target) {
	    //this._guid = 0;
	    this._handlers = {};
	    this._contexts = {};
	    this._target = target;
	    var own = this;
	    if (data) {
	      vQ.each(data, function (type, handler) {
	        own.bind(type, handler);
	      });
	    }
	  },
	  /**
	   * Method
	   * 为指定的事件类型绑定执行方法
	   * @param type {String|Array} 事件类型
	   * @param handler {Function} 事件方法
	   * @param context {Context} 上下文环境
	   * @returns {*}
	   */
	  bind: function (type, handler, context) {
	    var own = this;
	    if (vQ.isArray(type)) {
	      return own._handleMultipleEvents.apply(own, [own.bind].concat(slice.call(arguments)));
	    }

	    if (!handler.$$guid) {
	      handler.$$guid = guid++;
	    }

	    if (context) {
	      this._contexts[handler.$$guid] = context;
	    }

	    var handlers = own._handlers[type];
	    if (!handlers) {
	      handlers = own._handlers[type] = {};
	    }
	    // store the event handler in the hash table
	    handlers[handler.$$guid] = handler;
	  },
	  /**
	   * Method
	   *移除已添加的指定事件类型的方法
	   * @param type {String|Array} 事件类型
	   * @param handler {Function} 事件方法
	   * @param context {Context} 上下文环境
	   * @returns {*}
	   */
	  unbind: function (type, handler, context) {
	    var own = this;
	    if (vQ.isArray(type)) {
	      return own._handleMultipleEvents.apply(own, [own.unbind].concat(slice.call(arguments)));
	      //return own._handleMultipleEvents(arguments.callee,type, handler);
	    }
	    var handlers = own._handlers[type];
	    if (handlers) {
	      if (own._contexts[handler.$$guid]) {
	        delete own._contexts[handler.$$guid];//删除该方法的context
	      }
	      delete handlers[handler.$$guid];//删除该方法

	      //判断事件集合是否为空
	      var hasProp = false;
	      for (var prop in handlers) {
	        hasProp = true;
	      }
	      if (!hasProp) {
	        delete own._handlers[type];
	      }
	    }
	  },
	  /**
	   * Method
	   * 绑定只执行一次的事件类型的方法
	   * @param type {String|Array} 事件类型
	   * @param handler {Function} 事件方法
	   * @param context {Context} 上下文环境
	   * @returns {*}
	   */
	  one: function (type, handler, context) {
	    var own = this;
	    var args = slice.call(arguments);
	    if (vQ.isArray(type)) {
	      return own._handleMultipleEvents.apply(own, [own.one].concat(args));
	    }

	    //更换fun 处理解绑
	    //context 已经处理所以不用再传给bind来处理了
	    var func = function () {
	      own.unbind(type, func);
	      handler.apply(context || handler, arguments);//支持不定个数的参数
	    };

	    // copy the guid to the new function so it can removed using the original function's ID
	    func.$$guid = handler.$$guid = handler.$$guid || guid++;
	    own.bind(type, func);
	  },
	  /**
	   * Method
	   * 触发指定事件类型的所有方法
	   * @param type {String || Event} 事件类型
	   * @param args {Array} 参数列表
	   * @param context {Context} 上下文环境
	   * @returns {*}
	   */
	  trigger: function (type, args, context) {
	    var own = this;
	    //if (vQ.isArray(type)) {
	    //  //apply方式 可以动态传参
	    //  return own._handleMultipleEvents.apply(own, [own.trigger].concat(slice.call(arguments)));
	    //  //return own._handleMultipleEvents(arguments.callee,type,args,context);
	    //}
	    if(!type){
	      throw new TypeError('need the \'type\'');
	    }

	    var event;
	    if(type.constructor == Event){
	      event = type;
	      event.currentTarget = own._target;
	    }else if('string'){
	      event = new Event(type,own._target);
	    }else{
	      throw new TypeError('The \'type\' must be a Event Object or String');
	    }

	    //if(event.currentTarget != event.target){
	    //  if(event.fall){//下落
	    //    event.phase = Event.FallING;
	    //  }else if(event.cancelBubble){
	    //    event.phase = Event.BUBBLING
	    //  }
	    //}

	    //触发回掉函数
	    var handlers = own._handlers[event.type];
	    if (handlers) {
	      //1、make sure args is Array
	      //2、push event make the handlers can use event
	      args = [event].concat(args == null ? [] :(vQ.isArray(args) ? args : [args] ));
	      for (var k in handlers) {
	        context = context || own._contexts[handlers[k].$$guid];
	        var ret = handlers[k].apply(context || this, args);
	        if ( ret !== undefined ) {
	          // 如果处理函数返回值是false，则阻止广播事件
	          if ( (event.result = ret) === false ) {
	            event.stopPropagation();
	          }
	        }
	      }
	    }
	    //return event.result;//？ 后续考虑优化
	    return event;
	  },
	  /**
	   * 事件参数类型多个的处理
	   * @param fn {Function} 要执行的事件方法
	   * @param types {Array} 方法名称集合
	   * @params more
	   * @private
	   */
	  _handleMultipleEvents: function (fn, types) {
	    var own = this;
	    var args = slice.call(arguments, 2);//动态截取fn所需参数
	    vQ.each(types, function (inx, type) {
	      fn.apply(own, [type].concat(args));
	    });
	  }
	});

	module.exports = EventManager;

	//var managers = {};
	//
	//function factory(arg){
	//  if('string' == typeof arg || 'number' == typeof arg){
	//    if(managers[arg]){
	//      return managers[arg];
	//    }
	//    managers[arg] = create(arguments[1]);
	//    return managers[arg];
	//  }
	//  return (vQ.isPlainObject(arg) ? new EventManager(arg) :  new EventManager(arg));
	//}

	//exports factory
	//module.exports = factory;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Event
	 * Copyright 2016 1VERGE Inc, event.js
	 * MIT Licensed.
	 * @Clazz
	 * @constructor
	 * @since 2016/3/11.
	 * @modify 2016/4/7.
	 * @author zhengzk
	 */
	var CoreObject = __webpack_require__(5);

	var Event = CoreObject.extend({
	  type:'',//事件类型 String
	  target:null,//引发事件对象
	  currentTarget:null,//当前对象
	  cancelBubble:false,//冒泡
	  fall:false,//向下广播
	  result:null,
	  //phase:Event.TARGET,
	  //returnValue:true,
	  init:function(type,target){
	    if('string' == typeof type){
	      this.type = type;
	    }
	    if(target){
	      this.target = target;
	      this.currentTarget = target;
	    }
	  },
	  /**
	   * 阻止事件派发
	   */
	  stopPropagation:function(){
	    this.cancelBubble = true;
	  }
	});

	//Event.TARGET = 0;//当前事件源
	//Event.BUBBLING = 1;//冒泡阶段
	//Event.FallING	= 2;//下落阶段

	module.exports = Event;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * player可调用方法api
	 * Copyright 2015-2016 1VERGE Inc, player-api.js
	 * MIT Licensed
	 * @since 2015/9/24.
	 * @modify 2016/4/7.
	 * @author zhengzk
	 **/
	var playerApi = {
	    methods: {
	        events: [//事件相关方法
	            'bind', //绑定事件
	            'unbind',//解绑事件
	            'one', //只执行一次的方法
	            'trigger' //触发回掉方法
	        ],
	        native: [//原生video可调用方法
	            //'play',
	            //'pause',
	            'load'
	            //以下方法暂不支持
	            //'addTextTrack'//添加新的文本轨道
	        ],
	        //expand: [//拓展的方法
	        //    'attr',
	        //    'plugin'
	        //],
	        specialNative: [//与回掉函数重名
	            'play',
	            'pause'
	        ],
	        callbacks: [//回掉函数名称
	            'abort',
	            'canPlay',
	            'canPlayThrough',
	            'durationChange',
	            'emptied',
	            //'ended',
	            //'error',
	            'loadedData',
	            'loadedMetaData',
	            'loadStart',
	            //'pause'
	            //'play'
	            'playing',
	            'progress',
	            'rateChange',
	            'readyStateChange',
	            'seeked',
	            //'seeking',
	            'stalled',
	            'suspend',
	            'timeUpdate',
	            'volumeChange',
	            'waiting',
	            'fullScreenChange', //全屏状态发生变化
	            'fullWindowChange' //css方式全屏发生变化
	        ]
	    },
	    attrs: {//属性
	        //ReadOnly Property
	        readonly: [
	            'duration', //视频的长度
	            //'ended', //是否已结束
	            //'error', //视频错误状态 MediaError
	            'currentSrc', //当前视频的 URL
	            'buffered', //已缓冲部分 TimeRanges
	            'played', //已播放部分 TimeRanges
	            'readyState', //视频当前的就绪状态
	            'seekable', //视频可寻址部分 TimeRanges
	            //,'seeking',  //是否正在视频中进行查找
	            'networkState', //网络状态
	            'videoWidth',
	            'videoHeight',
	            'canPlayType'// video方法 特殊处理 能够播放指定的视频类型
	            //以下属性暂不支持
	            //'startDate', //当前时间偏移 Date
	            //'textTracks', //文本轨道 TextTrackList
	            //'videoTracks', //视频轨道 VideoTrackList
	            //'audioTracks', //音频轨道对象 AudioTrackList
	            //'controller', //视频当前媒体控制器 MediaController
	        ],
	        specialReadonly: [//特殊的只读属性 与回掉函数重名
	            'ended',
	            'error',
	            'seeking'
	        ],
	        //ReadWrite Property
	        readwrite: [
	            'autoplay',
	            'height',
	            'width',
	            'loop',
	            //'src',
	            //'currentTime',//当前播放位置
	            'preload',
	            'paused', //视频是否暂停
	            'poster', //缩略图
	            'muted', //是否关闭声音
	            'volume',
	            'controls',
	            //以下属性暂不支持,
	            'playbackRate' //视频播放的速度
	            //,'defaultMuted' ,//默认是否静音
	            //,'defaultPlaybackRate', //默认播放速度
	            //,'crossOrigin', //视频的 CORS 设置
	            //,'mediaGroup', //媒介组合的名称
	        ],
	        specialReadwrite: [
	            'src', //视频播放源
	            'currentTime',//当前播放位置
	            'fullscreen' //全屏
	        ]
	    },
	    /**
	     *  视频元素支持的事件类型
	     *  @private
	     */
	    callbacks: {
	        abort: 'onAbort',//在退出时运行
	        canplay: 'onCanPlay', //当缓冲已足够开始时执行
	        canplaythrough: 'onCanPlayThrough', //可播放至结尾(缓冲到结尾)时执行
	        durationchange: 'onDurationChange', //长度改变时运行
	        emptied: 'onEmptied',//发生故障并且文件突然不可用时运行
	        ended: 'onEnded',//已到达结尾时执行
	        error: 'onError',//文件加载期间发生错误时运行
	        loadeddata: 'onLoadedData',//数据已加载时运行
	        loadedmetadata: 'onLoadedMetaData',//元数据（比如分辨率和时长）被加载时运行
	        loadstart: 'onLoadStart',//开始加载且未实际加载任何数据前运行
	        pause: 'onPause',//被用户或程序暂停时运行
	        play: 'onPlay',//已就绪可以开始播放时运行
	        playing: 'onPlaying',//已开始播放时运行
	        progress: 'onProgress',//浏览器获取数据时运行
	        ratechange: 'onRateChange',//回放速率改变时运行 如快进
	        readystatechange: 'onReadyStateChange',//当就绪状态改变时运行
	        seeked: 'onSeeked',//当 seeking 属性设置为 false（指示定位已结束）时运行
	        seeking: 'onSeeking',//当 seeking 属性设置为 true（指示定位是活动的）时运行
	        stalled: 'onStalled',//不论何种原因未能取回数据时运行
	        suspend: 'onSuspend',//数据完全加载之前不论何种原因终止取回媒介数据时运行
	        timeupdate: 'onTimeUpdate',//播放位置改变时（比如当用户快进到媒介中一个不同的位置时）运行
	        volumechange: 'onVolumeChange',//当音量改变时（包括将音量设置为静音）时运行
	        waiting: 'onWaiting', //当视频由于需要缓冲下一帧而停止
	        //fullwindowchange: 'onFullWindowChange',//css方式全屏发生变化
	        //fullscreenchange: 'onFullscreenChange'//全屏发生变化时
	    //},
	    //webkit:{
	    //    //fullwindowchange: 'onFullWindowChange',//css方式全屏发生变化
	    //    //fullscreenchange: 'onFullscreenChange'//全屏发生变化时
	    }
	};

	module.exports = playerApi;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * 全屏事件api
	 * Copyright 2015 1VERGE Inc, full-screen-api.js
	 * MIT Licensed
	 * @since 2015/9/24.
	 * @modify 2016/4/7.
	 * @author zhengzk
	 * 参照video.js实现:https://github.com/videojs/video.js/blob/master/src/js/fullscreen-api.js
	 **/
	//https://developer.mozilla.org/zh-CN/docs/DOM/Using_fullscreen_mode
	var apiMap = [
	    // Spec: https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
	    [
	        'requestFullscreen',
	        'exitFullscreen',
	        'fullscreenElement',
	        'fullscreenEnabled',
	        'fullscreenchange',
	        'fullscreenerror'
	    ],
	    // WebKit
	    [
	        'webkitRequestFullscreen',
	        'webkitExitFullscreen',
	        'webkitFullscreenElement',
	        'webkitFullscreenEnabled',
	        'webkitfullscreenchange',
	        'webkitfullscreenerror'
	    ],
	    // Old WebKit (Safari 5.1)
	    [
	        'webkitRequestFullScreen',
	        'webkitCancelFullScreen',
	        'webkitCurrentFullScreenElement',
	        'webkitCancelFullScreen',
	        'webkitfullscreenchange',
	        'webkitfullscreenerror'
	    ],
	    // Mozilla
	    [
	        'mozRequestFullScreen',
	        'mozCancelFullScreen',
	        'mozFullScreenElement',
	        'mozFullScreenEnabled',
	        'mozfullscreenchange',
	        'mozfullscreenerror'
	    ],
	    // Microsoft
	    [
	        'msRequestFullscreen',
	        'msExitFullscreen',
	        'msFullscreenElement',
	        'msFullscreenEnabled',
	        'MSFullscreenChange',
	        'MSFullscreenError'
	    ]
	];

	var specApi = apiMap[0];

	module.exports = function(element){
	    var browserApi,element = element || document;
	    //确定使用的方法/determine the supported set of functions
	    for (var i = 0; i < apiMap.length; i++) {
	        // check for exitFullscreen function
	        if (apiMap[i][1] in element) {
	            browserApi = apiMap[i];
	            break;
	        }
	    }
	    var fsApi = {};

	//根据确定的方法映射使用的方法名称/map the browser API names to the spec API names
	    if (browserApi) {
	        for (var j = 0; j < browserApi.length; j++) {
	            fsApi[specApi[j]] = browserApi[j];
	        }
	    }
	    return fsApi;
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * 日志统一处理
	 * Copyright 2015-2016 1VERGE Inc, log.js
	 * MIT Licensed
	 * @since 2015/9/2.
	 * @modify 2016/4/7.
	 * @author zhengzk
	 **/
	var noop = function () {
	};

	var console = window['console'] || {
	        'log': noop,
	        'warn': noop,
	        'error': noop
	    };

	var _log = function (type, args) {

	    var argsArray = [].slice.call(args);
	    if (type) {
	        // add the type to the front of the message
	        argsArray.unshift(type.toUpperCase() + ':');
	    } else {
	        // default to log with no prefix
	        type = 'log';
	    }

	    // add to history
	    log.history.push(argsArray);

	    // add console prefix after adding to history
	    argsArray.unshift('verge:');

	    // call appropriate log function
	    if (console[type].apply) {
	        console[type].apply(console, argsArray);
	    } else {
	        // ie8 doesn't allow error.apply, but it will just join() the array anyway
	        console[type](argsArray.join(' '));
	    }
	};
	var log = function () {
	    _log('log', arguments);
	};

	log.error = function () {
	    _log('error', arguments);
	};

	log.warn = function () {
	    _log('warn', arguments);
	};

	log.history = [];

	module.exports = log;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 对verge进行拓展 使其支持多个player的处理
	 * 多对一的处理：设置对多个生效 取值只返回第一个的
	 * Copyright 2015-2016 1VERGE Inc, verge-extend.js
	 * MIT Licensed
	 * @since 2015/9/30.
	 * @modify 2016/4/8.
	 * @author zhengzk
	 **/
	var verge = __webpack_require__(1);
	var playerApi = __webpack_require__(9);
	var slice = [].slice;

	verge.fn.extend(function () {
	    var ext = {},
	        methods = playerApi.methods,
	        attrs = playerApi.attrs;

	    //    , 'attr'
	    //    , 'plugin'

	    //可调用方法 无返回值 返回verge
	    //bind unbind one load
	    vQ.each(methods.events.concat(methods.native).concat(['plugin']), function (inx, fun) {
	        ext[fun] = function () {
	            var args = slice.call(arguments);
	            this.each(function (i, player) {
	                player[fun].apply(player, args);
	            });
	            return this;
	        };
	    });

	    //回掉函数和方法重名处理
	    //play pause
	    vQ.each(methods.specialNative, function (inx, fun) {
	        ext[fun] = function (arg, flag) {
	            if (arguments.length > 0) {
	                if (vQ.isFunction(arg)) {//参数为function
	                    var args1 = [fun].concat(slice.call(arguments));
	                    this.each(function (i, player) {
	                        player['bind'].apply(player, args1);
	                    });
	                }
	            }
	            if (flag !== false) {
	                var args2 = slice.call(arguments); //兼容处理传递arguments
	                this.each(function (i, player) {
	                    player[fun].apply(player, args2);
	                });
	            }
	            return this;
	        };
	    });


	    //需要返回值  只读属性
	    //duration
	    vQ.each(attrs.readonly, function (inx, fun) {
	        ext[fun] = function () {
	            var player = this[0];
	            if (player) {
	                return player[fun].apply(player, arguments);
	            }
	            //return undefined;
	        };
	    });

	    //ended seeking error
	    //回掉函数和只读获取属性的方法重名处理
	    vQ.each(attrs.specialReadonly, function (inx, attr) {
	        ext[attr] = function (arg) {
	            if (arguments.length > 0) {
	                if (vQ.isFunction(arg)) {
	                    var args = [attr].concat(slice.call(arguments));
	                    this.each(function (i, player) {
	                        player.bind.apply(this, args);
	                    });
	                }
	            }
	            var player = this[0];
	            if (player) {
	                return player[attr].apply(player, arguments);
	            }
	            //return undefined;
	        };
	    });

	    //可以设置or读取属性的方法
	    //autoplay
	    vQ.each(attrs.readwrite.concat(attrs.specialReadwrite).concat(['attr', 'options']), function (inx, attr) {
	        ext[attr] = function (arg) {
	            //设置值
	            if (arguments.length > 1 || vQ.isPlainObject(arg)) {
	                this.each(function (i, player) {
	                    player[attr].apply(player, arguments);
	                });
	            }

	            var player = this[0];
	            if (player) {
	                return player[attr].apply(player,slice.call(arguments));
	            }
	            //return undefined;
	        };
	    });

	    /**
	     * 增加外部函数入口
	     */
	    vQ.each(methods.callbacks, function (inx, fun) {
	        ext[fun] = function () {
	            var own = this;
	            var args = [fun].concat(slice.call(arguments));
	            own.each(function (i, player) {
	                player['bind'].apply(player, args);
	            });
	            return this;
	        };
	    });

	    return ext;
	}());



/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Event
	 * Copyright 2016 1VERGE Inc, event.js
	 * MIT Licensed.
	 * @Clazz
	 * @constructor
	 * @since 2016/3/11.
	 * @modify 2016/4/7.
	 * @author zhengzk
	 */
	var CoreObject = __webpack_require__(5);

	var Event = CoreObject.extend({
	  type:'',//事件类型 String
	  target:null,//引发事件对象
	  currentTarget:null,//当前对象
	  cancelBubble:false,//冒泡
	  fall:false,//向下广播
	  result:null,
	  //phase:Event.TARGET,
	  //returnValue:true,
	  init:function(type,target){
	    if('string' == typeof type){
	      this.type = type;
	    }
	    if(target){
	      this.target = target;
	      this.currentTarget = target;
	    }
	  },
	  /**
	   * 阻止事件派发
	   */
	  stopPropagation:function(){
	    this.cancelBubble = true;
	  }
	});

	//Event.TARGET = 0;//当前事件源
	//Event.BUBBLING = 1;//冒泡阶段
	//Event.FallING	= 2;//下落阶段

	module.exports = Event;


/***/ }
/******/ ])
});
;