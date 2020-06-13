
const mongoose = require('mongoose');

const PassengerDetailsSchema = new mongoose.Schema({
    transactionId: { type: 'string', required: true },
    passengerId: { type: 'string', required: true },    
    // passengerTransactionId: { type: 'string', required: true },
    passengerName: { type: 'string', required: true },
    passengerAge: { type: 'string', required: true },
    passengerGender: { type: 'string', required: true },
})

module.exports = mongoose.model('PassengerDetails', PassengerDetailsSchema);