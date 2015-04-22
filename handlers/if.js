module.exports = function (arg, body, data) {
	return arg[0] ? this.build(body, data) : '';
};
