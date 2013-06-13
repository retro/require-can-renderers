define(function() {

	var EJS = {},
		buildMap = {};

	EJS.load = function(name, parentRequire, load, config) {
		var path = parentRequire.toUrl(name + '.ejs');

		if(config.isBuild) {
			var compiler = require.nodeRequire('can-compile');

			compiler.compile(path, function(error, output) {
				buildMap[name] = output;
				load(output);
			});
		}
		else {
			parentRequire(['can/view/ejs', 'can/observe'], function(can) {
				load(function(data, helpers){
					return can.view(path, data, helpers)
				});
			});
		}
	};

	EJS.write = function (pluginName, name, write) {
		if (buildMap.hasOwnProperty(name)) {
			var text = buildMap[name];
			write.asModule(pluginName + "!" + name, text);
		}
	};

	return EJS;

});