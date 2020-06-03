module.exports = (req,res)=>{
    var callback = req.query.callback;

        if(req.session.userInfo){
            return res.send(callback + '(' + true + ')')
        }
        return res.send(callback + '(' + false + ')')


}