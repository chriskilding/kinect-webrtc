/*jslint browser: true, vars: true */
define([
    "src/RtcConnection",
    "underscore",
    "src/Visualizer",
    "mocap",
    "text!calibration.json"
], function (RtcConnection, _, Visualizer, Mocap, calibrationData) {
    "use strict";
    
    var calibData = JSON.parse(calibrationData);
    
    function FullApp() {
        this.conn = new RtcConnection();
        this.viz = new Visualizer();
    }
    
    FullApp.prototype.start = function () {

        this.viz.start();
        
        // Add a skeleton and calibrate it
        this.viz.addSkeleton("http://kate8.memset.net:2000/skeleton", calibData.skeleton);
        
        // Trace right hand - uses same calibration data as skeleton
        this.viz.addTraceForm(Mocap.Joints.RightHand, calibData.skeleton);

        
        // Last things
        // Add the local video source to the scene
        var video = document.createElement("video");
        this.conn.getLocalVideo(video);
        this.viz.addVideoStream(video, calibData.localDepth);
        
        // Rig up to add remote sources to the scene as they arrive
        this.conn.vent.remoteStreamAdded.add(_.bind(function (video) {
            this.viz.addVideoStream(video, calibData.remoteDepth);
        }, this));
        
        this.conn.startRemoteListener();
    };
    
    return FullApp;
});
