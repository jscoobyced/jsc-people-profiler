const webpack = require('webpack');
const ChunkHashReplacePlugin = require('chunkhash-replace-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

// Used only to investigate bundle sizes
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

exports.jsConfig = {
    entry: {
        jsc: ['./src/index'],
        vendor: ['react',
            'react-dom',
            'jquery',
            'react-router-dom',
            'bootstrap'
        ]
    },
    output: {
        path: __dirname + '/../app.web/wwwroot/js',
        filename: '[name]-[chunkhash].js'
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
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new ChunkHashReplacePlugin({
            src: 'src/_Layout.tpl.html',
            dest: 'src/_Layout.cshtml'
        }),
        new WebpackCleanupPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};