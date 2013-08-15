/*jslint browser: true, vars: true */
define([
    'dat'
], function (Dat) {
    "use strict";

    // Controls for the depth map positioning
    function DepthMapControls(dm, gui, id) {
        this.dm = dm;
        this.gui = gui; //new Dat.GUI();
        this.id = id;
    }
    
    DepthMapControls.prototype.start = function (config) {
        var conf = config || {
            minPosition: -2000,
            maxPosition: 2000,
            minRotation: 0,
            // NOTE rotation is in RADIANS. 2 pi rads = 360 degrees
            maxRotation: 2 * Math.PI,
            stepSize: 0.1
        };
        
        var controls = this.gui.addFolder('stream' + this.id);
        
        // Position sliders
        controls.add(this.dm.mesh.position, 'x').min(conf.minPosition)
            .max(conf.maxPosition).step(conf.stepSize);
        controls.add(this.dm.mesh.position, 'y').min(conf.minPosition)
            .max(conf.maxPosition).step(conf.stepSize);
        controls.add(this.dm.mesh.position, 'z').min(conf.minPosition)
            .max(conf.maxPosition).step(conf.stepSize);
        
        // Rotation sliders
        controls.add(this.dm.mesh.rotation, 'x').min(conf.minRotation)
            .max(conf.maxRotation).step(conf.stepSize);
        controls.add(this.dm.mesh.rotation, 'y').min(conf.minRotation)
            .max(conf.maxRotation).step(conf.stepSize);
        controls.add(this.dm.mesh.rotation, 'z').min(conf.minRotation)
            .max(conf.maxRotation).step(conf.stepSize);
    };
    
    return DepthMapControls;
});