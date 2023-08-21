const startupDebugger = require('debug')('app:startup');
const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');


app.set('view engine', 'pug');
app.set('views', './views');

// Configuration
// const appName = config.get('name');
// const mailHost = config.get('mail.host');
// const mailPassword = config.get('mail.password');

// startupDebugger(`App Name: ${appName}`);
// startupDebugger(`Host Name: ${mailHost}`);
// startupDebugger(`Host Password: ${mailPassword}`);

const env = app.get('env');
startupDebugger(env);

if (env === 'development') app.use(morgan('tiny'));

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected To MongoDB...'))
.catch(err => console.err('Could Not Connect To MongoDB...', err));

app.use(express.json());

app.use(helmet());

app.get('/', (req, res) => {
    res.render('index.pug', {
        title: appName,
        message: "We Got This Man!"
    })
})


// app.use((req, res, next) => {
//     console.log('Logging');
//     console.log(req.method);
//     console.log(req.url);
//     next();
// })


const foodRouter = require('./routes/food');
const genreRouter = require('./routes/genre');
const customerRouter = require('./routes/customer');
const movieRouter = require('./routes/movie');


app.use('/api/food', foodRouter);
app.use('/api/genre', genreRouter);
app.use('/api/customer', customerRouter);
app.use('/api/movie', movieRouter);

const PORT = process.env.PORT || 8008;

app.listen(PORT, () => { console.log(`Connected To Port:${PORT}`)});