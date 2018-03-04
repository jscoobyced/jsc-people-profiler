const path = require('path');
const webpack = require('webpack');
const bundleOutputDir = path.join(__dirname, 'wwwroot', 'dist');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const extractSass = new ExtractTextPlugin({ filename: '[name].css' });

    return [{
        stats: { modules: false },
        resolve: {
            extensions: ['.js']
        },
        entry: {
            vendor: ['bootstrap', 'event-source-polyfill', 'isomorphic-fetch', 'react', 'react-dom', 'react-router-dom', 'jquery'],
            vendorstyle: ['./ClientApp/css/vendor.scss']
        },
        output: {
            path: bundleOutputDir,
            publicPath: 'dist/',
            filename: '[name].js',
            library: '[name]_[hash]',
        },
        module: {
            rules: [
                { test: /\.scss$/, loader: extractSass.extract({ use: [{ loader: isDevBuild ? 'css-loader' : 'css-loader?minimize' }, { loader: "sass-loader" }] }) },
                { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?publicPath=./" },
                { test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000&publicPath=./" },
                { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream&publicPath=./" },
                { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml&publicPath=./" }
            ]
        },
        plugins: [
            extractSass,
            new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
            new webpack.DllPlugin({
                path: path.join(bundleOutputDir, '[name]-manifest.json'),
                name: '[name]_[hash]'
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"'
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    }];
};
