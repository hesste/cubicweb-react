'use strict';

// polyfill Promise
require('es6-promise').polyfill();
// polyfill fetch
require('whatwg-fetch');
var config = require('./config');

config.cw_base_url = '/cw';

var app = require('./app');

// when user use back/forward browser button we call react.render
window.addEventListener('popstate', app.render, false);

// initial render: it is expected to not produce any html (since this was
// done server side), but only bind event listener
app.render(window.INITIALDATA);


