var express = require('express');
var router = express.Router();
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var models = require('../models');
const uuidv4 = require('uuid/v4');

/**
 * Endpoint que se encarga de crear una queja de los ciudadanos
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
 * @return estado 200 y {estado: 'ok', identificador: <identificador de la queja>} si la queja se creó correctamente.
 * @return estado 500 y {estado: 'err'} si ocurrió algún error en el servidor.
 */
router.post('/crear_queja', function(req, res){
  const identificador = uuidv4().slice(0,8);

  models.quejas.create({
    fecha: req.body.fecha,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    cedula: req.body.cedula,
    telefono: req.body.telefono,
    email: req.body.email,
    direccion: req.body.direccion,
    descripcion: req.body.descripcion,
    identificador: identificador
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
 * Endpoint que se utiliza para obtener todas las quejas de los ciudadanos que se encuentran en el servidor
 * 
 * Respuestas:
 * @return estado 200 y un arreglo de quejas si se pudo obtener las quejas correctamente
 * @return estado 500 y 'err' si ocurrió algún error en el servidor.
 * @return estado 401 y 'err' si el usuario no se encuentra autenticado.
 * @return estado 403 y 'err' si el usuario no posee el rol necesario.
 */
router.get('/obtener_quejas', autorizarAdministrador, function(req, res){
  models.quejas.findAll()
  .then(quejas => {
    res.status(200).json(quejas);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

/**
 * Endpoint que se utiliza para obtener una queja en particular dado un identificador de queja
 * 
 * Respuestas:
 * @return estado 200 y la información de la queja, si se pudo encontrar la queja correctamente.
 * @return estaado 400 y 'err' si no se pudo encontrar la queja dado un cierto identificador
 * @return estado 500 y 'err' si ocurrió algún error en el servidor.
 */
router.post('/obtener_queja', function(req, res){
  models.quejas.findOne({where: {identificador: req.body.identificador}})
  .then(queja => {
    if(queja){
      res.status(200).json(queja);
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
 * Endpoint que se utiliza para eliminar una queja dentro del sistema
 * 
 * Parámetros a incluir dentro del body de la solicitud
 * @param {Integer} id id unico de la queja dentro de la base de datos.
 * 
 * Respuestas:
 * @return estado 200 y 'ok' si la queja se pudo eliminar correctamente.
 * @return estado 500 y 'err' si ocurrió algún error en el servidor.
 * @return estado 401 y 'err' si el usuario no se encuentra autenticado.
 * @return estado 403 y 'err' si el usuario no posee el rol necesario.
 */
router.post('/eliminar_queja', autorizarAdministrador, function(req, res){
  models.quejas.destroy({where: {id: req.body.id}})
  .then(queja => {
    if(queja){
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
