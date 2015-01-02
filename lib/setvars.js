var flatten = require('flatnest').flatten,
	extend = require('node.extend');


function setvar(src, name, value) {
	var index = src.indexOf(name),
		result = '';

	while(index !== -1 && value) {
		result += src.substring(0, index) + value.toString();
		src = src.substring(index + name.length);
		index = src.indexOf(name);
	}

	return result + src;
};


module.exports = function (src, obj) {
	var prefix = '',
		suffix = '';
	
	if(this.opts) {
		prefix = this.opts.prefix;
		suffix = this.opts.suffix;
	}

	obj = extend(flatten(obj), obj);
	Object.keys(obj).forEach(function (name) {
		src = setvar(src, prefix + name + suffix, obj[name]);
	});

	return src;
}
