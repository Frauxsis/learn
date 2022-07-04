import React, { Component } from 'react';
import Child from './Child';

export default class Parent extends Component {
	state = { hasError: '' }; //用于标识女组件是否产生错误

	//当Parent的女组件出现报错的时候，会触发  static getDerivedStateFromError(){}调用，并携带错误信息
	static getDerivedStateFromError(error) {
		console.log(error);
		return { hasError: error };
	}

	componentDidCatch() {
		console.log('此处统计错误，反馈给服务器，用于通知程序员解决bug');
	}

	render() {
		return (
			<div>
				<h2>Parent组件</h2>
				{this.state.hasError ? <h4>当前网络不稳定，请稍后再试</h4> : <Child />}
			</div>
		);
	}
}
