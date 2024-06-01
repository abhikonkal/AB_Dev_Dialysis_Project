const express = require('express');
const router = express.Router();
const Login = require('../models/Login');
//import mailing details
const send=require('./sendemail');

router.get("/:id", (req, res) => {
    // console.log("got admin req",req.params.id);
    const id = req.params.id;
    Login.find({ _id: id }).then((found) => {
        if (found) {
            // console.log("found",found);
            if (found[0].status === "admin") {
                Login.find({"permit":false}).then((found) => {
                    if (found) {
                        res.send({ "statuscode": 200, "message": "Data Not Found ", "data": found });
                    }
                    else {
                        res.send({ "statuscode": 404, "message": "Data Not Found " });
                    }
                });

            }
        }
        else {
            res.send({ "statuscode": 404, "message": "Data Not Found " });
        }

    });
});

router.post("/accept/:id", (req, res) => {
    const id = req.params.id;
    console.log("recv",id)
    Login.updateOne({ _id: id }, { $set: { permit: true } }).then((found) => {
        if (found) {
            res.send({ "statuscode": 200, "message": "Data Found ", "data": found });
            const link="http://localhost:3000/userlogin";
            console.log(found)
            const email=found[0].email;
            console.log(email)
            const data = {
                "from": "vnitnagpuraiims@gmail.com",
                "to": email,
                "subject": "You are accepted as a user to enter the portal",
                // "text":'Please click the below link :'+link,
                "html": `<h1>Please click the below link to enter the portal :</h1><p>${link}</p>`
            };
            const sendEmail = async () => {
                const r = send(data);
                console.log("response", r);
            };
            sendEmail();
        }
        else {
            res.send({ "statuscode": 404, "message": "Data Not Found " });
        }
    });
});

router.post("/reject/:id", (req, res) => {
    const id = req.params.id;
    Login.deleteOne({ _id: id }).then((found) => {
        if (found) {
            res.send({ "statuscode": 200, "message": "Data Found ", "data": found });
        }
        else {
            res.send({ "statuscode": 404, "message": "Data Not Found " });
        }
    });
});




module.exports = router;