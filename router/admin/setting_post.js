const {Setting} = require('../../model/setting');
const formidable = require('formidable');
module.exports = async (req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req,async (err,body,files)=>{
        if(err){
            return res.status(400).send('请检查输入的网站设置信息')
        }
        if(body.id){
            await Setting.updateOne({_id:body.id},body).then(result => {
                return res.send(true)
            }).catch(err=>{
                return res.send(false)
            })
        } 
        else{
            Setting.create(body).then(result=>{
                console.log('网站设置数据创建成功');
                return res.send(true)
            }).catch(err=>{
                console.log('网站设置数据创建失败',err);
                return res.send(false)
            })
        }
    })

}