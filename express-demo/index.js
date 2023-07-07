const startupDebugger = require('debug')('app:startup');
const config = require('config');
const express = require('express');
const app = express();
const {log} = require('./logger');
const validation = require('./validation');
const helmet = require('helmet');
const morgan = require('morgan');

app.set('view engine', 'pug');
app.set('views', './views');

// Configuration
const appName = config.get('name');
const mailHost = config.get('mail.host');
const mailPassword = config.get('mail.password');

startupDebugger(`App Name: ${appName}`);
startupDebugger(`Host Name: ${mailHost}`);
startupDebugger(`Host Password: ${mailPassword}`);

const env = app.get('env');
startupDebugger(env);

app.use(express.json());

app.use((req, res, next) => {
    console.log('Logging');
    console.log(req.method);
    console.log(req.url);
    next();
})

app.use(helmet());

if (env === 'development') 
    app.use(morgan('tiny'));

const PORT = process.env.PORT || 8008;

const food = ['Spaghetti', 'Ramen Noodles', 'Jollof Rice', 'BBQ Hamburgers'];

app.get('/', (req, res) => {
    res.render('index.pug', {
        title: appName,
        message: "We Got This Man!"
    })
})

app.get('/api/food', log, (req, res) => {
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
    const inRange = (foodID, food);
    if (!inRange) res.status(400).send('Incorrect Input');
    res.json(food[foodID]);
})

app.put('/api/food/:id', (req, res) => {
    const foodID = req.params.id - 1;
    var inRange = foodID in food;
    if(!inRange) return res.status(404).send("The Food With The Given ID Does Not Exist");
    const validated = validation.foodValidation(req);
    if(validated.error) return res.status(400).send(validated.error.details[0].message);
    const newFoodItem = req.body.item;
    food[foodID] = newFoodItem;
    res.json(food);
})

app.delete('/api/food/:id', (req, res) => {
    const foodID = req.params.id - 1;
    const inRange = validation.inRangeValidation(foodID, food);
    if(!inRange) return res.status(404).send("The Food With The Given ID Does Not Exist");
    const foodItem = food[foodID];
    food.splice(foodID, 1);
    res.status(200).send(`${foodItem} Has Sucessfully Been Removed From Database`);
})

app.listen(PORT, () => { console.log(`Connected To Port:${PORT}`)});