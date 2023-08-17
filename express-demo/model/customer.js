const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isGold: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Customer', customerSchema);