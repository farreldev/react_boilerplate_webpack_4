const path = require('path'),
		webpack = require('webpack'),
		HtmlWebpackPlugin = require('html-webpack-plugin'),
		// MiniCssExtractPlugin = require('mini-css-extract-plugin'),
		ExtractTextPlugin = require('extract-text-webpack-plugin'),
		_SRC = path.resolve(__dirname, 'src'),
		_PUB = path.resolve(__dirname, 'public'),
		isDevMode = process.env.NODE_ENV !== 'production';

let cssProd = ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: ['css-loader', 'sass-loader'],
	publicPath: '../'
});

let styleSet = isDevMode ? ['style-loader', 'css-loader', 'sass-loader'] : cssProd;

const webpackConfig = {
	context: _SRC,
	entry: './main.js',
	output: {
		path: _PUB,
		filename: 'js/[name].bundle.js'
	},

	mode: isDevMode ? 'development' : 'production',

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(s?[ac]ss|css)$/,
				use: styleSet
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							fallback: 'file-loader',
							name: '[path][name].[ext]',
							limit: 1024
						}
					},
					
					{
						loader: 'image-webpack-loader',
						options: {
							gifsicle: {
								interlaced: false,
							},
							pngquant: {
					      	quality: "65-90",
					      	speed: 4
					    	},
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							optipng: {
								optimizationLevel: 7
							}
						}
					}
				]
			}
		]
	},

	devServer: {
		contentBase: _SRC,
		compress: true,
		stats: 'minimal',
		open: true
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
			title: 'Boilerplate React Apps',
			minify: {
				collapseWhitespace: false
			},
			meta: {
				viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
			},
			hash: true,
			template: './index.html'
		}),

		new ExtractTextPlugin({
			filename: "styles/[name].css",
			disable: isDevMode,
			allChunks: true
		}),
	]
};

module.exports = webpackConfig;
