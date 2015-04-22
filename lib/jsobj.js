'use strict';

module.exports = function (__argString, data) {
	data = typeof data === 'object' ? data : {};
	return eval(__argString);
};
