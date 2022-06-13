const os = require('os');

const path = require('path'); //nodejs核心模块，专门用来处理路径问题
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const threads = os.cpus().length; //cpu核数
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

//用来获取处理样式的loader
function getStyleLoader(pre) {
	return [
		//执行顺序，从右到左（从下到上）
		MiniCssExtractPlugin.loader, //提取css成单独的文件
		'css-loader', //将样式编译到commonJS的模块到js中
		{
			loader: 'postcss-loader',
			options: {
				postcssOptions: {
					plugins: ['postcss-preset-env'], //能解决大多数样式的兼容问题
				},
			},
		},
		pre,
	].filter(Boolean);
}

module.exports = {
	//入口
	entry: './src/main.js', //相对路径
	//输出
	output: {
		//文件的输出路径
		//__dirname nodejs的变量，代表当前文件的文件夹目录
		path: path.resolve(__dirname, '../dist'), //绝对路径
		//入口文件打包输出的文件名
		filename: 'static/js/main.js',
		// 自动清空上次打包的内容
		// 原理：在打包去，将path整个目录内容清空，再进行打包
		clean: true,
	},
	//加载器
	module: {
		rules: [
			//loader的配置
			{
				oneOf: [
					{
						test: /\.css$/, //只检测css文件
						use: getStyleLoader(),
					},
					{
						test: /\.less$/,
						//loader: 'xxx', 只能使用一个loader
						use: getStyleLoader('less-loader'),
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
			exclude: 'node_modules',
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
		new MiniCssExtractPlugin({
			filename: 'static/css/main.css',
		}),
		// new CssMinimizerPlugin(),
		// new TerserWebpackPlugin({
		// 	parallel: threads, // 开启多进程和进程数量
		// }),
	],
	optimization: {
		//压缩的操作
		minimizer: [
			//压缩css
			new CssMinimizerPlugin(),
			//压缩js
			new TerserWebpackPlugin({
				parallel: threads, // 开启多进程和进程数量
			}),
			//压缩图片
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminGenerate,
					options: {
						plugins: [
							['gifsicle', { interlaced: true }],
							['jpegtran', { progressive: true }],
							['optipng', { optimizationLevel: 5 }],
							[
								'svgo',
								{
									plugins: [
										'preset-default',
										'prefixIds',
										{
											name: 'sortAttrs',
											params: {
												xmlnsOrder: 'alphabetical',
											},
										},
									],
								},
							],
						],
					},
				},
			}),
		],
	},
	//模式
	mode: 'production',
	devtool: 'source-map',
};
