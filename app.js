/* Main Dependencies */
const express = require('express');
const path = require('path');
const session = require('express-session');
const morgan = require('morgan');
const fs = require('fs');
const helmet = require('helmet');

/* Session & Database configuration */
const { Model } = require('objection');
const KnexSessionStore = require('connect-session-knex')(session);
const knex = require('./db/config');

Model.knex(knex);

/* Get all routers */
const carsRouter = require('./routes/api/cars');
const driversRouter = require('./routes/api/drivers');
const ralliesRouter = require('./routes/api/rallies');

const indexRouter = require('./routes/index');

/* Application start */
const app = express();

/* View Engine EJS */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Middlewares */
app.use(require('express-status-monitor')());
app.use(
    helmet({
        xssFilter: true,
        referrerPolicy: true,
        noSniff: true,
        noCache: false,
        hidePoweredBy: {
            setTo: 'ASP.NET'
        }
    })
);

morgan.token('body', function(req, res) {
    return JSON.stringify(req.body);
});
morgan.token('headers', function(req, res) {
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

/* Session Settings */
app.set('trust proxy', 1); // trust first proxy
app.use(
    session({
        store: new KnexSessionStore({ knex, tablename: 'sessions' }),
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,
        name: ']cUpQwIOA~gLUedE/`u6DHzI"{j$f;',
        cookie: {
            signed: true,
            maxAge: 30000 // 30 seconds for testing
        }
    })
);

/* Serve static files from public folder */
app.use(express.static(path.join(__dirname, 'public')));

/* Routers */
app.use('/', indexRouter);

app.use('/api', [carsRouter, driversRouter, ralliesRouter]);

module.exports = app;
