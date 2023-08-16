const Genre = require('../model/genreModel');


const getAllGenres = async () => await Genre.find();
const getAllGenresCount = async () => await Genre.find().count();
const getGenrebyID = async (id) => await Genre.find({id: id});
const genreExists = async (name) => await Genre.find({name: name}).count();
const genreExistsByID = async (id) => await Genre.find({id: id}).count();
const updateGenreName = async (id, name) => await Genre.findOneAndUpdate({id:id}, {name: name}, {new: true});
const removeGenre = async (id) => await Genre.findOneAndDelete({id: id});

const newGenre = async (id, name) => {
    const genreObject = {id: id, name: name}
    const genre = new Genre(genreObject);
    const result = await genre.save();
    return result;
}

module.exports = {
    allGenres: getAllGenres,
    allGenresCount: getAllGenresCount,
    getGenrebyID: getGenrebyID,
    genreExists: genreExists,
    genreExistsByID: genreExistsByID,
    newGenre: newGenre,
    updateGenreName: updateGenreName,
    removeGenre: removeGenre
}