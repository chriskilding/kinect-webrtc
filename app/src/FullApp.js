/*jslint browser: true, vars: true */
define([
    "src/RtcConnection",
    "underscore",
    "src/Visualizer",
    "mocap",
    "text!threeKinectCalibration.json"
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
        // this.viz.addTraceForm(Mocap.Joints.RightHand, calibData.skeleton);

        
        // Last things
        // Add the local video source to the scene
        var video = document.createElement("video");
        this.conn.getLocalVideo(video);
        this.viz.addVideoStream(video, calibData.localDepth);
        
        // Rig up to add remote sources to the scene as they arrive
        // with 3 Kinects, this gets interesting...
        // which remote source will be first?
        // we must make an assumption...
        var orderedCalibration = [
            calibData.remoteDepthLeft,
            calibData.remoteDepthRight
        ];
        var sensorsConnected = 0;
        
        this.conn.vent.remoteStreamAdded.add(_.bind(function (video) {
            
            if (sensorsConnected < orderedCalibration.length) {
                // Add stream with precomputed calibration data
                this.viz.addVideoStream(video, orderedCalibration[sensorsConnected]);
            } else {
                // Just add the stream as is
                this.viz.addVideoStream(video);
            }
            
            ++sensorsConnected;
        }, this));
        
        this.conn.startRemoteListener();
    };
    
    return FullApp;
});
