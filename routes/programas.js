var express = require('express');
var router = express.Router();
var autorizarDirector = require('../controllers/autenticacion/autorizarDirector');
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var models = require('../models');

/* */
router.post('/crear_programa', autorizarDirector, function(req, res, next) {
  models.programas.create({
    nombre: req.body.nombre,
    fecha_inicio: req.body.fecha_inicio,
    fecha_finalizacion: req.body.fecha_finalizacion,
    duracion: req.body.duracion,
    ddarea_id: req.body.area_id,
    descripcion: req.body.descripcion
  })
  .then(resultado => {
    if(resultado){
      res.status(200).json('ok');
    }
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json('err');
  })
});

router.post('/actualizar_programa', autorizarDirector, function(req, res, next){
  models.programas.update({
    nombre: req.body.nombre,
    fecha_inicio: req.body.fecha_inicio,
    fecha_finalizacion: req.body.fecha_finalizacion,
    duracion: req.body.duracion,
    area_id: req.body.area_id,
    descripcion: req.body.descripcion
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

router.post('/eliminar_programa', autorizarAdministrador, function(req, res){
  models.programas.destroy({where: {id: req.body.id}})
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

router.get('/obtener_programas', autorizarDirector, function(req, res){
  models.programas.findAll()
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

module.exports = router;
