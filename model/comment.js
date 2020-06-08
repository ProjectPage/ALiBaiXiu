const mongoose = require('mongoose');
var scheme_comment = new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    content:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    article:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Article',
        required:true
    },
    status:{
        type:String,
        default:'0',
        enum:['1','0']
    }
})
var Comment = mongoose.model('Comment',scheme_comment);
// for(let i = 0;i<12;i++){
//     Comment.create({
//     author:'5ed8f675757e2c1c183866a0',
//     content:'第一条评论',
//     article:'5edccf348cd2fb1da08aa063',
//     status:'0'
// }).then(result=>console.log('评论创建陈宫')).catch(err=>console.log(err,'评论创建失败'))
// }

module.exports = {
    Comment,
}

