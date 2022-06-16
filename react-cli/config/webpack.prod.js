const path = require('path'); //nodejs核心模块，专门用来处理路径问题
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

//返回处理样式loader的函数
const getStyleLoaders = (pre) => {
	return [
		MiniCssExtractPlugin.loader,
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
		pre,
	].filter(Boolean);
};

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'static/js/[name].[contenthash:10].js',
		chunkFilename: 'static/js/[name].[contenthash:10].chunk.js',
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

		new MiniCssExtractPlugin({
			filename: 'static/css/[name].[contenthash:10].css',
			chunkFilename: 'static/css/[name].[contenthash:10].chunk.css',
		}),
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
	],
	mode: 'production',
	devtool: 'source-map',
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
		runtimeChunk: {
			name: (entrypoint) => `runtime~${entrypoint.name}.js`,
		},
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
};
