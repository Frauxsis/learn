import React, { Component } from 'react';

//引入action
import {
	createIncrementAction,
	createDecrementAction,
	createIncrementAsyncAction,
} from '../../redux/actions/count';

// 引入connect用于连接UI组件和redux
import { connect } from 'react-redux';

//定义UI组件
class Count extends Component {
	state = { carName: 'bmw' };

	increment = () => {
		const { value } = this.selectNumber;
		this.props.jia(value * 1);
	};
	decrement = () => {
		const { value } = this.selectNumber;
		this.props.jian(value * 1);
	};
	incrementIfOdd = () => {
		const { value } = this.selectNumber;
		if (this.props.count % 2 !== 0) {
			this.props.jia(value * 1);
		}
	};
	incrementAsync = () => {
		const { value } = this.selectNumber;
		this.props.jiaAsync(value * 1, 500);
	};

	render() {
		// console.log('UI组件接收到的peops', this.props);
		return (
			<div>
				<h2>这是Count组件，下方组件总人数为：{this.props.renshu}</h2>
				<h4>当前求和为：{this.props.count}</h4>
				<select ref={(c) => (this.selectNumber = c)}>
					<option value="1">1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
					<option value="2">2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </option>
					<option value="3">3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </option>
				</select>
				&nbsp;&nbsp;
				<button onClick={this.increment}>➕</button>&nbsp;&nbsp;
				<button onClick={this.decrement}>➖</button>&nbsp;&nbsp;
				<button onClick={this.incrementIfOdd}>当前求和为奇数➕</button>
				&nbsp;&nbsp;
				<button onClick={this.incrementAsync}>异步➕</button>
			</div>
		);
	}
}

//使用connect()() 创建并暴露一个Count的容器组件
export default connect(
	(state) => ({ count: state.he, renshu: state.rens.length }),

	//mapDispatchToProps的一般写法
	/* (dispatch) => ({
		jia: (number) => dispatch(createIncrementAction(number)), //通知redux执行加法
		jian: (number) => dispatch(createDecrementAction(number)), //通知redux执行减法
		jiaAsync: (number, time) =>
			dispatch(createIncrementAsyncAction(number, time)), //通知redux执行异步加法
	}) */

	//mapDispatchToProps的简写 react-redux自动分发
	{
		jia: createIncrementAction,
		jian: createDecrementAction,
		jiaAsync: createIncrementAsyncAction,
	}
)(Count);
