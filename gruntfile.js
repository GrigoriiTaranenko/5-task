module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-webpack");
    var webpack = require("webpack");
    var webpackConfig = require("./webpack.config.js");
    grunt.initConfig({
        webpack: {
            options: webpackConfig,
            build: {
                plugins:[
                    new webpack.optimize.UglifyJsPlugin()
                ]
            },
            "build-dev": {
                devtool: "sourcemap",
                debug: true
            }
        }
    });

    // The development server (the recommended option for development)

    grunt.registerTask("dev", ["webpack:build-dev"]);

    // Production build
    grunt.registerTask("build", ["webpack:build"]);
    grunt.registerTask("default", ["dev"]);
};