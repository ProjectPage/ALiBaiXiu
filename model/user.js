const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:[true,'已经有了'],
        required:true,
    },
    Nickname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    power:{
        type:String,
        required:true,
        enum:['admin','normal']
    },
    activation:{
        type:String,
        enum:['1','0'],
        required:true
    },
    src_img:{
        type:String,
        required:true
    }
})
var User = mongoose.model('User',userSchema);
// User.create({
//     email:'2117538193@qq.com',
//     password:'f20171106',
//     Nickname:'Fengzhiyong',
//     power:'admin',
//     activation:'1'
// }).then(result => console.log(result)).catch(err=>console.log(err,'创建失败'))
module.exports = {
    User,
}