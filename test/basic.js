'use strict';

var Templater = require('..'),
	test = require('tape'),
	fs = require('fs');

var templater = new Templater({
	prefix: '@@'
});

templater.addHandler('include', function (args) {
	var content = fs.readFileSync(args[0], 'utf-8');

	return this.parse(content, args[1]);
});

templater.addHandler('if', function (args, body, data) {
	if (args[0]) {
		return this.parse(body, data);
	}
});

test('include', function(t) {
	var result = templater.parse(fs.readFileSync('./fixtures/index.html', 'utf-8'));

	t.equal(result, '<h1>index</h1>\n<a>a:test:a</a>\n\n<span>\n\t<a>b</a>\n</span>\n\n');
	t.end();
});
