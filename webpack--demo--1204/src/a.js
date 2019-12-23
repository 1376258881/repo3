module.exports = 'haha';//导出
require('@babel/polyfill');  //解决更高级语法解析
// class B{     //这是重复的函数,测试是否解析去掉重复的函数
//    b=2;
// }


console.log('aaa'.includes('a'))  //includes()方法检查'aaa'中是否有'a'
let fn = () =>{  //测试es6语法
    console.log(123)
};
fn();


// class A{  //检测es7语法是否解析
//     a=1;
// }

// let a = new A();
// console.log(a.a)