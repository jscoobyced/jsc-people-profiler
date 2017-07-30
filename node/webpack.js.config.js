const webpack = require('webpack');
const ChunkHashReplacePlugin = require('chunkhash-replace-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

exports.jsConfig = {
    devtool: '#cheap-eval-source-map',
    entry: {
        jsc: ['./src/index'],
        vendor: ['jquery',
            'react',
            'react-dom',
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
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: "source-map-loader"
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
                drop_console: false,
                warnings: false
            },
            comments: false
        }),
        new ChunkHashReplacePlugin({
            src: 'src/_Layout.tpl.cshtml',
            dest: 'src/_Layout.cshtml'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new WebpackCleanupPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};