var extend = require('node.extend'),
	Parser = require('./lib/parser'),
	tree = require('./lib/tree'),
	Handler = require('./lib/handler');

module.exports = MT;

function MT(opts) {
	opts = extend({}, {
		prefix: '//=',
		suffix: '',
		open: '(',
		close: ')'
	}, opts);

	this.fn = {};
	this.op = {};
	this.handler = new Handler({
		_fn: this.fn,
		_op: this.op,
		parser: tree(new Parser(opts))
	});

	this.addFn('include', require('./handlers/include'));
	this.addOp('if', require('./handlers/if'));
	this.addOp('each', require('./handlers/each'));
}

MT.prototype = {
	addFn: function (name, fn) {
		if(typeof name === 'string' && name.length && typeof fn === 'function') {
			this.fn[name] = fn.bind(this.handler);
		}

		return this;
	},

	addOp: function (name, fn) {
		if(typeof name === 'string' && name.length && typeof fn === 'function') {
			this.op[name] = fn.bind(this.handler);
		}

		return this;
	},

	build: function (input, data) {
		return this.handler.build(input, data);
	}
};
