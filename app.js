var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv').config();
var session = require('express-session');

// Routers
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var udmRouter = require('./routes/unidades_de_medida');
var mdvRouter = require('./routes/medios_de_verificacion');
var programasRouter = require('./routes/programas');
var areasRouter = require('./routes/areas');
var ppRouter = require('./routes/partidas_presupuestarias');
var genericasRouter = require('./routes/genericas');
var especificasRouter = require('./routes/especificas');
var cors = require('cors');

// Se inicializa la app de express
var app = express();


// Middlewares
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
app.use(express.static(path.join(__dirname, 'client/build')));

// Rutas
app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/unidades_de_medida', udmRouter);
app.use('/api/medios_de_verificacion', mdvRouter);
app.use('/api/programas', programasRouter);
app.use('/api/areas', areasRouter);
app.use('/api/partidas_presupuestarias', ppRouter);
app.use('/api/genericas', genericasRouter);
app.use('/api/especificas', especificasRouter);

/*DO NOT REMOVE THIS CATCH ALL ROUTE*/
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

module.exports = app;
