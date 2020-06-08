const {Article} = require('../../model/article');
const formidable = require('formidable');
const path =require('path');
module.exports = async (req,res)=>{
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname,'../','../','public','uploads');
    form.keepExtensions = true;
    form.parse(req,async (err,body,files)=>{
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
        await Article.updateOne({_id:body.id},obj).then(result =>{
            return res.send(true)
        }).catch(err => {
            return res.send('修改文章出错')
        })



    })
}