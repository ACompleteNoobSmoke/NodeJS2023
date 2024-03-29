const { 
    getMovieRepoMethods,
    saveMovie,
    updateMovie,
    deleteMovieRepoMethods
} = require('../repo/movieRepo');
const utils = require('../utils/movie');
const {genreByID} = require('../services/genre');

// Get Methods
const getAllMovies = async () =>{
    try {
        const response = {statusCode: 404, message: 'Films Does Not Exist'};
        const movies = await getMovieRepoMethods.allMovies();
        if (movies) {
            response.statusCode = 200;
            response.message = movies;
        }
        return response;
    } catch (error) {
        throw new Error('Error Retrieving Films');
    }
} 

const getMovieByID = async (req) => { 
    try {
        const id = getParamID(req);
        const response = {statusCode: 404, message: 'Film Does Not Exist'};
        const movie = await getMovieRepoMethods.getMovieByID(id);
        if (movie) {
            response.statusCode = 200,
            response.message = movie
        }
        return response; 
    }catch (error) {
        throw new Error('Error With Film Database');
    }
    
};

const getMovieByTitle = async (req) => {
    try {
        const title = getBodyField('title', req);
        const response = {statusCode: 404, message: 'Film Does Not Exist'};
        const movie = await getMovieRepoMethods.getMovieByTitle(title);
        if (movie) {
            response.statusCode = 200,
            response.message = movie
        }
        return response;
    } catch (error) {
        throw new Error('Error With Film Database');
    } 
}

// Post Methods
const saveNewMovie = async (req) => {
    try {
        const movieObject = utils.createMovieObject(req);
        const genre = await genreByID(movieObject.genreID);
        const response = {statusCode: 400, message: 'Cannot Save Film'};
        if (!genre) return response;
        const doc = genre[0]._doc;
        const genreDoc = {id: doc.id, name: doc.name};
        movieObject.genre = genreDoc;
        const savedMovie = await saveMovie(movieObject);
        if (savedMovie){
            response.statusCode = 200,
            response.message = savedMovie
        }
        return response;
    } catch (error) {
        throw new Error (error.message);
    }
}

// Put Methods
const updateExistingMovie = async (req) => {
    try {
        const id = utils.getParamID(req);
        const updateObject = utils.getBodyField(req);
        const response = {statusCode: 404, message: 'Cannot Update Film'};
        const updatedMovie = await updateMovie(id, updateObject);
        if (updateMovie) {
            response.statusCode = 200;
            response.message = updatedMovie;
        }
        return response;
    } catch (error) {
        throw new Error ('Error Updating Film In Database');
    }
   
}

// Delete Methods
const deleteMovieByID = async (req) => {
    try {
      const id = utils.getParamID(req);
      const response = {statusCode: 404, message: 'Cannot Delete Film'};
      const deletedFilm = await deleteMovieRepoMethods.deleteMovieByID(id);
      if (deletedFilm) {
        response.statusCode = 200;
        response.message = deletedFilm
      }
      return response;
    } catch (error) {
        throw new Error ('Error Deleting Film By ID');
    }  
}

const deleteMovieByTitle = async (req) => {
    try {
        const movieObject = utils.getBodyField(req);
        const title = movieObject.title;
        const response = {statusCode: 404, message: 'Cannot Delete Film'};
        const deletedFilm = await deleteMovieRepoMethods.deleteMovieByTitle(title);
        if (deletedFilm) {
          response.statusCode = 200;
          response.message = deletedFilm
        }
        return response;
      } catch (error) {
          throw new Error ('Error Deleting Film By Title');
      } 
}

module.exports = {
    getAllMovies : getAllMovies,
    getMovieByID : getMovieByID,
    getMovieByTitle : getMovieByTitle,
    saveNewMovie : saveNewMovie,
    updateExistingMovie : updateExistingMovie,
    deleteMovieByID : deleteMovieByID,
    deleteMovieByTitle : deleteMovieByTitle
}