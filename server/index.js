'use strict';

require('es6-promise').polyfill();
global.fetch = require('node-fetch');

var path = require('path'),
    fs = require('fs');
var server = require('reverse-proxy'),
    React = require('react');

var config = require('../app/config');
config.publicPath = path.join(__dirname, '..', config.publicPath);
var app = require('../app/app'),
    router = require('../app/router');

var template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

server.start(config, function otherUrlCb(req, res){
    var route = router.resolve(req.url);
    route.data.then(function(json) {
        // write initialdata into html so that on client side
        // we do not have to ask for the same data
        var html = template.replace('<!-- init-data -->',
                                    'var INITIALDATA = ' +
                                    JSON.stringify(json) +
                                    ';');
        var appElement = React.createElement(app.App, {route: {
            component: route.component,
            data: json
        }, code: route.code});
        // write dom computed by react
        html = html.replace('<!-- ici -->',
                            React.renderToString(appElement));
        res.writeHead(appElement.props.code || 200, {
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
});


    


