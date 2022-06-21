import React, { Component } from 'react';
import axios from 'axios';

export default class Search extends Component {
	search = () => {
		//获取用户的输入（连续解构赋值+重命名）
		const {
			keyWordElement: { value: keyWord },
		} = this;
		//发送请求前，通知App更新状态
		this.props.updateAppState({
			isFirst: false,
			isLoading: true,
		});
		//发送网络请求
		axios.get(`/api1/search/users?q=${keyWord}`).then(
			(response) => {
				//请求成功后，通知App更新状态
				this.props.updateAppState({
					isLoading: false,
					users: response.data.items,
				});
			},
			(error) => {
				//请求失败后，通知App更新状态
				this.props.updateAppState({
					isLoading: false,
					err: error.message,
				});
			}
		);
	};

	render() {
		return (
			<section className="jumbotron">
				<h3 className="jumbotron-heading">Search Github Users</h3>
				<div>
					<input
						ref={(c) => (this.keyWordElement = c)}
						type="text"
						placeholder="enter the name you search"
					/>
					&nbsp;<button onClick={this.search}>Search</button>
				</div>
			</section>
		);
	}
}
