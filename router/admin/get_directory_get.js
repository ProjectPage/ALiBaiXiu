const { Directory } = require('../../model/directory');
const { User } = require('../../model/user');
module.exports = async (req,res)=>{
    var result = await Directory.find();
    var result_1 = await User.findOne({email:req.session.userInfo.email})
    result = {
        result,
        id:result_1
    }
    return res.send(result);
}