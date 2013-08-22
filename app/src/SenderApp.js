/*jslint browser: true, vars: true */
define([
    "src/RtcConnection",
    "underscore"
], function (RtcConnection, _) {
    "use strict";
    
    var conn = new RtcConnection();
    
    var addVideoStream = function (video) {
        document.body.appendChild(video);
        
        video.addEventListener("loadedmetadata", function (event) {
            console.log("video loaded");
        }, false);
        
        video.play();
    };
    
    var addRtcVideoStream = function () {
        var video = document.createElement("video");
        conn.getLocalVideo(video);
        addVideoStream(video);
    };
    
    var start = function () {
        
        // Last things
        // Add the local video source to the scene
        addRtcVideoStream();
        // Rig up to add remote sources to the scene as they arrive
        conn.vent.remoteStreamAdded.add(function (video) {
            addVideoStream(video);
        });
        conn.startRemoteListener();

    };
    
    return {
        start: start
    };
});
