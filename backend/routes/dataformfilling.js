const express=require('express');
const router=express.Router();
const DataCollection=require('../models/Datacollection');
const Login=require('../models/Login');


router.get("/:id",(req,res)=>{
    const id=req.params.id;
    Login.find({_id:id}).then((found)=>{
        if(found){
            const json={
                "found":found,
                "statuscode":200,
                "length":found.length            
            }
            res.send(json);
            console.log("Sent")
        }
        else{
            res.send("error");
        }
    });
});

router.post("/:id",(req,res)=>{
    const id=req.params.id;
    const data=req.body;
    console.log("kop",data);
    Login.find({_id:id}).then((found)=>{
        if(found){
            const newdata=new DataCollection(data);
            newdata.save().then(()=>{
                console.log("Data saved successfully");
                res.send({statuscode:200,message:"Data saved successfully"});
            });
        }
        else{
            console.log("Error in saving data");
            res.send({statuscode:400,message:"Error in saving data"});
        }
    });
});

module.exports=router;