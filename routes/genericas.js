var express = require('express');
var router = express.Router();
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var models = require('../models');


router.post('/crear_generica', autorizarAdministrador, function(req, res, next) {
  models.genericas
  .create({
    numero_generica: req.body.numero_generica, 
    denominacion: req.body.denominacion,
    partida_presupuestaria_id: req.body.partida_presupuestaria_id
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


router.post('/actualizar_generica', autorizarAdministrador, function(req, res){
  models.genericas.update({
    numero_generica: req.body.numero_generica,
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

router.post('/eliminar_generica', autorizarAdministrador, function(req, res){
  models.genericas.destroy({where: {id: req.body.id}})
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


router.post('/habilitar_generica', autorizarAdministrador, function(req, res){
  models.genericas.update({
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

router.post('/deshabilitar_generica', autorizarAdministrador, function(req, res){
  models.genericas.update({
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

router.get('/obtener_genericas', autorizarAdministrador, function(req, res){
  models.genericas.findAll()
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.post('/obtener_generica', autorizarAdministrador, function(req, res){
    models.genericas.findOne({
      where: {numero_generica: req.body.numero_generica}
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
