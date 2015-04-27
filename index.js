var extend = require('extend'),
	Parser = require('./lib/parser'),
	tree = require('./lib/tree'),
	Handler = require('./lib/handler'),
	jsobj = require('./lib/jsobj');

module.exports = MT;

function MT(opts) {
	opts = extend(true, {}, {
		prefix: '//=',
		suffix: '',
		open: '(',
		close: ')',
		arg: 'json', // json || round
		argExec: jsobj // (argText, data)
	}, opts);

	this.handler = new Handler({
		fn: {},
		op: {},
		arg: opts.argExec,
		parse: tree(new Parser(opts))
	});

	this.addFn('include', require('./handlers/include'));
	this.addOp('if', require('./handlers/if'));
	this.addOp('each', require('./handlers/each'));
	this.addOp('print', require('./handlers/print'));
}

MT.prototype = {
	addFn: function (name, cb) {
		if(typeof name === 'string' && name.length && typeof cb === 'function') {
			this.handler.fn[name] = cb.bind(this.handler);
		}

		return this;
	},

	addOp: function (name, cb) {
		if(typeof name === 'string' && name.length && typeof cb === 'function') {
			this.handler.op[name] = cb.bind(this.handler);
		}

		return this;
	},

	build: function (input, data) {
		if(typeof input === 'string') {
			return this.handler.build(this.handler.parse(input), data);
		}
	}
};

