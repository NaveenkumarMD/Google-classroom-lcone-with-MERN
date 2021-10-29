const mongoose=require('mongoose')
const Schema=mongoose.Schema

const announcemensSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    room:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'rooms'
    },
    createdby:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    createdon:{
        default:Date.now,
        type:Date
    }

})
mongoose.model('announcements',announcemensSchema)