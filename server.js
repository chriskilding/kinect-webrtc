/*jslint node: true */
"use strict";

var connect = require('connect');
var express = require('express');
var WebSocketInput = require('./WebSocketInput');
var EventSourceOutput = require('./EventSourceOutput');

var app = express();

var ports = require("./ports");

var webRTC = require('webrtc.io').listen(ports.webrtc);

/*app.get('/', function (req, res) {
    res.render('index');
});*/

var wsInput = new WebSocketInput(ports.inputSkeleton);
wsInput.start();

var esOutput = new EventSourceOutput();
esOutput.start(app);

// Bridge input to output
wsInput.vent.skeleton.add(function (data) {
    // The wsInput may not NECESSARILY give us 1-line JSON.
    // Must parse to JSON first
    // Then stringify will put it all in a single line
    // this is easier for consumers to use
    // (and also doesn't need multiline hacks to use EventSource)
    esOutput.vent.skeleton.dispatch(JSON.stringify(JSON.parse(data)));
});

// Tell express to listen on a port
app.listen(ports.outputSkeleton, "77.73.3.27");

// Open static assets server
connect.createServer(connect.static(__dirname)).listen(ports.assets);