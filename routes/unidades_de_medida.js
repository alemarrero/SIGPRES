var express = require('express');
var router = express.Router();
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var models = require('../models');


router.post('/crear_unidad_de_medida', autorizarAdministrador, function(req, res, next) {
  models.unidades_de_medida.create({
    nombre: req.body.nombre 
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


router.post('/actualizar_unidad_de_medida', autorizarAdministrador, function(req, res){
  models.unidades_de_medida.update({
    nombre: req.body.nombre,
    habilitado: req.body.habilitado
  },
  {where: {id: req.body.id}})
  .then(resultado => {
    if(resultado){
      res.status(200).json('ok');
    }
    else{
      res.status(404).json('ok');
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  });
});

router.post('/eliminar_unidad_de_medida', autorizarAdministrador, function(req, res){
  models.unidades_de_medida.destroy({where: {id: req.body.id}})
  .then(res => {
    if(res){
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


router.post('/habilitar_unidad_de_medida', autorizarAdministrador, function(req, res){
  models.unidades_de_medida.update({
    habilitado: true 
  }, {where: {id: req.body.id}})
  .then(x => {
    if(x){
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

router.post('/deshabilitar_unidad_de_medida', autorizarAdministrador, function(req, res){
  models.unidades_de_medida.update({
    habilitado: false 
  }, {where: {id: req.body.id}})
  .then(x => {
    if(x){
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

router.get('/obtener_unidades_de_medida', autorizarAdministrador, function(req, res){
  models.unidades_de_medida.findAll()
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

module.exports = router;
