const {Article} = require('../../model/article');
module.exports = async (req,res)=>{
    await Article.findOneAndDelete({_id:req.query.id});
    return res.send(true)
}