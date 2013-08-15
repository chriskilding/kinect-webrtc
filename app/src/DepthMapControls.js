/*jslint browser: true, vars: true */
define([
    'dat'
], function (Dat) {
    "use strict";

    // Controls for the depth map positioning
    function DepthMapControls(dm) {
        this.dm = dm;
        this.gui = new Dat.GUI();
    }
    
    DepthMapControls.prototype.xPosition = function (newPosition) {
        console.log(newPosition);
    };
    
    DepthMapControls.prototype.yPosition = function (newPosition) {
        
    };
    
    DepthMapControls.prototype.zPosition = function (newPosition) {
        
    };
    
    DepthMapControls.prototype.xRotation = function (newRotation) {
        
    };

    DepthMapControls.prototype.yRotation = function (newRotation) {
        
    };
    
    DepthMapControls.prototype.zRotation = function (newRotation) {
        
    };
    
    DepthMapControls.prototype.start = function (config) {
        var conf = config || {
            minPosition: -2000,
            maxPosition: 2000,
            minRotation: 0,
            maxRotation: 359,
            stepSize: 0.1
        };
        
        // Position sliders
        this.gui.add(this, 'xPosition').min(conf.minPosition).max(conf.maxPosition).step(conf.stepSize);
        this.gui.add(this, 'yPosition').min(conf.minPosition).max(conf.maxPosition).step(conf.stepSize);
        this.gui.add(this, 'zPosition').min(conf.minPosition).max(conf.maxPosition).step(conf.stepSize);
        
        // Rotation sliders
        this.gui.add(this, 'xRotation').min(conf.minRotation).max(conf.maxRotation).step(conf.stepSize);
        this.gui.add(this, 'yRotation').min(conf.minRotation).max(conf.maxRotation).step(conf.stepSize);
        this.gui.add(this, 'zRotation').min(conf.minRotation).max(conf.maxRotation).step(conf.stepSize);
    };
});