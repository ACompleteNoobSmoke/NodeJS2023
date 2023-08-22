const genreRepo = require('../repo/genreRepo');

const genreByID = async (id) => await genreRepo.getGenrebyID(id);

const getGenreByID = async (req) => {
    const id = req.params.id;
    return await genreRepo.getGenrebyID(id);
}

const genreExistsByID = async (req) => {
    const id = req.params.id;
    return await genreRepo.genreExistsByID(id);
}

const ifNotExists = (exists) => !exists || (exists && exists < 1);

module.exports = {
    getGenreByID: getGenreByID,
    genreExistsByID: genreExistsByID,
    genreByID : genreByID,
    ifNotExists: ifNotExists
}