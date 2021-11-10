const announcementRouter = require('express').Router();
const authenticate = require('../Middlewares/usermiddleware');
const mongoose = require('mongoose');
const Users = mongoose.model('users');
const Announcements = mongoose.model('announcements');
const Room = mongoose.model('rooms');
const Works = mongoose.model('works');
const AnnouncementMail=require('../Functions/mailer').AnnouncementMail
announcementRouter.post("/roomposts", authenticate, async (req, res) => {
    console.log("Getting works data")
    const { _id } = req.user
    const { room } = req.body
    console.log(room)
    // get announcements and works of this room
    let announcementsarray = []
    let worksarray = []
    try {
        const announcements = await Announcements.find({room:String(room)}).populate('createdby',['name'])
        for (let announcement of announcements) {
            console.log(announcement)
            announcementsarray.push(announcement)
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error
        })
    }
    try {
        const works = await Works.find({ room: room })
        for (let work of works) {
            worksarray.push(work)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error
        })
    }
    let data=[...announcementsarray,...worksarray]
    // sort the data array based on createdon
    data=data.sort((a, b) => {
        return new Date(b.createdOn) - new Date(a.createdOn)
    })
    return res.status(200).json({
        'message':"success",
        data:data
    })
})

announcementRouter.post("/createannouncement", authenticate, (req, res) => {
    const { _id,name } = req.user
    const { title, description, room } = req.body
    if (!title  || !room) {
        return res.status(422).json({ error: "Please fill all the fields" })
    }
    const newAnnouncement = new Announcements({
        title,
        description,
        room,
        createdby: _id
    })
    Room.findById(room).populate('teachers').populate('students').then(((roomdata, error) => {
        if (error) {
            return res.status(422).json({
                error: "Room not found"
            })
        }
        let usersarray=[]
        let usersid=[]
        roomdata.students.forEach(student => {
            usersarray.push(student.email)
            usersid.push(student._id)
        })
        roomdata.teachers.forEach(teacher => {
            usersarray.push(teacher.email)
            usersid.push(teacher._id)
        })

        newAnnouncement.save().then((announcement, error) => {
            if (error) {
                return res.status(422).json({
                    error: "Announcement not created"
                })
            }
            let now=new Date()
            let time=now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()
            const maildata={
                subject:`Announcement has been made by ${name} in ${roomdata.room_name} on ${time}`,
                Announcedby:name,
                room_name:roomdata.room_name,
                time:time,
                content:{
                    title:title,
                    description:description,
                },
                users:usersarray
            }
            AnnouncementMail(maildata)
            return res.json({
                message: "Announcement created successfully",
            })
        })
    }))
})

announcementRouter.delete("/deleteannouncement", authenticate, (req, res) => {
    const { _id } = req.user
    console.log(_id)
    const { announcementid } = req.body
    Announcements.findById(announcementid).then((announcement, error) => {
        if (error) {
            return res.status(422).json({
                error: "Announcement not found"
            })
        }
        if (String(announcement.createdby) !== String(_id)) {
            return res.status(402).json({
                error: "You are not the creator of the announcement"
            })
        }
        announcement.remove().then((announcement, error) => {
            if (error) {
                return res.status(422).json({
                    error: "Announcement not deleted"
                })
            }
            return res.json({
                message: "Announcement deleted successfully"
            })
        })
    })
})

module.exports = announcementRouter