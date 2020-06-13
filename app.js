var express = require('express');
var logger = require('morgan');
const bodyParser = require('body-parser');
var passport = require('passport')
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var busDetailsRouter = require('./routes/bus');
var bookingHistoryRouter = require('./routes/booking-history');
var passengersRouter = require('./routes/passengers')

const db_URL = "mongodb+srv://jha:jha@cluster-demo-1-agxfu.mongodb.net/bus-booking-db-v1?retryWrites=true&w=majority"

var app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'));

mongoose.connect(db_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected with mongodb ONLINE !!!!!!!!')
    })
    .catch(err => {
        if (err) throw err
    })

require('./config/passport')(passport)
app.use(passport.initialize())

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/bus', busDetailsRouter);
app.use('/booking-history', bookingHistoryRouter);
app.use('/passengers', passengersRouter);

module.exports = app;
