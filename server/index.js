'use strict';

var http = require('http');
var fs = require('fs');
var path = require('path');

var React = require('react');

global.fetch = require('node-fetch');
global.Promise = require('bluebird');
global.fetch.Promise = global.Promise;


var servePublicFile = require('./file-server');
var proxyCw = require('./proxy-cw');

var app = require('../app/app');


var template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');


function onRequest(req, res) {
    console.log('url', req.url);

    if (/^\/data/.test(req.url)) {
        console.log('\tdata url => serve file');
        servePublicFile(req.url.replace(/^\/data/, ''),
                        res);
        return;
    } else if (/^\/cw/.test(req.url)) {
        console.log('\tcw url => proxy');
        proxyCw(req, res);
        return;
    } else {
        console.log('\tpage url => react render to string');
        app.createAppElement(req.url).then(function(appElement) {
            // write initialdata into html so that on client side
            // we do not have to ask for the same data
            var html = template.replace('<!-- init-data -->',
                                        'var INITIALDATA = ' +
                                        JSON.stringify(appElement.props.route.data) +
                                        ';');
            // write dom computed by react
            html = html.replace('<!-- ici -->',
                                React.renderToString(appElement));
            res.writeHead(200, {
                'Content-Length': html.length,
                'Content-Type': 'text/html'
            });
            res.end(html);
        }).catch(function(err) {
            console.log('oups', err);
            var text = 'not found';
            res.writeHead(404, {
                'Content-Length': text.length,
                'Content-Type': 'text/plain'
            });
            res.end(text);
        });
    }

}

http.createServer(onRequest).listen(3000);
console.log('listening on 3000');
