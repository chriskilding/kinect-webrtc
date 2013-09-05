/*jslint browser: true, vars: true */
define([
], function () {
    "use strict";
    
    // Looks after 1 depth map
    function DepthMapControls(gui, mesh) {
        // Could be a root gui, or a folder
        this.gui = gui;
        this.mesh = mesh;
    }
    
    // Controls for the depth map positioning
    DepthMapControls.prototype.create = function (config) {
        var conf = config || {
            minPosition: -5000,
            maxPosition: 5000,
            minRotation: 0,
            // NOTE rotation is in RADIANS. 2 pi rads = 360 degrees
            maxRotation: 2 * Math.PI,
            stepSize: 0.1
        };
                
        // Position sliders
        this.gui.add(this.mesh.position, "x").min(conf.minPosition)
            .max(conf.maxPosition).step(conf.stepSize);
        this.gui.add(this.mesh.position, "y").min(conf.minPosition)
            .max(conf.maxPosition).step(conf.stepSize);
        this.gui.add(this.mesh.position, "z").min(conf.minPosition)
            .max(conf.maxPosition).step(conf.stepSize);
        
        // Rotation sliders
        this.gui.add(this.mesh.rotation, "x").min(conf.minRotation)
            .max(conf.maxRotation).step(conf.stepSize);
        this.gui.add(this.mesh.rotation, "y").min(conf.minRotation)
            .max(conf.maxRotation).step(conf.stepSize);
        this.gui.add(this.mesh.rotation, "z").min(conf.minRotation)
            .max(conf.maxRotation).step(conf.stepSize);
    };
    
    return DepthMapControls;
});