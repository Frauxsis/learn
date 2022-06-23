import React from 'react';
import { NavLink, useRoutes, useInRouterContext } from 'react-router-dom';
import routes from './routes';
import Header from './components/Header'; //Header是一般组件

export default function App() {
	//根据路由表生成对应的路由规则
	const element = useRoutes(routes);
	console.log('useInRouterContext', useInRouterContext());
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
						<NavLink
							className={({ isActive }) =>
								isActive ? 'list-group-item atguigu' : 'list-group-item'
							}
							to="/about"
						>
							About
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'list-group-item atguigu' : 'list-group-item'
							}
							end
							to="/home"
						>
							Home
						</NavLink>
					</div>
				</div>
			</div>
			<div className="col-xs-6">
				<div className="panel">
					<div className="panel-body">
						{/* 注册路由 */}
						{element}
					</div>
				</div>
			</div>
		</div>
	);
}
