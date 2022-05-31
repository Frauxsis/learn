function myModule() {
	// 私有数据
    var msg = "lkjFRGOjfds";
    // 操作数据的函数
	function doSomeThing() {
		console.log("doSomeThing()" + msg.toUpperCase());
	}
	function doOtherThing() {
		console.log("doOtherThing()" + msg.toLowerCase());
    }

    // 向外暴露对象（给外部使用的方法）
	return {
		doSomeThing: doSomeThing,
		doOtherThing: doOtherThing,
	};
}
