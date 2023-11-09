const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        popup: './chatbox/scripts/popup.js',
        data: './chatbox/scripts/data.js',
        input: './chatbox/scripts/input.js',
        processor: './chatbox/scripts/processor.js',
        utils: './chatbox/scripts/utils.js',
        gpt: './chatbox/scripts/gpt.js',
        mp4_wav: './chatbox/scripts/mp4_wav.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'chatbox/scripts/[name].js',
    },
    module: {
        rules: [{
            test: /\.js/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './chatbox/views/popup.html',
            filename: 'chatbox/views/popup.html'
        }),
        new CopyPlugin({
            patterns: [
                {from: "public" },
                {from: "images", to: "images"},
                {from: "chatbox/styles", to: "chatbox/styles"}
            ]
        })
    ],
    resolve: {
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer/"),
            "crypto": require.resolve("crypto-browserify"),
            "path": require.resolve("path-browserify"),
            "fs": false // or an appropriate replacement
        }
    }
};