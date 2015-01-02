module.exports = function (src, str, start) {
	start = start || 0;
	src = src.substring(start);

	var index = src.indexOf(str);

	if(index > -1 && src.substring(0, index) == 0) {
		return true;
	}

	return false;
};
