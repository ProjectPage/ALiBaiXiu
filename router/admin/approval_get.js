const {Comment} = require('../../model/comment');
module.exports = async (req,res)=>{
    var status = req.query.status === '0' ? '1' : '0';
    await Comment.updateOne({_id:req.query.id},{status,});
    return res.send(true)
}