// 拿到参数并返回该文件在服务器的路径
const formidable = require('formidable');
const path = require('path');
module.exports = (req,res)=>{
    var form = new formidable.IncomingForm();
    // 设置文件上传的保存路径
    form.uploadDir = path.join(__dirname,'../','../','public','uploads');
    // 设置文件保存要不要houzhuim
    form.keepExtensions = true;
    form.parse(req,(err,body,files)=>{
        // 拿到文件路径
        var path_server = files.touxiang_img.path.split('public')[1];
        return res.send(path_server);
    })
}