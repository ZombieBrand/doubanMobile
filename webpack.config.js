const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            include: [
                path.resolve(__dirname, 'src'),
            ],
            use: 'babel-loader',
        }, {
            test: /\.css$/,
            include: [
                path.resolve(__dirname, 'src'),
            ],
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader',
            }),
        }]
    },
    // 代码模块路径解析的配置
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, 'src'),
        ],

        extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
    },
    devServer: {
        hot: true // dev server 的配置要启动 hot，或者在命令行中带参数开启
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: 'src/index.html' // 配置文件模板
        }),
        new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
        new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件...
    ],
}