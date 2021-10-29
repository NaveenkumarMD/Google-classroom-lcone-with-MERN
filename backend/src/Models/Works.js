const mongoose=require('mongoose')
const Schema=mongoose.Schema

const worksSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    file:{
        type:String,
    },
    SubmittedFiles:{
        type:[
            {
                user:{
                    type:Schema.Types.ObjectId,
                    ref:'users'
                },
                file:{
                    type:String
                }
            }
        ]
    }
});
mongoose.model('works',worksSchema)