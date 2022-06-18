const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		createProxyMiddleware('/api1', {//遇见 /api1 前缀的请求，就会触发该代理配置 
			target: 'http://localhost:6000',//请求转发给谁
			changeOrigin: true,//默认值false， 控制服务器收到的响应头中 Host 自断的值
			pathRewrite: { '^/api1': '' },//重写请求路径（必须写）
		}),
		createProxyMiddleware('/api2', {
			target: 'http://localhost:6001',
			changeOrigin: true,
			pathRewrite: { '^/api2': '' },
		})
	);
};
