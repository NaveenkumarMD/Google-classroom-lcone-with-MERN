const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app=express();
app.use(cors());
app.use(express.json());

//connect to mongoDB

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

mongoose.connection.on('connected',()=>{
    console.log("Connected to mongoDB")
})
mongoose.connection.on('error',(err)=>{
    console.log("Error in connection",err)
})

//Models
require('./Models/Users');
require('./Models/Announcements')
require('./Models/Rooms')
require('./Models/Works')


//Routes
app.use(require('./Routers/Announcements'))
app.use(require('./Routers/Users'))
app.use(require('./Routers/Rooms'))
app.use(require('./Routers/Works'))

app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
})
