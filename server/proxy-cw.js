'use strict';

var http = require('http');

function proxy(client_req, client_res) {

    var options = {
        hostname: 'localhost',
        port: '8000',
        path: client_req.url.replace(/^\/cw/, '')
    };

    http.request(options, function(res) {
        console.log('res headers', res.headers)
        copyHeaders(res, client_res);
        res.pipe(client_res);
    }).end();
}

function copyHeaders(reqFrom, reqTo) {
    var headersOfInterest = ['date', 'content-type',
                             'content-length',
                             'date', 'last-modified'];
    var headersFrom = reqFrom.headers;
    for (var i = 0, header ; header = headersOfInterest[i] ; i++ ) {
        if (header in headersFrom) {
            reqTo.setHeader(header, headersFrom[header]);
        }
    }
}


module.exports = proxy;

