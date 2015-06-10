'use strict';

var db = require('./db');

var routes = [
    {
        url: '/',
        data: db,
        component: require('./postList')
    },
    {
        url: /post\/(\d+)$/,
        data: function(urlParam) {
            var id = parseInt(urlParam, 10);
            var res = db.filter(function(post) {
                if (post.id === id) {
                    return true;
                } else {
                    return false;
                }
            });
            return res.length === 1 ? res[0] : undefined;
        },
        component: require('./postView')
    }
];


exports.resolve = function resolve(url) {
    for(var i = 0, route; route = routes[i] ; i += 1) {
        var match = (typeof route.url === 'string' ?
                     route.url === url :
                     url.match(route.url));
        if (match) {
            var urlParams = Array.isArray(match) ? match.slice(1) : [];
            var data = typeof route.data === 'function' ? route.data(urlParams) : route.data;
            return {
                data: data,
                component: route.component
            };
        }
    }
};
