
const mongoose = require('mongoose');

const BookingHistorySchema = new mongoose.Schema({
    userId: { type: 'string', required: true },
    // busId: { type: 'string', required: true },
    transactionId: { type: 'string', required: true },
    departLoc: { type: 'string', required: true },
    arriveLoc: { type: 'string', required: true },
    departTime: { type: 'string', required: true },
    arriveTime: { type: 'string', required: true },
    departDate: { type: Date, required: true },
    fare: { type: 'string', required: true },
    passengerCount: { type: 'string', required: true },
    totalFare: { type: 'string', required: true }
})
module.exports = mongoose.model('BookingHistory', BookingHistorySchema);