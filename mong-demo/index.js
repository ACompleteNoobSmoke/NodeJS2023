const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected To MongoDB...'))
.catch(err => console.err('Could Not Connect To MongoDB...', err));

const gameSchema = new mongoose.Schema({
    title: String,
    developer: String,
    console: [String],
    releaseDate: {type: Date, default: Date.now}
});

const Game = mongoose.model('Game', gameSchema);


const createGame = async () => {
    const game = new Game({
    title: 'Street Fighter 6',
    developer: 'Capcom',
    console: ['Playstation 4', 'Playstation 5', 'Xbox One', 'Xbox Series X', 'PC'],
    releaseDate: '07/18/2023'
});

const gameExists = await ifGameExists(game.title);
console.log(gameExists);
if (gameExists && gameExists > 0){
    console.log(`${game.title} Already Exists In Database`);
    return;
}
const result = await game.save();
console.log(result);
}

const getGames = async () => {
    const games = await Game.find({developer: 'Capcom'});
    console.log(games);
}

const getGamesByReleaseDate = async () => {
    const date = new Date("2024-01-01T00:00:00.000Z");
    const games = await gamesPublishedBeforeDate(date);
    console.log(games);
}

const ifGameExists = async title =>  await Game.find({title: title}).count();

const gamesPublishedBeforeDate = async date => await Game.find({releaseDate: {$lte: date}});

//getGames();

//getGamesByReleaseDate();

createGame();
