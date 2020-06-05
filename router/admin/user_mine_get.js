const {User} = require('../../model/user');
module.exports = async (req,res)=>{
    var result = await User.findOne({email:req.session.userInfo.email});
    result.password = '';
    return res.send(JSON.stringify(result));
}