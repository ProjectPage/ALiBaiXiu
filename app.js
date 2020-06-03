const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
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