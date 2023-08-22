const mongoose = require('mongoose');
const {genreSchema} = require('../model/genreSchema');

const movieSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});


module.exports = mongoose.model('Movie', movieSchema);