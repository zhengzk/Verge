/**
 * webpack.config
 * Copyright 2016 1VERGE Inc, webpack.config.js
 * MIT Licensed
 * @since 2016/2/22.
 * @modify 2016/4/7.
 * @author zhengzk
 **/
var webpack = require('webpack');
var path = require('path');
var pkg = require('./package.json');

var debug = (process.env.NODE_ENV !== 'production');
/**
 * 添加版本信息等
 **/
var getNoteStr = function () {
    var timeStr = ( new Date() ).toISOString().replace(/:\d+\.\d+Z$/, 'Z');

    return pkg.name + ' <' + pkg.version + '@' + timeStr + '>' +
        ' | Copyright (c) 2015-2016 1VERGE, Inc' +
        ' | Released under the MIT license' +
        ' | https://github.com/vergeplayer/Verge/blob/master/LICENSE';
};
var name = pkg.name.toLowerCase();

var config = {
    entry: 'js/index.js',
    output: {
        path: debug ? 'dest':'build/',
        filename:  name + (debug ? '':'.min') + '.js',
        libraryTarget: 'umd',//'umd' 'commonjs'
        library: name
        //pathinfo:true
    },
    resolve: {
        alias: {
            js: 'src/scripts/js',
            js$: 'src/scripts/js'
        },
        root: [path.resolve('.')],
        extensions: ['', '.js']
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loaders: ['jscs-loader', 'eslint-loader'],
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'replace-loader',
                query: {
                    replace:[{
                        from: '@VERSION',
                        to: pkg.version
                    },{
                        from: '@NAME',
                        to: name
                    }]
                },
                exclude: /node_modules/
            }
            //{test: require.resolve('vQ'), loader: 'expose?$!expose?vQ'}
        ]
    },
    plugins: [
        new webpack.BannerPlugin(getNoteStr())
        //new webpack.ProvidePlugin({
        //    'vQ': 'vQ'
        //})
    ],
    eslint: {
        configFile: '.eslintrc',
        emitError: true
    },
    externals: {
        "vQ": "vQ"
    }
};

if (!debug) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_console: true
            },
            preserveComments: 'some'
        })
    );
}
module.exports = config;

