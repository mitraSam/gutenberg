const webpack = require('webpack');
const merge = require('webpack-merge');
 const common = require('./webpack.common.js');
const dotenv = require('dotenv');



module.exports = ()=> {

    const env = dotenv.config().parsed;


    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return merge(common, {
        entry: [
            "@babel/polyfill",
            './js/ClientApp.jsx'],
        plugins: [
            new webpack.DefinePlugin(envKeys)
            ]

    });
}