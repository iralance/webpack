const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/js/entry.js"
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name].[hash:8].js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(['css-loader'])
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        //自动加载模块，而不必到处 import 或 require
        new webpack.ProvidePlugin({
            jquery: "jquery",
            $: "jquery"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                // 去掉注释内容
                comments: false,
            },
        }),
        new HtmlWebpackPlugin({
            title: 'demo',
            filename: "index.html",
            template: "src/index.html",
            inject: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeAttributeQuotes: true
            }
        }),
        new ExtractTextPlugin("css/[name].[hash:8].css"),
    ],
    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }
};