const path = require('path'); //nodejs核心模块，专门用来处理路径问题
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

//获取cross-env定义的环境变量
const isProduction = process.env.NODE_ENV === 'production';

//返回处理样式loader的函数
const getStyleLoaders = (pre) => {
	return [
		isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
		'css-loader',
		{
			//处理css兼容性问题
			//配合package.json中的browserslist来指定兼容性
			loader: 'postcss-loader',
			options: {
				postcssOptions: {
					plugins: ['postcss-preset-env'],
				},
			},
		},
		pre && {
			loader: pre,
			options:
				pre === 'less-loader'
					? {
							//antd自定义主题配置
							lessOptions: {
								modifyVars: { '@primary-color': '#1DA57A' },
								javascriptEnabled: true,
							},
					  }
					: {},
		},
	].filter(Boolean);
};

module.exports = {
	entry: './src/main.js',
	output: {
		path: isProduction ? path.resolve(__dirname, '../dist') : undefined,
		filename: isProduction
			? 'static/js/[name].[contenthash:10].js'
			: 'static/js/[name].js',
		chunkFilename: isProduction
			? 'static/js/[name].[contenthash:10].chunk.js'
			: 'static/js/[name].chunk.js',
		assetModuleFilename: 'static/media/[hash:10][ext][query]',
		clean: true,
	},
	module: {
		rules: [
			//处理css文件
			{
				test: /\.css$/,
				use: getStyleLoaders(),
			},
			{
				test: /\.less$/,
				use: getStyleLoaders('less-loader'),
			},
			{
				test: /\.s[ac]ss$/,
				use: getStyleLoaders('sass-loader'),
			},
			{
				test: /\.styl$/,
				use: getStyleLoaders('stylus-loader'),
			},
			//处理图片
			{
				test: /\.(png|jpe?g|gif|webp|svg)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024,
					},
				},
			},
			//处理其她资源
			{
				test: /\.(ttf|woff2?)$/,
				type: 'asset/resource',
			},
			//处理js文件
			{
				test: /\.jsx?$/,
				include: path.resolve(__dirname, '../src'),
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
					cacheCompression: false,
					plugins: [!isProduction && 'react-refresh/babel'].filter(Boolean), //激活js HMR功能
				},
			},
		],
	},
	//处理html文件
	plugins: [
		new ESLintWebpackPlugin({
			context: path.resolve(__dirname, '../src'),
			exclude: 'node_modules',
			cache: true,
			cacheLocation: path.resolve(
				__dirname,
				'../node_modules/.cache/eslintcache'
			),
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../public/index.html'),
		}),

		isProduction &&
			new MiniCssExtractPlugin({
				filename: 'static/css/[name].[contenthash:10].css',
				chunkFilename: 'static/css/[name].[contenthash:10].chunk.css',
			}),
		isProduction &&
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, '../public'),
						to: path.resolve(__dirname, '../dist'),
						globOptions: {
							ignore: ['**/index.html'], //忽略index.html文件
						},
					},
				],
			}),
		!isProduction && new ReactRefreshWebpackPlugin(),
	].filter(Boolean),
	mode: isProduction ? 'production' : 'development',
	devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
	optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				//react react-dom react-router-dom 一起打包成一个js文件
				react: {
					test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
					name: 'chunk-react',
					priority: 40,
				},
				//antd单独打包
				antd: {
					test: /[\\/]node_modules[\\/]antd[\\/]/,
					name: 'chunk-antd',
					priority: 30,
				},
				//剩下的node_modules单独打包
				libs: {
					test: /[\\/]node_modules[\\/]/,
					name: 'chunk-libs',
					priority: 20,
				},
			},
		},
		runtimeChunk: {
			name: (entrypoint) => `runtime~${entrypoint.name}.js`,
		},
		//是否需要进行压缩
		minimize: isProduction,
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserWebpackPlugin(),
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
	//webpack解析模块加载选项
	resolve: {
		//自动补全文件扩展名
		extensions: ['.jsx', '.js', '.json'],
	},
	devServer: {
		host: 'localhost',
		port: 3000,
		open: true,
		hot: true, //开启HMR
		historyApiFallback: true, //解决前端路由刷新404的问题
	},
	performance: false, //关闭性能分析，提高打包速度
};
