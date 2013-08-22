/*jslint browser: true, vars: true */
define([
    "three",
    "stats",
    "underscore"
], function (THREE, Stats, _) {
    "use strict";
    
    function World(options) {
        var opts = options || {};
        this.container = opts.container || document.createElement("div");
        // Any variables we want the outside
        // to be able to access
        this.scene = new THREE.Scene();
    }
     
    World.prototype.start = function () {
        var camera, light, renderer, projector, ray;
        var mouse, center;
        var stats;

        var onDocumentMouseMove = function (event) {
            mouse.x = (event.clientX - window.innerWidth / 2) * 8;
            mouse.y = (event.clientY - window.innerHeight / 2) * 8;
        };
        
        var init = _.bind(function () {
            document.body.appendChild(this.container);

            stats = new Stats();
            stats.domElement.style.position = "absolute";
            stats.domElement.style.top = "0px";
            this.container.appendChild(stats.domElement);

            center = new THREE.Vector3();
            center.z = -1000;

            camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.set(0, 0, 500);
            this.scene.add(camera);
            
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            this.container.appendChild(renderer.domElement);

            mouse = new THREE.Vector3(0, 0, 1);
            projector = new THREE.Projector();
            ray = new THREE.Ray(camera.position);

            document.addEventListener("mousemove", onDocumentMouseMove, false);

            
        }, this);

        var render = _.bind(function () {
            camera.position.x += (mouse.x - camera.position.x) * 0.05;
            camera.position.y += (-mouse.y - camera.position.y) * 0.05;
            camera.lookAt(center);

            renderer.render(this.scene, camera);
        }, this);
        
        var animate = function () {
            window.requestAnimationFrame(animate);
            render();
            stats.update();
        };
        
        init();
        animate();
    };
    
    return World;
});
