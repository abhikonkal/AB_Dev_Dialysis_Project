const express = require('express');
const router = express.Router();
const Login = require('../models/Login');
const jwt = require('jsonwebtoken');
const { SERVER_PATH, CLIENT_PATH } = require('../path/path');

router.post("/:token/:email", async (req, res) => {
    const token = req.params.token;
    const email = req.params.email;
    const process_secret = process.env.JWT_SECRET;
    const password = req.body.password;
    console.log("Reset",password,email)

    try {
        const found = await Login.findOne({ email: email });
        if (!found) {
            return res.status(400).json({ statuscode: 400, message: "User not found" });
        }

        const secret = found.password + process_secret;
        try {
            const verify = jwt.verify(token, secret);
            found.password = password;
            await found.save();
            res.status(200).json({ statuscode: 200, message: "Reset Password Successful" });
        } catch (err) {
            console.log(err);
            res.status(400).json({ statuscode: 400, message: "Token expired or invalid" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ statuscode: 500, message: "Server error" });
    }
});

module.exports = router;
