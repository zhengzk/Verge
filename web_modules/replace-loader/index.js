/**
 * webpack replace loader
 * Copyright 2016 1VERGE Inc, index.js
 * MIT Licensed
 * @since 2016/4/7.
 * @modify 2016/4/7.
 * @author zhengzk
 **/
var utils = require('loader-utils');
module.exports = function(source) {
    this.cacheable();

    var query = utils.parseQuery(this.query);
    if (typeof(query.replace) === 'object') {
        for (var i = 0; i < query.replace.length; i++) {
            var option = query.replace[i];
            source = source.split(option.from).join(option.to);
        }
    }
    else source = source.split(query.search).join(query.replace);

    return source;
};