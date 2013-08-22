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
    
    var start = function () {
        var world = new World();
        
        world.start();
        
        // Last things
        
        // In the receiver app
        // we are not actually adding the local stream to the scene
        // but for some reason
        // we can't connect remote streams without this!
        // TODO probably due to permissions on peerconnection
        // also being linked to getUserMedia permissions??
        conn.getLocalVideo();
        
        // Rig up to add remote sources to the scene as they arrive
        conn.vent.remoteStreamAdded.add(function (video) {
            addVideoStream(world.scene, video);
        });
        conn.startRemoteListener();

       
    };
    
    return {
        start: start
    };
});
