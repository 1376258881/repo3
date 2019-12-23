let {smart} = require('webpack-merge');
let base = require('./webpack.config.js');
module.exports = smart(base,{
    mode:'development'  //开发环境
})