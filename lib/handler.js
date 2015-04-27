var extend = require('extend'),
	flatten = require('flatnest/flatten');

module.exports = Handler;

function Handler(opts) {
	this.parse = opts.parse;
	this.arg = opts.arg;
	this.op = opts.op;
	this.fn = opts.fn;
}

Handler.prototype = {
	flatten: function (tree) {
		return Array.isArray(tree) ? tree.map(function (item) {
			return item.input;
		}).join('') : '';
	},

	build: function (tree, data) {
		var fn = this.fn,
			op = this.op;

		data = extend({}, data, flatten(data));

		return Array.isArray(tree) ? tree.map(function (item) {
			var result,
				body;

			if(item.type === 'var' && data.hasOwnProperty(item.name)) {
				return data[item.name];
			}

			if(item.type === 'fn' && typeof fn[item.name] === 'function') {
				try {
					arg = this.arg(item.arg, data);
					if((result = fn[item.name](arg, data)) !== undefined) {
						return result;
					}
				} catch(e) { }
			}

			if(item.type === 'op' && typeof op[item.name] === 'function') {
				try {
					arg = item.arg ? this.arg(item.arg, data) : {};
					body = item.children;
					if((result = op[item.name](arg, body, data)) !== undefined) {
						return result;
					}
				} catch(e) {}
			}

			return item.input;
		}, this).join('') : '';
	}
};
