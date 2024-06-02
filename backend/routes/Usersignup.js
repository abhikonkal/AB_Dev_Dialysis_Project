const express = require('express');
const router = express.Router();
const Login = require('../models/Login');


router.post("/", (req, res) => {
    console.log(req.body);
    const data = req.body;
    const email = data.email;
    Login.findOne({ email: email }).then((user) => {
        if (user) {
            console.log("User already exists");
            res.send({ statuscode: 201, message: "User already exists" });
        }
        else {
            const newuser = new Login(data);
            newuser.save().then(() => {
                console.log("User saved successfully");
                res.send({ statuscode: 200, message: "User saved successfully" });
            }).catch((err) => {
                console.log("Error in saving user");
                res.send({ statuscode: 400, message: "Error in saving user" });
            });
        }
    }).catch((err) => {
        console.log("Internal server user");
        res.send({ statuscode: 400, message: "Error in Server" });
    });
});

module.exports = router;