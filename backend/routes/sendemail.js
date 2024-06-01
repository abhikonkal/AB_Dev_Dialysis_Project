const nodemailer = require("nodemailer");
const config=require('../models/Mailingdetails');


const send = (data) => {
    const transporter = nodemailer.createTransport(config);
    transporter.sendMail(data).then(() => {
        console.log("Email sent");
    }).catch(err => {
        console.log("Error", err);
    })
};

module.exports=send;