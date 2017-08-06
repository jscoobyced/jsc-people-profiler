const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const extractSass = new ExtractTextPlugin({
    filename: "[name]-[chunkhash].css"
});
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const ASSET_PATH = '/css/';

exports.cssConfig = {
    entry: {
        jsc: './src/styles/styles.scss'
    },
    output: {
        path: __dirname + '/../app.web/wwwroot/css',
        filename: '[name]-[chunkhash].css',
        publicPath: ASSET_PATH
    },
    module: {
        rules: [{
                test: /\.scss$/,
                loader: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }]
                })
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2)$/,
                loader: "url-loader?prefix=font/&limit=5000"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            }
        ]
    },
    resolve: {
        extensions: [".css", ".scss"]
    },
    plugins: [
        extractSass,
        new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                },
                safe: false
            }
        }),
        new WebpackCleanupPlugin(),
        new HtmlWebpackPlugin({
            filename: '../../Views/Shared/_Layout.cshtml',
            template: __dirname + '/src/_Layout.cshtml'
        })
    ]
};