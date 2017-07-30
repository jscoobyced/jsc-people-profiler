const webpack = require('webpack');
const ChunkHashReplacePlugin = require('chunkhash-replace-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const extractSass = new ExtractTextPlugin({
    filename: "[name]-[chunkhash].css"
});
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

exports.cssConfig = {
    entry: {
        jsc: './src/styles/styles.scss'
    },
    output: {
        path: __dirname + '/../app.web/wwwroot/css',
        filename: '[name]-[chunkhash].css'
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
        new ChunkHashReplacePlugin({
            src: 'src/_Layout.cshtml',
            dest: '/../app.web/Views/Shared/_Layout.cshtml'
        }),
        extractSass,
        new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true,
                },
                safe: false
            }
        }),
        new WebpackCleanupPlugin({
            preview: true,
        })
    ]
};