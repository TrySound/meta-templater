var extend = require('extend'),
	Parser = require('./lib/parser'),
	tree = require('./lib/tree'),
	Handler = require('./lib/handler'),
	jsobj = require('./lib/jsobj');

module.exports = MT;

function MT(opts) {
	opts = extend({}, {
		prefix: '//=',
		suffix: '',
		open: '(',
		close: ')',
		arg: jsobj // (argText, data)
	}, opts);

	this.fn = {};
	this.op = {};
	this.handler = new Handler({
		_fn: this.fn,
		_op: this.op,
		arg: opts.arg,
		parser: tree(new Parser(opts))
	});

	this.addFn('include', require('./handlers/include'));
	this.addOp('if', require('./handlers/if'));
	this.addOp('each', require('./handlers/each'));
	this.addOp('print', require('./handlers/print'));
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

