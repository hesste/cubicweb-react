'use strict';


var React = require('react');

var DOM = React.DOM,
    div = DOM.div,
    h1 = DOM.h1,
    p = DOM.p,
    a = DOM.a;

module.exports = React.createClass({
    render: function render() {
        var post = this.props.data[0];
        var h1Style = {
            fontSize: '1.5em',
            marginBottom: '20px'
        };
        return div(
            {style: {display: 'flex', flexDirection: 'column'}},
            h1({style: h1Style}, post.title),
            p(null, post.content),
            p({style: {alignSelf: 'flex-end'}},
              a({href: '/', onClick: this.props.onClick}, 'back home'))
        );
    }
});
