/*jslint browser: true, vars: true */
define([
    "src/RtcConnection",
    "underscore",
    "src/Visualizer",
    "mocap",
    "text!twoKinectCalibration.json"
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
        // ideally, don't use feet - they are too low for the Kinects to see!
        //this.viz.addTraceForm(Mocap.Joints.RightHand, calibData.skeleton);
        //this.viz.addTraceForm(Mocap.Joints.LeftHand, calibData.skeleton);
        // this.viz.addTraceForm(Mocap.Joints.RightKnee, calibData.skeleton);
        // this.viz.addTraceForm(Mocap.Joints.LeftKnee, calibData.skeleton);
        this.viz.addTraceForm(Mocap.Joints.RightShoulder, calibData.skeleton);
        this.viz.addTraceForm(Mocap.Joints.LeftShoulder, calibData.skeleton);
        this.viz.addTraceForm(Mocap.Joints.Head, calibData.skeleton);
        
        // Last things
        // Add the local video source to the scene
        var video = document.createElement("video");
        this.conn.getLocalVideo(video);
        this.viz.addVideoStream(video, calibData.localDepth);
        
        // Rig up to add remote sources to the scene as they arrive
        this.conn.vent.remoteStreamAdded.add(_.bind(function (video) {
            // Add stream with precomputed calibration data
            this.viz.addVideoStream(video, calibData.remoteDepth);
        }, this));
        
        this.conn.startRemoteListener();
    };
    
    return FullApp;
});
