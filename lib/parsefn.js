var pair = require('balanced-match'),
	escape = require('escape-string-regexp'),
	parseArgs = require('./parseargs'),
	isNext = require('./isnext');


module.exports = function(src, opts, data) {
	'use strict';

	var start = 0,
		end = 0,
		match,
		fn,
		block,
		args,
		tmp;


	match = src.match(new RegExp(escape(opts.prefix) + '([$_a-zA-Z][$_0-9a-zA-Z]*)' + escape(opts.argsOpen)));

	if(match) {
		start = match.index;
		end += start + opts.prefix.length;
		if(opts.argsOpen !== opts.argsClose) {
			fn = pair(opts.argsOpen, opts.argsClose, src.substring(end));
		} else {
			tmp = src.substring(end);
			fn = {};
			fn.start = tmp.indexOf(opts.argsOpen) + 1;
			fn.end = tmp.indexOf(opts.argsOpen, fn.start);
			fn.pre = tmp.substring(0, fn.start - 1);
			fn.body = tmp.substring(fn.start, fn.end);
			fn.post = tmp.substring(fn.end + 1);
		}
	}

	if(fn) {
		end += fn.end + 1;

		if(opts.suffix && fn.post.indexOf(opts.suffix) === 0) {
			end += opts.suffix.length;
		} else if(isNext(fn.post, opts.bodyOpen)) {
			block = pair(opts.bodyOpen, opts.bodyClose, fn.post);
		}

		try {
			args = parseArgs(fn.body, data);
		} catch(e) {
			args = [];
		}
	}

	if(block) {
		end += block.end + opts.bodyClose.length;
		if(opts.suffix && block.post.indexOf(opts.suffix) === 0) {
			end += opts.suffix.length;
		}
	}

	return {
		pre: start === end ? src : src.substring(0, start),
		src: src.substring(start, end),
		post: start === end ? '' : src.substring(end),

		name: Boolean(match) ? match[1] : null,
		args: args,
		body: Boolean(block) ? block.body : null
	};
}
