function renderStatus(url) {
	let arr = ['/home', '/list','/api/list','/api/home'];
	return arr.includes(url) ? 200 : 404;
}
 
exports.renderStatus=renderStatus