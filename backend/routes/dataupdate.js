const express = require('express');
const router = express.Router();
const DataCollection = require('../models/Datacollection');
const Login = require('../models/Login');


router.get("/:id", (req, res) => {

    const id = req.params.id;
    console.log("Got Request")
    DataCollection.find({ _id: id }).then((found) => {
        if (found) {
            if (found.length>0) {

                Login.find({ _id: found[0].submittedUserId }).then((foundlogin) => {

                    if (foundlogin) {
                        console.log(foundlogin[0].permit)
                        if (foundlogin[0].permit === true) {
                            // console.log("sending response")
                            res.send({ "statuscode": 200, "data": found, "length": found.length, "message": "Permission Granted" });
                            console.log("sent")
                        }
                        else{
                            res.send({ "statuscode": 404, "message": "Permission invalid " });
                        }
                    }
                })
            }
            else{
                res.send({ "statuscode": 404, "message": "Data Not Found " });
            }
        }
        else{
            res.send({ "statuscode": 404, "message": "Data Not Found " });
        }
    });

});

router.post("/:id", (req, res) => {

    const id = req.params.id;
    const data = req.body;
    //update the data
    console.log("printing wanted updated");
    console.log(data);
    //find the data and update everything with the new overwriting data
    DataCollection.updateOne({ _id: id }, data).then((found) => {
        if (found) {
            console.log("Data Updated");
            res.send({ "statuscode": 200, "message": "Data Updated" });
        }
        else{
            res.send({ "statuscode": 404, "message": "Data Not Found " });
        }
    });
});

module.exports=router;