const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry:  './src/index',
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    externals: [nodeExternals()],
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
    output: { path: path.join(__dirname), filename: 'server.js' }
};
