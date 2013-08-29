/*jslint node: true */
"use strict";

var express = require('express');
var WebSocketInput = require('./WebSocketInput');
var EventSourceOutput = require('./EventSourceOutput');

// Lets us share an instance of express on port 80
var app = express(80);

/*app.get('/', function (req, res) {
    res.render('index');
});*/


var wsInput = new WebSocketInput(8080);
wsInput.start();

var esOutput = new EventSourceOutput();
esOutput.start(app);

// Bridge input to output
wsInput.vent.skeletonReceived.add(function (data) {
    esOutput.vent.skeleton.dispatch(data);
});