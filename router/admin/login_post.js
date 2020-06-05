const {User} = require('../../model/user');
module.exports = async (req,res)=>{
    var { email,password } = req.body;
    var isFound = await User.findOne({email:email});
    console.log(password,isFound,isFound.password,password === isFound.password);
    if(isFound && password === isFound.password){
        req.session.userInfo = req.body;
        console.log(req.session.userInfo);
        return res.send(true)
    }
    return res.send(false)
}