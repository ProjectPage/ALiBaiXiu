const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
// 连接数据库
require('./model/connect');
// 应用集合规则
require('./model/user');
require('./model/directory');
const app = express();
// 获得系统环境变量
// console.log(process.env);
// 设置静态资源的根目录
app.use(express.static(path.join(__dirname,'public')));
// 配置session
app.use(session({
    secret:'secret key',
    cookie:{
        maxAge:24*60*60*1000
    },
    saveUninitialized:false
}))
// 配置解析post请求参数
app.use(bodyParser.urlencoded({extended:false}));
// 拿到路由处理/
const admin = require('./router/admin');
app.use('/admin',admin);
app.listen(3000);


// 如果现在不处理，到了后面几多了就不好处理了
// 怎么处理
// 路由处理拿出了
// 路由里的函数又拿出来