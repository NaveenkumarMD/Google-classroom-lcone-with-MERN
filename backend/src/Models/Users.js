//Mogoose model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userschema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    classesasstudent: [
        {
            type: Schema.Types.ObjectId,
            ref: 'rooms'
        }
    ]
    ,
    classesasteacher: [
        {
            type: Schema.Types.ObjectId,
            ref: 'rooms'
        }
    ]

})
mongoose.model('users', userschema);