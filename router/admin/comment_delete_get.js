const {Comment} = require('../../model/comment');
module.exports = async (req,res,next)=>{
    await Comment.findOneAndDelete({_id:req.query.id});
    return res.send(true)
}