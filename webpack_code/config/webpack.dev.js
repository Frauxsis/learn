const os = require('os');

const path = require('path'); //nodejs核心模块，专门用来处理路径问题
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const threads = os.cpus().length; //cpu核数
module.exports = {
	//入口
	entry: './src/main.js', //相对路径
	//输出
	output: {
		//文件的输出路径
		//开发模式没有输出
		path: undefined,
		//入口文件打包输出的文件名
		filename: 'static/js/main.js',
	},
	//加载器
	module: {
		rules: [
			//loader的配置
			{
				//每个文件只能被其中一个loader配置处理
				oneOf: [
					{
						test: /\.css$/, //只检测css文件
						use: [
							//执行顺序，从右到左（从下到上）
							'style-loader', //将js中css通过创建style标签添加到html文件中生效
							'css-loader', //将样式编译到commonJS的模块到js中
						],
					},
					{
						test: /\.less$/,
						//loader: 'xxx', 只能使用一个loader
						use: [
							//use使用多个loader
							'style-loader',
							'css-loader',
							'less-loader', //将less编译成css文件
						],
					},
					{
						test: /\.(png|jpe?g|gif|webp|svg)$/,
						type: 'asset',
						parser: {
							dataUrlCondition: {
								//小于10kb的图片会转 base64
								//优点：减少请求数量，  缺点：体积会更大
								maxSize: 10 * 1024,
							},
						},
						generator: {
							//生成输出的图片名
							// [hash:10] hash 值取前10位
							filename: 'static/images/[hash:10][ext][query]',
						},
					},
					{
						test: /\.(ttf|woff2?|mp3|mp4|avi|)$/,
						type: 'asset/resource',
						generator: {
							//生成输出的字体图标名
							// [hash:10] hash 值取前10位
							filename: 'static/media/[hash:10][ext][query]',
						},
					},
					{
						test: /\.js$/,
						exclude: /(node_modules)/, //排除node_modules中的js文件（这些文件不处理）
						// include: path.resolve(__dirname, '../src'), //只处理src下的文件， include，exclude只能用其中一种
						use: [
							{
								loader: 'thread-loader', //开启多进程
								options: {
									works: threads, //进程数量
								},
							},
							{
								loader: 'babel-loader',
								options: {
									// presets: ['@babel/preset-env'],
									cacheDirectory: true, //开启babel缓存
									cacheCompression: false, //关缓存文件压缩
									plugins: ['@babel/plugin-transform-runtime'], //减少代码体积
								},
							},
						],
					},
				],
			},
		],
	},
	//插件
	plugins: [
		//plugin的配置
		new ESLintPlugin({
			//检测哪些文件
			context: path.resolve(__dirname, '../src'),
			exclude: 'node_modules', //默认值
			cache: true, //开启缓存
			cacheLocation: path.resolve(
				__dirname,
				'../node_modules/.cache/eslintcache'
			),
			threads, // 开启多进程和进程数量
		}),

		new HtmlWebpackPlugin({
			//模板：以 public/index.html 文件组建新的html文件
			//新的html文件特点：1 结构和原来一致，2 自动引入打包输出的资源
			template: path.resolve(__dirname, '../public/index.html'),
		}),
	],
	//开发服务器，不会输出资源，在内存中自动编译打包
	devServer: {
		host: 'localhost', // 启动服务器域名
		port: '3000', // 启动服务器端口号
		open: true, //是否自动打开浏览器
		hot: true, //开启HMR（热模块替换）
	},
	//模式
	mode: 'development',
	devtool: 'cheap-module-source-map',
};
