//1 引入express
const { response } = require("express");
const express = require("express");

// 2 创建应用对象
const app = express();

// 3 创建路有规则
// request 是对请求报文的封装
// response 是对响应报文的封装
app.get("/server", (request, response) => {
	// 设置响应头 设置允许跨域
	response.setHeader("Access-Control-Allow-Origin", "*");

	// 设置响应体
	response.send("hello Ajax get");
});

// all 可以接收任意类型的请求
app.all("/server", (request, response) => {
	// 设置响应头 设置允许跨域
	response.setHeader("Access-Control-Allow-Origin", "*");

	// 响应头
	response.setHeader("Access-Control-Allow-Headers", "*"); //  * 表示所有类型的 头信息都可以接受

	// 设置响应体
	response.send("hello Ajax post");
});

app.all("/json-server", (request, response) => {
	// 设置响应头 设置允许跨域
	response.setHeader("Access-Control-Allow-Origin", "*");

	// 响应一个数据
	const data = {
		name: "atguigu99g9",
	};

	// 对对象进行字符串转换
	let str = JSON.stringify(data);

	// 设置响应体
	response.send(str);
});

// 针对IE缓存
app.get("/ie", (request, response) => {
	// 设置响应头 设置允许跨域
	response.setHeader("Access-Control-Allow-Origin", "*");

	// 设置响应体
	response.send("hello IE--");
});

// 延时响应
app.all("/delay", (request, response) => {
	// 设置响应头 设置允许跨域
	response.setHeader("Access-Control-Allow-Origin", "*");

	setTimeout(() => {
		// 设置响应体
		response.send("hello 延时响应");
	}, 3000);
});

// jQuery服务
app.all("/jQuery-server", (request, response) => {
	// 设置响应头 设置允许跨域
	response.setHeader("Access-Control-Allow-Origin", "*");

	response.setHeader("Access-Control-Allow-Headers", "*");

	const data = { name: "尚硅谷" };
	response.send(JSON.stringify(data));

	// response.send("hello jQuery Ajax");
});

// axios 服务
app.all("/axios-server", (request, response) => {
	// 设置响应头 设置允许跨域
	response.setHeader("Access-Control-Allow-Origin", "*");

	response.setHeader("Access-Control-Allow-Headers", "*");

	const data = { name: "尚硅谷" };
	response.send(JSON.stringify(data));

	// response.send("hello jQuery Ajax");
});

// fetch 服务
app.all("/fetch-server", (request, response) => {
	// 设置响应头 设置允许跨域
	response.setHeader("Access-Control-Allow-Origin", "*");

	response.setHeader("Access-Control-Allow-Headers", "*");

	const data = { name: "尚硅谷" };
	response.send(JSON.stringify(data));

	// response.send("hello jQuery Ajax");
});

// jsonp 服务
app.all("/jsonp-server", (request, response) => {
	// response.send('console.log("hello jsonp")');

	const data = {
		name: "尚硅谷----",
	};
	// 将数据转换为字符串
	let str = JSON.stringify(data);
	// 返回结果
	response.end(`handle(${str})`);
});

// 用户名检测是否存在
app.all("/check-username", (request, response) => {
	// response.send('console.log("hello jsonp")');

	const data = {
		exist: 1,
		msg: "用户名已经存在",
	};
	// 将数据转换为字符串
	let str = JSON.stringify(data);
	// 返回结果
	response.end(`handle(${str})`);
});

// jquery-jsonp
app.all("/jquery-jsonp-server", (request, response) => {
	// response.send('console.log("hello jsonp")');

	const data = {
		name: "shangguiguuu",
		city: ["bj", "sh", "sz"],
	};
	// 将数据转换为字符串
	let str = JSON.stringify(data);

	// 接收callback参数
	let cb = request.query.callback;

	// 返回结果
	response.end(`${cb}(${str})`);
});

// CORS
app.all("/cors-server", (request, response) => {
	//设置响应头
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Headers", "*");
	response.setHeader("Access-Control-Allow-Method", "*");
	// response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5000");

	response.send("hello CORS");
});

//4 监听端口启动服务
app.listen(8000, () => {
	console.log("服务器已经启动，8000端口监听中");
});
