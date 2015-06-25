/* global Promise */
'use strict';

var React = require('react');


var DOM = React.DOM,
    header = DOM.header,
    div = DOM.div,
    section = DOM.section;


var router = require('./router'),
    headerApp = require('./header'),
    appStates = require('./states'),
    db = require('./db');


var App = React.createClass({

    // getInitialState: function getInitialState() {
    //     return this.props;
    // },

    // componentDidMount: function() {
    //     window.addEventListener('popstate', this.updateUrl);
    // },

    // updateUrl: function() {
    //     var route = router.resolve(window.location.pathname);
    //     if (!route) {
    //         window.alert('oups not found');
    //     } else {
    //         this.setState({data: route.data, component: route.compenent});
    //     }
    // },

    // handleClick: function(ev) {},
    handleClick: function(ev) {
        ev.preventDefault();
        window.history.pushState(null, null,
                                 ev.currentTarget.attributes.href.value);
        exports.render();
    },

    render: function render() {
        var route = this.props.route;
        
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


exports.createAppElement = function createAppElement(url, initData) {
    var route = router.resolve(url, initData);
    if (!route) {
        return Promise.reject(new Error('not found'));
    }
    // return route.data.then(function(res) {
        // return res.json();
    // }).then(function(json) {
    return route.data.then(function(json) {
        console.log('json', json);
        return React.createElement(App, {route: {
            component: route.component,
            data: json
        }});
    });
};



exports.render = function render(initData) {
    var elementPromise = exports.createAppElement(window.location.pathname, initData);
    elementPromise.then(function(appElement) {
        React.render(appElement, document.getElementById('react-container'));
    });
};
