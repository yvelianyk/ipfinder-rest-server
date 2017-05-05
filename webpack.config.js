var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
const ReloadServerPlugin = require("./node_modules/reload-server-webpack-plugin");

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: "./start.ts",
    target: 'node',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js"
    },
    externals: nodeModules,
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, exclude: /node_modules/, loader: "ts-loader" },
            { test: /\.json$/, loader: 'json-loader' }
        ]
    },
    plugins: [
        new ReloadServerPlugin({
            // Defaults to process.cwd() + "/server.js"
            script: "dist/bundle.js"
        })
    ],
    node: {
        console: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
}