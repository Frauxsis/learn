import React, { Component } from 'react';
// import qs from 'qs'; //queryString

const DetailData = [
	{ id: '01', content: 'hello world' },
	{ id: '02', content: 'hello atguigu' },
	{ id: '03', content: 'hello future' },
];

export default class Detail extends Component {
	render() {
		/* v5 state */
		const { id, title } = this.props.location.state || {};
		const findResult =
			DetailData.find((detailObj) => {
				return detailObj.id === id;
			}) || {};
		return (
			<ul>
				<li>ID:{id}</li>
				<li>TITLE:{title}</li>
				<li>CONTENR:{findResult.content}</li>
			</ul>
		);
	}
}
