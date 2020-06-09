const { Slides } = require('../../model/slides');
const mongoose_sex_page = require('mongoose-sex-page');
module.exports = async (req,res)=>{
    var index = req.query.page || 1;
    var result = await mongoose_sex_page(Slides).page(index).size(10).display().find().exec();
    return res.send(JSON.stringify(result))
}