//引入express模块
const express = require('express');
//引入路由器
var userRouter = require('./routes/user.js');
//引入插件
const bodyParser = require('body-parser');
//创建服务器
var server = express();
//设置端口
server.listen(8080);
//使用bodyParser中间件将post请求的数据格式化为对象
server.use(bodyParser.urlencoded({
	extended:false
}));


//托管静态资源到public下
server.use( express.static('public') );
//使用路由/挂载
server.use('/user',userRouter);