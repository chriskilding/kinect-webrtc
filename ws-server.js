/*jslint node: true */
"use strict";

var WebSocketServer = require('ws').Server;

var port = process.env.PORT || 443;
console.log("Starting WebSocket relay server on port", port);

var wss = new WebSocketServer({port: port});

console.log("starting WS server");

wss.on('connection', function (ws) {
	console.log("client connected");

    ws.on('message', function (message) {
        console.log('message', message);
    });
});