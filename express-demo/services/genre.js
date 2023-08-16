const genreRepo = require('../repo/genreRepo');



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
    ifNotExists: ifNotExists
}