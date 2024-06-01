const express=require('express');
const router=express.Router();
const DataCollection=require('../models/Datacollection');
const Login=require("../models/Login");

router.get("/:id",(req,res)=>{
    const id=req.params.id;
    console.log("verifying",id);
    Login.find({_id:id}).then((found)=>{
        if (found[0].status==="admin")
            {
                DataCollection.find({}).then((found)=>{
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
            }
        else if (found[0].status==="user"){
            DataCollection.find({submittedUserId:id}).then((found)=>{
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
        }
        else{
            res.send({ "statuscode": 404, "message": "Data Not Found " });
        }
    });
    

});


module.exports=router;

