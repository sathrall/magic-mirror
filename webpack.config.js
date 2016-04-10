require('es6-promise').polyfill();

var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            // JSX
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel'
            },
            // LESS
            {
                test: /\.less$/,
                include: APP_DIR.style,
                loaders: ['style', 'css', 'less']
            },
            // Font and images
            {
                test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
                loader: 'url?limit=10000'
            },
            {
                test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
                loader: 'file'
            }
        ]
    }
};

module.exports = config;
