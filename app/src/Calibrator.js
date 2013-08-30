/*jslint browser: true, vars: true */

// Takes a calibration config file
// and orients a THREE.js object appropriately

define([
], function () {
    "use strict";
    
    function calibrateObject(obj, data) {
        obj.position.x = data.posX;
        obj.position.y = data.posY;
        obj.position.z = data.posZ;
        
        obj.rotation.x = data.rotX;
        obj.rotation.y = data.rotY;
        obj.rotation.z = data.rotZ;
    }
        
    return {
        calibrateObject: calibrateObject
    };
});