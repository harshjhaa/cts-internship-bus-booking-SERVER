var express = require('express');
var router = express.Router();
var moment = require('moment')
var BookingHistory = require('../model/BookingHistory')
var User = require('../model/User')
var BusDetails = require('../model/BusDetails')

router
    .post('/create-booking-history', (req, res, next) => {
        try {
            User.findOne({ fName: "Harsh" }, async (err, user) => {
                if (err) {
                    console.log(err)
                    res.status(500).send()
                } else {
                    if (user.length === 0) {
                        res.status(404).send()
                    } else {
                        let tId = req.body.transactionId
                        let pCount = req.body.passengerCount
                        console.log("transactionId")
                        console.log(tId)
                        BusDetails.find({ busId: req.body.busId }, async (err, bus) => {
                            if (err) {
                                console.log(err)
                                res.status(500).send()
                            } else {
                                if (bus.length === 0) {
                                    console.log("bus")
                                    console.log(req.body)
                                    console.log(req.body.busId)
                                    res.status(404).send()
                                } else {
                                    let bookingHistory
                                    bus.map((busData) => {
                                        bookingHistory = {
                                            userId: user.userId,
                                            busId: busData.busId,
                                            transactionId: tId,
                                            departLoc: busData.departLoc,
                                            arriveLoc: busData.arriveLoc,
                                            departTime: busData.departTime,
                                            arriveTime: busData.arriveTime,
                                            departDate: busData.departDate,
                                            fare: busData.fare,
                                            passengerCount: pCount,
                                            totalFare: (parseInt(pCount) * parseInt(busData.fare)).toString()
                                        }
                                    })
                                    const newBookingHistory = new BookingHistory(bookingHistory)
                                    newBookingHistory.save((err) => {
                                        if (err) throw err
                                        res.send("Booking history added successfully")
                                    })
                                }
                            }
                        })

                    }
                }
            })
            // BusDetails.find({ busId: req.body.busId }, async (err, bus) => {
            //     if (err) {
            //         console.log("pta nhi yaar kya error hai")
            //         console.log(err)
            //         res.status(500).send()
            //     } else {
            //         if (bus.length === 0) {
            //             console.log("bus")
            //             console.log(req.body)
            //             console.log(req.body.busId)
            //             res.status(404).send()
            //         } else {
            //             let bookingHistory
            //             bus.map((busData) => {
            //                 bookingHistory = {
            //                     // userId: user.userId,
            //                     busId: busData.busId,
            //                     departLoc: busData.departLoc,
            //                     arriveLoc: busData.arriveLoc,
            //                     departTime: busData.departTime,
            //                     arriveTime: busData.arriveTime,
            //                     departDate: busData.departDate,
            //                     fare: busData.fare,
            //                 }
            //             })
            //             // console.log(bookingHistory)
            //             // res.send(bus)
            //             const newBookingHistory = new BookingHistory(bookingHistory)
            //             newBookingHistory.save((err) => {
            //                 if (err) throw err
            //                 res.send("Booking history added successfully")
            //             })
            //         }
            //     }
            // })

            // let bookingHistory = {
            //     userId: req.body.userId,
            //     busId: req.body.busId,
            //     travelDate: moment(req.body.travelDate).format('YYYY-MM-DD'),
            //     departLoc: req.body.departLoc,
            //     arriveLoc: req.body.arriveLoc,
            //     departTime: req.body.departTime,
            //     arriveTime: req.body.arriveTime,
            //     fare: req.body.fare,
            // }

            // const newBookingHistory = new BookingHistory(bookingHistory)
            // newBookingHistory.save((err) => {
            //     if (err) throw err
            //     res.send("Booking history added successfully")
            // })
        } catch (err) {
            console.log("Some error occured : " + err)
        }
    })
    .post("/get-history/tid", (req, res, next) => {
        try{
            BookingHistory.find({ transactionId: req.body.transactionId }, (err, foundData) => {
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
        }catch (err) {
            console.log("Some error occured : " + err)
        }
    })
    .get("/get-booking-history", (req, res, next) => {
        BookingHistory.find({}, (err, foundData) => {
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
