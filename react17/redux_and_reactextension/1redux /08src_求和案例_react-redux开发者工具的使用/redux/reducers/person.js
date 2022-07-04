import { ADD_PERSON } from '../constant';

//初始化人的列表
const initState = [{ id: '001', name: 'anna', age: 19 }];
export default function personReducer(preState = initState, action) {
	const { type, data } = action;
	switch (type) {
		case ADD_PERSON: //若是添加一个人
			/* 不能使用 preState.unshift(data)
			会导致preState被改写，personReducer就不是纯函数了
			*/
			return [data, ...preState];
		default:
			return preState;
	}
}
