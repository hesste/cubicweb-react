/* global Promise, fetch */
'use strict';

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
        data: function() {
            return fetch(rqlUrl('Any X WHERE X is BlogEntry'), {credentials:'same-origin'});
        },
        component: require('./postList')
    },
    {
        url: '/login',
        data: noData,
        component: require('./login')
    },
    {
        url: /post\/(\d+)$/,
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
            return {
                data: initData || route.data(urlParams).then(function(res) { return res.json();}),
                component: route.component
            };
        }
    }
    // Not Found
    return {
        data: noData().then(function(res) { return res.json();}),
        component: require('./not-found'),
        code: 404
    };
};
