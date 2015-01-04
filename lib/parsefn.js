var pair = require('balanced-match'),
	escape = require('escape-regexp'),
	parseArgs = require('./parseargs'),
	isNext = require('./isnext');


module.exports = function(src, opts, data) {
	'use strict';

	var start = 0,
		end = 0,
		match,
		fn,
		block,
		args;
	

	match = src.match(new RegExp(escape(opts.prefix) + '([$_a-zA-Z][$_0-9a-zA-Z]*)\\('));

	if(match) {
		start = match.index;
		end += start;
		fn = pair('(', ')', src.substring(start));
	}

	if(fn) {
		end += fn.end + 1;
		
		if(opts.suffix && isNext(fn.post, opts.suffix)) {
			end += fn.post.indexOf(opts.suffix) + opts.suffix.length;
		} else if(isNext(fn.post, opts.blockOpen)) {
			block = pair(opts.blockOpen, opts.blockClose + opts.suffix, fn.post);
		}

		try {
			args = parseArgs(fn.body, data);
		} catch(e) {
			args = [];
		}
	}

	if(block) {
		end += block.end + opts.blockClose.length + opts.suffix.length;
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
