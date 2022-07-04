import React, { Component } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';

export default class App extends Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-xs-offset-2 col-xs-8">
						<div className="page-header">
							<h2>React Router Demo</h2>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-offset-2 col-xs-2">
						<div className="list-group">
							{/* 在React中，靠路由链接实现切换组件----编写路由链接 */}

							<Link className="list-group-item" to="/about">
								About
							</Link>
							<Link className="list-group-item" to="/home">
								Home
							</Link>
						</div>
					</div>
				</div>
				<div className="col-xs-6">
					<div className="panel">
						<div className="panel-body">
							{/* 注册路由 */}
							<Routes>
								<Route path="/about" element={<About />} />
								<Route path="/home" element={<Home />} />
							</Routes>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
