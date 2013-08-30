/*jslint browser: true, vars: true */
define([
    "src/DepthMap",
    "src/GuiControls",
    "src/RtcConnection",
    "src/World",
    "underscore",
    "mocap",
    "src/Skeleton"
], function (DepthMap, GuiControls, RtcConnection, World, _, Mocap, Skeleton) {
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
    
    var addSkeleton = function (scene, bcaster) {
        // Plumb data into a skeleton visualization
        var skeleton = new Skeleton();
        scene.add(skeleton.skeletonPoints);
        // Add to the Gui
        console.log(skeleton);
        // gui.addMesh(skeleton);
        return skeleton;
    };
    
    var start = function () {
        // Set up the 3D world
        var world = new World();
        
        // Wire up our skeleton data source
        var bcaster = new Mocap.Broadcaster();

        // SSE data source, with custom URL
        // WARNING: mocap data is *usually* JSON
        // but an SSE server can just send any old string if it wants
        // so ensure the server is, in fact, outputting JSON strings
        var source = new Mocap.ServerSentEventsSource(bcaster, "http://localhost:2000/skeleton");
        
        var skeleton = addSkeleton(world.scene, bcaster);
        // move the whole skeleton avatar - no rate limiting
        bcaster.vent.skeleton.add(skeleton.update, skeleton);
        
        source.start();
        
        // Last things
        // Add the local video source to the scene
        addRtcVideoStream(world.scene);
        // Rig up to add remote sources to the scene as they arrive
        conn.vent.remoteStreamAdded.add(function (video) {
            addVideoStream(world.scene, video);
        });
        conn.startRemoteListener();

        world.start();
    };
    
    return {
        start: start
    };
});
