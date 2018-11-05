var express = require('express');
var router = express.Router();
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
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
router.post('/crear_accion_recurrente', autorizarAdministrador, function(req, res){
  models.acciones_recurrentes.create({
    numero_actividad: 51,
    accion_recurrente: req.body.accion_recurrente,
    objetivo_especifico_id: req.body.objetivo_especifico_id,
  })
  .then(propuesta => {
    res.status(200).json("ok");
  })
  .catch(err => {
    console.log(err);
    res.status(500).json("err");
  })
});

router.post("/obtener_acciones_recurrentes", autorizarAdministrador, function(req, res){
  models.acciones_recurrentes.findAll({where: {objetivo_especifico_id: req.body.objetivo_especifico_id}})
  .then(acciones => {
    res.status(200).json(acciones);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json("err");
  })
});

router.post("/obtener_accion_recurrente", autorizarAdministrador, function(req, res){
  models.acciones_recurrentes.findAll({where: {id: req.body.id}})
  .then(accion_recurrente => {
    res.status(200).json(accion_recurrente);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json("err");
  })
});

router.post("/modificar_accion_recurrente", autorizarAdministrador, function(req, res){
  models.acciones_recurrentes.update({
    accion_recurrente: req.body.accion_recurrente
  },
  {where: {id: req.body.id}})
  .then( () => {
    res.status(200).json("ok");
  })
  .catch(err => {
    console.log(err);
    res.status(200).json("err");
  });
});

router.post("/eliminar_accion_recurrente", autorizarAdministrador, function(req, res){
  models.acciones_recurrentes.destroy({where: {id: req.body.id}})
  .then( () => {
    res.status(200).json("ok");
  })
  .catch(err => {
    console.log(err);
    res.status(200).json("err");
  });
});

module.exports = router;