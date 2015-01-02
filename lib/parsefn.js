var pair = require('balanced-match'),
	parseargs = require('./parseargs'),
	isNext = require('./isnext');


module.exports = function(post, cb, data, tracer) {
	var pre = '',
		content,
		index,
		fn,
		block,
		opts = this.opts,
		args;
	
	fn = pair('(', ')', post);
	index = fn.end + 1;
	pre += post.substring(0, index);
	post = post.substring(index);

	if(isNext(post, opts.blockOpen)) {
		// Body
		block = pair(opts.blockOpen, opts.blockClose, post);
		index = block.end + 1;
		pre += post.substring(0, index);
		post = post.substring(index);

	}
	
	if(opts.suffix && isNext(post, opts.suffix)) {
		// Suffix
		index = post.indexOf(opts.suffix) + opts.suffix.length;
		pre += post.substring(0, index);
		post = post.substring(index);
	}


	if(typeof cb === 'function') {
		try {
			args = parseargs(fn.body, data);
		} catch(e) {
			this.emit('error', tracer(e.message));
			content = false;
		}

		content = cb(args, block && block.body, data) || '';
	}

	return {
		content: content,
		pre: pre,
		post: post
	};
}
