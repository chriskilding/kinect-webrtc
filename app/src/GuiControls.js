/*jslint browser: true, vars: true */
define([
    "dat",
    "src/DepthMapControls"
], function (Dat, DepthMapControls) {
    "use strict";

    function GuiControls() {
        this.numFolders = 0;
        this.gui = new Dat.GUI();
    }
    
    GuiControls.prototype.addMesh = function (mesh) {
        var folder = this.gui.addFolder("object" + this.numFolders);
        this.numFolders++;
        var dmc = new DepthMapControls(folder, mesh);
        dmc.create();
    };
    
    return GuiControls;
    
});