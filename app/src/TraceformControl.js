/*jslint browser: true, vars: true */
define([
], function () {
    "use strict";
    
    // Looks after 1 depth map
    function TraceformControl(gui, tf) {
        // Could be a root gui, or a folder
        this.gui = gui;
        this.tf = tf;
    }
    
    // Controls for the depth map positioning
    TraceformControl.prototype.create = function (config) {
        // Not changing any positions here.
        // The only controls are start and stop
        this.gui.add(this.tf, "start");
        this.gui.add(this.tf, "stop");
    };
    
    return TraceformControl;
});