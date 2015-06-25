'use strict';

var React = require('react');

var DOM = React.DOM,
    div = DOM.div,
    h1 = DOM.h1,
    ul = DOM.ul,
    li = DOM.li,
    a = DOM.a;

module.exports = React.createClass({
    render: function render() {
        return div(
            null,
            h1(null, 'TOTO'),
            ul(null, this.props.data.map(function(post) {
                return li(
                    {key: post.eid},
                    a({href: '/post/' + post.eid, onClick: this.props.onClick},
                      post.title)
                );
            }.bind(this)))
        );
    }
});
