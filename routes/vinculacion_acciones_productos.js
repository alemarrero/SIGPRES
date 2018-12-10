
var express = require('express');
var router = express.Router();
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var models = require('../models');

router.post('/crear_vinculacion_accion_producto', autorizarAdministrador, function(req, res, next) {
  models.vinculacion_acciones_productos.create({
    accion_id: req.body.accion_id,
    producto_id: req.body.producto_id 
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


router.post('/actualizar_vinculacion_accion_producto', autorizarAdministrador, function(req, res){
  models.vinculacion_acciones_productos.update({
    accion_id: req.body.accion_id,
    producto_id: req.body.producto_id  
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

router.post('/eliminar_vinculacion_accion_producto', autorizarAdministrador, function(req, res){
  models.vinculacion_acciones_productos.destroy({where: {id: req.body.id}})
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

router.get('/obtener_vinculacion_acciones_productos', function(req, res){
  models.acciones_recurrentes.findAll({
    include: [
      {
        model: models.vinculacion_acciones_productos,
        as: 'vinculacion_acciones_productos',
        include: [
          {
            model: models.productos,
            as: 'productos',
            include: [
              {
                model: models.unidades_de_medida,
                as: 'unidad_de_medida'
              }
            ]
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
