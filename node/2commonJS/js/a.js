function test() {
	console.log('test-aaa');
}
function upper(str) {
	return str.substring(0, 1).toUpperCase() + str.substring(1);
}
function _init() {
	console.log('init');
}

// module.exports = { test, upper };

exports.test = test;
exports.upper = upper;
