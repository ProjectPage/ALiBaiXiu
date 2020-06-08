const {Article} = require('../../model/article');
const {Directory} = require('../../model/directory');
module.exports = async (req,res)=>{
    var result = await Article.findOne({_id:req.query.id});
    var result_1 = await Directory.find();
    result = {
        result,
        directory:result_1
    }
    return res.send(JSON.stringify(result))
}