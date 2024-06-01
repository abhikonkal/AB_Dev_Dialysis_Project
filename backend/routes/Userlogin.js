const express = require('express');
const router = express.Router();
const Login = require('../models/Login');


// Login in
router.post("/", (req, res) => {
    console.log(req.body);
    const email = req.body.username;
    const password = req.body.password;
    Login.findOne({ email: email }).then((found) => {
        if (found) {
            if (found.password === password) {
                if (found.permit === true) {
                    if (found.status === "admin") {
                        res.send({ "permission": "granted", "statuscode": 200, "userid": found._id, "message": "Login successful", "status": "admin" });
                        return;
                    }
                    else {
                        res.send({ "permission": "granted", "statuscode": 200, "userid": found._id, "message": "Login successful" });
                    }
                }
                else {
                    res.send({ "permission": "denied", "statuscode": 504, "userid": "NA", "message": "Permission denied" });
                }
            }
            else {
                res.send({ "permission": "denied", "statuscode": 504, "userid": "NA", "message": "Login failed" });
            }
        }
        else {
            res.send({ "permission": "denied", "statuscode": 504, "userid": "NA", "message": "Login failed", "message": "User not found" });
        }
    });
});

router.get("/", (req, res) => {
    res.send("hello");
});

module.exports = router;