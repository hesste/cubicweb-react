/* global Promise, fetch */
'use strict';

var db = require('./db');
var config = require('./config');

function rqlUrl(rql) {
    return (config.cw_base_url + '/view?vid=ejsonexport&rql=' +
            encodeURI(rql));
}

function noData() {
    return Promise.resolve({
        json: function json() {
            return {};
        },
        text: function text() {
            return '';
        }
    });
}

var routes = [
    {
        url: '/',
        // data: db,
        data: function() {
            return fetch(rqlUrl('Any X WHERE X is BlogEntry'), {credentials:'same-origin'});
        },
        component: require('./postList')
    },
    {
        url: '/login',
        // data: db,
        data: noData,
        component: require('./login')
    },
    {
        url: /post\/(\d+)$/,
        // data: function(urlParam) {
        //     var id = parseInt(urlParam, 10);
        //     var res = db.filter(function(post) {
        //         if (post.id === id) {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     });
        //     return res.length === 1 ? res[0] : undefined;
        // },
        data: function(urlParam) {
            return fetch(rqlUrl('Any X WHERE X is BlogEntry, X eid ' + urlParam),
                        {credentials:'same-origin'});
        },
        component: require('./postView')
    }
];


exports.resolve = function resolve(url, initData) {
    if (initData != null) {
        initData = Promise.resolve(initData);
    }
    for(var i = 0, route; route = routes[i] ; i += 1) {
        var match = (typeof route.url === 'string' ?
                     route.url === url :
                     url.match(route.url));
        if (match) {
            var urlParams = Array.isArray(match) ? match.slice(1) : [];
            // var data = typeof route.data === 'function' ? route.data(urlParams) : route.data;
            console.log('initData', initData);
            return {
                // data: data,
                data: initData || route.data(urlParams).then(function(res) { return res.json();}),
                component: route.component
            };
        }
    }
};
