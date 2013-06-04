module.exports = function(grunt) {

	grunt.initConfig({
		requirejs: {
			compile: {
				options: {
					name: 'app',
					baseUrl: 'test',
					mainConfigFile: 'test/app.js',
					out: 'test/actual.js'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.registerTask('default', 'requirejs');

};