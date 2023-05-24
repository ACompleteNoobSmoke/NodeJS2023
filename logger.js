const EventEmitter = require('events');
var url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
    person = {};
    logMessage = message => {
        console.log(message);
        this.person = message;
    }

    logPerson = () => {
        this.emit('messageLogged', this.person);
    }
}


module.exports = Logger
