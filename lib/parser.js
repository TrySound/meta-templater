'use strict';

var pair = require('balanced-match');

module.exports = Parser;

function Parser(opts) {
	this.prefix = opts.prefix;
	this.suffix = opts.suffix;
	this.open = opts.open;
	this.close = opts.close;
}

Parser.prototype = {
	process: function (input, start) {
		var name, arg, body,
			item;

		this.list = [];
		this.input = input;
		this.index = 0;

		while(this.trackPrefix()) {
			item = {
				start: this.index - this.prefix.length
			};

			if(name = this.trackName()) {
				item.name = name;

				if(arg = this.trackArg()) {
					item.arg = arg;

					if(typeof (body = this.trackBody()) === 'string') {
						item.body = body;
						item.bodyIndex = this.bodyIndex;

				// append item
						if(this.trackSuffix()) {
							item.type = 'op';
							this.add(item);
						}
					} else if(this.trackSuffix()) {
						item.type = 'fn';
						this.add(item);
					}
				} else if(this.trackSuffix()) {
					item.type = 'var';
					this.add(item);
				}
			}
		}

		return this.list;
	},

	add: function (item) {
		item.end = this.index;
		this.list.push(item);
	},

	trackPrefix: function () {
		var start = this.input.indexOf(this.prefix, this.index);

		if(start > -1) {
			this.index = start + this.prefix.length;
			return true;
		}
	},

	trackName: function () {
		var input = this.input,
			index = this.index,
			name = '';

		while(isWhiteChar(input[index])) {
			index += 1;
		}

		while(isNameChar(input[index])) {
			name += input[index];
			index += 1;
		}

		if(name.length) {
			this.index = index;
			return name;
		} else {
			return false;
		}
	},

	trackArg: function () {
		var input = this.input,
			index = this.index,
			open, close, arg;

		if(input[index] === '{') {
			open = '{';
			close = '}';
			arg = true;
		}

		if(input[index] === '[') {
			open = '[';
			close = ']';
			arg = true;
		}

		arg = arg && pair(open, close, input.substring(index));

		if(arg) {
			this.index = index + arg.end + close.length;
			return open + arg.body + close;
		}
	},

	trackBody: function () {
		var input = this.input,
			index = this.index,
			open = this.open,
			close = this.close,
			body;

		while(isWhiteChar(input[index])) {
			index += 1;
		}

		if(input.indexOf(open, index) === index) {
			body = pair(open, close, input.substring(index));
		}

		if(body) {
			this.bodyIndex = index + body.start + open.length;
			this.index = index + body.end + close.length;
			return body.body;
		}
	},

	trackSuffix: function () {
		var input = this.input,
			index = this.index,
			suffix = this.suffix;

		if(suffix) {
			while(isWhiteChar(input[index])) {
				index += 1;
			}

			if(input.indexOf(suffix, index) === index) {
				this.index = index + suffix.length;
				return true;
			}
		} else {
			return true;
		}
	}
};

function isWhiteChar(ch) {
	return ch === ' ';
}

function isNameChar(ch) {
	var code = ch.charCodeAt(0),
		allowed = ['_', '.'];

	// 0-9a-zA-Z_.
	return 48 <= code && code <= 57
		|| 65 <= code && code <= 90
		|| 97 <= code && code <= 122
		|| allowed.indexOf(ch) > -1;
}
