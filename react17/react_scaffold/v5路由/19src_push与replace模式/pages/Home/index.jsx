import React, { Component } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import MyNavLink from '../../components/MyNavLink';
import News from './News';
import Message from './Message';

export default class Home extends Component {
	render() {
		return (
			<div>
				<h3>这是Home的内容</h3>
				<div>
					<ul className="nav nav-tabs">
						<li>
							<MyNavLink replace to="/home/news">News</MyNavLink>
							<MyNavLink replace to="/home/message">Message</MyNavLink>
						</li>
					</ul>
					<Routes>
						<Route path="news" element={<News />} />
						<Route path="message/*" element={<Message />} />
						<Route path="/" element={<Navigate to="/home/news" replace />} />
					</Routes>
				</div>
			</div>
		);
	}
}
