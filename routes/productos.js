var express = require('express');
var router = express.Router();
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var models = require('../models');


router.post('/crear_producto', autorizarAdministrador, function(req, res, next) {
  if (req.body.subespecifica_id !== undefined){
    models.productos.create({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        precio: req.body.precio,
        especifica_id: req.body.especifica_id,
        subespecifica_id: req.body.subespecifica_id,
        unidad_de_medida_id: req.body.unidad_de_medida_id 
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
}
  else{
    models.productos.create({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        precio: req.body.precio,
        especifica_id: req.body.especifica_id,
        unidad_de_medida_id: req.body.unidad_de_medida_id 
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
    }  
});


router.post('/actualizar_producto', autorizarAdministrador, function(req, res){
  models.productos.update({
    codigo: req.body.codigo,
    nombre: req.body.nombre,
    precio: req.body.precio,
    unidad_de_medida_id: req.body.unidad_de_medida_id,
    especifica_id: req.body.especifica_id,
    subespecifica_id: req.body.subespecifica_id,
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

router.post('/eliminar_producto', autorizarAdministrador, function(req, res){
  models.productos.destroy({where: {id: req.body.id}})
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


router.post('/habilitar_producto', autorizarAdministrador, function(req, res){
  models.productos.update({
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

router.post('/deshabilitar_producto', autorizarAdministrador, function(req, res){
  models.productos.update({
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

router.get('/obtener_productos', autorizarAdministrador, function(req, res){
  models.productos.findAll({
      include:[
          {
          model: models.unidades_de_medida,
          as: 'unidad_de_medida',
          attributes: ["nombre"]
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
