//默认暴露，可以暴露任意数据类型，
// 暴露什么数据接收到的就是什么数据
//只能一次

import { foo } from './module1';

//语法      export default value
// export default () => {
// 	console.log('这是默认暴露的箭头函数');
// }
export default {
	msg: '默认暴露',
	foo() {
		console.log(this.msg);
	},
};
