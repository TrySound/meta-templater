var ee = require('events').EventEmitter,
	extend = require('node.extend');


var trace = require('./lib/trace'),
	setvars = require('./lib/setvars'),
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

	extend(true, this, new ee);
	this.on('error', function () {});
	this.opts = opts;
	this.fnRegExp = new RegExp(opts.prefix + '([$_a-zA-Z][$_0-9a-zA-Z]*)\\(');
	this.handlers = {};
}

API.prototype.addHandler = function (name, handler) {
	this.handlers[name] = handler;
};

API.prototype.removeHandler = function (name) {
	this.handlers[name] = null;
};

API.prototype.parse = function (src, data) {
	var match,
		parse,
		tracer,
		index = 0,
		pre = '',
		post = src;


	while(typeof post === 'string' && post) {
		match = post.match(this.fnRegExp);
		if(match) {
			index += match.index;
			if(this.opts.parseVars) {
				pre += setvars.call(this, post.substring(0, match.index), data);
			} else {
				pre += post.substring(0, match.index);
			}

			if(Object.keys(this.handlers).indexOf(match[1]) !== -1) {
				result = parsefn.call(this, post.substring(match.index), this.handlers[match[1]], data, trace(src, index));
				pre += (result.content !== false ? result.content : result.pre);
			} else {
				result = parsefn.call(this, post.substring(match.index));
				pre += result.pre;
			}
			index += result.pre.length;
			post = result.post;
		} else {
			index += post.length;
			if(this.opts.parseVars) {
				pre += setvars.call(this, post, data);
			} else {
				pre += post;
			}
			post = false;
		}
	}

	return pre;
};


