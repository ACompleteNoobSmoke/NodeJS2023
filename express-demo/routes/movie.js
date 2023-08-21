const express = require('express');
const app = express.Router();
const movieService = require('../services/movie');
const schema = require('../validation/movie');
const {validate} = require('../validation/movie');


app.get('/', async (req, res) => {
    try {
        const movies = await movieService.getMovies();
        res.status().send(movies);
    } catch (error) {
        res.status(400).send('Database Error')
    }
})



module.exports = app;