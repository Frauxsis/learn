// 引入Count的UI组件
import CountUI from '../../components/Count';
//引入action
import {
	createIncrementAction,
	createDecrementAction,
	createIncrementAsyncAction,
} from '../../redux/count_action';

// 引入connect用于连接UI组件和redux
import { connect } from 'react-redux';

/* mapStateToProps函数的返回的是一个对象
   对象中的key就作为传递给UI组件props的key，value就作为传递给UI组件props的value 
   mapStateToProps函数用于传递状态
 */
function mapStateToProps(state) {
	return { count: state };
}
/* mapDispatchToProps函数的返回的是一个对象
   对象中的key就作为传递给UI组件props的key，value就作为传递给UI组件props的value
   mapDispatchToProps函数用于传递操作状态的方法
 */
function mapDispatchToProps(dispatch) {
	return {
		jia: (number) => dispatch(createIncrementAction(number)), //通知redux执行加法
		jian: (number) => dispatch(createDecrementAction(number)), //通知redux执行减法
		jiaAsync: (number, time) =>
			dispatch(createIncrementAsyncAction(number, time)), //通知redux执行异步加法
	};
}

//使用connect()() 创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(CountUI);
