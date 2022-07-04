import React, { Component, lazy, Suspense } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
// import Home from './Home';
// import About from './About';
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

export default class Demo extends Component {
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

							<NavLink className="list-group-item" to="/about">
								About
							</NavLink>
							<NavLink className="list-group-item" to="/home">
								Home
							</NavLink>
						</div>
					</div>
				</div>
				<div className="col-xs-6">
					<div className="panel">
						<div className="panel-body">
							{/* 注册路由 */}
							<Suspense fallback={<h1>loading....</h1>}>
								<Routes>
									<Route path="/about" element={<About />} />
									<Route path="/home" element={<Home />} />
								</Routes>
							</Suspense>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
