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
    title: 'Resident Evil 4 Remake',
    developer: 'Capcom',
    console: ['Playstation 4', 'Playstation 5', 'Xbox One', 'Xbox Series X', 'PC'],
    releaseDate: '03/18/2023'
});

const result = await game.save();
console.log(result);
}

const getGames = async () => {
    const games = await Game.find();
    console.log(games);
}

getGames();

//createGame();