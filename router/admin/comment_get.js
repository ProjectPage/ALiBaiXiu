const {Comment} = require('../../model/comment');
const mongoose_sex_page = require('mongoose-sex-page');
module.exports = async (req,res)=>{
    var index = req.query.page || 1;
    var result = await mongoose_sex_page(Comment).page(index).size(10).display().find().populate('author').populate('article').exec();
    return res.send(JSON.stringify(result));
}