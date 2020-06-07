const mongoose = require('mongoose');
var schemaUser = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    cover:{
        type:String,
    },
    date:{
        type:Date,
        required:true
    },
    directory:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        enum:['0','1']
    }
})
var article = mongoose.model('Article',schemaUser);
module.exports = {
    Article:article
}

