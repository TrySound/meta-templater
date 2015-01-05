var flatten = require('flatnest').flatten,
	extend = require('node.extend');


function setvar(src, name, suffix, value) {
	var index = src.indexOf(name),
		suffixLength = suffix.length,
		result = '';

	while(index !== -1 && value) {
		result += src.substring(0, index) + value.toString();
		src = src.substring(index + name.length);
		if(suffix && src.indexOf(suffix) === 0) {
			src = src.substring(suffixLength);
		}
		index = src.indexOf(name);
	}

	return result + src;
};


module.exports = function (src, opts, obj) {
	if(opts.parseVars) {
		obj = extend(flatten(obj), obj);
		Object.keys(obj).forEach(function (name) {
			src = setvar(src, opts.prefix + name, opts.suffix, obj[name]);
		});
	}

	return src;
}
