/**
 * Created by Sergey on 13.07.2016.
 */
var webpack = require('webpack');
module.exports = {
    entry: ["./main"],
    output: {
        path:__dirname,
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.js$/,
            minimize: true
        })
    ],
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css-loader" }
        ]
    }
};