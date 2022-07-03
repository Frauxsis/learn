import React, { Component } from 'react';
//引入store，用于获取redux中保存的状态
import store from '../../redux/store';

export default class Count extends Component {
	state = { carName: 'bmw' };

	/* 	componentDidMount() {
		//监测redux中状态的变化，只要变化，九调用api
		store.subscribe(() => {
			this.setState({});
		});
	} */

	increment = () => {
		const { value } = this.selectNumber;
		store.dispatch({ type: 'increment', data: value * 1 });
	};
	decrement = () => {
		const { value } = this.selectNumber;
		store.dispatch({ type: 'decrement', data: value * 1 });
	};
	incrementIfOdd = () => {
		const { value } = this.selectNumber;
		const count = store.getState();
		if (count % 2 !== 0) {
			store.dispatch({ type: 'increment', data: value * 1 });
		}
	};
	incrementAsync = () => {
		const { value } = this.selectNumber;
		setTimeout(() => {
			store.dispatch({ type: 'increment', data: value * 1 });
		}, 500);
	};

	render() {
		return (
			<div>
				<h1>当前求和为：{store.getState()}</h1>
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
