import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home'; //Home是路由组件
import About from './pages/About'; //About是路由组件
import Header from './components/Header'; //Header是一般组件

export default function App() {
	return (
		<div>
			<div className="row">
				<div className="col-xs-offset-2 col-xs-8">
					<Header />
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
