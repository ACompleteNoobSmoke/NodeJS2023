const MovieRepo = require('../repo/movieRepo');

const getAllMovies = async () => await MovieRepo.allMovies();

module.exports = {
    getAllMovies : getAllMovies,
}