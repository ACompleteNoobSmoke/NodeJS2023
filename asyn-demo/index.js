getGame(3).then(result => console.log('Game', result)).catch(err => console.log('Error', err));

 showFighter();

const games = [
    {id: 1, title: 'Metal Gear Solid'},
    {id: 2, title: 'Gears of War'},
    {id: 3, title: 'Ninja Gaiden'}
];

function getGame(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Searching For Games');
            resolve(games.find(game => game.id === id));
    },  3000);
    })
}

function getFighter (name) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Fighter Name: ${name}`)
        }, 3000)
    })
}

async function showFighter(){
   const ans = await getFighter('Francis Ngannou');
   console.log(ans);
}

