const express=require('express');
const router=express.Router();
const Login=require('../models/Login');


// Login in
router.post("/",(req,res)=>{
    console.log(req.body);
    const email=req.body.username;
    const password=req.body.password;
    Login.findOne({email:email}).then((found)=>{
        if(found){
            if(found.password===password){
                if(found.permit===true){
                    res.send({"permission":"granted","statuscode":200,"userid":found._id});
                }
                else{
                    res.send("error");
                }
            }
            else{
                res.send("error");
            }
        }
        else{
            res.send("error");
        }
    });
});

router.get("/",(req,res)=>{
    res.send("hello");
});

module.exports=router;