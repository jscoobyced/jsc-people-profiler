const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const bundleOutputDir = './wwwroot/dist';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const extractSass = new ExtractTextPlugin({ filename: '[name].css' });

    return [{
        stats: { modules: false },
        entry: {
            main: './ClientApp/boot.tsx',
            style: './ClientApp/css/style.scss',
            vendorstyle: './ClientApp/css/vendor.scss'
        },
        resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: '/dist/'
        },
        module: {
            rules: [
                { test: /\.tsx?$/, include: /ClientApp/, use: 'awesome-typescript-loader?silent=true' },
                { enforce: 'pre', test: /\.tsx?$/, include: /ClientApp/, use: "tslint-loader" },
                { test: /\.scss$/, loader: extractSass.extract({ use: [{ loader: isDevBuild ? 'css-loader' : 'css-loader?minimize' }, { loader: "sass-loader" }] }) },
                { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
                { test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000" },
                { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
                { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
            ]
        },
        plugins: [
            extractSass,
            new CheckerPlugin(),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
                // Plugins that apply in production builds only
                new webpack.optimize.UglifyJsPlugin()
            ])
    }];
};