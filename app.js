var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv').config();
var session = require('express-session');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var cors = require('cors');

var app = express();

app.use(
    session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 }
    })
);

app.use(cors({credentials: true,  origin: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/auth', authRouter);

module.exports = app;
