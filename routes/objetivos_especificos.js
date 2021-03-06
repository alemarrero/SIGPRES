var express = require('express');
var router = express.Router();
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var autorizarDirector = require('../controllers/autenticacion/autorizarDirector');
var models = require('../models');

/**
 * Endpoint que se encarga de crear una propuesta de plan operativo anual
 * 
 * Parámetros que se envian en el body de la solicitud:
 * @param {String} area_id
 * @param {String} periodo
 * @param {String} enviada
 * @param {String} aprobada
 * @param {String} observaciones
 *
 * Respuestas:
 * @return estado 200 y {estado: 'ok', id: <id de la propuesta>} si la propuesta se creó correctamente.
 * @return estado 500 y {estado: 'err'} si ocurrió algún error en el servidor.
 */
router.post('/crear_objetivo_especifico', autorizarDirector, function(req, res){
  models.objetivos_especificos.create({
    numero_actividad: 51,
    objetivo: req.body.objetivo,
    propuesta_id: req.body.propuesta_id,
  })
  .then(resultado => {
    if(resultado){
      res.status(200).json("ok");
    }
    else{
      res.status(404).json("err");
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json("err");
  })
});

router.post("/obtener_objetivos", function(req, res){
  models.objetivos_especificos.findAll({where: {propuesta_id: req.body.propuesta_id}})
  .then(objetivos => {
    res.status(200).json(objetivos);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json("err");
  })
});

router.post("/obtener_objetivo", function(req, res){
  models.objetivos_especificos.findOne({where: {id: req.body.id}})
  .then(objetivo => {
    res.status(200).json(objetivo);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json("err");
  })
});

router.post("/modificar_objetivo", autorizarDirector, function(req, res){
  models.objetivos_especificos.update({
    objetivo: req.body.objetivo
  },
  {where: {id: req.body.id}})
  .then(resultado => {
    if(resultado[0]){
      res.status(200).json("ok");
    }
    else{
      res.status(404).json("err");
    }
  })
  .catch(err => {
    console.log(err);
    res.status(200).json("err");
  });
});

router.post("/eliminar_objetivo", autorizarDirector, function(req, res){
  models.objetivos_especificos.destroy({where: {id: req.body.id}})
  .then(resultado => {
    if(resultado){
      res.status(200).json("ok");
    }
    else{
      res.status(404).json("err");
    }
  })
  .catch(err => {
    console.log(err);
    res.status(200).json("err");
  });
});

module.exports = router;