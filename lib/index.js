var HappyBox = {};
module.exports = HappyBox;

HappyBox.Hapi = require('hapi');
HappyBox.Joi = require('joi');
HappyBox.Async = require('async');

var scurvy = require('scurvy');
var Scurvy = scurvy.createInstance({ authSchema: 'email' });
HappyBox.Scurvy = Scurvy;


var mailer = require('./mail');

HappyBox.Mailer = mailer;

var auth = require('./auth');
HappyBox.Auth = auth;

var home = require('./home');
HappyBox.Home = home;

var routes = require('./routes');
HappyBox.Routes = routes;
