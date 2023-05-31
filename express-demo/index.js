const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bruce Lee')
})

app.get('/api/food', (req, res) => {
    const food = ['Spaghetti', 'Ramen Noodles', 'Jollof Rice']
    res.send(food)
})

app.listen(8008, () => {
    console.log('Connected To Port')
})