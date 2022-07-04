import React, { PureComponent } from 'react';
import './index.css';

export default class Parent extends PureComponent {
	state = { carName: '奔驰c63' };
	changeCar = () => {
		this.setState({ carName: '迈巴赫' });

		/* 不能使用
      const obj = this.state;
		obj.carName = '迈巴赫';
		this.setState(obj); */
	};

	/* shouldComponentUpdate(nextProps, nextState) {
		console.log(this.props, this.state); //目前的props，state
		console.log(nextProps, nextState); //接下来的目标props，目标state
		return !this.state.carName === nextState.carName;
	}
 */
	render() {
		console.log('parent render');
		const { carName } = this.state;
		return (
			<div className="parent">
				<h3>Parent组件</h3>
				<span>车名是{carName} </span>
				<button onClick={this.changeCar}>换车</button>
				<Child carName="奥拓" />
			</div>
		);
	}
}
class Child extends PureComponent {
	/* shouldComponentUpdate(nextProps, nextState) {
		console.log(this.props, this.state); //目前的props，state
		console.log(nextProps, nextState); //接下来的目标props，目标state
		return !this.props.carName === nextProps.carName;
	} */

	render() {
		console.log('child render');
		return (
			<div className="child">
				<h3>Child组件</h3>
				<span>接收到的车是{this.props.carName}</span>
			</div>
		);
	}
}
