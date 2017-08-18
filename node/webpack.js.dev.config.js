const webpack = require('webpack');

exports.jsConfig = {
    devtool: '#inline-source-map',
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
        filename: '[name].js'
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: __dirname + '/node_modules/',
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ]};