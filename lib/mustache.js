define(function() {

	var Mustache = {},
		buildMap = {};

	Mustache.load = function(name, parentRequire, load, config) {

		var path = parentRequire.toUrl(name + '.mustache');

		if(config.isBuild) {
			var compiler = require.nodeRequire('can-compile');

			compiler.compile(path, function(error, output) {
				buildMap[name] = output;
				load(output);
			});
		}
		else {
			parentRequire(['can/view/mustache', 'can/view/ejs', 'can/observe'], function(can) {
				load(function(data, helpers){
					return can.view(path, data, helpers)
				});
			});
		}
	};

	Mustache.write = function (pluginName, name, write) {
		if (buildMap.hasOwnProperty(name)) {
			var text = buildMap[name];
			write.asModule(pluginName + "!" + name, text);
		}
	};

	return Mustache;

});