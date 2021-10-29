const userRouter = require('express').Router();
const mongoose=require('mongoose');
const Users=mongoose.model('users')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


userRouter.post('/signup', (req, res) => {
    console.log("Signup is running..")
    const {name,email,password}=req.body
    if (!name || !email || !password) {
        return res.status(400).send({
            error: 'name, email and password are required'
        })
    }
    Users.findOne({ email: email }, (err, user) => {
        if (user) {
            return res.status(400).send({
                error: 'email already in use'
            })
        }
    })

    bcrypt.hash(password,12).then(hashedPassword=>{
        const newUser = new Users({
            name,
            email,
            password:hashedPassword
        })
        newUser.save().then(() => {
            res.status(200).json({
                message: 'user created successfully'
            })
        }).catch(err => {
            return res.status(400).json({
                error: 'Coudn\'t save user in database'
            })
        })        
    })
})

//login
userRouter.post('/login',(req,res)=>{
    console.log("login is running")
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({
            error:'email and password are required'
        })
    }
    Users.findOne({email:email}).then(user=>{
        if(!user){
            return res.status(400).json({
                error:'email not found'
            })
        }
        bcrypt.compare(password,user.password).then(match=>{
            if(match){
                const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)
                res.status(200).json({
                    message:'login successful',
                    token:token
                })
            }else{
                return res.status(400).json({
                    error:'password incorrect'
                })
            }
        })
    })
})

module.exports = userRouter;