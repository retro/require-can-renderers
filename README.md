require-can-renderers
=====================

CanJS view renderers for the Require.js

## Installation

    $ npm install require-can-renderers --save
    
Add paths to your requirejs config:

    	require.config({
    		"paths": {
    			"ejs"      : "node_modules/require-can-renderers/lib/ejs",
    			"mustache" : "node_modules/require-can-renderers/lib/mustache",
    			"stache"   : "node_modules/require-can-renderers/lib/stache"
    		}
    	});
    	
This will support both loading the templates in the development environment and compiling them with the r.js optimizer.
