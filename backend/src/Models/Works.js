const mongoose=require('mongoose')
const Schema=mongoose.Schema

const worksSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:" "
    },
    room:{
        type:Schema.Types.ObjectId,
        ref:'rooms'
    },
    files:{
        type:Array,
        default:[]
    },
    createdon:{
        type:Date,
        default:Date.now
    },
    createdby:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    due:{
        type:Date,
        required:true
    },
    submittedFiles:{
        type:[
            {
                user:{
                    type:Schema.Types.ObjectId,
                    ref:'users'
                },
                file:{
                    type:Array
                },
                time:{
                    type:Date,
                    default:Date.now
                }
            }
        ]
    }
});
mongoose.model('works',worksSchema)