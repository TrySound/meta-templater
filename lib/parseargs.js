var __extractMetaModule = require('php-extract');


module.exports = function (__argsMetaModule, __varsMetaModule) {
	if(typeof __varsMetaModule === 'object') {
		eval(__extractMetaModule(__varsMetaModule));
	}
	return eval('(function () { return arguments; } (' + __argsMetaModule + '));');
};
