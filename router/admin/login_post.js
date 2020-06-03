module.exports = (req,res)=>{
    var { email,password } = req.body;
    if(email === '2117538193@qq.com' && password === 'f20171106'){
        req.session.userInfo = req.body;
        console.log(req.session.userInfo);
        return res.send(true)
    }
    return res.send(false)
}