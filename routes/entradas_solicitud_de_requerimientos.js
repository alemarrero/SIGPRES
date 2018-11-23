var express = require('express');
var router = express.Router();
var autorizarDirector = require('../controllers/autenticacion/autorizarDirector');
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var models = require('../models');

/* */
router.post('/crear_entrada_solicitud_de_requerimientos', autorizarDirector, function(req, res, next) {
  models.entradas_solicitud_de_requerimientos.findOne(
    {where: {solicitud_id: req.body.solicitud_id, producto_id: req.body.producto_id}}
  )
  .then(requerimiento => {
    if(!requerimiento){
      var cantidad_primer_trimestre = parseInt(req.body.cantidad_primer_trimestre, 10);
      var cantidad_segundo_trimestre = parseInt(req.body.cantidad_segundo_trimestre, 10);
      var cantidad_tercer_trimestre = parseInt(req.body.cantidad_tercer_trimestre, 10);
      var cantidad_cuarto_trimestre = parseInt(req.body.cantidad_cuarto_trimestre, 10);
      var cantidad = cantidad_primer_trimestre + cantidad_segundo_trimestre + cantidad_tercer_trimestre + cantidad_cuarto_trimestre;        
      models.entradas_solicitud_de_requerimientos.create({
        cantidad_primer_trimestre: cantidad_primer_trimestre,
        cantidad_segundo_trimestre: cantidad_segundo_trimestre,
        cantidad_tercer_trimestre: cantidad_tercer_trimestre,
        cantidad_cuarto_trimestre: cantidad_cuarto_trimestre,
        cantidad:cantidad,
        producto_id: req.body.producto_id,
        solicitud_id: req.body.solicitud_id
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
    }
    else {
      res.status(409).json('err');
    }
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json('err');    
  })  
});

router.post('/actualizar_entrada_solicitud_de_requerimientos', autorizarDirector, function(req, res, next){
  var cantidad_primer_trimestre = parseInt(req.body.cantidad_primer_trimestre, 10);
  var cantidad_segundo_trimestre = parseInt(req.body.cantidad_segundo_trimestre, 10);
  var cantidad_tercer_trimestre = parseInt(req.body.cantidad_tercer_trimestre, 10);
  var cantidad_cuarto_trimestre = parseInt(req.body.cantidad_cuarto_trimestre, 10);
  var cantidad = cantidad_primer_trimestre + cantidad_segundo_trimestre + cantidad_tercer_trimestre + cantidad_cuarto_trimestre;      
  models.entradas_solicitud_de_requerimientos.update({
    cantidad_primer_trimestre: cantidad_primer_trimestre,
    cantidad_segundo_trimestre: cantidad_segundo_trimestre,
    cantidad_tercer_trimestre: cantidad_tercer_trimestre,
    cantidad_cuarto_trimestre: cantidad_cuarto_trimestre,
    cantidad:cantidad,
    producto_id: req.body.producto_id,
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

router.post('/eliminar_entrada_solicitud_de_requerimientos', autorizarAdministrador, function(req, res){
  models.entradas_solicitud_de_requerimientos.destroy({where: {id: req.body.id}})
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

router.post('/obtener_entradas_solicitud_de_requerimientos', autorizarDirector, function(req, res){
  models.entradas_solicitud_de_requerimientos.findAll(  {where: {solicitud_id: req.body.solicitud_id}})
  
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

module.exports = router;
