const fields = ['title', 'genre', 'numberInStock', 'dailyRentalRate'];

const getParamID = (req) => req.params.id;

const getBodyField = (req) => createMovieObject(req);

const createMovieObject = (req) => {
    const movieObject = {};
    fields.forEach(f => {
        movieObject[f] = req.body[f];
    })
    return movieObject;
}


module.exports = {
    fields: fields,
    getParamID : getParamID,
    getBodyField : getBodyField,
    createMovieObject : createMovieObject
}