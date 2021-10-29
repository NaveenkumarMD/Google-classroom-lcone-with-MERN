const jwt=require('jsonwebtoken');
const mongoose=require('mongoose')
const Users=mongoose.model('users')
const usermiddleware=(req,res,next)=>{
    const {authorization}=req.headers
    if (!authorization) {
        return res.status(401).json({
            error: 'You must be logged in'
        })
    }
    const token=authorization.replace('Bearer ', '')
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({
                error: 'You must be logged in'
            })
        }
        const {id}=payload
        Users.findById(id).then(userdata=>{
            req.user=userdata
            next()
        })
    })
}
module.exports=usermiddleware;