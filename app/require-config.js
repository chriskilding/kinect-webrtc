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
        }
    },
    paths: {
        stats: 'vendor/Stats',
        three: 'vendor/Three',
        text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.5/text',
        dat: '//cdnjs.cloudflare.com/ajax/libs/dat-gui/0.5/dat.gui.min'
    }
};