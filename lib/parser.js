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
			item = this.item;
			if(this.trackName()) {
				item.type = 'var';

				if(this.trackArg()) {
					item.type = 'fn';
				}

				if(this.trackBody()) {
					item.type = 'op';
				}

				if(this.trackSuffix()) {
					this.list.push(item);
				}
			}
		}

		return this.list;
	},

	trackPrefix: function () {
		var start = this.input.indexOf(this.prefix, this.index);

		if(start > -1) {
			this.item = {};
			this.item.start = start;
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
			this.item.name = name;
			return true;
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
			this.item.arg = open + arg.body + close;
			return true;
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
			this.item.bodyIndex = index + body.start + open.length;
			this.item.body = body.body;
			this.index = index + body.end + close.length;
			return true;
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
				this.item.end = this.index = index + suffix.length;
				return true;
			}
		} else {
			this.item.end = index;
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
