var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: './v1/site/main.js',
    output: {
        path: __dirname + '/public',
        filename: 'main.min.js',
        publicPath: '/'
    },
    devServer: {
        inline: true,
        contentBase: './public'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            },
            {
                test: /\.mp3$/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname), 'node_modules'],
        alias: {
            api: 'v1/site/api',
            components: 'v1/site/components',
            core: 'v1/site/core',
            root: '/'
        },
        extensions: ['.js', '.jsx', '.png', '.mp3']
    },
    plugins: debug ? [
        new ExtractTextPlugin({
            filename: 'main.min.css',
            allChunks: true
        })
    ] : [
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin({
            filename: 'main.min.css',
            allChunks: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            sourcemap: false
        })
    ]
};

//NODE_ENV=production webpack <- for build a live version