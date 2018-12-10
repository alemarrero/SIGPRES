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
var cargosRouter = require('./routes/cargos');
var planesCGRRouter = require('./routes/planes_cgr');
var planesCMBRouter = require('./routes/planes_contraloria_municipal');
var planesAlcaldiaRouter = require('./routes/planes_alcaldia');
var solicitudPersonalRouter = require('./routes/solicitud_personal');
var requerimientosPersonalRouter = require('./routes/requerimientos_personal');
var presupuestoParticipativoRouter = require('./routes/presupuesto_participativo');
var sugerenciasRouter = require('./routes/sugerencias');
var quejasRouter = require('./routes/quejas');
var propuestasPOARouter = require('./routes/propuestas_plan_operativo_anual');
var objetivosEspecificosRouter = require('./routes/objetivos_especificos');
var accionesRecurrentesRouter = require('./routes/acciones_recurrentes');
var productosRouter = require('./routes/productos');
var antecedentesRouter = require('./routes/antecedentes');
var ejesEstrategicosRouter = require('./routes/ejes_estrategicos');
var objetivosEstrategicosRouter = require('./routes/objetivos_estrategicos');
var solicitudesRequerimientosRouter = require('./routes/solicitudes_de_requerimientos');
var entradasSolicitudesRequerimientosRouter = require('./routes/entradas_solicitud_de_requerimientos');
var vinculacionAccionesProductosRouter = require('./routes/vinculacion_acciones_productos');

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
app.use('/api/cargos', cargosRouter);
app.use('/api/planes_cgr', planesCGRRouter);
app.use('/api/planes_cmb', planesCMBRouter);
app.use('/api/planes_alcaldia', planesAlcaldiaRouter);
app.use('/api/requerimientos_personal', requerimientosPersonalRouter);
app.use('/api/solicitud_personal', solicitudPersonalRouter);
app.use('/api/presupuesto_participativo', presupuestoParticipativoRouter);
app.use('/api/sugerencias', sugerenciasRouter);
app.use('/api/quejas', quejasRouter);
app.use('/api/propuestas_plan_operativo_anual', propuestasPOARouter);
app.use('/api/objetivos_especificos', objetivosEspecificosRouter);
app.use('/api/acciones_recurrentes', accionesRecurrentesRouter);
app.use('/api/productos', productosRouter);
app.use('/api/antecedentes', antecedentesRouter);
app.use('/api/ejes_estrategicos', ejesEstrategicosRouter);
app.use('/api/objetivos_estrategicos', objetivosEstrategicosRouter);
app.use('/api/solicitudes_de_requerimientos', solicitudesRequerimientosRouter);
app.use('/api/entradas_solicitud_de_requerimientos', entradasSolicitudesRequerimientosRouter);
app.use('/api/vinculacion_acciones_productos', vinculacionAccionesProductosRouter)

/*DO NOT REMOVE THIS CATCH ALL ROUTE*/
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

module.exports = app;
