require.config({
	"paths": {
		'jquery'   : '../bower_components/jquery/dist/jquery',
		'can'      : '../bower_components/canjs/amd/can',
		"ejs"      : "../lib/ejs",
		"mustache" : "../lib/mustache",
		"stache"   : "../lib/stache"
	}
});

require([
'jquery',
'ejs!./views/test',
'mustache!./views/test',
'stache!./views/test',
'can/view/modifiers'
], function($, mustacheView, stacheView, ejsView) {

	$('#mustache').html(mustacheView({
		engine : 'mustache'
	}));

	$('#stache').html(stacheView({
		engine : 'stache'
	}));

	$('#ejs').html(ejsView({
		engine : 'ejs'
	}));

});