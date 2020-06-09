const formidable = require('formidable');
const {Slides} = require('../../model/slides');
module.exports = (req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req,(err,body,files)=>{
        if(err){
            return res.status(400).send('请确认轮播参数');
        }
        Slides.create(body).then(result => {
            return res.send(true)
        }).catch(err =>  {
            return res.status(400).send(err.message)
        })
    })
}