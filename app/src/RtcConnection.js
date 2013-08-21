/*jslint browser: true, vars: true */
define([
    'signals'
], function (Signal) {
    "use strict";
    
    function RtcConnection() {
        rtc.connect('ws://kate8.memset.net:8001');
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
        var that = this;
        rtc.on('add remote stream', function (stream) {
            // show the remote video
            console.log('remote stream added');
            var video = document.createElement('video');
            rtc.attachStream(stream, video);
            // Hand the video to any listeners
            this.vent.remoteStreamAdded.dispatch(video);
        });
    };
    
    return RtcConnection;
});