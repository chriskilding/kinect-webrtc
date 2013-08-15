/*jslint browser: true, vars: true */
define([
    'three',
    'stats',
    'dat',
    'src/DepthMap',
    'src/DepthMapControls'
], function (THREE, Stats, Dat, DepthMap, DepthMapControls) {
    "use strict";
    
    var gui = new Dat.GUI();
    var numFeeds = 0;
    
    var addVideoStream = function (src, scene, position) {
        var video = document.createElement('video');
        video.addEventListener('loadedmetadata', function (event) {
            var dmap = new DepthMap(video);
            numFeeds++;
            var controls = new DepthMapControls(dmap, gui, numFeeds);
            // dmap.translate(position);
            controls.start();
            
            scene.add(dmap.mesh);
        }, false);
        
        video.loop = false; // true;
        video.src = src;
        // video.src = 'http://localhost:8080/consume/first';
        video.play();
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
            console.log("initializing");
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

            addVideoStream('textures/kinect.webm', scene, {
                x: 0,
                y: 0,
                z: 0
            });
            
			addVideoStream('textures/kinect.webm', scene, {
                x: 2000,
                y: 2000,
                z: 0
            });

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
