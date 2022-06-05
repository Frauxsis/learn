//命名空间模式：简单对象封装

let obj = {
	msg: 'module1',
	foo() {
		console.log('foo()', this.msg);
	},
};
