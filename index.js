// var ee = require('events').EventEmitter;
var extend = require('node.extend'),
	setVars = require('./lib/setvars'),
	parsefn = require('./lib/parsefn');


module.exports = API;
function API(opts) {
	opts = opts || {};
	opts = extend({
		parseVars: true,
		prefix: '@@',
		suffix: '',
		blockOpen: '{',
		blockClose: '}'
	}, opts);

	// extend(true, this, new ee);
	// this.on('error', function () {});
	this.opts = opts;
	this.handlers = {};
}

API.prototype.addHandler = function (name, handler) {
	this.handlers[name] = handler;
};

API.prototype.removeHandler = function (name) {
	this.handlers[name] = null;
};

API.prototype.parse = function (src, data) {
	var pre = '',
		post = src,
		fn,
		result;

	data = typeof data === 'object' && data !== null ? data : {};

	while(post) {
		fn = parsefn(post, this.opts, data);

		pre += setVars(fn.pre, this.opts, data);

		if(typeof this.handlers[fn.name] === 'function') {
			result = this.handlers[fn.name](fn.args, fn.body);
			pre += result === false ? fn.src : typeof result === 'string' ? result : '';
		} else {
			pre += fn.src;
		}
		
		result = null;
		post = fn.post;
	}

	return pre;
};


