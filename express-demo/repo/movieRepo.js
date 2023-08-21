const Movie = require('../model/movie');

// Get Methods
const allMovies = async () => await Movie.find();
const getMovieByID = async (id) => await Movie.findById(id);
const getMovieByIDCount = async (id) => await Movie.findById(id).count();
const getMovieByTitle = async (title) => await Movie.find({title: title});
const getMovieRepoMethods = {
    allMovies : allMovies,
    getMovieByID : getMovieByID,
    getMovieByTitle: getMovieByTitle,
    ifMovieExists : getMovieByIDCount
}

// Post Methods
const saveMovie = async (newMovie) => {
    const film = new Movie(newMovie);
    const savedFilm = film.save();
    return savedFilm;
}

// Put Methods
const updateMovie = async (id, updateObject) => await Movie.findByIdAndUpdate(id, updateObject, {new: true});

// Delete Methods
const deleteMovieByID = async (id) => await Movie.findByIdAndDelete(id);
const deleteMovieByTitle = async (title) => await Movie.findOneAndDelete({title: title});
const deleteMovieRepoMethods = {
    deleteMovieByID : deleteMovieByID,
    deleteMovieByTitle : deleteMovieByTitle
}


module.exports = {
    getMovieRepoMethods : getMovieRepoMethods,
    saveMovie : saveMovie,
    updateMovie : updateMovie,
    deleteMovieRepoMethods : deleteMovieRepoMethods
}