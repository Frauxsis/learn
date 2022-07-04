import React, { Component } from 'react';
import C from '../1setState'
import './index.css';

export default class Parent extends Component {
	render() {
		return (
			<div className="parent">
				<h3>Parent组件</h3>
				<A render={(name) => <C name={name} />} />
			</div>
		);
	}
}
class A extends Component {
	state = { name: 'anna' };
	render() {
		console.log(this.props);
		return (
			<div className="a">
				<h3>A组件</h3>
				{this.props.render(this.state.name)}
			</div>
		);
	}
}
class B extends Component {
	render() {
		console.log('B render');
		return (
			<div className="b">
				<h3>B组件{this.props.name}</h3>
			</div>
		);
	}
}
