const express=require('express');
const router=express.Router();
const Login=require('../models/Login');


router.post("/",(req,res)=>{
    console.log(req.body);
    const data=req.body;
    const newuser=new Login(data);
    newuser.save().then(()=>{
        console.log("User saved successfully");
        res.send({statuscode:200,message:"User saved successfully"});
    }).catch((err)=>{
        console.log("Error in saving user");
        res.send({statuscode:400,message:"Error in saving user"});
    });

});

module.exports=router;