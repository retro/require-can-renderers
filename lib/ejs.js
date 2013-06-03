define(function() {
	var EJS = {},
	buildMap = {};

	EJS.load = function(name, parentRequire, load, config) {
		var path = parentRequire.toUrl(name + '.ejs'),
		id = name.replace(/[\.\/]/g, "_");

		if(config.isBuild) {
			var compiler = require.nodeRequire('can-compile'),
			text = fs.readFileSync(path).toString();

			var script = compiler.compileSync(path);

			// buildMap[id] = 'can.view.preload("' + id + '",' + script + ')';
			buildMap[id] = script;
			load();
		}
		else {
			parentRequire(['can/view/ejs'], function(can) {
				load(can.view(path));
			});
		}
	};

	EJS.write = function (pluginName, name, write) {
		var id = name.replace(/[\.\/]/g, "_");

		if (buildMap.hasOwnProperty(id)) {
			write('define("' + name + '_preload", ["can/view/ejs"], function() { can.view.preload("' + id + '", ' + buildMap[id] + ') });');
			write('define("' + pluginName + '!' + name + '", ["can/view/ejs"], function(can) { return ' + buildMap[id] + '});');
		}
	};

	return EJS;

});