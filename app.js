const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', eventArg => {
    console.log("You are a senior developer");
    console.log(`Hello My Name Is ${eventArg.name}, I Am A ${eventArg.gender} & My Occupation Is ${eventArg.occupation}!`);
})


var person = {
    name: 'Victoria',
    gender: 'Female',
    occupation: 'Graphic Designer'
};

logger.logMessage(person);
logger.logPerson();
