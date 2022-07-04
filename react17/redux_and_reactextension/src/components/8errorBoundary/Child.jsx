import React, { Component } from 'react';

export default class Child extends Component {
	/* 	state = {
		users: [
			{ id: '001', name: 'anna', age: 19 },
			{ id: '002', name: 'enda', age: 34 },
			{ id: '003', name: 'gloria', age: 76 },
		],
	}; */
	state = { users: 'aaaa' };
	render() {
		return (
			<div>
				<h2>Child组件</h2>
				{this.state.users.map((userObj) => {
					return (
						<h4 key={userObj.id}>
							{userObj.name}---{userObj.age}
						</h4>
					);
				})}
			</div>
		);
	}
}
