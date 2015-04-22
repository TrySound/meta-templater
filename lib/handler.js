var extend = require('node.extend'),
	flatten = require('flatnest').flatten,
	jsobj = require('./jsobj');

module.exports = Handler;

function Handler(opts) {
	extend(this, opts);
}

Handler.prototype = {
	build: function (input, data) {
		var fn = this._fn,
			op = this._op,
			list = typeof input === 'string' ? this.parser(input) : Array.isArray(input) ? input : [];
		data = extend({}, data, flatten(data));

		return list.map(function (item) {
			var result,
				body;

			if(item.type === 'var' && data.hasOwnProperty(item.name)) {
				return data[item.name];
			}

			if(item.type === 'fn' && typeof fn[item.name] === 'function') {
				if((result = fn[item.name](jsobj(item.arg, data))) !== undefined) {
					return result;
				}
			}

			if(item.type === 'op' && typeof op[item.name] === 'function') {
				arg = jsobj(item.arg, data);
				body = item.children;
				if((result = op[item.name](arg, body, data)) !== undefined) {
					return result;
				}
			}

			return item.input;
		}, this).join('');
	}
};
