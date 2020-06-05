// 现在要做的是在服务器端的退出功能
module.exports = (req,res)=>{
    req.session.destroy(function(err){
        if(!err){
            res.clearCookie('connect.sid');
            return res.send(true)
        }
        return res.send(false)
    })
}