const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const port = process.env.PORT || 8080;

module.exports = {
    // webpack 설정 코드 작성. 작성된 코드는 module.export로 내보냅니다.
    mode: 'production',
    entry: './src/index.js',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.[hash].js'
    },
    module: {
        rules: [
            { // 첫번째 룰
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
                exclude: path.join(__dirname, 'node_modules'),
            },
            { // 두번째 룰
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            camelCase: true,
                            sourceMap: true
                        }
                    },
                ]
            },
            // { // 세번째 룰
            //     test: /\.scss$/,
            //     use: [
            //         {
            //             loader: 'style-loader'
            //         },
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 modules: true,
            //                 camelCase: true,
            //                 sourceMap: true
            //             }
            //         },
            //         {
            //             loader: 'sass-loader',
            //             options: {
            //                 modules: true,
            //                 camelCase: true,
            //                 sourceMap: true
            //             }
            //         },
            //     ]

            // },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            favicon: 'public/favicon.ico'
        }),
        new MiniCssExtractPlugin({
            filename: 'style-test.css'
        }),
        new CleanWebpackPlugin()
    ],
    devtool: 'inline-source-map',
    devServer: {
        host: 'localhost',
        port: port,
        open: true,
        historyApiFallback: true
    }
};