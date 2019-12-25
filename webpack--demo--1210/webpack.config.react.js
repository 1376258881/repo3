//独立打包recat  实现动态连接库,减少每次打包资源   
//webpack.config.js  中设置new webpack.DllReferencePlugin
//public/index.html  把react.js引入路径写死
let path = require('path');  //默认内置node的path模块
let webpack = require('webpack')  //引入webpack模块
module.exports = {
    mode: 'development' ,
    entry:{
        //test:'./src/test.js',
        react:['react','react-dom'],
    },
    output: {  //入口文件
        path: path.resolve(__dirname, 'dist'),
        filename: '_dll_[name].js',  //打包后的文件名
        library:'_dll_[name]',  //默认相当于在test.js导出的结果前面var ab = 
      //  libraryTarget:'commonjs',
    } ,
    plugins: [   //插件集合   
        new webpack.DllPlugin({
            name:'_dll_[name]',  //与 output.library 保持 name 的一致性。
            path:path.resolve(__dirname,'dist','manifest.json'),   //生成任务清单,
        })
    ] ,
}