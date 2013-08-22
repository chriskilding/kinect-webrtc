/*jslint browser: true, vars: true */
define([
    "src/DepthMap",
    "src/GuiControls",
    "src/RtcConnection",
    "src/World",
    "underscore"
], function (DepthMap, GuiControls, RtcConnection, World, _) {
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
        var world = new World();
        
        
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
