let moduleA = require('./a');
function test() {
	console.log('test-bbb');
}

console.log(moduleA.upper('gloria'));
module.exports = test;
