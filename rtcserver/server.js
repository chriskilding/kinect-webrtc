/*jslint node: true */

// Spin up the WebRTC signalling server
var port = process.env.PORT || 80;
console.log("Starting WebRTC signalling server on port", port);
var webRTC = require('webrtc.io').listen(port);