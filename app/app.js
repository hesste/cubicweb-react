/* global Promise */
'use strict';

var React = require('react');


var DOM = React.DOM,
    header = DOM.header,
    div = DOM.div,
    section = DOM.section;


var router = require('./router'),
    headerApp = require('./header'),
    appStates = require('./states');


var App = React.createClass({
    displayName: 'app',

    getInitialState: function() {
        return {
            route: this.props.route
        };
    },

    handleClick: function updateRoute(ev, newPath) {
        // if ev is null (or undefined) we expect newPath to be set
        if (ev != null) {
            ev.preventDefault();
            newPath = ev.currentTarget.attributes.href.value;
        }
        window.history.pushState(null, null, newPath);
        var route = router.resolve(newPath);
        route.data.then(function(json) {
            this.setState({ route: {
                component: route.component,
                data: json
            }});
        }.bind(this));
    },

    render: function render() {
        var route = this.state.route;

        var style = {
            marginTop: '20px',
            marginBottom: '20px',
            borderRadius: '4px',
            boxShadow: 'rgba(0,0,0,0.8) 1px 1px 6px',
            padding: '10px'
        };
        return div(
            {id: 'react-root'},
            React.createElement(headerApp,
                                   {login: appStates.login,
                                    onClick: this.handleClick}),
            section({style:style}, React.createElement(route.component,
                                              {data: route.data,
                                               onClick: this.handleClick}))
        );
    }
});
exports.App = App;

