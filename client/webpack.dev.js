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
        devtool: 'cheap-eval-source-map',
        entry: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            "@babel/polyfill",
            './js/ClientApp.jsx'
        ],
        devServer: {
            hot: true,
            publicPath: '/public/',
            historyApiFallback: true
        },


        plugins: [
            new webpack.DefinePlugin(envKeys),
            new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()],
    });

}