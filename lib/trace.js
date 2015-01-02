var extend = require('node.extend');


function getPosition(src, end, newLineOnly) {
	var line = 0,
		index = 0,
		prev = 0;

	// Count only '\n'
	if(newLineOnly) {
		src = src.replace(/(\r\n|\n|\r)/gm,"\n");
	}


	while(index < end) {
		prev = index;
		index = src.indexOf('\n', index) + 1;
		line++;
	}

	return {
		line: line,
		column: end - prev + 1,
		src: src,
		index: end
	};
}


module.exports = function (src, index, newLineOnly) {
	var position = getPosition(src, index, newLineOnly);

	return function (msg) {
		return extend(position, {message: msg});
	};
};
