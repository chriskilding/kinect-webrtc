/*jslint browser: true, vars: true */
define([
    "src/RtcConnection",
    "underscore",
    "src/Visualizer"
], function (RtcConnection, _, Visualizer) {
    "use strict";
    
    function FullApp() {
        this.conn = new RtcConnection();
        this.viz = new Visualizer();
    }
    
    FullApp.prototype.start = function () {

        this.viz.start();
        
        // Last things
        // Add the local video source to the scene
        var video = document.createElement("video");
        this.conn.getLocalVideo(video);
        this.viz.addVideoStream(video);
        
        // Rig up to add remote sources to the scene as they arrive
        this.conn.vent.remoteStreamAdded.add(_.bind(function (video) {
            this.viz.addVideoStream(video);
        }, this));
        
        this.conn.startRemoteListener();
    };
    
    return FullApp;
});
