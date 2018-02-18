const webpack = require('webpack');
const ChunkHashReplacePlugin = require('chunkhash-replace-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].css"
});

exports.cssConfig = {
    entry: {
        jsc: './src/styles/styles.scss'
    },
    output: {
        path: __dirname + '/../app.web/wwwroot/css',
        filename: '[name].css'
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
            src: 'src/_Layout.tpl.dev.html',
            dest: '/../app.web/Views/Shared/_Layout.cshtml'
        }),
        extractSass
    ]
};