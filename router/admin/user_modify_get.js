const {User} = require('../../model/user');
module.exports = async (req,res)=>{
    var id = req.query.id;
    var isFound = await User.findOne({_id:id});
    if(isFound){
        return res.send(JSON.stringify(isFound))
    }
    return res.status(404).send('没找到这个用户-来自编辑用户');
}