define(function() {

	var Stache = {},
		buildMap = {};

	Stache.load = function(name, parentRequire, load, config) {

		var path = parentRequire.toUrl(name + '.stache');

		if(config.isBuild) {
			var shell = require.nodeRequire('shelljs'),
				jsesc = require.nodeRequire('jsesc'),
				file = shell.cat(path),
				built = jsesc(file);
				
			buildMap[name] = built;
			load(built);
		} else {
			parentRequire(['can/view', 'can/view/stache'], function(can) {
				load(function(data, helpers){
					return can.view(path, data, helpers)
				});
			});
		}
	};

	Stache.write = function (pluginName, name, write) {
		if (buildMap.hasOwnProperty(name)) {
			var text = buildMap[name],
				builtStr = "define('" + pluginName + "!" + name + "', ['can/view/stache'], function(stache){ var __renderer = stache('" + text + "'); return function(data, helpers){ return __renderer(data, helpers); } });";

			write(builtStr);
			
		}
	};

	return Stache;

});