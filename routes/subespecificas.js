var express = require('express');
var router = express.Router();
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var models = require('../models');


router.post('/crear_subespecifica', autorizarAdministrador, function(req, res, next) {
  models.subespecificas
  .create({
    numero_subespecifica: req.body.numero_subespecifica, 
    denominacion: req.body.denominacion,
    especifica_id: req.body.especifica_id
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


router.post('/actualizar_subespecifica', autorizarAdministrador, function(req, res){
  models.subespecificas.update({
    numero_subespecifica: req.body.numero_subespecifica,
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

router.post('/eliminar_subespecifica', autorizarAdministrador, function(req, res){
  models.subespecificas.destroy({where: {id: req.body.id}})
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


router.post('/habilitar_subespecifica', autorizarAdministrador, function(req, res){
  models.subespecificas.update({
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

router.post('/deshabilitar_subespecifica', autorizarAdministrador, function(req, res){
  models.subespecificas.update({
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

router.post('/obtener_subespecificas', autorizarAdministrador, function(req, res){
  models.subespecificas.findAll({
    where: {especifica_id: req.body.especifica_id}
  }
  )
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

module.exports = router;
