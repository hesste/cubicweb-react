'use strict';


var React = require('react');

var DOM = React.DOM,
    div = DOM.div,
    h1 = DOM.h1,
    p = DOM.p,
    a = DOM.a;

module.exports = React.createClass({
    render: function render() {
        var post = this.props.data;
        return div(
            null,
            h1(null, post.title),
            p(null, post.body),
            p(null, a({href: '/', onClick: this.props.onClick}, 'back home'))
        );
    }
});
