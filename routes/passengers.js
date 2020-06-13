var express = require('express');
var router = express.Router();
var PassengerDetails = require('../model/PassengerDetails')

router
    .post('/upload', async (req, res, next) => {
        try {
            PassengerDetails.insertMany(req.body, (err, data) => {
                if (err) {
                    console.log(err)
                    res.status(500).send()
                } else {
                    res.send("Data added successfullllllllllly")
                    // res.send(data)
                }
            })
        } catch (err) {
            console.log("Some error occured : " + err)
        }
    })
    .post('/get-passengers/tid', async (req, res, next) => {
        PassengerDetails.find({ transactionId: req.body.transactionId }, (err, foundData) => {
            if (err) {
                console.log(err)
                res.status(500).send()
            } else {
                if (foundData.length === 0) {
                    res.status(404).send("No data available")
                } else {
                    console.log(foundData)
                    res.json(foundData)
                }
            }

        })
    })

module.exports = router;
