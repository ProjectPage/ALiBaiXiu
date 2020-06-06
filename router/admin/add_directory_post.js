const formidable = require('formidable');
const {Directory} = require('../../model/directory');
module.exports = (req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req,async (err,body,files)=>{
        if(err){
            return res.status(400).send('请确认输入')
        }
        // 确认数据库中没有这个名称
        var result = await Directory.findOne({name_directory:body.name_directory});
        if(result){
            return res.send('这个名称已经有了')
        }
        // 把数据添加到数据库
        Directory.create(body).then(result=>{
            return res.send(true)
        }).catch(err=>{
            return res.send(err.message)
        })
    })
}