/*jslint browser: true, vars: true */
define([
    "src/DepthMap",
    "src/GuiControls",
    "src/World",
    "underscore",
    "mocap",
    "src/Skeleton",
    "src/Traceform",
    "src/Calibrator"
], function (DepthMap, GuiControls, World, _, Mocap, Skeleton, Traceform, Calibrator) {
    "use strict";
    
    function Visualizer() {
    
        this.gui = new GuiControls();
        // Set up the 3D world
        this.world = new World();
        
        // Wire up our skeleton data source
        this.bcaster = new Mocap.Broadcaster();
    }
    
    Visualizer.prototype.addVideoStream = function (video, calibrationData) {
        video.addEventListener("loadedmetadata", _.bind(function (event) {
            var dmap = DepthMap.create(video);
            
            // Calibrate, if necessary
            if (calibrationData) {
                Calibrator.calibrateObject(dmap, calibrationData);
            }
            
            this.gui.addMesh(dmap);
            
            this.world.scene.add(dmap);
        }, this), false);
        
        video.play();
    };
    
    Visualizer.prototype.addTraceForm = function (mocapJoint, calibrationData) {
        // the data filter
        var jUpdater = new Mocap.JointUpdater(mocapJoint, this.bcaster);
        // alert when steady
        // this.jSteady = new JointSteadyDetector();
        // glue them together
        // this.jUpdater.vent.joint.add(this.jSteady.update, this.jSteady);
        
        // the geometry
        var tf = new Traceform();
        
        if (calibrationData) {
            Calibrator.calibrateObject(tf.line.threeObject, calibrationData);
        }
        
        // Add to the scene
        this.world.scene.add(tf.line.threeObject);
        
        // Add to the Gui
        console.log("traceform", tf);
        this.gui.addMesh(tf.line.threeObject);
                                       
        jUpdater.vent.joint.add(tf.update, tf);
    };
        
    Visualizer.prototype.addSkeleton = function (uri, calibrationData) {
        // Get the data source going
        // SSE data source, with custom URL
        // WARNING: mocap data is *usually* JSON
        // but an SSE server can just send any old string if it wants
        // so ensure the server is, in fact, outputting JSON strings
        var source = new Mocap.ServerSentEventsSource(this.bcaster, uri);
        
        // Plumb data into a skeleton visualization
        var skeleton = new Skeleton();
        
        // Apply calibration
        if (calibrationData) {
            Calibrator.calibrateObject(skeleton.skeletonPoints, calibrationData);
        }
        
        this.world.scene.add(skeleton.skeletonPoints);
        // Add to the Gui
        console.log(skeleton);
        this.gui.addMesh(skeleton.skeletonPoints);
        
        // move the whole skeleton avatar - no rate limiting
        this.bcaster.vent.skeleton.add(skeleton.update, skeleton);
        
        source.start();
    };
        
    Visualizer.prototype.start = function () {
        this.world.start();
    };
    
    return Visualizer;
});
