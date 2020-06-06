const {Directory} = require('../../model/directory');
module.exports = async (req,res)=>{
    var id = req.query.id;
    var isFound = await Directory.findOne({_id:id});
    if(isFound){
        return res.send(JSON.stringify(isFound))
    }
    return res.status(404).send('没找到这个分类-来自编辑分类');
}