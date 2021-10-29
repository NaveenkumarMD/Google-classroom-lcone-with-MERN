const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Rooms = mongoose.model('rooms')
const RoomOwnerMiddleware = (req, res, next) => {
    const { authorization } = req.headers
    const {room_id}=req.body
    if (!authorization) {
        return res.status(401).json({
            message: 'Unauthorized acess'
        })
    }
    const token = authorization.replace('Bearer ', '')
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({
                error: "Authorizaion failed"
            })
        }
        const { id } = payload
        Rooms.findOne({ room_owner: id,room_id:room_id }).then((room, err) => {
            if (err) {
                return res.status(401).json({
                    error: "You need owner access to delete a room or the room is not found"
                })
            }
            if(!room){
                return res.status(404).json({
                    error: "No room found"
                })
            }
            req.room = room
            console.log(req.room)
            next()
        })

    })
}
module.exports=RoomOwnerMiddleware