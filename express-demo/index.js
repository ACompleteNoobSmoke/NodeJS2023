const express = require('express');
const app = express();
const validation = require('./validation');

app.use(express.json());

const PORT = process.env.PORT || 8008;

const food = ['Spaghetti', 'Ramen Noodles', 'Jollof Rice', 'BBQ Hamburgers'];

app.get('/', (req, res) => {
    res.send('Bruce Lee')
})

app.get('/api/food', (req, res) => {
    res.send(food)
});

app.post('/api/food', (req, res) => {
    const foodItem = req.body.item;
    const validated = validation.foodValidation(req);
    if(validated.error) return res.status(400).send(`${foodItem} Is Invalid`);
    var lowerCaseFood = food.map(f => f.toLowerCase());
   if (lowerCaseFood.includes(foodItem.toLowerCase())) return res.status(400).send(`${foodItem} Already Exists`);
    food.push(foodItem);
    res.status(202).send(food);
})

app.get('/api/food/:id', (req, res) => {
    const foodID = req.params.id - 1;
    var inRange = foodID in food;
    if (!inRange) res.status(400).send('Incorrect Input');
    res.json(food[foodID]);
})

app.listen(PORT, () => { console.log(`Connected To Port:${PORT}`)});