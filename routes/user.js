var express = require('express');
var router = express.Router();
var moment = require('moment')
const passport = require('passport');
var User = require('../model/User')

router
    .get('/', (req, res, next) => {
        res.send('Hi there, this is the root');
    })
    .post('/register', (req, res, next) => {
        try {
            console.log("gathering details")
            // if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
            //     console.log("applying validations")
            //     // req.flash('validation', 'Please fill all the fields')
            //     // res.redirect('/users/register')
            //     return
            // }
            let userDetails = {
                fName: req.body.fName,
                lName: req.body.lName,
                email: req.body.email,
                userId: (req.body.fName).toLowerCase() + "-" + req.body.email,
                password: req.body.password,
                contact: req.body.contact
            }

            User.find({ email: req.body.email }, (err, foundData) => {
                if (err) {
                    console.log(err)
                    res.status(500).send()
                } else {
                    if (foundData.length === 0) {
                        const newUser = new User(userDetails)
                        newUser.save((err) => {   // db.user.inersrtOne(user)
                            if (err) throw err
                            res.send("Registration successful")
                            // res.json(userDetails)
                        })
                    } else {
                        res.send("Email already exists")
                    }
                }
            })

            // User.find({ contact: contactNo }, (err, foundData) => {
            //     if (err) {
            //         console.log(err)
            //         res.status(500).send()
            //     } else {
            //         if (foundData) {
            //             contactExists = true
            //         }
            //     }
            // })

            // User.find({ email: emailID }, (err, foundData) => {
            //     if (err) {
            //         console.log(err)
            //         res.status(500).send()
            //     } else {
            //         if (foundData) {
            //             emailExists = true
            //         }
            //     }
            // })

            // console.log(emailExists)
            // console.log(contactExists)

            // if (emailExists === false && contactExists === false) {
            // const newUser = new User(userDetails)
            // newUser.save((err) => {   // db.user.inersrtOne(user)
            //     if (err) throw err
            //     // req.flash('message', 'Registration Success')
            //     // res.redirect('/users/login')
            //     res.send("Registration successful")
            // })
            // } else if (emailExists === true && contactExists === false) {
            //     res.send("Email already exists")
            // } else if (contactExists === false && contactExists === true) {
            //     res.send("Contact already exists")
            // } else {
            //     res.send("Email and Contact already exist")
            // }

        }
        catch (err) {
            console.log("Some error occured : " + err)
        }
    })
    .post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user',
        failureFlash: true,
    
    }))

module.exports = router;
