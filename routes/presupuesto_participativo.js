var express = require('express');
var router = express.Router();
var models = require('../models');
const uuidv4 = require('uuid/v4');
var recibirArchivo = require('../controllers/manejoDeArchivos/recibirArchivos');
var subirArchivo = require('../controllers/manejoDeArchivos/subirArchivo');
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');

/**
 * Endpoint que se encarga de crear una sugerencia_presupuesto_participativo de los ciudadanos
 * 
 * Parámetros que se envian en el body de la solicitud:
 * @param {String} fecha
 * @param {String} nombre
 * @param {String} apellido
 * @param {String} cedula
 * @param {String} telefono
 * @param {String} email
 * @param {String} direccion
 * @param {String} descripcion
 *
 * Respuestas:
 * @return estado 200 y {estado: 'ok', identificador: <identificador de la sugerencia_presupuesto_participativo>} si la sugerencia_presupuesto_participativo se creó correctamente.
 * @return estado 500 y {estado: 'err'} si ocurrió algún error en el servidor.
 */
router.post('/crear_sugerencia_presupuesto_participativo', recibirArchivo, subirArchivo("presupuesto_participativo"), function(req, res, next){
  const identificador = uuidv4().slice(0,8);

  models.sugerencia_presupuesto_participativo.create({
    parroquia: req.body.parroquia ,
    sector: req.body.sector ,
    organizacion: req.body.organizacion ,
    nombre: req.body.nombre ,
    telefono: req.body.telefono ,
    email: req.body.email ,
    vision_comunidad: req.body.vision_comunidad ,
    nombre_propuesta: req.body.nombre_propuesta ,
    ubicacion_propuesta: req.body.ubicacion_propuesta ,
    descripcion_propuesta: req.body.descripcion_propuesta ,
    beneficiarios_directos: req.body.beneficiarios_directos ,
    beneficiarios_indirectos: req.body.beneficiarios_indirectos ,
    presentada_anteriormente: req.body.presentada_anteriormente ,
    año_presentacion: req.body.año_presentacion ,
    solicito_recursos_anteriormente: req.body.solicito_recursos_anteriormente ,
    solicito_recursos_a: req.body.solicito_recursos_a ,
    nombre_responsable: req.body.nombre_responsable ,
    telefono_responsable: req.body.telefono_responsable ,
    email_responsable: req.body.email_responsable ,
    fichero: req.public_id ,
    enlace: req.file_url ,
    identificador: identificador ,
    comentarios: req.body.comentarios,
    fecha: req.body.fecha
  })
  .then(x => {
    if(x){
      res.status(200).json({estado: 'ok', identificador: identificador});
    }
    else{
      res.status(500).json({estado: 'err'});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({estado: 'err'});
  });
});


/**
 * Endpoint que se utiliza para obtener todas las sugerencia_presupuesto_participativo de los ciudadanos que se encuentran en el servidor
 * 
 * Respuestas:
 * @return estado 200 y un arreglo de sugerencia_presupuesto_participativo si se pudo obtener las sugerencia_presupuesto_participativo correctamente
 * @return estado 500 y 'err' si ocurrió algún error en el servidor.
 * @return estado 401 y 'err' si el usuario no se encuentra autenticado.
 * @return estado 403 y 'err' si el usuario no posee el rol necesario.
 */
router.get('/obtener_sugerencias_presupuesto_participativo', function(req, res){
  models.sugerencia_presupuesto_participativo.findAll()
  .then(sugerencias_presupuesto_participativo => {
    res.status(200).json(sugerencias_presupuesto_participativo);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

/**
 * Endpoint que se utiliza para obtener una sugerencia_presupuesto_participativo en particular dado un identificador de sugerencia_presupuesto_participativo
 * 
 * Respuestas:
 * @return estado 200 y la información de la sugerencia_presupuesto_participativo, si se pudo encontrar la sugerencia_presupuesto_participativo correctamente.
 * @return estaado 400 y 'err' si no se pudo encontrar la sugerencia_presupuesto_participativo dado un cierto identificador
 * @return estado 500 y 'err' si ocurrió algún error en el servidor.
 */
router.post('/obtener_sugerencia_presupuesto_participativo', function(req, res){
  models.sugerencia_presupuesto_participativo.findOne({where: {id: req.body.id}})
  .then(sugerencia_presupuesto_participativo => {
    if(sugerencia_presupuesto_participativo){
      res.status(200).json(sugerencia_presupuesto_participativo);
    }
    else{
      res.status(404).json('err');
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  });
});


/**
 * Endpoint que se utiliza para eliminar una sugerencia_presupuesto_participativo dentro del sistema
 * 
 * Parámetros a incluir dentro del body de la solicitud
 * @param {Integer} id id unico de la sugerencia_presupuesto_participativo dentro de la base de datos.
 * 
 * Respuestas:
 * @return estado 200 y 'ok' si la sugerencia_presupuesto_participativo se pudo eliminar correctamente.
 * @return estado 500 y 'err' si ocurrió algún error en el servidor.
 * @return estado 401 y 'err' si el usuario no se encuentra autenticado.
 * @return estado 403 y 'err' si el usuario no posee el rol necesario.
 */
router.post('/eliminar_sugerencia_presupuesto_participativo', autorizarAdministrador, function(req, res){
  models.sugerencia_presupuesto_participativo.destroy({where: {id: req.body.id}})
  .then(sugerencia_presupuesto_participativo => {
    if(sugerencia_presupuesto_participativo){
      res.status(200).json('ok');
    }
    else{
      res.status(404).json('err');
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  });
});

module.exports = router;