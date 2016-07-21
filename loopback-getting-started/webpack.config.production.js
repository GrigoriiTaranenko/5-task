/**
 * Created by Sergey on 13.07.2016.
 */
var webpack = require('webpack');
module.exports = {
    entry: ["./client/App"],
    output: {
        path:__dirname+ '/client',
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
            { test: /\.css$/, loader: "style!css-loader" },
            { test: /\.ejs$/, loader: 'ejs-loader?variable=data' }
        ]
    }
};