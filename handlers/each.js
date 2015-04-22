var extend = require('node.extend');

module.exports = function (arg, body, data) {
	if(Array.isArray(arg)) {
		return arg.map(function (item) {
			var datum = extend({}, data, item),
				result = this.build(body, datum);
			return result;
		}, this).join('');
	}
};
