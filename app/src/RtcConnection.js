/*jslint browser: true, vars: true */
define([
    'signals',
    'underscore'
], function (Signal, _) {
    "use strict";
    
    function RtcConnection() {
        rtc.connect('ws://localhost:8001');
        this.vent = {
            remoteStreamAdded: new Signal()
        };
    }
    
    RtcConnection.prototype.getLocalVideo = function (video) {
        rtc.createStream({"video": true}, function (stream) {
            // get local stream for manipulation
            console.log('stream', stream);
            
            rtc.attachStream(stream, video);
            
            // var videoUrl = window.URL.createObjectURL(stream);
            // console.log('stream url', videoUrl);
            // callback(videoUrl);
        });
    };
    
    RtcConnection.prototype.startRemoteListener = function () {
        // Don't forget to bind the 'this' context
        rtc.on('add remote stream', _.bind(function (stream) {
            // show the remote video
            console.log('remote stream added');
            var video = document.createElement('video');
            rtc.attachStream(stream, video);
            // Hand the video to any listeners
            this.vent.remoteStreamAdded.dispatch(video);
        }, this));
    };
    
    return RtcConnection;
});