const express = require('express');
const app = express.Router();
const {log} = require('../logger');
const validation = require('../validation');

const food = ['Spaghetti', 'Ramen Noodles', 'Jollof Rice', 'BBQ Hamburgers'];

app.get('/', log, (req, res) => {
    res.send(food)
});

app.post('/', (req, res) => {
    const foodItem = req.body.item;
    const validated = validation.foodValidation(req);
    if(validated.error) return res.status(400).send(`${foodItem} Is Invalid`);
    var lowerCaseFood = food.map(f => f.toLowerCase());
   if (lowerCaseFood.includes(foodItem.toLowerCase())) return res.status(400).send(`${foodItem} Already Exists`);
    food.push(foodItem);
    res.status(202).send(food);
})

app.get('/:id', (req, res) => {
    const foodID = req.params.id - 1;
    const inRange = (foodID, food);
    if (!inRange) res.status(400).send('Incorrect Input');
    res.json(food[foodID]);
})

app.put('/:id', (req, res) => {
    const foodID = req.params.id - 1;
    var inRange = foodID in food;
    if(!inRange) return res.status(404).send("The Food With The Given ID Does Not Exist");
    const validated = validation.foodValidation(req);
    if(validated.error) return res.status(400).send(validated.error.details[0].message);
    const newFoodItem = req.body.item;
    food[foodID] = newFoodItem;
    res.json(food);
})

app.delete('/:id', (req, res) => {
    const foodID = req.params.id - 1;
    const inRange = validation.inRangeValidation(foodID, food);
    if(!inRange) return res.status(404).send("The Food With The Given ID Does Not Exist");
    const foodItem = food[foodID];
    food.splice(foodID, 1);
    res.status(200).send(`${foodItem} Has Sucessfully Been Removed From Database`);
})


module.exports = app;