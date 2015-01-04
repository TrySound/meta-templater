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


module.exports = function (src, opts, obj) {
	if(opts.parseVars) {
		obj = extend(flatten(obj), obj);
		Object.keys(obj).forEach(function (name) {
			src = setvar(src, opts.prefix + name + opts.suffix, obj[name]);
		});
	}

	return src;
}
