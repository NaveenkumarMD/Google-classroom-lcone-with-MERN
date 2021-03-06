const workRouter=require('express').Router();
const mongoose=require('mongoose')
const Users=mongoose.model('users')
const Rooms=mongoose.model('rooms')
const Works=mongoose.model('works')
const authenticate=require('../Middlewares/usermiddleware')
const workMailer=require('../Functions/mailer').WorkMailer
//add works to work collection in database
workRouter.post("/creatework",authenticate,(req,res)=>{
    const {_id,name}=req.user
    const {title,description,due,files,room}=req.body
    const newWork=new Works({
        title,
        description,
        due,
        room,
        files,
        room,
        createdby:_id
    })
    Rooms.findById(room).populate('students').populate('teachers').then((roomdata,error)=>{
        if(error){
            return res.status(400).json({
                error:"Room not found"
            })
        }
        let usersarray=[]
        let usersid=[]
        roomdata.students.forEach(student => {
            usersarray.push(student.email)
            usersid.push(student._id)
        })
        newWork.save().then((work,error)=>{
            if(error){
                return res.status(400).json({
                    error:"error occured while saving work"
                })
            }
            let now=new Date()
            let time=now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()
            const maildata={
                subject:`New work has been assigned to you by ${name} in ${roomdata.room_name} on ${time}`,
                Assignedby:name,
                room_name:roomdata.room_name,
                time:time,
                content:{
                    title:title,
                    description:description,
                },
                users:usersarray,
                due:due,
            }
            workMailer(maildata)

            res.send({
                message:"Work added successfully",
                data:work
            })
        })
    })
    
})

//delete works after autehntication
workRouter.delete("/deletework",authenticate,(req,res)=>{
    const {_id}=req.user
    const {workid}=req.body
    Works.findById(workid).then((work,error)=>{
        if(error){
            return res.status(400).json({
                error:"error occured while deleting work"
            })
        }
        if(String(work.createdby)!==String(_id)){
            return res.status(400).json({
                error:"You are not authorized to delete this work"
            })
        }
        work.remove().then((work,error)=>{
            if(error){
                return res.status(400).json({
                    error:"error occured while deleting work"
                })
            }
            res.send({
                message:"Work deleted successfully"
            })
        })
    })
})

workRouter.post("/attachwork",authenticate,(req,res)=>{
    const {_id}=req.user
    const {workid,files}=req.body
    Works.findById(workid).then((work,error)=>{
        if(error){
            return res.status(400).json({
                error:"error occured while adding work"
            })
        }
        if(work.due<Date.now()){
            return res.status(400).json({
                error:"work is already expired"
            })
        }
        submittedfiles=[
            ...work.submittedFiles
        ]
        submittedfiles.push({
            user:_id,
            file:files,
            time:Date.now()
        })
        for (let i in work.submittedFiles){
            console.log(i)
            console.log(work.submittedFiles[i].user)
            console.log(_id)
            if (String(work.submittedFiles[i].user)===String(_id)){
                return res.status(400).json({
                    error:"You have already submitted this file"
                })
            }
        }
        work.submittedFiles=submittedfiles
        work.save().then((work,error)=>{
            if(error){
                return res.status(400).json({
                    error:"error occured while adding work"
                })
            }
            res.send({
                message:"Work added successfully"
            })
        })
    })
})
module.exports=workRouter;