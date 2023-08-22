const express = require('express');
const app = express.Router();
const genreRepo = require('../repo/genreRepo');
const {getGenreByID, genreExistsByID, ifNotExists} = require('../services/genre');
const {log} = require('../logger');
const validation = require('../validation');



app.get('/', async (req, res) => {
    try{
        const allGenres = await genreRepo.allGenres();
        res.send(allGenres);
    }catch(err){
        res.send(400, err.message);
    }
});

app.get('/:id', async (req, res) => {
    try{
        const result = getGenreByID(req);
        if (!result || (result && result.length == 0)) return res.status(404).send('Genre Does Not Exist');
        res.status(200).send(result);
    }catch (err) {
        res.status(400).send(err.message);
    }
})

// app.post('/', async (req, res) => {
//     try{
//         const name = req.body.name;
//         const exists = await genreRepo.genreExists(name);
//         if (exists && exists > 0)  return res.status(400).send(`${name} Already Exists In Database`);
//         const genreLength = await genreRepo.allGenresCount();
//         const id = genreLength + 1;
//         const result = await genreRepo.newGenre(id, name);
//         res.status(200).send(result);
//     }catch(error){
//         return res.status(400).send(error.message);
//     }
// })

app.post('/', async (req, res) => {
    try{
        const result = await genreRepo.addGenre(req);
        res.status(200).send(result);
    }catch(error){
        return res.status(400).send(error.message);
    }
})

app.put('/:id', async (req, res) => {
    try {
        const exists = await genreExistsByID(req)
        if (ifNotExists(exists)) return res.status(404).send('Genre Does Not Exists!');
        const id = req.body.id
        const name = req.body.name;
        const result = await genreRepo.updateGenreName(id, name);
        res.status(200).send(result);
    }catch (ex) {
        res.status(404).send(ex.message);
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const exists = await genreExistsByID(req);
        if (ifNotExists(exists)) return res.status(404).send('Genre Does Not Exists!');
        const result = await genreRepo.removeGenre(req.params.id);
        res.status(200).send(result);
    }catch(err) {
        res.status(404).send(err.message);
    }
})


module.exports = app;