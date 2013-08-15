/*jslint browser: true, vars: true */
define([
    'three',
    'text!src/shaders/depthmapper.f.glsl',
    'text!src/shaders/depthmapper.v.glsl'
], function (THREE, FragmentShader, VertexShader) {
    "use strict";

    // Model of a user's body from one OpenNI sensor.
    // Note, your video must have loaded first!    
    function DepthMap(video) {
		var texture = new THREE.Texture(video),
            width = 640,
            height = 480,
            nearClipping = 850,
            farClipping = 4000,
            geometry = new THREE.Geometry();

		for (var i = 0, l = width * height; i < l; i++) {
			var position = new THREE.Vector3();
			position.x = (i % width);
			position.y = Math.floor(i / width);

			geometry.vertices.push(position);
		}

		var material = new THREE.ShaderMaterial({
			uniforms: {
				"map": { type: "t", value: 0, texture: texture },
				"width": { type: "f", value: width },
				"height": { type: "f", value: height },
				"nearClipping": { type: "f", value: nearClipping },
				"farClipping": { type: "f", value: farClipping }
			},
			vertexShader: VertexShader,
			fragmentShader: FragmentShader,
			depthWrite: false

		});

		var mesh = new THREE.ParticleSystem(geometry, material);

		setInterval(function() {
			if (video.readyState === video.HAVE_ENOUGH_DATA) {
				texture.needsUpdate = true;
			}
		}, 1000 / 30);
        
        // The only thing we want to keep is the mesh.
        this.mesh = mesh;
    }
    
    DepthMap.prototype.translate = function (position) {
        var pos = position || {
            x: 0,
            y: 0,
            z: 0
        };
        console.log(pos);
        
        this.mesh.translateX(pos.x);
        this.mesh.translateY(pos.y);
        this.mesh.translateZ(pos.z);
    };
    
    return DepthMap;
});