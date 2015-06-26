'use strict';

// polyfill Promise
require('es6-promise').polyfill();
// polyfill fetch
require('whatwg-fetch');
var React = require('react');
var config = require('./config');

config.cw_base_url = '/cw';

var app = require('./app'),
    router = require('./router');


function render() {
    var route = router.resolve(window.location.pathname, window.INITIALDATA);
    route.data.then(function(json) {
        // unset INITIALDATA for next call
        window.INITIALDATA = null;
        React.render(
            React.createElement(app.App, {route: {
                component: route.component,
                data: json
            }, code: route.code}),
            document.getElementById('react-container'));
    });
}

// when user use back/forward browser button we call react.render
window.addEventListener('popstate', render, false);

// initial render: it is expected to not produce any html (since this was
// done server side), but only bind event listener
render();



