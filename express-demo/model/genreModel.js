const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Genre', genreSchema);
module.exports = {
    genreSchema: genreSchema
}