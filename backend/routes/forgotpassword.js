const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const Login = require('../models/Login');
// const config = require('../models/Mailingdetails');
const jwt = require('jsonwebtoken');
const send=require('./sendemail');
const{SERVER_PATH,CLIENT_PATH} =require('../path/path');

router.post("/:email",(req,res)=>{
    const email=req.params.email;
    const process_secret = process.env.JWT_SECRET;
    console.log(email,process_secret);
    Login.findOne({ email: email }).then((found) => {
        if (!found) {
            res.status(400).json({ message: "User not found" });
        }
        else {
            const secret=found.password+process_secret;
            const payload = {
                email: email,
                password: found.password
            };
            const token = jwt.sign(payload, secret, { expiresIn: '15m' });
            const link = `${CLIENT_PATH}/resetpassword/${token}/${email}`;
            const data = {
                "from": "vnitnagpuraiims@gmail.com",
                "to": email,
                "subject": "Password reset link",
                // "text":'Please click the below link :'+link,
                "html": `<h1>Please click the below link to reset your password :</h1><p>${link}</p>`
            };
            const sendEmail = async () => {
                const r = send(data);
                console.log("response", r);
            };
            sendEmail();
            res.status(200).json({ "message": "Email sent","statuscode":200 });
        }
    }).catch(err => {
        res.status(400).json({"message": "Error", err,"statuscode":404 });
    });

});

module.exports = router;