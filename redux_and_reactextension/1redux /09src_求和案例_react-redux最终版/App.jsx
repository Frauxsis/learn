import React, { Component } from 'react';
import Count from './containers/Count'; //引入的 Count的容器组件
import Person from './containers/Person'; //引入的 Person的容器组件

export default class App extends Component {
	render() {
		return (
			<div>
				<Count />
				<hr />
				<Person />
			</div>
		);
	}
}
