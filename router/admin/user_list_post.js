const {User} = require('../../model/user');
module.exports = async (req,res)=>{
    var userAll = await User.find();
    // 将密码排除
    userAll.forEach(function(v){
        for(let i in v){
            if(i === 'password'){
                v[i] = ''
            }
        }
    })
    // 现在要做的是将已经登录的用户排到前面来，也就是要排序；
    return res.send(JSON.stringify({userAll,user_now:req.session.userInfo.email}));
    // 这里肯定会查到自己，到时候在客户端怎么识别呢，返回一个识别字符过去吗？
    // 还有密码不能发过来
}