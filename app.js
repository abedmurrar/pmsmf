/* Main Dependencies */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const fs = require('fs');

/* Routers */
const { Model } = require('objection');
const carsRouter = require('./routes/api/cars');
const usersRouter = require('./routes/api/users');
const indexRouter = require('./routes/index');

/* Database configuration */
const knex = require('./db/config');

Model.knex(knex);

/* Application start */
const app = express();

/* View Engine EJS */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Middlewares */
morgan.token('body', function(req, res) {
    return JSON.stringify(req.body);
});
morgan.token('headers', function(req, res) {
    // TODO: update the behavior
    let string = '';
    console.log(string);
    return string;
});
app.use(morgan('dev'));
app.use(
    morgan('":method :url :http-version\n:headers\n\n :body"\n:status :response-time ms\n\n', {
        stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* Serve static files from public folder */
app.use(express.static(path.join(__dirname, 'public')));

/* Routers */
app.use('/', indexRouter);

app.use('/api', [carsRouter, usersRouter]);

module.exports = app;
