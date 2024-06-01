const express = require('express');
const router = express.Router();
const DataCollection = require('../models/Datacollection');


router.get("/:id", (req, res) => {

    const id=req.params.id;
    DataCollection.deleteOne({_id:id}).then((found)=>{
        if(found){
            console.log("Data Deleted");
            res.send({"statuscode":200,"message":"Data Deleted"});
        }
        else{
            res.send({"statuscode":404,"message":"Data Not Found "});
        }
    });

});



module.exports=router;