/* 1 该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
   2 reducer函数回接收到两个参数，分别为previousState（之前的状态），action（动作对象）
*/

import { INCREMENT, DECREMENT } from './constant';

const initState = 0;
export default function countReducer(preState = initState, action) {
	//从action对象中获取 type,data
	const { type, data } = action;
	//根据type决定如何加工数据
	switch (type) {
		case INCREMENT: //加法
			return preState + data;
		case DECREMENT: //减法
			return preState - data;

		default:
			return preState;
	}
}
