require.config({
	"paths": {
		"can": "../can",
		"ejs": "../lib/ejs",
		"jquery": "../lib/jquery"
	}
});

require(['can/util/library', 'can/view/ejs', 'ejs!init', 'ejs!views/foo', 'can/observe'], function(can, EJS, init, foo) {

	var html = init({ foo: 'bar' });
	$('div').html(html);

	var bar = new can.Observe({
		time: Date.now()
	});

	$('body').append(foo(bar));

	setTimeout(function() {
		bar.attr('time', Date.now());
	}, 1000);

});