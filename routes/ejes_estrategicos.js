var express = require('express');
var router = express.Router();
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var models = require('../models');


router.post('/crear_eje_estrategico', autorizarAdministrador, function(req, res, next) {
  models.ejes_estrategicos.create({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    antecedente_id: req.body.antecedente_id
  })  
  .then(response => {
    if(response){
      res.json('ok').status(200);
    }
  })
  .catch(err => {
    console.log(err);
    res.json('err').status(500);
  });
});


router.post('/actualizar_eje_estrategico', autorizarAdministrador, function(req, res){
  models.ejes_estrategicos.update({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    antecedente_id: req.body.antecedente_id
  },
  {where: {id: req.body.id}})
  .then(resultado => {
    if(resultado[0]){
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

router.post('/eliminar_eje_estrategico', autorizarAdministrador, function(req, res){
  models.ejes_estrategicos.destroy({where: {id: req.body.id}})
  .then(resultado => {
    if(resultado){
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

router.post('/obtener_ejes_estrategicos', autorizarAdministrador, function(req, res){
  models.ejes_estrategicos.findAll({where: {antecedente_id: req.body.antecedente_id}})
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});


router.post('/obtener_eje_estrategico', autorizarAdministrador, function(req, res){
  models.ejes_estrategicos.findOne({where: {id: req.body.id}})
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

module.exports = router;
