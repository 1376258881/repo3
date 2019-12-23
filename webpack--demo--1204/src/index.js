// import $ from 'jquery';  //模块安装时注意全部小写  ,
//import $ from 'expose-loader?$!jquery'; //第一种写法 expose-loader暴露全局的插件  内联loader  ,将jquery暴露全局
import logo from './banner-nav_03.jpg'  //引入图片,生成hash戳,作为新的图片的地址
//import '../node_modules/bootstrap/dist/css/bootstrap.css';
//import 'bootstrap';  //测试resolve
    //需要依赖file-loader进行转化,并生成到build目录下,返回图片名称
let str = require('./a.js');
console.log(str);
require('./index.css');
require('./a.less');
let fn = () =>{  //测试es6语法
    console.log(123)
};
fn();
class A{  //检测es7语法是否被解析
   a=1;
}

let a = new A();
console.log(a.a)

function *gen(){   //generator函数 测试解析是否成功
    yield 1;
}
console.log(gen().next());
console.log($);  //测试打印jquery
console.log(window.$)//测试打印jquery是否挂载全局


let imgage = new Image();
imgage.src =logo;
document.body.appendChild(imgage);

var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.open("GET","/api/user",true);
xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        console.log(xmlhttp.responseText);
    }
}
xmlhttp.send();
console.log(FLAG);

let url = '';
if (DEV === "dev") {  //开发环境
    url = 'http://localhost:4000/'
} else {   //生产环境的域名
   // url = 'http://localhost:4000/'
}
console.log(url+'---------------');  //测试域名是否改变