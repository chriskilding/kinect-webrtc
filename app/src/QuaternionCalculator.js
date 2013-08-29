/*jslint vars: true, browser: true */

define([
    'three'
], function (THREE) {
    'use strict';
    
    function QuaternionCalculator() {
        // Only creates a single instance of these for the whole calculator
        // vs. creating new ones in every quaternionFromMatrix() call
        this.quaternion = new THREE.Quaternion();
        
        this.matrix = new THREE.Matrix4();
    }
    
    QuaternionCalculator.prototype.quaternionFromMatrix = function (rot) {
        if (rot === null) {
            throw new Error("Rotation matrix was null!");
        }
        if (rot.length !== 9) {
            throw new Error("Rotation matrix was not 3x3!");
        }
        this.matrix.set(
            rot[0], rot[1], rot[2], 0,
            rot[3], rot[4], rot[5], 0,
            rot[6], rot[7], rot[8], 0,
            0, 0, 0, 1
        );
        
        this.quaternion.setFromRotationMatrix(this.matrix);
        
        return this.quaternion;
    };
    
    return QuaternionCalculator;
});
