const path = require('path');
module.exports = (req,res)=>{
    return res.sendFile(path.join(__dirname,'../','../','public','login','manage.html'),err => console.log(err))
}