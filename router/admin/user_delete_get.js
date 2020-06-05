const {User} = require('../../model/user');
module.exports = async (req,res)=>{
    var id = req.query;
    for(let i in id){
        await User.findOneAndDelete({_id:id[i]});
    }
    return res.send(true)
}