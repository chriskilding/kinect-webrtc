/*jslint browser: true, vars: true */
define([
    "src/DepthMap",
    "src/GuiControls",
    "src/World",
    "underscore",
    "mocap",
    "src/Skeleton"
], function (DepthMap, GuiControls, World, _, Mocap, Skeleton) {
    "use strict";
    
    function Visualizer() {
    
        this.gui = new GuiControls();
        // Set up the 3D world
        this.world = new World();
        
        // Wire up our skeleton data source
        this.bcaster = new Mocap.Broadcaster();
        
    }
    Visualizer.prototype.addVideoStream = function (video) {
        video.addEventListener("loadedmetadata", _.bind(function (event) {
            var dmap = DepthMap.create(video);
            
            this.gui.addMesh(dmap);
            
            this.world.scene.add(dmap);
        }, this), false);
        
        video.play();
    };
        
    Visualizer.prototype.addSkeleton = function (uri) {
        // Get the data source going
        // SSE data source, with custom URL
        // WARNING: mocap data is *usually* JSON
        // but an SSE server can just send any old string if it wants
        // so ensure the server is, in fact, outputting JSON strings
        var source = new Mocap.ServerSentEventsSource(this.bcaster, uri);
        
        // Plumb data into a skeleton visualization
        var skeleton = new Skeleton();
        this.world.scene.add(skeleton.skeletonPoints);
        // Add to the Gui
        console.log(skeleton);
        // gui.addMesh(skeleton);
        
        // move the whole skeleton avatar - no rate limiting
        this.bcaster.vent.skeleton.add(skeleton.update, skeleton);
        
        source.start();
    };
        
    Visualizer.prototype.start = function () {
        this.addSkeleton("http://localhost:2000/skeleton");

        this.world.start();
    };
    
    return Visualizer;
});
