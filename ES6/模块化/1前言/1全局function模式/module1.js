//全局函数模式：将不同的功能分装到不同的全局函数中

let msg = 'mosile1';
function foo() {
	console.log('foo()', msg);
}

function bar() {
	console.log('foo()', msg);
}
