/* global fetch */
'use strict';


var React = require('react');

var DOM = React.DOM,
    div = DOM.div,
    h1 = DOM.h1,
    p = DOM.p,
    form = DOM.form,
    input = DOM.input,
    label = DOM.label,
    a = DOM.a;

var app = require('./app'),
    appStates = require('./states');

module.exports = React.createClass({
    getInitialState: function() {
        return {msg: ''};
    },
    handleSubmit: function(ev) {
        ev.preventDefault();
        console.log('handle submit', ev);
        var login = ev.target.login.value,
            pass = ev.target.pass.value;
        console.log('login', ev.target.login.value);
        console.log('pass', ev.target.pass.value);
        fetch('/cw/login?__login=' + encodeURI(login) +
              '&__password=' + encodeURI(pass),
              {credentials:'same-origin'}).then(function(res) {
                  console.log('get res');
                  appStates.login = login;
                  window.history.pushState(null, null, '/');
                  app.render();
              }).catch(function(err) {
                  console.log('oups', err);
                  this.setState({msg: 'oups'});
              });
    },
    render: function render() {
        var post = this.props.data[0];
        var h1Style = {
            fontSize: '2em',
            marginBottom: '20px'
        };
        return div(
            null,
            h1({style: h1Style}, 'Login'),
            form({onSubmit: this.handleSubmit},
                 label({'for': 'login'}, 'login', input({id: 'login', type: 'text'})),
                 label({'for': 'pass'}, 'password', input({id: 'pass', type: 'text'})),
                 input({type: 'submit', value: 'submit'})),
            p(null, this.state.msg)
        );
    }
});
