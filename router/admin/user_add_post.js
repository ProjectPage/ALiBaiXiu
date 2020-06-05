const formidable = require('formidable');
const {User} = require('../../model/user');
module.exports = (req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req,async (err,body,file)=>{
        // 拿到参数
        var {email} = body;
        var isFound = await User.findOne({email:email});
        if(isFound){
            return res.send(false)
        }
        User.create(body).then(result => console.log('添加用户成功')).catch(err => console.log(err,'添加失败'))
        return res.send(true);
        // 把参数和数据库中的值进行比对（根据邮箱）
        // 创建一个数据库
    })
}