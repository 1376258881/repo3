
import moment from 'moment';
import React from 'react';  //引入react
import {render} from 'react-dom';
//使用import 在生产环境下会自动去除没用的代码
//使用requier 会把结果放在default上
render(<h1>123</h1>,window.root);  //react渲染页面


//测试new webpack.IgnorePlugin 优化
import 'moment/locale/zh-cn' ;//手动引入中文包
//moment.locale('zh-cn'); //设置时间显示为中文;

let r =  moment().format('llll');
//console.log($);
console.log(r)

//测试抽离公共
import './a';
import './b';
import $ from 'jquery';  //测试抽离第三方模块


//懒加载测试,vue react 等懒加载,
let but = document.createElement('button');
but.innerHTML = 'hello';
but.addEventListener('click',function(){
    import('./test').then(data =>{
        console.log(data.default)
    });
    
});
document.body.appendChild(but); 



import str from './test';  //测试热更新
console.log(str);   //每次修改,不会页面整体刷新,而是局部刷新

if(module.hot){
    module.hot.accept('./test.js',() =>{
        console.log('文件更新了')
    })
}

