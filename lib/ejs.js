define(function() {

	var EJS = {},
		buildMap = {};

	var toId = function (src) {
		var arr = src.toString().split(/\/|\./g),
			filteredArr = [];

		for(var i = 0; i < arr.length; i++){
			if(arr[i]){
				filteredArr.push(arr[i]);
			}
		}

		return filteredArr.join('_')
	} 

	EJS.load = function(name, parentRequire, load, config) {
		var path = parentRequire.toUrl(name + '.mustache');

		if(config.isBuild) {
			var fs = require.nodeRequire('fs'),
				shell = require.nodeRequire('shelljs'),
				tempdir = shell.tempdir(),
				cleanPath = toId(name),
				filename = tempdir + cleanPath,
				built;

			shell.exec('node_modules/can-compile/bin/can-compile ' + path + ' --out ' + filename);

			built = shell.cat(filename).replace(/preload\('.*'/, "preload('"  + toId(name) + '_mustache' + "'");

			buildMap[name] = built;
			load(built);
		} else {
			parentRequire(['can/view/mustache'], function(can) {
				load(function(data, helpers){
					return can.view(path, data, helpers)
				});
			});
		}
	};

	EJS.write = function (pluginName, name, write) {
		if (buildMap.hasOwnProperty(name)) {
			var text = buildMap[name],
				builtStr = 'define("' + pluginName + "!" + name + '", ["can/view/mustache"], function(can){ var __res =' + text + '; return function(data, helpers){ return can.view("' + toId(name) + '_mustache")(data, helpers); } })';

			write(builtStr);
		}
	};

	return EJS;

});