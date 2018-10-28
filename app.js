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
var subespecificasRouter = require('./routes/subespecificas');
var planesNacionRouter = require('./routes/planes_nacion');
<<<<<<< HEAD
var cargosRouter = require('./routes/cargos');
=======
var planesCGRRouter = require('./routes/planes_cgr');
var planesCMBRouter = require('./routes/planes_contraloria_municipal');
var planesAlcaldiaRouter = require('./routes/planes_alcaldia');
var solicitudPersonalRouter = require('./routes/solicitud_personal');
>>>>>>> d97cfe8f0be84c3f4af57e7b2d9e2b2d299550fc

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
app.use('/api/subespecificas', subespecificasRouter);
app.use('/api/planes_nacion', planesNacionRouter);
<<<<<<< HEAD
app.use('/api/cargos', cargosRouter);
=======
app.use('/api/planes_cgr', planesCGRRouter);
app.use('/api/planes_cmb', planesCMBRouter);
app.use('/api/planes_alcaldia', planesAlcaldiaRouter);
app.use('/api/solicitud_personal', solicitudPersonalRouter);

/*DO NOT REMOVE THIS CATCH ALL ROUTE*/
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

module.exports = app;
