var express = require('express');
var router = express.Router();
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var models = require('../models');


router.post('/crear_objetivo_estrategico', autorizarAdministrador, function(req, res, next) {
  models.objetivos_estrategicos.create({
    objetivo: req.body.objetivo,
    eje_estrategico_id: req.body.eje_estrategico_id
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


router.post('/actualizar_objetivo_estrategico', autorizarAdministrador, function(req, res){
  models.objetivos_estrategicos.update({
    objetivo: req.body.objetivo,
    eje_estrategico_id: req.body.eje_estrategico_id
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

router.post('/eliminar_objetivo_estrategico', autorizarAdministrador, function(req, res){
  models.objetivos_estrategicos.destroy({where: {id: req.body.id}})
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

router.get('/obtener_objetivos_estrategicos', autorizarAdministrador, function(req, res){
  models.objetivos_estrategicos.findAll()
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});


router.post('/obtener_objetivo_estrategico', autorizarAdministrador, function(req, res){
  models.objetivos_estrategicos.findOne({where: {id: req.body.id}})
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

module.exports = router;
