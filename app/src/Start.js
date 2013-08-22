/*jslint browser: true, vars: true */
define([
    "three",
    "stats",
    "src/DepthMap",
    "src/GuiControls",
    "src/RtcConnection",
    "underscore"
], function (THREE, Stats, DepthMap, GuiControls, RtcConnection, _) {
    "use strict";
    
    var gui = new GuiControls();
    var conn = new RtcConnection();
    
    var addVideoStream = function (scene, video) {
        video.addEventListener("loadedmetadata", function (event) {
            var dmap = DepthMap.create(video);
            
            gui.addMesh(dmap);
            
            scene.add(dmap);
        }, false);
        
        video.play();
    };
    
    var addRtcVideoStream = function (scene) {
        
        var video = document.createElement("video");
        conn.getLocalVideo(video);
        addVideoStream(scene, video);
    };
    
    var start = function () {
		var container;

		var scene, camera, light, renderer, projector, ray;
		var mouse, center;
		var stats;

		var onDocumentMouseMove = function (event) {
			mouse.x = (event.clientX - window.innerWidth / 2) * 8;
			mouse.y = (event.clientY - window.innerHeight / 2) * 8;
		};
        
		var init = function () {
			container = document.createElement("div");
			document.body.appendChild(container);

			stats = new Stats();
			stats.domElement.style.position = "absolute";
			stats.domElement.style.top = "0px";
            container.appendChild(stats.domElement);

			scene = new THREE.Scene();
			center = new THREE.Vector3();
			center.z = -1000;

			camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
			camera.position.set(0, 0, 500);
			scene.add(camera);
            
            
			renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			container.appendChild(renderer.domElement);

			mouse = new THREE.Vector3(0, 0, 1);
			projector = new THREE.Projector();
			ray = new THREE.Ray(camera.position);

			document.addEventListener("mousemove", onDocumentMouseMove, false);

            // Last things
            // Add the local video source to the scene
            addRtcVideoStream(scene);
            // Rig up to add remote sources to the scene as they arrive
            conn.vent.remoteStreamAdded.add(function (video) {
                addVideoStream(scene, video);
            });
            conn.startRemoteListener();
		};

        var render = function () {
			camera.position.x += (mouse.x - camera.position.x) * 0.05;
			camera.position.y += (-mouse.y - camera.position.y) * 0.05;
			camera.lookAt(center);

			renderer.render(scene, camera);
		};
        
		var animate = function () {
			window.requestAnimationFrame(animate);
			render();
			stats.update();
		};
        
        init();
        animate();
    };
    
    return {
        start: start
    };
});
