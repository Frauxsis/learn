import React, { Component } from 'react'
import { Button } from 'antd';

export default class App extends Component {
  render() {
	 return (
			<div>
				<button>点击一下</button>
				<Button type="primary">Primary Button</Button>
			</div>
		);
  }
}
