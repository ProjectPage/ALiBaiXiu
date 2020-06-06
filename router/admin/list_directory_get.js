const {Directory} = require('../../model/directory');
const page = require('mongoose-sex-page');
module.exports = async (req,res)=>{
    var index = req.query.page || 1;
    var result = await page(Directory).page(index).display().size(8).find().exec();
    return res.send(result)
    // 还需要分液器 一页显示都少个数据 dangqian显示的页数 有多少个分液器
}