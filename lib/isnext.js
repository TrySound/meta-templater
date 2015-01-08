module.exports = function (src, str, start) {
	var index;
	start = start || 0;
	
	if(typeof src === 'string') {
		src = src.substring(start);
		
		index = src.indexOf(str);

		if(index > -1 && src.substring(0, index) == 0) {
			return true;
		}
	}

	return false;
};
