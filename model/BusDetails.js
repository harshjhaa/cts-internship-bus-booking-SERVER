
const mongoose = require('mongoose');

const BusDetailsSchema = new mongoose.Schema({
    busNo: { type: 'string', required: true },
    busType: { type: 'string', required: true },
    departLoc: { type: 'string', required: true },
    arriveLoc: { type: 'string', required: true },
    busId: { type: 'string', required: true },
    departDate: { type: 'string', required: true },
    arriveDate: { type: 'string', required: true },
    departTime: { type: 'string', required: true },
    arriveTime: { type: 'string', required: true },
    totalSeats: { type: 'string', required: true },
    seatsAvailable: { type: 'string', required: true },
    fare: { type: 'string', required: true },
})

module.exports = mongoose.model('BusDetails', BusDetailsSchema);