const {Directory} = require('../../model/directory');
const formidable = require('formidable');
module.exports = (req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req,async (err,body,files)=>{
        var result = await Directory.findOne({name_directory:body.name_directory});
        if(result){
            return res.send('再请换一个名称')
        }
        Directory.updateOne({_id:body.id},body)
            .then(result => {
                if(result.nModified === 1){
                    return res.send(true)
                }
                return res.send(false)
            })
            .catch(err => console.log(err,'更新分类数据库失败'));
    })
}