const webpack = require('webpack');
const ChunkHashReplacePlugin = require('chunkhash-replace-webpack-plugin');

exports.jsConfig = {
    devtool: 'cheap-module-source-map',
    entry: {
        jsc: ['./src/index']
    },
    externals: {
        "react": "React",
        "jquery": "jQuery",
        "react-dom": "ReactDOM",
        "react-router": "ReactRouter",
        "react-router-dom": "ReactRouterDOM",
        "bootstrap": "bootstrap"
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
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
        new ChunkHashReplacePlugin({
            src: 'src/_Layout.tpl.debug.html',
            dest: 'src/_Layout.cshtml'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    devtool: "inline-source-map"
};