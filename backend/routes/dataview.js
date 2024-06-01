const express = require('express');
const router = express.Router();
const DataCollection = require('../models/Datacollection');
const Login = require('../models/Login');


router.get("/:id", (req, res) => {

    const id = req.params.id;
    DataCollection.find({ _id: id }).then((found) => {
        if (found) {
            res.send({ "statuscode": 200, "data": found, "length": found.length, "message": "Data Found Succefully" });
        }
        else {
            res.send({ "statuscode": 404, "message": "Data Not Found " });
        }
    });

});




module.exports = router;