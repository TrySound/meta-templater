var fs = require('fs'),
	path = require('path');

module.exports = function (arg) {
	var filepath = arg[0],
		data = arg[1];

	if(typeof filepath === 'string') {
		return this.build(fs.readFileSync(path.resolve(filepath), 'utf-8'), data);
	}
};
