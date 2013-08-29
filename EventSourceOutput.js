/*jslint node: true */
"use strict";

var signals = require('signals');
var _ = require("underscore");

function EventSourceOutput() {
    this.vent = {
        skeleton: new signals.Signal()
    };
}

EventSourceOutput.prototype.start = function (app) {
    console.log("starting EventSource server");
    
    // EventSource endpoint for streaming skeleton data
    app.get('/skeleton', _.bind(function (req, res) {
        // let request last as long as possible
        req.socket.setTimeout(Infinity);
        
        var socketWrite = function (msg) {
            // Note the extra newline
            // AND that you MUST prefix the message with the "data: " bit
            // for EventSource listeners to work properly client side
            res.write("data: " + msg + '\n\n');
        };
        
        this.vent.skeleton.add(socketWrite);
        
        //send headers for event-stream connection
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        res.write('\n');
        
        // The 'close' event is fired when a user closes their browser window.
        // In that situation we want to make sure we stop sending skeleton readings
        req.on("close", _.bind(function () {
            this.vent.skeleton.remove(socketWrite);
        }, this));
    }, this));
};

module.exports = EventSourceOutput;