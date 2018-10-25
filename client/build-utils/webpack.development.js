const webpack = require('webpack');



module.exports =  {

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
        new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()],

}