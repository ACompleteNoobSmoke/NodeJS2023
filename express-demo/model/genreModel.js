const mongoose = require('mongoose');
const {genreSchema} = require('../model/genreSchema');



module.exports = mongoose.model('Genre', genreSchema);
