// 这里面要查询文章、分类、评论、三个数据库的数据/
// 将每个数据库的数据统计
//     有几篇文章、文章里有几篇是草稿的
//     有几个分类
//     有几条评论、评论有几条待审核
const {Article} = require('../../model/article');
const {Directory} = require('../../model/directory');
const {Comment} = require('../../model/comment');
module.exports = async (req,res)=>{
    var result = {
        size_article:await (await Article.find()).length,
        size_article_0:await (await Article.find({status:'0'})).length,
        size_directory:await (await Directory.find()).length,
        size_comment:await (await Comment.find()).length,
        size_comment_0:await (await Comment.find({status:'0'})).length
    }
    return res.send(JSON.stringify(result));
}