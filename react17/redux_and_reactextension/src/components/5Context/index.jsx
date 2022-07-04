import React, { Component } from 'react';
import './index.css';

//创建Context对象
const MyContext = React.createContext();
const { Provider, Consumer } = MyContext;
export default class A extends Component {
	state = { name: 'anna', age: 19 };
	render() {
		const { name, age } = this.state;
		return (
			<div className="parent">
				<h3>A组件</h3>
				<h4>名字是{name}</h4>
				<Provider value={{ name, age }}>
					<B />
				</Provider>
			</div>
		);
	}
}
class B extends Component {
	render() {
		return (
			<div className="child">
				<h3>B组件</h3>
				<h4>从A中接收到的名字是</h4>
				<C />
			</div>
		);
	}
}
/* class C extends Component {
	static contextType = MyContext; //声明接收context
	render() {
		const { name, age } = this.context;
		return (
			<div className="grand">
				<h3>C组件</h3>
				<h4>
					从A中接收到的名字是{name},年龄是{age}
				</h4>
			</div>
		);
	}
} */

function C() {
	return (
		<div className="grand">
			<h3>C组件</h3>
			<h4>
				<Consumer>
					{(value) => `从A中接收到的名字是${value.name},年龄是${value.age}`}
				</Consumer>
			</h4>
		</div>
	);
}
