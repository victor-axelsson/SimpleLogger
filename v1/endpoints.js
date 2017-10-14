var endpoints = {};
var userHandler = require('./handlers/userHandler');
var loggHandler = require('./handlers/loggHandler')
var namspaceHandler = require('./handlers/namspaceHandler')

var middleware = require('./middleware/middleware');
var env = require("../env");


endpoints.ping = {
    url: '/v1/ping',
    method: 'get',
    handler: function(req, res) {
        res.status(200).send("pong");
    }
}

endpoints.loginUser = {
    url: '/v1/user/login',
    method: 'post',
    middleware: [],
    handler: userHandler.login
}

endpoints.loginUser = {
    url: '/v1/entry',
    method: 'post',
    middleware: [],
    handler: loggHandler.addLog
}

endpoints.getAllNamespaces = {
    url: '/v1/namespace',
    method: 'get',
    middleware: [],
    handler: namspaceHandler.getAllNamespaces
}


module.exports = endpoints;
