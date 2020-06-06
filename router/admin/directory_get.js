const path = require('path');
module.exports = (req,res)=>{
    return res.sendFile(path.join(__dirname,'../','../','public','login','directory.html'));
}

// 现在要做的是添加分类
// 1.输入信息
// 2.发送ajax请求，
// 3.服务器将分类添加到数据库
// 4.返回true/false