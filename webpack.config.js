/**
 * Created by Sergey on 12.07.2016.
 */
var webpack = require('webpack');
module.exports = {
    entry: ["./App"],
    output: {
        path:__dirname,
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
