
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fName: { type: 'string', required: true },
    lName: { type: 'string', required: true },
    email: { type: 'string', required: true },
    userId: { type: 'string', required: true },
    password: { type: 'string', required: true },
    contact: { type: 'string', required: true }

    // name: { type: 'string', required: true },
    // email: { type: 'string', required: true },
    // password: { type: 'string', required: true },
})

module.exports = mongoose.model('User', UserSchema);