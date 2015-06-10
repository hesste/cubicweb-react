'use strict';

var http = require('http');
var fs = require('fs');
var path = require('path');
var React = require('react');

var servePublicFile = require('./file-server');
var proxyCw = require('./proxy-cw');

var router = require('../app/router');
var app = require('../app/app');


var template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');


function onRequest(req, res) {
    console.log('url', req.url);

    if (/^\/data/.test(req.url)) {
        console.log('data url => serve file');
        servePublicFile(req.url.replace(/^\/data/, ''),
                        res);
        return;
    } else if (/^\/cw/.test(req.url)) {
        console.log('cw url => proxy');
        proxyCw(req, res);
        return;
    } else {
        console.log('page url => react render to string');
        var appElement = app.createAppElement(req.url);
        if (!appElement) {
            var body = 'not found';
            res.writeHead(404, {
                'Content-Length': body.length,
                'Content-Type': 'text/plain'
            });
            res.end(body);
            return;
        }
        var html = template.replace('<!-- ici -->',
                                    React.renderToString(appElement));
        res.writeHead(200, {
            'Content-Length': html.length,
            'Content-Type': 'text/html'
        });
        res.end(html);
    }

}

http.createServer(onRequest).listen(3000);
console.log('listening on 3000');
