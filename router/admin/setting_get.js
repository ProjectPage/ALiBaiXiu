const {Setting} = require('../../model/setting');
module.exports = async (req,res)=>{
    var result = await Setting.find();
    return res.send(result)
}