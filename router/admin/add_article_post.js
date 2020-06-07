const formidable = require('formidable');
const path = require('path');
const {Article} = require('../../model/article');
module.exports = (req,res) => {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname,'../','../','public','uploads');
    form.keepExtensions = true;
    form.parse(req,(err,body,files)=>{
        if(err){
            return res.status(400).send('请确认输入的内容')
        }
        try{
            var obj = {
                cover:files.cover.path.split('public')[1]
            }
        }catch(e){
            var obj = {
                cover:''
            }
        }
        Object.assign(obj,body);
        Article.create(obj).then(result=>{
            console.log('文章创建成功');
            return res.send(true)
        }).catch(err=>{
            console.log('文章创建失败',err);
            return res.send(false)
        })

    })
}