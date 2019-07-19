//引入express模块
const express = require('express');
//引入路由器
var userRouter = require('./routes/user.js');
//引入插件
const bodyParser = require('body-parser');
const cors = require("cors");
const session = require("express-session");
//创建服务器
var server = express();
//跨域
server.use(cors({
    origin: ["http://127.0.0.1:8080", "http://localhost:8080"],
    credentials: true
}))
//session
server.use(session({
    secret: "128位字符串",      //自定义字符串用于加密数据使用
    resave: true,              //每次请求更新数据
    saveUninitialized: true    //保存初始化的数据
}))
//设置端口
server.listen(8080);
//使用bodyParser中间件将post请求的数据格式化为对象
server.use(bodyParser.urlencoded({
    extended: false
}));
//托管静态资源到public下
server.use(express.static('public'));
//使用路由/挂载
server.use('/user', userRouter);