/**
 * Created by Sergey on 12.07.2016.
 */
var webpack = require('webpack');
module.exports = {
    entry: ["./client/App"],
    output: {
        path: __dirname + '/client',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css-loader" },
            { test: /\.ejs$/, loader: 'ejs-loader?variable=data' }
        ]
    },
};
