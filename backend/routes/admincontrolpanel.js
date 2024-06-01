const express = require('express');
const router = express.Router();
const Login = require('../models/Login');
//import mailing details
const send=require('./sendemail');
const bodyparser = require('body-parser')


//accept and revoke panel
router.get("/verify/:id",(req,res)=>{
    const id=req.params.id;
    // console.log("verifying",id)
    Login.find({_id:id}).then((found)=>{
        if (found[0].status==="admin")
            {
                res.send({ "statuscode": 200, "message": "Data  Found " });
            }
        else{
            res.send({ "statuscode": 404, "message": "Data Not Found " });
        }
    });
});


router.get("/accepted/:id", (req, res) => {
    // console.log("got admin req",req.params.id);
    const id = req.params.id;
    Login.find({ _id: id }).then((found) => {
        if (found) {
            // console.log("found",found);
            if (found[0].status === "admin") {
                Login.find({"permit":true}).then((found) => {
                    if (found) {
                        res.send({ "statuscode": 200, "message": "Data  Found ", "data": found });
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

router.get("/revoked/:id", (req, res) => {
    // console.log("Revoking",req.params.id);
    const id = req.params.id;
    Login.find({ _id: id }).then((found) => {
        if (found) {
            // console.log("found",found);
            if (found[0].status === "admin") {
                Login.find({"permit":false}).then((found) => {
                    if (found) {
                        res.send({ "statuscode": 200, "message": "Data  Found ", "data": found });
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

router.post("/revoke/:id", (req, res) => {
    // console.log("Revoking post",req.params.id);
    const id = req.params.id;
    const body = req.body;
    Login.find({ _id: id }).then((found) => {
        if (found) {
            // console.log("found",found);
            if (found[0].status === "admin") {
                const torevokeid=body.torevokeid;
                Login.findOne({_id:torevokeid}).then((found)=>{
                    if(found){
                        console.log("found",found);
                        found.permit=false;
                        found.save().then((saved)=>{
                            res.send({ "statuscode": 200, "message": "Data  Found ", "user": saved });
                        });
                    }
                    else{
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


router.post("/reauthorize/:id", (req, res) => {
    // console.log("Reauthorizing",req.params.id);
    const id = req.params.id;
    const body = req.body;
    Login.find({ _id: id }).then((found) => {
        if (found) {
            // console.log("found",found);
            if (found[0].status === "admin") {
                const toreauthorize=body.toreauthorize;
                Login.findOne({_id:toreauthorize}).then((found)=>{
                    if(found){
                        // console.log("found",found);
                        found.permit=true;
                        found.save().then((saved)=>{
                            res.send({ "statuscode": 200, "message": "Data  Found ", "user": saved });
                        });
                    }
                    else{
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

router.post("/delete/:id", (req, res) => {
    console.log("Deleting",req.params.id);
    const id = req.params.id;
    const body = req.body;
    Login.find({ _id: id }).then((found) => {
        if (found) {
            // console.log("found",found);
            if (found[0].status === "admin") {
                const todelete=body.todelete;
                Login.findOneAndDelete({_id:todelete}).then((found)=>{
                    if(found){
                        // console.log("found",found);
                        res.send({ "statuscode": 200, "message": "Data  Found ", "user": found });
                    }
                    else{
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

module.exports=router;