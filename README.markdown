# kinect-webrtc
This is the browser component of a motion capture based scene reconstruction system. Given multiple mocap sensors, the system will combine the depth maps from each one to form a 360 degree reconstruction of the object they are all looking at.

## Browser pre-requisites
As of 2014 the requirements are somewhat esoteric; your browser must have good support for the following.
- WebGL with decent h/w acceleration
- WebRTC video and audio sessions
- EventSource
- Support for reading video streams from local DirectShow media sources. This is the one that trips up most browsers; Google Chrome Canary 31+ is known to work. 

## Other pre-requisites
The browser component cannot do everything by itself, so you will also need the following.

- A WebRTC server to mediate peer discovery - you can use the one in the /rtcserver folder if you want, or roll your own.
- A native Kinect plugin which can import a depth map stream into the browser as a grayscale WebRTC video source. Writing your own is probably going to be tedious; if you're on Windows (which is quite likely if you are using the Kinect) you could use [this fork of NiVirtualCam](https://github.com/themasterchef/NiVirtualCam) which exports the depth map as a DirectShow video source, which can in turn be accessed by a browser.
- An EventSource streaming server, to get an optional skeleton data feed. (You can pass the URL of your skeleton data relay server as an argument to the forked NiVirtualCam executable, which will enable this functionality.)
- A static assets server for the browser-side app, because browsers and require.js usually break when loading it from file:/// URLs. Either use the `assets-server.js` in this project, or roll your own.

## How to use
1. Ensure all necessary remote servers are up and running.
2. Plug one Kinect (or equivalent) sensor into each client (PC) that will be participating in the WebRTC shared session.
3. Fire up the native sensor plugin on each PC. 
4. Open up Web browsers on each PC and go to the app URL.
5. On each PC, click the button in the DAT GUI controls (in the top right of the screen) to join the shared session (note, the session ID is hardcoded so you probably want to change that).

## Debugging
- A sample WebM Kinect video stream is provided in `textures/kinect.webm`. This file is originally from MrDoob's Three.js Kinect experiment. You will need to modify the source a bit to read this, but it can help to troubleshoot the visualisation component of the browser app.