const express = require('express');
const router = express.Router();
const send = require('./sendemail');


router.post("/", (req, res) => {

    const { name, email, message } = req.body;
    // console.log("jgkjbjk",name, email, message);
    const data = {
        "from": "vnitnagpuraiims@gmail.com",
        "to": "vnitnagpuraiims@gmail.com",
        "subject": "Contact Form",
        // "text":'Please click the below link :'+link,
        "html": `<h1>${name} contacted you through the contact form. :</h1>
        <br>
        <p>Name:${name}</p>
        <p>Email:${email}</p>
        <p>Message:${message}</p>`
    };
    const sendEmail = async () => {
        const r = send(data);
        // console.log("response", r);
    };
    sendEmail();
    res.status(200).send({ "statuscode":200,message: "Message sent successfully!" });
});







module.exports = router;