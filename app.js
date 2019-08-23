/* Main Dependencies */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

/* Routers */
const { Model } = require('objection');
const carsRouter = require('./routes/cars');
const usersRouter = require('./routes/users');

/* Database configuration */
const knex = require('./db/config');

Model.knex(knex);

/* Application start */
const app = express();

/* Middlewares */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Routers */
app.use('/cars', carsRouter);
app.use('/users', usersRouter);

module.exports = app;
