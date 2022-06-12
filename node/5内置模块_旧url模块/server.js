let http = require('http');
let url = require('url');
let moduleRenderHTML = require('./modules/renderHTML');
let moduleRenderStatus = require('./modules/renderStatus');
//创建服务器
let server = http.createServer();

server.on('request', (req, res) => {
	//req 接收浏览器传的参数，
	//res 返回渲染的内容
	if (req.url === '/favicon.ico') {
		//todo 读取本地图标
		return;
	}
	// console.log(url.parse(req.url).pathname,'222');

	let urlobj = url.parse(req.url, true);
	console.log(urlobj.query.a);

	let pathname = url.parse(req.url).pathname;
	res.writeHead(moduleRenderStatus.renderStatus(pathname), {
		'Content-Type': 'text/html ;charset=utf-8',
	});
	res.write(moduleRenderHTML.renderHTML(pathname));
	res.end();
});

server.listen(3000, () => {
	console.log('server start');
});
