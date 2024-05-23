const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const cors=require('cors');

//imports
const Userlogin = require('./routes/Userlogin');
const Userdashboard = require('./routes/Userdashboard');
const Dataformfilling=require("./routes/dataformfilling")



const app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors())


const router=express.Router();

// Backend connection 
const connurl = 'mongodb+srv://vnitnagpuraiims:h4tqCoGk2Nl9yqAr@cluster0.vxxqzds.mongodb.net/DialysisDB?retryWrites=true&w=majority';
try {
    mongoose.connect(connurl);
    console.log("connected to Database.");
}
catch (err) {
    console.log(err);
}


//Route paths
app.use("/userlogin", Userlogin);
app.use("/userdashboard", Userdashboard);
app.use("/dataformfilling",Dataformfilling);

//demoplay
const birds = require('./routes/bird')
app.use('/birds', birds)
//demoplay



app.listen((5000), () => {
    console.log("Server is running on port 5000");
});


