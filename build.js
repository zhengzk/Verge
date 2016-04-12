/**
 * build
 * Copyright 2016 1VERGE Inc, build.js
 * MIT Licensed
 * @since 2016/4/7.
 * @modify 2016/4/7.
 * @author zhengzk
 **/
var webpack = require("webpack");
var debug = (process.env.NODE_ENV !== 'production');

var compiler = webpack(require('./webpack.config.js'));

compiler.run(function (err, stats) {
    //console.log(err);
    //console.log(arguments);
});

if (debug) {//dev
    compiler.watch({ // watch options:
        aggregateTimeout: 300, // wait so long for more changes
        poll: true // use polling instead of native watchers
        // pass a number to set the polling interval
    }, function (err, stats) {
        //console.log(err);
        //console.log(arguments);
    });
}