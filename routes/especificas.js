var express = require('express');
var router = express.Router();
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var models = require('../models');


router.post('/crear_especifica', autorizarAdministrador, function(req, res, next) {
  models.especificas
  .create({
    numero_especifica: req.body.numero_especifica, 
    denominacion: req.body.denominacion,
    generica_id: req.body.generica_id
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


router.post('/actualizar_especifica', autorizarAdministrador, function(req, res){
  models.especificas.update({
    numero_especifica: req.body.numero_especifica,
    habilitada: req.body.habilitada,
    denominacion: req.body.denominacion
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

router.post('/eliminar_especifica', autorizarAdministrador, function(req, res){
  models.especificas.destroy({where: {id: req.body.id}})
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


router.post('/habilitar_especifica', autorizarAdministrador, function(req, res){
  models.especificas.update({
    habilitada: true 
  }, {where: {id: req.body.id}})
  .then(x => {
    if(x[0]){
      res.json('ok').status(200);
    }
    else{
      res.json('err').status(404);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.post('/deshabilitar_especifica', autorizarAdministrador, function(req, res){
  models.especificas.update({
    habilitada: false 
  }, {where: {id: req.body.id}})
  .then(x => {
    if(x[0]){
      res.json('ok').status(200);
    }
    else{
      res.json('err').status(404);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.post('/obtener_especificas', autorizarAdministrador, function(req, res){
  models.especificas.findAll({
    where: {generica_id: req.body.generica_id}
  })
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.post('/obtener_especifica', autorizarAdministrador, function(req, res){
    models.especificas.findOne({
      where: {numero_especifica: req.body.numero_especifica}
    })
    .then( resultado => {
      res.json(resultado).status(200);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json('err');
    })
  });

module.exports = router;
