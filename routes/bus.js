var express = require('express');
var router = express.Router();
var moment = require('moment')
var async = require("async");
var BusDetails = require('../model/BusDetails')
var User = require('../model/User')

router
    .post('/upload', async (req, res, next) => {
        try {

            let busDetails = {
                busNo: req.body.busNo,
                busType: req.body.busType,
                departLoc: req.body.departLoc,
                arriveLoc: req.body.arriveLoc,
                busId: (req.body.departLoc + "-" + req.body.arriveLoc + "-" + req.body.busNo),
                departDate: (req.body.departDate),
                arriveDate: req.body.arriveLoc,
                departTime: req.body.departTime,
                arriveTime: req.body.arriveTime,
                totalSeats: req.body.totalSeats,
                seatsAvailable: req.body.seatsAvailable,
                fare: req.body.fare,
            }

            const newBusDetails = new BusDetails(busDetails)

            BusDetails.find({ busNo: req.body.busNo }, (err, foundData) => {
                if (err) {
                    console.log(err)
                    res.status(500).send()
                } else {
                    if (foundData.length === 0) {
                        // const newBusDetails = await BusDetails.create()
                        newBusDetails.save((err) => {
                            if (err) throw err
                            res.send("Data added successfully")
                        })
                    } else {
                        res.send("Bus already exists")
                    }
                }
            })

        } catch (err) {
            console.log("Some error occured : " + err)
        }
    })
    //searching the bus according to the departLoc, arriveLoc and departDate
    .post("/bus-details/loc", async (req, res, next) => {
        /* BusDetails.find({ departLoc: req.body.departLoc, arriveLoc: req.body.arriveLoc }, (err, foundData) => {
            if (err) {
                console.log(err)
                res.status(500).send()
            } else {
                if (foundData.length === 0) {
                    res.status(404).send("No data available")
                } else {
                    // console.log(foundData)
                    res.json(foundData)
                }
            }

        }) */
        let body = req.body
        let { departLoc, arriveLoc, departDate } = body
        try {
            // const result = await BusDetails.find({ departLoc, arriveLoc })
            // res.json({result})
            await BusDetails.find({ departLoc, arriveLoc, departDate }, (err, foundData) => {
                if (err) {
                    console.log(err)
                    res.status(500).send()
                } else {
                    if (foundData.length === 0) {
                        // res.status(404).res.send("No bus available")
                        res.json(foundData)
                    } else {
                        res.json(foundData)
                    }
                }
            })

        } catch (err) {
            res.status(500).send(err)
        }
    })
    //searching the bus according to the bus-id
    .post("/bus-details/id", async (req, res, next) => {
        BusDetails.find({ busId: req.body.busId }, (err, foundData) => {
            if (err) {
                console.log(err)
                res.status(500).send()
            } else {
                if (foundData.length === 0) {
                    res.status(404).send("No data available")
                } else {
                    // console.log(foundData)
                    res.json(foundData)
                }
            }

        })
    })
    //getting the detai ls of all the bus
    .get("/bus-details", async (req, res, next) => {

        BusDetails.find({}, (err, foundData) => {
            if (err) {
                console.log(err)
                res.status(500).send()
            } else {
                if (foundData.length === 0) {
                    res.status(404).send("No data available")
                } else {
                    // console.log(foundData)
                    res.json(foundData)
                }
            }

        })
    })
module.exports = router;
