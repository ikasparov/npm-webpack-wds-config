var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: ['./app/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // npm: babel-loader
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(pug|jade)$/,
                loader: 'jade' // npm: jade-loader (jade was renamed in pug)
            },
            {
                test: /\.css$/,
                loader: extractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.scss$/,
                loader: extractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'file?name=images/[name].[ext]' // npm: file-loader
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file?name=fonts/[name].[ext]' // npm: file-loader
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './app/index.tpl.html',
            title: 'TruckPoint CRM',
            filename: 'index.html',
            inject: 'body',
            hash: true
        }),
        new extractTextPlugin('style.css'),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery'
        // })
    ],
    devtool: 'inline-source-map',
    watch: true,
    devServer: {
        host: 'localhost',
        port: 8000,
        historyApiFallback: {
            index: 'build/index.html'
        }
    }
};
