var express = require('express');
var router = express.Router();
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var models = require('../models');


router.post('/crear_antecedente', autorizarAdministrador, function(req, res, next) {
  models.antecedentes.create({
    periodo: req.body.periodo,
    mision: req.body.mision,
    vision: req.body.vision,
    debilidades: req.body.debilidades,
    fortalezas: req.body.fortalezas,
    amenazas: req.body.amenazas,
    objetivo_general: req.body.objetivo_general,
    oportunidades: req.body.oportunidades
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


router.post('/actualizar_antecedente', autorizarAdministrador, function(req, res){
  models.antecedentes.update({
    periodo: req.body.periodo,
    mision: req.body.mision,
    vision: req.body.vision,
    debilidades: req.body.debilidades,
    fortalezas: req.body.fortalezas,
    amenazas: req.body.amenazas,
    objetivo_general: req.body.objetivo_general,
    oportunidades: req.body.oportunidades
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

router.post('/eliminar_antecedente', autorizarAdministrador, function(req, res){
  models.antecedentes.destroy({where: {id: req.body.id}})
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


router.post('/habilitar_antecedente', autorizarAdministrador, function(req, res){
  models.antecedentes.update({
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

router.post('/deshabilitar_antecedente', autorizarAdministrador, function(req, res){
  models.antecedentes.update({
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

router.get('/obtener_antecedentes', function(req, res){
  models.antecedentes.findAll()
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});


router.post('/obtener_antecedente', function(req, res){
  models.antecedentes.findOne({where: {id: req.body.id}})
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.post('/obtener_antecedente_full', function(req, res){
  models.antecedentes.findOne({
    where: {id: req.body.id},
    include: [
      {
        model: models.ejes_estrategicos,
        as: "ejes_estrategicos",
        where: {antecedente_id: req.body.id},
        attributes: ["id", "nombre", "descripcion"],
        include: [
          {
            model: models.objetivos_estrategicos,
            as: "objetivos_estrategicos",
            attributes: ["objetivo", "id"]
          }
        ]
      }
    ]
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
