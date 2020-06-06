const mongoose = require('mongoose');
var Schema_directory = new mongoose.Schema({
    name_directory:{
        type:String,
        required:true,
    },
    icon_directory:{
        type:String,
        required:true,
        validate:{
            validator:v => {
                var reg = /^icon-/;
                return reg.test(v)
            },
            message:"图标名称不符合规则，请使用icon-xxxx的形式写"
        }
    }
})
var Directory = mongoose.model('Directory',Schema_directory);
module.exports = {
    Directory,
}