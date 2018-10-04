 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');



module.exports = merge(common, {
    entry: [
        "@babel/polyfill",
        './js/ClientApp.jsx',]
});