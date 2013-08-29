/*jslint node: true */
"use strict";

var WebSocketServer = require('ws').Server;
var signals = require("signals");

function WebSocketInput(port) {
    console.log("Starting WebSocket relay server on port", port);
    this.wss = new WebSocketServer({port: port});
    this.vent = {
        skeletonReceived: new signals.Signal()
    };
}

WebSocketInput.prototype.start = function () {
    this.wss.on('connection', function (ws) {
        console.log("client connected");
    
        ws.on('message', function (message) {
            console.log('message', message);
            this.vent.skeletonReceived.dispatch(message);
        });
    });
};

module.exports = WebSocketInput;