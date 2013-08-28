/*jslint node: true */

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 8080});

console.log("starting WS server");

wss.on('connection', function(ws) {
	console.log("client connected");

    ws.on('message', function(message) {
        console.log('message', message);
    });
});