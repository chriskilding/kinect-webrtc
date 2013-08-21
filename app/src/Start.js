/*jslint browser: true, vars: true */
define([
    'three',
    'stats',
    'src/DepthMap',
    'src/GuiControls'
], function (THREE, Stats, DepthMap, GuiControls) {
    "use strict";
    
    // Set up WebRTC
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
    
    var gui = new GuiControls();
    
    var addRemoteVideoStream = function (src, scene) {
        // Create a video
        var video = document.createElement('video');
        
        video.addEventListener('loadedmetadata', function (event) {
            var dmap = DepthMap.create(video);
            console.log(dmap);
            gui.addMesh(dmap);
            
            scene.add(dmap);
        }, false);
        
        video.loop = false; // true;
        video.src = src;
        video.play();
    };
    
    var addRtcVideoStream = function (scene) {
        if (navigator.getUserMedia) {
            navigator.getUserMedia(
                {video: true},
                function (localMediaStream) {
                    console.log("User granted camera access");
                    // User granted camera access - pass WebRTC video stream as URL
                    var videoUrl = window.URL.createObjectURL(localMediaStream);
                    // Don't worry, we can still see this function in this context
                    addRemoteVideoStream(videoUrl, scene);
                },
                // Browser has WebRTC,
                // but user denied access to camera
                // or the system doesn't have a camera
                function (error) {
                    console.log("Browser supports WebRTC, but camera access was denied.", error);
                }
            );
        } else {
            // Browser doesn't support WebRTC
            // so doesn't even have a getUserMedia function
            console.log("Browser doesn't support WebRTC or has no getUserMedia()");
        }
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
			container = document.createElement('div');
			document.body.appendChild(container);

			stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.top = '0px';
            container.appendChild(stats.domElement);

			scene = new THREE.Scene();
			center = new THREE.Vector3();
			center.z = -1000;

			camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
			camera.position.set(0, 0, 500);
			scene.add(camera);

            /*addVideoStream('textures/kinect.webm', scene, {
                x: 0,
                y: 0,
                z: 0
            });*/
            
			/*addRemoteVideoStream('http://131.227.68.188:8080/consume/first', scene, {
                x: 0,
                y: 0,
                z: 0
            });*/
            
            addRtcVideoStream(scene);

			renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			container.appendChild(renderer.domElement);

			mouse = new THREE.Vector3(0, 0, 1);
			projector = new THREE.Projector();
			ray = new THREE.Ray(camera.position);

			document.addEventListener('mousemove', onDocumentMouseMove, false);

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
