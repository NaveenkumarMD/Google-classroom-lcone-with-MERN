const roomRouter=require('express').Router();
const mongoose=require('mongoose')
const Room=mongoose.model('rooms')
const authenticate=require('../Middlewares/usermiddleware')
const ownerauthenticate=require('../Middlewares/roomownermiddleware')  
const bcrypt=require('bcrypt') 
const sendMail=require('../Functions/mailer');
const teacherinvitation = require('../Mail templates/Teacherjoininvitation');
roomRouter.post("/createroom",authenticate,(req,res)=>{
    console.log("Creating room is running....")
    const {room_name}=req.body
    const newRoom=Room({
        room_name:room_name,
        room_owner:req.user._id,
        teachers:[req.user._id],
        room_id:Math.floor(Math.random()*10000)+10000,
        logo:null,
        createdon:new Date()
    })
    newRoom.save().then((roomdetails,err)=>{
        if (err){
            return res.status(501).json({
                error:err
            })
        }
        res.status(200).json({
            message:"Room created successfully",
            data:roomdetails
        })
        
    })
})

roomRouter.post("/inviteteacher",ownerauthenticate,async (req,res)=>{
    console.log(req.room)
    const {room_name,room_id}=req.room
    const {teacher_mail}=req.body
    const hashedTeacherMail=await bcrypt.hash(teacher_mail,12)
    console.log(hashedTeacherMail)
    const htmltemplate=teacherinvitation(
        teacher_mail.replace("@gmail.com",""),
        room_name,
        room_id,
        `http://localhost:5000/joinasteacher/${room_id}/${hashedTeacherMail}`
    )

    const maildetails={
        to:teacher_mail,
        subject:"Invitation to join a room as a teacher",
        html:htmltemplate,
        text:"hello"

    }
    res.send(htmltemplate)
    await sendMail(maildetails).then(Mailresponse=>{
        console.log(Mailresponse)
    })
    res.send("recieved")
})
roomRouter.delete("/deleteroom",ownerauthenticate,(req,res)=>{
    console.log("Deleting room is running....")
    const {room_id}=req.body
    Room.findOneAndDelete({room_id:room_id}).then((roomdetails,err)=>{
        if (err){
            return res.status(501).json({
                error:"Action failed"
            })
        }
        if (!roomdetails){
            return res.status(404).json({
                error:"Room not found"
            })
        }
        res.status(200).json({
            message:"Room deleted successfully",
        })
        
    })
})

roomRouter.post("/addteacher",authenticate,(req,res)=>{
    const {_id}=req.user
    const {room_id}=req.body
    Room.findOneAndUpdate({room_id:room_id},
        {
            $push:{
                teachers:_id
            }
        }).then((roomdetails,err)=>{
        if (err){
            return res.status(501).json({
                error:err
            })
        }
        if (!roomdetails){
            return res.status(404).json({
                error:"Room not found"
            })
        }
        res.status(200).json({
            message:"Room joined successfully",
        })
        
    })

})
roomRouter.post("/joinroom",authenticate,(req,res)=>{
    const {_id}=req.user
    const {room_id}=req.body
    Room.findOneAndUpdate({room_id:room_id},{
        $addToSet:{
            students:_id
        }
    }).then((roomdetails,err)=>{
        if (err){
            return res.status(501).json({
                error:"Action failed"
            })
        }
        if (!roomdetails){
            return res.status(404).json({
                error:"Room not found"
            })
        }
        res.status(200).json({
            message:"Room joined successfully",
        })
        
    })
})

roomRouter.post("/leaveroom",authenticate,(req,res)=>{
    const {_id}=req.user
    const {room_id}=req.body
    Room.findOneAndUpdate({room_id:room_id},{
        $pull:{
            students:_id
        }
    }).then((roomdetails,err)=>{
        if(err){
            return res.status(501).json({
                error:"Action failed"
            })
        }
        if(!roomdetails){
            return res.status(404).json({
                error:"Room not found"
            })
        }
        res.status(200).json({
            message:"Room left successfully",
        })

    })
})
module.exports=roomRouter;