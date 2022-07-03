import React, { Component } from 'react';

export default class Count extends Component {
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
				<h1>当前求和为：{this.props.count} </h1>
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
