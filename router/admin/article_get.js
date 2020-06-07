const { User } = require('../../model/user');
const { Article } = require('../../model/article');
const mongoose_sex_page = require('mongoose-sex-page');
const {Directory} = require('../../model/directory');
module.exports = async (req,res)=>{
    var index = req.query.page || 1;
    var result = await mongoose_sex_page(Article).page(index).size(10).display().find().populate('author').exec();
    var ss = {
        directory:await Directory.find()
    }
    Object.assign(result,ss);
    return res.send(JSON.stringify(result))
}