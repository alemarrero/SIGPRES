var express = require('express');
var router = express.Router();
var models = require('../models');
const uuidv4 = require('uuid/v4');
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');

/**
 * Endpoint que se encarga de crear una sugerencia_comunidad de los ciudadanos
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
 * @return estado 200 y {estado: 'ok', identificador: <identificador de la sugerencia_comunidad>} si la sugerencia_comunidad se creó correctamente.
 * @return estado 500 y {estado: 'err'} si ocurrió algún error en el servidor.
 */
router.post('/crear_sugerencia_comunidad', function(req, res){
  const identificador = uuidv4().slice(0,8);

  models.sugerencias_comunidad.create({
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
    fichero: req.body.fichero ,
    enlace: req.body.enlace ,
    identificador: identificador ,
    comentarios: req.body.comentarios
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
 * Endpoint que se utiliza para obtener todas las sugerencia_comunidad de los ciudadanos que se encuentran en el servidor
 * 
 * Respuestas:
 * @return estado 200 y un arreglo de sugerencia_comunidad si se pudo obtener las sugerencia_comunidad correctamente
 * @return estado 500 y 'err' si ocurrió algún error en el servidor.
 * @return estado 401 y 'err' si el usuario no se encuentra autenticado.
 * @return estado 403 y 'err' si el usuario no posee el rol necesario.
 */
router.get('/obtener_sugerencias_comunidad', autorizarAdministrador, function(req, res){
  models.sugerencias_comunidad.findAll()
  .then(sugerencia_comunidad => {
    res.status(200).json(sugerencia_comunidad);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

/**
 * Endpoint que se utiliza para obtener una sugerencia_comunidad en particular dado un identificador de sugerencia_comunidad
 * 
 * Respuestas:
 * @return estado 200 y la información de la sugerencia_comunidad, si se pudo encontrar la sugerencia_comunidad correctamente.
 * @return estaado 400 y 'err' si no se pudo encontrar la sugerencia_comunidad dado un cierto identificador
 * @return estado 500 y 'err' si ocurrió algún error en el servidor.
 */
router.post('/obtener_sugerencia_comunidad', function(req, res){
  models.sugerencias_comunidad.findOne({where: {identificador: req.body.identificador}})
  .then(sugerencia_comunidad => {
    if(sugerencia_comunidad){
      res.status(200).json(sugerencia_comunidad);
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
 * Endpoint que se utiliza para eliminar una sugerencia_comunidad dentro del sistema
 * 
 * Parámetros a incluir dentro del body de la solicitud
 * @param {Integer} id id unico de la sugerencia_comunidad dentro de la base de datos.
 * 
 * Respuestas:
 * @return estado 200 y 'ok' si la sugerencia_comunidad se pudo eliminar correctamente.
 * @return estado 500 y 'err' si ocurrió algún error en el servidor.
 * @return estado 401 y 'err' si el usuario no se encuentra autenticado.
 * @return estado 403 y 'err' si el usuario no posee el rol necesario.
 */
router.post('/eliminar_sugerencia_comunidad', autorizarAdministrador, function(req, res){
  models.sugerencias_comunidad.destroy({where: {id: req.body.id}})
  .then(sugerencia_comunidad => {
    if(sugerencia_comunidad){
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

module.export = router;