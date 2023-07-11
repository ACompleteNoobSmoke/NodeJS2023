console.log('Before');
getGame(1, displayGame => {;
    getRepositories(game.title, displayConsoles);
})


const displayGame = game => console.log('Game', game);
const displayConsoles = consoles => consoles.forEach(console => console.log(console));


function getGame(id, callback) {
    setTimeout(() => {
        console.log('Getting Game From Database');
        callback({
            id: id,
            title: 'Metal Gear Solid 4'
        })
      
    }, 3000)
}

function getRepositories(titles, callback){
    setTimeout(() => {
        console.log('Getting Consoles')
        callback(['Playstation', 'Xbox', 'Nintendo']);
    }) 
}