/*jslint browser: true, vars: true */
define([
    "dat",
    "src/DepthMapControls",
    "src/TraceformControl"
], function (Dat, DepthMapControls, TraceformControl) {
    "use strict";

    function GuiControls() {
        this.numFolders = 0;
        this.gui = new Dat.GUI();
        this.traceforms = this.gui.addFolder("traceforms");
    }
    
    GuiControls.prototype.addMesh = function (mesh) {
        var folder = this.gui.addFolder("object" + this.numFolders);
        this.numFolders++;
        var dmc = new DepthMapControls(folder, mesh);
        dmc.create();
    };
    
    GuiControls.prototype.addTraceform = function (tf, mocapJoint) {
        var folder = this.traceforms.addFolder("tf" + mocapJoint);
        var control = new TraceformControl(folder, tf);
        control.create();
    };
    
    return GuiControls;
    
});