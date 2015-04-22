var fs = require('fs'),
	path = require('path'),
	extend = require('extend');

module.exports = function (arg, data) {
	var filepath = arg[0];
	data = extend({}, data, arg[1]);

	if(typeof filepath === 'string') {
		return this.build(fs.readFileSync(path.resolve(filepath), 'utf-8'), data);
	}
};
