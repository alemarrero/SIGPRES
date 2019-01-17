var express = require('express');
var router = express.Router();
var autorizarDirector = require('../controllers/autenticacion/autorizarDirector');
var autorizarDirectorPP = require('../controllers/autenticacion/autorizarDirectorPP');
var models = require('../models');


router.post('/crear_cargo', autorizarDirectorPP, function(req, res, next) {
  models.cargos.create({
    codigo: req.body.codigo,
    cargo: req.body.cargo 
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


router.post('/actualizar_cargo', autorizarDirectorPP, function(req, res){
  models.cargos.update({
    codigo: req.body.codigo,  
    cargo: req.body.cargo,
    habilitado: req.body.habilitado
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

router.post('/eliminar_cargo', autorizarDirectorPP, function(req, res){
  models.cargos.destroy({where: {id: req.body.id}})
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


router.post('/habilitar_cargo', autorizarDirectorPP, function(req, res){
  models.cargos.update({
    habilitado: true 
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

router.post('/deshabilitar_cargo', autorizarDirectorPP, function(req, res){
  models.cargos.update({
    habilitado: false 
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

router.get('/obtener_cargos', autorizarDirector, function(req, res){
  models.cargos.findAll()
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

module.exports = router;
