/* global fetch */
'use strict';


var React = require('react');

var DOM = React.DOM,
    div = DOM.div,
    h1 = DOM.h1;

var app = require('./app');

module.exports = React.createClass({

    render: function render() {
        var h1Style = {
            fontSize: '1.5em',
            marginBottom: '20px'
        };
        return div(
            null,
            h1({style: h1Style}, 'Not Found')
        );
    }
});
