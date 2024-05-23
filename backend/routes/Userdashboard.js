const express=require('express');
const router=express.Router();
const DataCollection=require('../models/Datacollection');

router.get("/:id",(req,res)=>{
    const id=req.params.id;
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

});


module.exports=router;

