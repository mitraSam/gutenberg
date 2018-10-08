const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

const merge = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
    entry:  './src/index',
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    externals: [nodeExternals()],
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': { BUILD_TARGET: JSON.stringify('server') }
        }),
    ],
    output: { path: path.join(__dirname), filename: 'server.js' }
});