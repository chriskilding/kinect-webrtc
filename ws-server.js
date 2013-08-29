/*jslint node: true */
"use strict";

var express = require('express');
var WebSocketInput = require('./WebSocketInput');
var EventSourceOutput = require('./EventSourceOutput');

// Lets us share an instance of express
var app = express();

/*app.get('/', function (req, res) {
    res.render('index');
});*/


var wsInput = new WebSocketInput(3000);
wsInput.start();

var esOutput = new EventSourceOutput();
esOutput.start(app);

// Bridge input to output
wsInput.vent.skeleton.add(function (data) {
    esOutput.vent.skeleton.dispatch(data);
});

// Tell express to listen on a port
app.listen(2000);