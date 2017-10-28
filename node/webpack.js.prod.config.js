const webpack = require('webpack');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Used only to investigate bundle sizes
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ASSET_PATH = '/js/';

exports.jsConfig = {
    entry: {
        jsc: ['./src/index'],
        vendor: ['react',
            'react-dom',
            'react-router-dom',
            'bootstrap'
        ]
    },
    output: {
        path: __dirname + '/../app.web/wwwroot/js',
        filename: '[name]-[chunkhash].js',
        publicPath: ASSET_PATH
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: __dirname + '/node_modules/',
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: "tslint-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name]-[chunkhash].js',
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                drop_console: true,
                warnings: false
            },
            comments: false
        }),
        new WebpackCleanupPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            filename: __dirname + '/src/_Layout.cshtml',
            template: 'src/_Layout.tpl.html'
        })
    ]
};