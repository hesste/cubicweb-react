'use strict';

var React = require('react');


var DOM = React.DOM,
    h1 = DOM.h1,
    header = DOM.header,
    div = DOM.div,
    span = DOM.span,
    p = DOM.p,
    a = DOM.a;


module.exports = React.createClass({
    render: function render() {
        var style = {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '20px',
            marginBottom: '20px',
            borderRadius: '4px',
            boxShadow: 'rgba(0,0,0,0.5) 1px 1px 6px',
            padding: '10px'
        };
        var login = this.props.login ? p(null, this.props.login) :
            a({href: '/login', onClick: this.props.onClick}, 'login');
             return header({style: style},
                           h1({style: {fontSize: '2em'}}, 'React & Cubicweb'),
                           span(null, login));
    }
});
