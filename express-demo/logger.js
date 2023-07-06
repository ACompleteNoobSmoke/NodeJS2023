const log = (req, res, next) => {
    const {method, url} = req;
    console.log(`Running A ${method} Method On URL ${url}`);
    next();
}

module.exports = {
    log: log
}