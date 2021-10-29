const roomRouter = require('express').Router();
const mongoose = require('mongoose')
const User = mongoose.model('users')
const Room = mongoose.model('rooms')
const authenticate = require('../Middlewares/usermiddleware')
const ownerauthenticate = require('../Middlewares/roomownermiddleware')
const bcrypt = require('bcrypt')
const sendMail = require('../Functions/mailer').sendMail
const teacherinvitation = require('../Mail templates/Teacherjoininvitation');

roomRouter.get("/myrooms", authenticate, (req, res) => {
    const { _id } = req.user
    User.findById(_id)
        .populate('classesasstudent', ['room_id', 'logo', 'room_owner', 'room_name'])
        .populate('classesasteacher', ['room_id', 'logo', 'room_owner', 'room_name'])
        .then((roomsdata, error) => {
            if (error) {
                return res.status(500).json({ error: error })
            }
            res.status(200).json({
                message:'successfull', 
                roomdata: roomsdata 
            })

        })
})

roomRouter.post("/createroom", authenticate, (req, res) => {
    console.log("Creating room is running....")
    const { room_name } = req.body
    const newRoom = Room({
        room_name: room_name,
        room_owner: req.user._id,
        teachers: [req.user._id],
        room_id: Math.floor(Math.random() * 10000) + 10000,
        logo: null,
        createdon: new Date()
    })

    newRoom.save().then((roomdetails, err) => {
        if (err) {
            return res.status(501).json({
                error: err
            })
        }
        User.findByIdAndUpdate(req.user._id, {
            $push: {
                classesasteacher: roomdetails._id
            }
        }).then((userdetails, err) => {
            res.status(200).json({
                message: "Room created successfully"
            })
        })

    })
})
roomRouter.get("/joinasteacher", async (req, res) => {
    console.log("Join as teacher is running...")
    const { room_id, teacher_mail } = req.query
    Room.findOne({ room_id: room_id }).then(async (roomData, error) => {
        if (error) {
            return res.status(501).json({
                error: error
            })
        }
        if (!roomData) {
            return res.status(404).json({
                message: "Room not found"
            })
        }
        else {
            const { teacher_invites } = roomData
            console.log(teacher_invites)
            if (!teacher_invites.includes(teacher_mail)) {
                return res.status(402).json({
                    error: "You have not been invited"
                })
            }
            console.log(teacher_mail)
            User.findOne({ email: teacher_mail }).then(async (userData, error) => {
                if (error) {
                    return res.status(501).json({
                        error: error
                    })
                }
                if (!userData) {
                    return res.status(404).json({
                        message: "User not found"
                    })
                }
                else {
                    const { _id } = userData
                    const { teachers } = roomData
                    if (teachers.includes(_id)) {
                        return res.status(402).json({
                            error: "You are already a teacher of this room"
                        })
                    }
                    teachers.push(_id)
                    teacher_invites.splice(teacher_invites.indexOf(teacher_mail), 1)
                    roomData.teachers = teachers
                    roomData.teacher_invites = teacher_invites
                    roomData.save().then((roomData, error) => {
                        if (error) {
                            return res.status(501).json({
                                error: error
                            })
                        }
                        User.findByIdAndUpdate(_id, {
                            $push: {
                                classesasteacher: roomData._id
                            }
                        }).then((userData, error) => {
                            return res.status(200).json({
                                message: "Teacher joined successfully",
                                data: roomData
                            })
                        })

                    })
                }
            })

        }
    })
})

roomRouter.post("/inviteteacher", ownerauthenticate, async (req, res) => {
    console.log(req.room)
    const { room_name, room_id } = req.room
    const { teacher_mail } = req.body
    var joining_url = new URL(`http://localhost:5000/joinasteacher`)
    joining_url.searchParams.set('room_id', room_id)
    joining_url.searchParams.set('teacher_mail', teacher_mail)
    const htmltemplate = teacherinvitation(
        teacher_mail.replace("@gmail.com", ""),
        room_name,
        room_id,
        joining_url
    )

    const maildetails = {
        to: teacher_mail,
        subject: "Invitation to join a room as a teacher",
        html: htmltemplate,
        text: "hello"

    }
    try {
        await sendMail(maildetails)
    } catch (error) {
        return res.status(501).json({
            error: "Could not send Mail to the user"
        })
    }
    Room.findOneAndUpdate({ room_id: room_id },
        {
            $addToSet: {
                teacher_invites: teacher_mail
            }
        }).then((response, error) => {
            if (error) {
                return res.status(501).json({
                    error: 'An Error occured while inviting'
                })
            }
            if (!response) {
                res.status(501).json({
                    error: "No class found"
                })
            }
            res.status(200).json({
                message: "Invitation sent successfully"
            })
        })
})
roomRouter.delete("/deleteroom", ownerauthenticate, (req, res) => {
    console.log("Deleting room is running....")
    const { room_id } = req.body
    Room.findOneAndDelete({ room_id: room_id }).then((roomdetails, err) => {
        if (err) {
            return res.status(501).json({
                error: "Action failed"
            })
        }
        if (!roomdetails) {
            return res.status(404).json({
                error: "Room not found"
            })
        }
        res.status(200).json({
            message: "Room deleted successfully",
        })

    })
})

roomRouter.post("/joinroom", authenticate, (req, res) => {
    const { _id } = req.user
    const { room_id } = req.body
    Room.findOneAndUpdate({ room_id: room_id }, {
        $addToSet: {
            students: _id
        }
    }).then((roomdetails, err) => {
        if (err) {
            return res.status(501).json({
                error: "Action failed"
            })
        }
        if (!roomdetails) {
            return res.status(404).json({
                error: "Room not found"
            })
        }
        User.findByIdAndUpdate(_id, {
            $push: {
                classesasstudent: roomdetails._id
            }
        }).then((userdetails, err) => {
            res.status(200).json({
                message: "Room joined successfully",
            })
        })



    })
})

roomRouter.post("/leaveroom", authenticate, (req, res) => {
    const { _id } = req.user
    const { room_id } = req.body
    Room.findOneAndUpdate({ room_id: room_id }, {
        $pull: {
            students: _id
        }
    }).then((roomdetails, err) => {
        if (err) {
            return res.status(501).json({
                error: "Action failed"
            })
        }
        if (!roomdetails) {
            return res.status(404).json({
                error: "Room not found"
            })
        }
        User.findByIdAndUpdate(_id, {
            $pull: {
                classesasstudent: roomdetails._id
            }
        }).then((userdetails, error) => {
            if(error){
                return res.status(501).json({
                    error: "Action failed"
                })
            }
            return res.status(200).json({
                message: "Room left successfully",
            })
        })

    })
})
module.exports = roomRouter;