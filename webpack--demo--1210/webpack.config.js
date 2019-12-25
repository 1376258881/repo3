let path = require('path');  //默认内置node的path模块
let HtmlWebpackPlugin = require('html-webpack-plugin');  //引入html插件
let webpack = require('webpack') ; //引入webpack模块
let Happypack = require('happypack');  //多线程打包,项目较大时效率比较高

module.exports = {
    mode: 'development' ,
    entry:{
        index:'./src/index.js',
        other:'./src/other.js'
    },
    output: {  //入口文件
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',  //打包后的文件名
    } ,
    optimization:{
        splitChunks:{  //分割代码块   多页应用
            cacheGroups:{  //缓存组
                common:{
                    minSize:0,  //大于0个字节,就抽离
                    minChunks:2,  //引用多少次
                    chunks:'initial'  //在哪里开始抽离
                },
                vendor:{   //第三方 ,设置抽离第三方模块
                    priority:1,  //设置权重,先抽离第三方模块
                    test:/node_modules/,
                    minSize:0,  //大于0个字节,就抽离
                    minChunks:2,  //引用多少次
                    chunks:'initial'  //在哪里开始抽离
                }
            }
        }   
    },
    plugins: [   //插件集合  
        // new webpack.DllReferencePlugin({                   //动态链接库
        //     manifest:path.resolve(__dirname,'dist','manifest.json'), //优先查找任务清单,如果没有在进行打包
        // }) ,                                                            //需要在模板中优先引入react.js文件,
        new webpack.HotModuleReplacementPlugin(),  //热更新插件
        new webpack.NamedModulesPlugin(),  //那个模块热更新.打印热更新模块路径
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
        new webpack.IgnorePlugin(/\.\/local/,/moment/),//忽略引入的文件,在文件夹moment中引入.local的文件,就忽略掉
        new Happypack({  ////多线程打包实例
            id:'js',
            use: [{  //模块在实例中引入
                loader:'babel-loader',
                options:{   //将es6转为es5
                    presets:[
                        '@babel/preset-env' ,//babel-loader调用@babel/preset-env核心模块对es6进行处理为es5                      
                        '@babel/preset-react'  //解析react语法
                    ] , 
                    plugins:[
                        ['@babel/plugin-syntax-dynamic-import']
                    ]                                                                        //注意代码上下顺序
                    // plugins: [['@babel/plugin-proposal-decorators', {"legacy": true }],//  @babel/preset-env下的子模块,打包解析es7为es5                                                                
                    //         ['@babel/plugin-proposal-class-properties', { "loose": true}] ,       //   解析ES7中@修饰器                                                                 
                    //         '@babel/plugin-transform-runtime',            //解析ES6异步函数generator函数      测试:只会对index.js进行解析                                  
                    // ]                                      
                }
            }],
        }),
    ] ,
    devServer:{
        hot:true,///启用热更新
        port:4001,  //端口更改
        progress:true,  //进度条
    },
    module: {   //匹配文件进行处理
        noParse:/jquery/,//jquery没有依赖项,不去解析jquery中的依赖项,优化打包时间
        rules: [         
            {
                test: /\.js$/,  //匹配所以js文件
                //优化项
                exclude: /node_modules/,   //匹配js文件中,排除node_modules文件夹目录下的js文件
                include:path.resolve(__dirname,'src'), //到src文件夹下找js文件
                use:'Happypack/loader?id=js'  //使用多线程打包,打包的js文件
            }
        ]
    } 
}
