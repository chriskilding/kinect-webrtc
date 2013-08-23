/*jslint browser: true, vars: true */
define([
    "signals",
    "underscore"
], function (Signal, _) {
    "use strict";
    
    function RtcConnection() {
        rtc.connect("ws://still-badlands-6235.herokuapp.com:8001");
        this.vent = {
            remoteStreamAdded: new Signal()
        };
    }
    
    /**
     * Pass in a video object if you want to render the stream locally,
     * or pass nothing if you're just sending the stream elsewhere.
     */
    RtcConnection.prototype.getLocalVideo = function (video) {
        rtc.createStream({"video": true}, function (stream) {
            // get local stream for manipulation
            console.log("stream", stream);
            if (video) {
                rtc.attachStream(stream, video);
            }
        });
    };
    
    RtcConnection.prototype.startRemoteListener = function () {
        // Don't forget to bind the 'this' context
        rtc.on("add remote stream", _.bind(function (stream) {
            // show the remote video
            console.log("remote stream added");
            var video = document.createElement("video");
            rtc.attachStream(stream, video);
            // Hand the video to any listeners
            this.vent.remoteStreamAdded.dispatch(video);
        }, this));
    };
    
    return RtcConnection;
});