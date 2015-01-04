var fs = require('fs'),
	API = require('../index');



var filename = 'index.html',
	html = fs.readFileSync(filename, 'utf-8');

var include = new API;


include.addHandler('include', function (args) {
	var html;

	if(typeof args[0] === 'string') {
		if (filename.toLowerCase() === args[0].toLowerCase()) {
			throw new Error('recursion detected in file: ' + filename);
		}

		html = fs.readFileSync('./' + args[0], 'utf-8');
		
		return include.parse(html, args[1]);
	}

	return false;
});

include.addHandler('if', function (args, body, data) {
	if(args[0]) {
		return include.parse(body, data);
	}
});


var result = include.parse(html);

fs.writeFileSync('dist.html', result, 'utf-8');
