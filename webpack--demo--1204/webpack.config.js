const path = require('path');  //默认内置node的path模块
let HtmlWebpackPlugin = require('html-webpack-plugin');  //引入html插件
let MiniCssExtractPlugin = require('mini-css-extract-plugin'); // CSS抽离插件
let optimizeCss = require('optimize-css-assets-webpack-plugin');  //css压缩插件
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');    //js压缩   
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //引用的时候需要用对象解构,在打包之前将文件先清除，之后再打包出最新的文件
let CopyWebpackPlugin=require('copy-webpack-plugin');   //拷贝插件
let webpack = require('webpack')  //引入webpack模块
module.exports = {
    // optimization: {    //开发环境(development)不会走这里,需要在插件集合plugins中设置
    //     minimizer: [  //压缩
    //         new optimizeCss(),   //css压缩优化
    //         new UglifyJsPlugin()  //js压缩
    //     ]
    // },
    devServer:{  //开发服务器配置
        port:4000,  //端口更改
        progress:true,  //进度条
        contentBase:'./huild',   //指定目录作为静态服务 
        //1.代理解决跨域
        proxy: {   //重写的方式解决跨域,代理
            '/api': {
                target: 'http://localhost:3001/api',  //// 接口的域名
                changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
                secure: false,  // 如果是https接口，需要配置这个参数
                pathRewrite: {  //// pathRewrite 来重写地址，将前缀 '/api' 转为 '/'
                    '^/api': ''   
                }
            }
        },
        //2.自定义,模拟数据,无需设置端口
        // before(app){//钩子
        //     app.get('/user',(res,req)=>{
        //         req.json( [{name:'wang'}])
        //     })
        // }
    },
    mode: 'development' , //打包的模式,选择 development(压缩) 或 production (开发模式)之中的一个
    entry:{
        index:'./src/index.js',
        home:'./src/home.js',
        other:'./src/other.js'
    }, 
  //  devtool:"source-map",  //生成映射源码文件, 标识报错行和列   
    devtool:'eval-source-map',//不生成映射文件,在源文件上显示
    // watch: true,  //是否监听每次文件的改变
    // watchOptions:{  //监听的参数
    //     poll:1000,  //每秒询问次数
    //     aggregateTimeout:500,  //防抖,多少毫秒没有操作就进行打包
    //     ignored: /node_modules/,  //忽略监控打包的文件夹
    // },
    output: {  //入口文件
        path: path.resolve(__dirname, 'build'),  //打包后的路径,__dirname以当前目录下的路径
        filename: '[name].js',    //打包后的文件名字,[hash:8].可选项,给文件加上hash戳,每次打包防止文件覆盖
        //publicPath:'http//www.baidu.com'      //表示打包文件中引用文件的路径前缀，如果你的图片存放在CDN上，
                           //那么你上线时可以加上这个参数，值为CDN地址
    },
    resolve:{   //解析, 第三方包, commonjs规范  Resolve 配置 Webpack 如何寻找模块所对应的文件
        modules:[path.resolve('node_modules')],  //规定在当前目录下查找模块
        alias:{  //别名  给该文件起个别名 alias在大型项目中及其有用，你不用写大段的文件路径，只需一个短短的别名，就可解决路径问题
            bootstrap:'bootstrap/dist/css/bootstrap.css', 
        },
        extensions: [ '.ts', '.tsx', '.js','.css', '.json'],//没有拓展后缀时先去找哪个,没有找到,在接着找
        mainFields:['style','main'],  //先找第一个模块,再找第二个模块
       // mainFiles:[ ],//入口文件的名字  默认是index.js
    },     
    plugins: [   //插件集合   
        new webpack.DefinePlugin({
            DEV:JSON.stringify('dev'),
            FLAG:'true',
            EXPORESSION: '1+1' ,    
        }), 
        new HtmlWebpackPlugin({           //html处理插件实例
            template: './src/index.html',  //打包的模板
            filename: 'index.html',         //打包后的文件名
            chunks:['index']    //加载对应的js
        //     minify:{                              //html压缩处理  
        //         removeAttributeQuotes:true,     //删除引号
        //         //collapseWhitespace:true,        //压缩成一行
        //     },
        //    // hash:true,          //打包后的文件后面加上hash戳
        }),
        new HtmlWebpackPlugin({           //html处理插件实例,多个页面需要多个实例
            template: './src/home.html',  
            filename: 'home.html',         
            chunks:['home']
        }),
        new HtmlWebpackPlugin({           
            template: './src/other.html',  
            filename: 'other.html',         
            chunks:['other']
        }),
     //使用 CleanWebpackPlugin 插件可以在每次构建前都清楚 build 文件夹, 这样每次构建完, build 目录下只有会生成要用到的文件
        new CleanWebpackPlugin({  
            root: path.resolve(__dirname, './build'), //配置要删除的路径,root的默认值就是__dirname
            exclude: ['img'], //排除不删除的目录，主要用于避免删除公用的文件
            verbose: true,  //控制台打印日志，默认是true
            dry: false   //是否要删除,为true是不删除的
        }),
        new CopyWebpackPlugin([  //文件夹内的文件拷贝到另一个文件夹下
            {
                from: __dirname+'/src/components',
                to: __dirname+'/build',
                ignore: ['.*']
            }
        ]),
          
        new MiniCssExtractPlugin({  //使用extractTextPlugin插件时，需要配置publicPath: "../", 不配置时css文件中背景图默认地址会在css文件夹下查找图片资源，导致项目图片路径不正确
            filename:'css/main.css',  //抽离的css目录和打包后的名
            //publicPath: '../',         // 注意配置这一部分，根据目录结构自由调整

        }),
       // new optimizeCss(),   //css压缩优化
        // new UglifyJsPlugin({   //js压缩优化
        //     cache: true,  //启用文件缓存。默认的缓存路径为： node_modules/.cache/uglifyjs-webpack-plugin.,可以自定义路径
        //     parallel:true,  //并发打包js
        //     sourceMap:true    //源码映射,      
        // })
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new webpack.BannerPlugin('wang'),  //打包声明
        
    ],
// externals:{ //当index.html中已经cdn引入jquery后,index.js中 import $ from 'jquery'再次引入  webpack会忽略重复打包jquery
    //    jquery:'jquery',  
    // },
    module: {   //匹配文件进行处理
        rules: [          
            // {    //对js代码进行检查校验,依赖 eslint 插件
            //     test: /\.js$/,  //匹配所有js文件
            //     loader:'eslint-loader',               
            //     exclude: /node_modules/, // 不检测的文件
            //     include: [path.resolve(__dirname, 'src')], // 指定检查的目录
            //     options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
            //         formatter: require('eslint-friendly-formatter'), // 指定错误报告的格式规范
            //         enforce: "pre",  //// 在编译前检查
            //     }
            // },
            // {
            //     //  test: require.resolve("jquery"), loader: "expose-loader?$"  //将jquery暴露全局的第二种写法,注意:相对应的js文件中还需要import $ from 'jquery
            // },
            {
                test: /\.(htm|html)$/i,        //打包html中的img  src
                 use:[ 'html-withimg-loader']   //有bug,已解决
            },
            // {
            //     test:/\.html$/,
            //     use:[
            //         {
            //             loader:"html-loader",
            //             options:{
            //                 attrs:["img:src"]  //此处的参数值  img是指html中的 <img/> 标签， src是指 img的src属性   表示 html-loader 作用于 img标签中的 src的属性
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.(png|jpg|gif)$/,   //js中对图片进行打包
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                        limit:1*1024,     //小于多少 将图片转base64,减少http请求,图片文件增大三分之一  
                                            //一般用于小图标
                        outputPath:'./img/',   //img文件目录 ,没有就自动创建
                       // publicPath:'http://www',
                       esModule: false,  //必须加上,避免html-withimg-load打包出现bug
                    }
                  }
                ]
            },                                    
           {
                test: /\.js$/,  //匹配所以js文件
                use: {
                    loader:'babel-loader',
                    options:{   //将es6转为es5
                        presets:[
                            '@babel/preset-env' ,//babel-loader调用@babel/preset-env核心模块对es6进行处理为es5                      
                        ] ,                                                                         //注意代码上下顺序
                        plugins: [['@babel/plugin-proposal-decorators', {"legacy": true }],//  @babel/preset-env下的子模块,打包解析es7为es5                                                                
                                ['@babel/plugin-proposal-class-properties', { "loose": true}] ,       //   解析ES7中@修饰器                                                                 
                                '@babel/plugin-transform-runtime',            //解析ES6异步函数generator函数      测试:只会对index.js进行解析                                  
                        ]                                      
                    }
                },
                exclude: /node_modules/,   //匹配js文件中,排除node_modules文件夹目录下的js文件
               include:path.resolve(__dirname,'src'), //到src文件夹下找js文件
            },
          {
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader, //将解析的css抽离为main.css文件
                    options: {
                        publicPath: '../' //这个option必须写，否则css中图片路径可能会出错
                    }
                },     
                'css-loader',                      //必须在'css-loader'下面,添加css前缀,配置同级目录下的postcss.config.js文件,进行配置
                'postcss-loader'
            ]
          },
          {
            test: /\.less$/,    //解析less
            use: [
                MiniCssExtractPlugin.loader,       //将解析的css抽离为main.css文件             
                'css-loader',
                'postcss-loader',                //必须在'css-loader'下面
                'less-loader',                  
            ]           
            },         
        ]
      }
};
