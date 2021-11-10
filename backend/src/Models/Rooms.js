// model for rooms
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const roomschema=new Schema({
    room_id:{
        type:String,
        required:true
    },
    room_name:{
        type:String,
        required:true
    },
    logo:{
        type:String,
    },
    createdon:{
        type:Date,
        default:Date.now
    },
    room_owner:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    room_owner_name:{
        type:String,
        required:true
    },
    teacher_invites:{
        type:[
            {
                type:String
            }
        ]
    },
    students:{
        type:[
            {
                type:Schema.Types.ObjectId,
                ref:'users'
            }
        ]
    },
    teachers:{
        type:[
            {
                type:Schema.Types.ObjectId,
                ref:'users'
            }
        ]
    },
    
})

mongoose.model('rooms',roomschema);