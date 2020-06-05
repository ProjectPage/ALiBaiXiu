const express = require('express');
const admin = express.Router();
// 登录页面
admin.get('/login',require('./admin/login_get'));
// 登录表单提交
admin.post('/login',require('./admin/login_post'));
// 管理页面
admin.get('/manage',require('./admin/manage_get'));
// 获取登录状态
admin.get('/statu',require('./admin/statu_get'));
// 退出
admin.get('/logout',require('./admin/logout_get'));
// 用户页面
admin.get('/user',require('./admin/user_get'));
// 添加用户
admin.post('/user_add',require('./admin/user_add_post'));
// 上传头像
admin.post('/upload',require('./admin/upload_post'));
// 获取当前登录用户
admin.get('/user_mine',require('./admin/user_mine_get'));
// 获取用户列表
admin.post('/user_list',require('./admin/user_list_post'));
// 编辑用户
admin.get('/user_modify',require('./admin/user_modify_get'));
// 修改用户
admin.post('/user_modify',require('./admin/user_modify_post'));
// 删除一个用户
admin.get('/user_delete',require('./admin/user_delete_get'));
module.exports = admin;


// 现在要做的是验证有没有登录
// 如果在没有处罚login的条件下，根据登陆情况决定进入管理页面还是让它重定向到login
//   要怎么知道它是登陆的还是没登陆的——————————利用cookie
//     如果在服务器已经保存了session的情况呢，就是登录，只要验证这个有没有就可以了
//     已经想好了，服务器根据情况返回true/false，客户端拿到值进行判断 怎么拿到这个值
//     这个只能用同步的，因为一步的话不会阻止代码向下执行，而这次是需要组织的


// 现在要做的是用户页面
// 1.静态页面
// 2.配置路由
// 3.写路由函数
// 4.

// 现在要完成添加用户的共呢个
// 1.在客户端验证    验证邮箱、密码、用户名的合法性或者可用性   必填、用户名的长度不能少于1大于8、密码不能少于8大于20、邮箱必须是合法的邮箱地址
// 2.能够过验证通过就发送Ajax请求，不能通过就阻止提交表单并弹出输入的不符合规则    
// 3.服务器拿到参数在数据库中进行比较，根据邮箱来判断唯一性，如果是唯一了就返回true不是就返回false    要开一个数据库
// 4.客户端根据返回的值进行选择。true就重新刷新页面（这个是为了在同页面的列表）。false就弹出已经有了，请换一个

