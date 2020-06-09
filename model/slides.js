const mongoose = require('mongoose');
var schemaSlides = new mongoose.Schema({
    src_img:{
        type:String,
        required:true
    },
    text:{
        type:String,
    },
    a:{
        type:String,
        required:true
    }

})
var Slides = mongoose.model('Slides',schemaSlides);
module.exports = {
    Slides,
}