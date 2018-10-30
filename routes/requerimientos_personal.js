var express = require('express');
var router = express.Router();
var autorizarDirector = require('../controllers/autenticacion/autorizarDirector');
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var models = require('../models');

/* */
router.post('/crear_requerimiento_personal', autorizarDirector, function(req, res, next) {
  const fecha = new Date();
  models.requerimientos_personal.create({
    numero_personas: req.body.numero_personas,
    cargo_id: req.body.cargo_id,
    solicitud_personal_id: req.body.solicitud_personal_id
  })
  .then(requerimiento => {
    if(requerimiento){
      res.status(200).json('ok');
    }
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json('err');
  })
});

router.post('/actualizar_requerimientos_personal', autorizarDirector, function(req, res, next){
  models.requerimientos_personal.update({
    numero_personas: req.body.numero_personas,
    cargo_id: req.body.cargo_id
  },
  {where: {id: req.body.id}}
  )
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

router.post('/eliminar_requerimiento_personal', autorizarAdministrador, function(req, res){
  models.requerimientos_personal.destroy({where: {id: req.body.id}})
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

router.get('/obtener_requerimientos_personal', autorizarDirector, function(req, res){
  models.requerimientos_personal.findAll(  {where: {solicitud_personal_id: req.body.solicitud_personal_id}})
  
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

module.exports = router;
