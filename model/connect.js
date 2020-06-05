const mongoose = require('mongoose');
//使用config模块
const config = require('config');
mongoose.connect(`mongodb://${config.get('db.username')}:${config.get('db.password')}@${config.get('db.host')}/${config.get('db.name')}`,{useNewUrlParser:true,useUnifiedTopology:true})
        .then(()=>console.log('数据库连接成功'))
        .catch(err=>console.log(err,'错了'));
module.exports = mongoose

// 现在要把一些东西放到配置文件里面