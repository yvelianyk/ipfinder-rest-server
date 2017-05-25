const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const WebpackShellPlugin = require('webpack-shell-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: "./start.ts",
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, exclude: /node_modules/, loader: "ts-loader" },
            { test: /\.json$/, loader: 'json-loader' }
        ]
    },
    plugins: [
        new WebpackShellPlugin({onBuildEnd:['npm run watch']})
    ],
    node: {
        console: false,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    devtool: '#source-map'
};