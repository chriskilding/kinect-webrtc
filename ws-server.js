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
    // The wsInput may not NECESSARILY give us 1-line JSON.
    // Must parse to JSON first
    // Then stringify will put it all in a single line
    // this is easier for consumers to use
    // (and also doesn't need multiline hacks to use EventSource)
    esOutput.vent.skeleton.dispatch(JSON.stringify(JSON.parse(data)));
});

// Tell express to listen on a port
app.listen(2000);