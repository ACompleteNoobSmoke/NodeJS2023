const startupDebugger = require('debug')('app:startup');
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

app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected To MongoDB...'))
.catch(err => console.err('Could Not Connect To MongoDB...', err));



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

app.use('/api/food', foodRouter);
app.use('/api/genre', genreRouter);

const PORT = process.env.PORT || 8008;

app.listen(PORT, () => { console.log(`Connected To Port:${PORT}`)});