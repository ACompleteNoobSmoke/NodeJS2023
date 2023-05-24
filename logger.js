var url = 'http://mylogger.io/log';

function log(message){
    console.log(message);
}

function logError(errMessage){
    console.log("ERROR: " + errMessage);
}

module.exports = {
    log: log,
    errLog: logError
}
