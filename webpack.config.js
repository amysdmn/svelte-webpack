const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { less } = require('svelte-preprocess-less');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');
const globby = require('globby');


const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

let Entries= {};

function getEntries() {
  try {
    const entries = {};
    const allEntry = globby.sync('src/pages/**/**.js');
    allEntry.forEach(entry => {
      const res = entry.match(/src\/pages\/(\w+)\/(\w+)\.js/);
      if (res.length) {
        entries[res[1]] = `./${entry}`;
      }
    });
    return entries;
  } catch (error) {
    console.error('File structure is incorrect for MPA');
  }
}

function multiHtmlPlugin(entries) {
  const pageNames = Object.keys(entries);
  return pageNames.map(name => {
    return new htmlWebpackPlugin({
      filename: `${name}.html`,
      template: './public/index.html',
      chunks: [name,'commons'],
      minify: prod
        ? {
            removeComments: true,
            collapseWhitespace: true,
            minifyCSS: true,
          }
        : true,
    });
  });
}


module.exports = function(env)  {
	const entry = getEntries();
	const HTMLPlugins = multiHtmlPlugin(entry);
	const config = {
		entry: entry,
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@public': path.resolve(__dirname, 'public'),
				svelte: path.dirname(require.resolve('svelte/package.json'))
			},
			extensions: ['.mjs', '.js', '.svelte'],
			mainFields: ['svelte', 'browser', 'module', 'main']
		},
		output: {
			path: path.join(__dirname, 'dist'),
			filename: 'public/js/[name].[chunkhash].js',
	      	chunkFilename: 'public/js/[name].[chunkhash].js',
		},
		module: {
			rules: [
				{
					test: /\.svelte$/,
					use: {
						loader: 'svelte-loader',
						options: {
							compilerOptions: {
								dev: !prod
							},
							emitCss: prod,
							hotReload: !prod
						}
					}
				},
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader'
					]
				},
				{
					test:/\.less$/,
					use:['style-loader','css-loader','less-loader']
				},
				{
					// required to prevent errors from Svelte on Webpack 5+
					test: /node_modules\/svelte\/.*\.mjs$/,
					resolve: {
						fullySpecified: false
					}
				}
			]
		},
		mode,
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'public/css/[name].[contenthash].css'
			}),
			new CopyPlugin({
		        patterns: [{ from: './public/static', to: './public/static' }]
		      }),
			new CleanWebpackPlugin(),
			...HTMLPlugins
		],
		devtool: prod ? false : 'source-map',
		devServer: {
			contentBase: path.resolve(__dirname, './src'),
	        port: 8000,
	        open: true,
	        openPage: "heathCheck.html",
	        headers: {
	          'Access-Control-Allow-Origin': '*',
	        },
			hot: true
		}
	}
	return config;
	
};
