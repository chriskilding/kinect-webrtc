/*jslint node: true */
"use strict";

var WebSocketServer = require('ws').Server;
var signals = require("signals");
var _ = require("underscore");

function WebSocketInput(port) {
    console.log("Starting WebSocket relay server on port", port);
    this.wss = new WebSocketServer({port: port});
    this.vent = {
        skeleton: new signals.Signal()
    };
}

WebSocketInput.prototype.start = function () {
    this.wss.on('connection', _.bind(function (ws) {
        console.log("client connected");
    
        ws.on('message', _.bind(function (message) {
            // Remember, message is not necessarily JSON!
            this.vent.skeleton.dispatch(JSON.stringify(JSON.parse(message)));
        }, this));
    }, this));
};

module.exports = WebSocketInput;