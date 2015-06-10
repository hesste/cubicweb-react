'use strict';

var app = require('./app');

window.addEventListener('popstate', app.render, false);
app.render();
