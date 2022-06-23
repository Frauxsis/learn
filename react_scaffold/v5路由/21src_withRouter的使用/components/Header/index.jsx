import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'; //v5

class Header extends Component {
	back = () => {
		this.props.history.goBack();
	};
	forward = () => {
		this.props.history.goForward();
	};
	go = () => {
		this.props.history.go();
	};

	render() {
		// console.log('Header组件收到的props是',this.props);
		return (
			<div className="page-header">
				<h2>React Router Demo</h2>
				<button onClick={this.back}>回退</button>
				<button onClick={this.forward}>前进</button>
				<button onClick={this.go}>去</button>
			</div>
		);
	}
}
export default withRouter(Header); //v5
// withRouter 可以加工一般组件，让一般组件具有路由组件所具有的API
// withRouter 的返回值是一个新组件
