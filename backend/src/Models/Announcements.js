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
    date:{
        type:Date,
        default:Date.now
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
    }

})
mongoose.model('announcements',announcemensSchema)