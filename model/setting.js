const mongoose = require('mongoose');
var schemaSetting = new mongoose.Schema({
    icon:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true,
        enum:['true','false']
    },
    approval:{
        type:String,
        required:true,
        enum:['true','false']
    }
})
var Setting = mongoose.model('Setting',schemaSetting);
module.exports = {
    Setting,
}