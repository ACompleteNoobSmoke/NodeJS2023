const express = require('express');
const app = express.Router();
const movieService = require('../services/movie');
const schema = require('../validation/movie');
const {movieValidate} = require('../validation/movie');


app.get('/', async (req, res) => {
    try {
        const {statusCode, message} = await movieService.getAllMovies();
        res.status(statusCode).send(message);
    } catch (error) {
        res.status(400).send('Database Error')
    }
})

app.get('/:id', async (req, res) => {
    try {
        const {statusCode, message} = await movieService.getMovieByID(req);
        res.status(statusCode).send(message)
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/', async (req, res) => {
    try {
        const {error} = movieValidate(schema.movieValidate, req);
        if (error) return res.status(400).send(error.details[0].message);
        const {statusCode, message} = await movieService.saveNewMovie(req);
        res.status(statusCode).send(message);
        res.status
    } catch (error) {
        res.status(400).send(error.message);
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const {statusCode, message} = await movieService.deleteMovieByID(req);
        res.status(statusCode).send(message);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

app.delete('/', async (req, res) => {
    try {
        const {error} = movieValidate(schema.titleSchema, req);
        if (error) return res.status(404).send(error.details[0].message);
        const {statusCode, message} = await movieService.deleteMovieByID(req);
        res.status(statusCode).send(message);
    } catch (error) {
        res.status(400).send(error.message);
    }
})


module.exports = app;