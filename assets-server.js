/*jslint node: true */

// Barebones static asset server in Node
// this is because require.js gets irritated when some things are served with file://
// it prefers everything to be over http://.
//
// Thanks to http://mahoney.eu/2012/01/04/web-server-on-the-fly-node-js/ for this.
var util = require('util'),
    connect = require('connect'),
    port = process.env.PORT || 4000;

connect.createServer(connect.static(__dirname)).listen(port);
util.puts('Listening on ' + port + ', Press Ctrl + C to stop...');
