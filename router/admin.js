const express = require('express');
const admin = express.Router();
// 登录页面
admin.get('/login',require('./admin/login_get'));
// 登录表单提交
admin.post('/login',require('./admin/login_post'));
// 管理页面
admin.get('/manage',require('./admin/manage_get'));
admin.get('/statu',require('./admin/statu_get'));
module.exports = admin;


// 现在要做的是验证有没有登录
// 如果在没有处罚login的条件下，根据登陆情况决定进入管理页面还是让它重定向到login
//   要怎么知道它是登陆的还是没登陆的——————————利用cookie
//     如果在服务器已经保存了session的情况呢，就是登录，只要验证这个有没有就可以了
//     已经想好了，服务器根据情况返回true/false，客户端拿到值进行判断 怎么拿到这个值
//     这个只能用同步的，因为一步的话不会阻止代码向下执行，而这次是需要组织的
