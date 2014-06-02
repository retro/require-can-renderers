define(function() {

	var EJS = {},
		buildMap = {};

	EJS.load = function(name, parentRequire, load, config) {
		var path = parentRequire.toUrl(name + '.mustache');

		if(config.isBuild) {
			var fs = require.nodeRequire('fs'),
				shell = require.nodeRequire('shelljs'),
				tempdir = shell.tempdir(),
				cleanPath = path.replace(/\//g, '_').replace(/^_/, ''),
				filename = tempdir + cleanPath,
				built;

			console.log(cleanPath)

			shell.exec('node_modules/can-compile/bin/can-compile ' + path + ' --out ' + filename);

			built = shell.cat(filename).replace(cleanPath.replace(/\./g, '_'), name.replace(/\//g, "_") + '_mustache');

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
				builtStr = 'define("' + pluginName + "!" + name + '", ["can/view/mustache"], function(can){ var __res =' + text + '; return function(data, helpers){ return can.view("' + name.replace(/\//g, '_') + '_mustache")(data, helpers); } })';

			write(builtStr);
		}
	};

	return EJS;

});