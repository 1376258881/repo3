//简单自定义 express  起服务
let express = require('express');
let APP = express();
APP.get('/api/user',(res,req)=>{
    req.json( [{name:'wang'}])
})
APP.listen(3001);