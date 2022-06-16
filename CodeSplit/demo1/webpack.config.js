const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	//entry: './src/main.js',  只有一个入口文件，==>单入口
	entry: {
		app: './src/app.js',
		main: './src/main.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js', //webpack中的命名方式， [name] 以文件名自己去命名
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/index.html'),
		}),
	],
	mode: 'production',
};
