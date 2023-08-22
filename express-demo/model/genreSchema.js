const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = {
    genreSchema: genreSchema,
}