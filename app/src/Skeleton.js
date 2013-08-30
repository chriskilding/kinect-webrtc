/*jslint vars: true */

// Model of a user skeleton.
define([
    'three'
], function (THREE) {
    'use strict';
    
    function Skeleton() {
        this.skeletonPoints = new THREE.Object3D();
        
        for (var i = 0; i < 24; i++) {
            //Make 24 white circles for each of the joints we are going to recieve from the kinect feed.
            var geometry = new THREE.CubeGeometry(2, 2, 2);
            var object = new THREE.Mesh(geometry, this.material);
            
            object.position.set(0, 0, -1000);
            object.type = 'skeleton' + i;
            object.useQuaternion = true;
            
            this.skeletonPoints.add(object);         
        }
    }

    Skeleton.prototype.material = new THREE.MeshBasicMaterial({
		color: 0xffffff
	});
        
    Skeleton.prototype.update = function(skeleton) {
        var joints = this.skeletonPoints.children;
        
        for(var i = 0; i < joints.length; i++) {
            //Loop through each of the dots
            // joint 0 is the zig "invalid" one!
            // joint 24 is the zig right foot!
            // so joint i on OUR skeleton == joint i+1 on zig skeleton
            var kinectFeedPart = skeleton[i + 1];
            var joint = joints[i];
            
            //Get data information for each joint.
            // If joint data isn't avaiable place dot offscreen and continue on.
            if (typeof kinectFeedPart == 'undefined') {
                //joint.position.x = 5000;
                //joint.position.y = 5000;
                
                // breaks one iteration (in the loop), if a specified condition occurs,
                // and continues with the next iteration in the loop.
                continue;
            }
            
            // position
            var pos = kinectFeedPart.position;
            joint.position.set(pos[0], pos[1], pos[2]);
            
            // rotation
            // http://stackoverflow.com/questions/4833380/how-to-convert-a-3x3-rotation-matrix-into-4x4-matrix
            var rot = kinectFeedPart.rotation;
            var m = new THREE.Matrix4(
                rot[0], rot[1], rot[2], 0,
                rot[3], rot[4], rot[5], 0,
                rot[6], rot[7], rot[8], 0,
                0, 0, 0, 1
            );
            joint.quaternion.setFromRotationMatrix(m);
        }
	};
  
	return Skeleton;
});