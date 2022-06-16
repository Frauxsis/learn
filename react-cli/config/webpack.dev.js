const path = require('path'); //nodejs核心模块，专门用来处理路径问题
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

//返回处理样式loader的函数
const getStyleLoaders = (pre) => {
	return [
		'style-loader',
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
		path: undefined,
		filename: 'static/js/[name].js',
		chunkFilename: 'static/js/[name].chunk.js',
		assetModuleFilename: 'static/media/[hash:10][ext][query]',
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
					plugins: ['react-refresh/babel'], //激活js HMR功能
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
		new ReactRefreshWebpackPlugin(), //激活js HMR功能
	],
	mode: 'development',
	devtool: 'cheap-module-source-map',
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
		runtimeChunk: {
			name: (entrypoint) => `runtime~${entrypoint.name}.js`,
		},
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
      historyApiFallback:true,//解决前端路由刷新404的问题
	},
};
