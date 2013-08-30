/*jslint browser: true, vars: true */
define([
    "src/RtcConnection",
    "underscore",
    "src/Visualizer"
], function (RtcConnection, _, Visualizer) {
    "use strict";
    
    function ReceiverApp() {
        this.conn = new RtcConnection();
        this.viz = new Visualizer();
    }
        
    ReceiverApp.prototype.start = function () {
        this.viz.start();
        
        // Last things
        // Get the local video stream to obtain necessary WebRTC permissions
        // but don't actually use it!
        this.conn.getLocalVideo();
        
        // Rig up to add remote sources to the scene as they arrive
        this.conn.vent.remoteStreamAdded.add(_.bind(function (video) {
            console.log("remoteStreamAdded callback", video);
            this.viz.addVideoStream(video);
        }, this));
        
        this.conn.startRemoteListener();
    };
    
    return ReceiverApp;
});

