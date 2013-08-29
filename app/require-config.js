// The common configuration required for the shared JS code
// Applies to testing environments as well as production and dev

// Require.js allows us to configure shortcut alias (path)
// If you don't set these here, when you come to use a module with
// 'define'(['jquery']) - for example
// it looks for a local file at js/jquery.js
var require = {
    shim: {
        "three": {
            deps: [],
            exports: "THREE"  //attaches "THREE" to the window object
        },
        "stats": {
            deps: [],
            exports: "Stats"
        },
        "dat": {
            deps: [],
            exports: "dat"
        },
        "underscore": {
            deps: [],
            exports: "_"
        }
    },
    paths: {
        stats: 'vendor/Stats',
        three: '//cdnjs.cloudflare.com/ajax/libs/three.js/r49/Three',
        text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.5/text',
        dat: '//cdnjs.cloudflare.com/ajax/libs/dat-gui/0.5/dat.gui.min',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min',
        'js-signals': '//cdnjs.cloudflare.com/ajax/libs/js-signals/0.8.1/js-signals.min',
        socketio: '//cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.16/socket.io.min',
        mocap: 'vendor/mocap'
    }
};