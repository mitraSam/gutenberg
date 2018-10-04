const webpack = require('webpack')
const path = require('path')
const StartServerPlugin = require('start-server-webpack-plugin')

module.exports = {
    entry:  './src/index',
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: [['env', { modules: false }], 'stage-0'],
                            plugins: ['transform-regenerator', 'transform-runtime']
                        }
                    }
                ],
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': { BUILD_TARGET: JSON.stringify('server') }
        }),
    ],
    output: { path: path.join(__dirname, 'dist'), filename: 'server.js' }
};
