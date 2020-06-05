const {User} = require('../../model/user');
const formidable = require('formidable');
module.exports = (req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req,(err,body,files)=>{
        User.updateOne({_id:body.id},body)
            .then(result => {
                if(result.nModified === 1){
                    return res.send(true)
                }
                return res.send(false)
            })
            .catch(err => console.log(err,'更新数据库失败'));
    })
}