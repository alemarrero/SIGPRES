var express = require('express');
var router = express.Router();
var autorizarDirector = require('../controllers/autenticacion/autorizarDirector');
var models = require('../models');

/**
 * Endpoint tipo POST de prueba
 * 
 * Parámetros que se envian en el body de la solicitud:
 * @param {String} parametro_1
 * @param {Integer} parametro_2
 *
 * Respuestas:
 * @return estado 200 y {estado: 'ok'} si la acción se creó correctamente.
 * @return estado 500 y {estado: 'err'} si ocurrió algún error en el servidor.
 */
router.post('/endpoint_tipo_post', autorizarDirector, function(req, res){
  try {
    res.status(200).json({estado: 'ok'});
  } catch (error) {
    console.log(error);
    res.status(500).json({estado: 'err'});    
  }
});

/**
 * Endpoint tipo GET de prueba
 * 
 *
 * Respuestas:
 * @return estado 200 y {estado: 'ok'} si la acción se creó correctamente.
 * @return estado 500 y {estado: 'err'} si ocurrió algún error en el servidor.
 */
router.get("/endpoint_tipo_get", autorizarDirector, function(req, res){
  try {
    res.status(200).json({estado: 'ok'});
  } catch (error) {
    console.log(error);
    res.status(500).json({estado: 'err'});    
  }
});

module.exports = router;