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
      var cantidad_enero = parseInt(req.body.cantidad_enero, 10);
      var cantidad_febrero = parseInt(req.body.cantidad_febrero, 10);
      var cantidad_marzo = parseInt(req.body.cantidad_marzo, 10);
      var cantidad_abril = parseInt(req.body.cantidad_abril, 10);
      var cantidad_mayo = parseInt(req.body.cantidad_mayo, 10);
      var cantidad_junio = parseInt(req.body.cantidad_junio, 10);
      var cantidad_julio = parseInt(req.body.cantidad_julio, 10);
      var cantidad_agosto = parseInt(req.body.cantidad_agosto, 10);
      var cantidad_septiembre = parseInt(req.body.cantidad_septiembre, 10);
      var cantidad_octubre = parseInt(req.body.cantidad_octubre, 10);
      var cantidad_noviembre = parseInt(req.body.cantidad_noviembre, 10);
      var cantidad_diciembre = parseInt(req.body.cantidad_diciembre, 10);            
      var cantidad = cantidad_enero + cantidad_febrero + cantidad_marzo + cantidad_abril + cantidad_mayo + cantidad_junio + cantidad_julio + cantidad_agosto + cantidad_septiembre + cantidad_octubre + cantidad_noviembre + cantidad_diciembre;        
      models.entradas_solicitud_de_requerimientos.create({
        cantidad_enero: cantidad_enero,
        cantidad_febrero: cantidad_febrero,
        cantidad_marzo: cantidad_marzo,
        cantidad_abril: cantidad_abril,
        cantidad_mayo: cantidad_mayo,
        cantidad_junio: cantidad_junio,
        cantidad_julio: cantidad_julio,
        cantidad_agosto: cantidad_agosto,
        cantidad_septiembre: cantidad_septiembre,
        cantidad_octubre: cantidad_octubre,
        cantidad_noviembre: cantidad_noviembre,
        cantidad_diciembre: cantidad_diciembre,
        cantidad: cantidad,
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
  var cantidad_enero = parseInt(req.body.cantidad_enero, 10);
  var cantidad_febrero = parseInt(req.body.cantidad_febrero, 10);
  var cantidad_marzo = parseInt(req.body.cantidad_marzo, 10);
  var cantidad_abril = parseInt(req.body.cantidad_abril, 10);
  var cantidad_mayo = parseInt(req.body.cantidad_mayo, 10);
  var cantidad_junio = parseInt(req.body.cantidad_junio, 10);
  var cantidad_julio = parseInt(req.body.cantidad_julio, 10);
  var cantidad_agosto = parseInt(req.body.cantidad_agosto, 10);
  var cantidad_septiembre = parseInt(req.body.cantidad_septiembre, 10);
  var cantidad_octubre = parseInt(req.body.cantidad_octubre, 10);
  var cantidad_noviembre = parseInt(req.body.cantidad_noviembre, 10);
  var cantidad_diciembre = parseInt(req.body.cantidad_diciembre, 10);            
  var cantidad = cantidad_enero + cantidad_febrero + cantidad_marzo + cantidad_abril + cantidad_mayo + cantidad_junio + cantidad_julio + cantidad_agosto + cantidad_septiembre + cantidad_octubre + cantidad_noviembre + cantidad_diciembre;        
  models.entradas_solicitud_de_requerimientos.update({
    cantidad_enero: cantidad_enero,
    cantidad_febrero: cantidad_febrero,
    cantidad_marzo: cantidad_marzo,
    cantidad_abril: cantidad_abril,
    cantidad_mayo: cantidad_mayo,
    cantidad_junio: cantidad_junio,
    cantidad_julio: cantidad_julio,
    cantidad_agosto: cantidad_agosto,
    cantidad_septiembre: cantidad_septiembre,
    cantidad_octubre: cantidad_octubre,
    cantidad_noviembre: cantidad_noviembre,
    cantidad_diciembre: cantidad_diciembre,
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
