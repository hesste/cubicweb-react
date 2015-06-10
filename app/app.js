'use strict';

var React = require('react');

var router = require('./router'),
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
        return React.createElement(route.component,
                                   {data: route.data,
                                    onClick: this.handleClick});
    }
});


exports.createAppElement = function createAppElement(url) {
    var route = router.resolve(url);
    if (!route) {
        return;
    }
    return React.createElement(App, {route: route});
};



exports.render = function render() {
    var appElement = exports.createAppElement(window.location.pathname);
    React.render(appElement, document.getElementById('react-container'));
};
