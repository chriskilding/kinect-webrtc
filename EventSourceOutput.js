/*jslint node: true */
"use strict";

var signals = require('signals');

function EventSourceOutput() {
    this.vent = {
        skeleton: new signals.Signal()
    };
}

EventSourceOutput.prototype.start = function (app) {
    console.log("starting EventSource server");
    
    // EventSource endpoint for streaming skeleton data
    app.get('/skeleton', function (req, res) {
        // let request last as long as possible
        req.socket.setTimeout(Infinity);
        
        var socketWrite = function (msg) {
            res.write(msg + '\n\n'); // Note the extra newline
        };
        
        this.vent.skeletonReceived.add(socketWrite);
        
        //send headers for event-stream connection
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        res.write('\n');
        
        // The 'close' event is fired when a user closes their browser window.
        // In that situation we want to make sure we stop sending skeleton readings
        req.on("close", function () {
            this.vent.skeletonReceived.remove(socketWrite);
        });
    });
};

module.exports = EventSourceOutput;