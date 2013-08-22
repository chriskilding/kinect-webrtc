/*jslint browser: true, vars: true */
define([
    "dat"
], function () {
    "use strict";

    // Looks after 1 depth map
    function DepthMapControls(gui) {
        // Could be a root gui, or a folder
        this.gui = gui;
    }
    
    // Controls for the depth map positioning
    DepthMapControls.prototype.create = function (mesh, config) {
        var conf = config || {
            minPosition: -2000,
            maxPosition: 2000,
            minRotation: 0,
            // NOTE rotation is in RADIANS. 2 pi rads = 360 degrees
            maxRotation: 2 * Math.PI,
            stepSize: 0.1
        };
                
        // Position sliders
        this.gui.add(mesh.position, "x").min(conf.minPosition)
            .max(conf.maxPosition).step(conf.stepSize);
        this.gui.add(mesh.position, "y").min(conf.minPosition)
            .max(conf.maxPosition).step(conf.stepSize);
        this.gui.add(mesh.position, "z").min(conf.minPosition)
            .max(conf.maxPosition).step(conf.stepSize);
        
        // Rotation sliders
        this.gui.add(mesh.rotation, "x").min(conf.minRotation)
            .max(conf.maxRotation).step(conf.stepSize);
        this.gui.add(mesh.rotation, "y").min(conf.minRotation)
            .max(conf.maxRotation).step(conf.stepSize);
        this.gui.add(mesh.rotation, "z").min(conf.minRotation)
            .max(conf.maxRotation).step(conf.stepSize);
    };
    
    return DepthMapControls;
});