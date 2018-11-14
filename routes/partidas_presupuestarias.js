var express = require('express');
var router = express.Router();
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var models = require('../models');


router.post('/crear_partida_presupuestaria', autorizarAdministrador, function(req, res, next) {
  models.partidas_presupuestarias
  .create({
    numero_partida: req.body.numero_partida, 
    denominacion: req.body.denominacion
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



router.post('/actualizar_partida_presupuestaria', autorizarAdministrador, function(req, res){
  models.partidas_presupuestarias.update({
    numero_partida: req.body.numero_partida,
    habilitado: req.body.habilitado,
    denominacion: req.body.denominacion
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

router.post('/eliminar_partida_presupuestaria', autorizarAdministrador, function(req, res){
  models.partidas_presupuestarias.destroy({where: {id: req.body.id}})
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


router.post('/habilitar_partida_presupuestaria', autorizarAdministrador, function(req, res){
  models.partidas_presupuestarias.update({
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

router.post('/deshabilitar_partida_presupuestaria', autorizarAdministrador, function(req, res){
  models.partidas_presupuestarias.update({
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

router.get('/obtener_partidas_presupuestarias', autorizarAdministrador, function(req, res){
  models.partidas_presupuestarias.findAll()
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.post('/obtener_partida_presupuestaria', autorizarAdministrador, function(req, res){
  models.partidas_presupuestarias.findOne({
    where: {numero_partida: req.body.numero_partida}
  })
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.get('/obtener_partidas_completas', function(req,res){
  models.partidas_presupuestarias.findAll({
    attributes: ["id", "numero_partida", "denominacion"], 
    include: [
      {
        model: models.genericas,
        as: "genericas",
        attributes: ["id", "numero_generica", "denominacion"],
        include: [
          {
            model: models.especificas,
            as: "especificas",
            attributes: ["id", "numero_especifica", "denominacion"],
            include: [
              {
                model: models.subespecificas,
                as: "subespecificas",
                attributes: ["id", "numero_subespecifica", "denominacion"]
              }
            ]
          }
        ]
      }
    ]
  })
  .then(resultado => {
    res.status(200).json(resultado)
  })
  .catch(err => {
    console.log(err);

    res.status(500).json("err");
  })

});

router.post('/obtener_partida_desde_especifica', function(req,res){
  models.partidas_presupuestarias.findOne({
    attributes: ["id", "numero_partida", "denominacion"], 
    include: [
      {
        model: models.genericas,
        as: "genericas",
        attributes: ["id", "numero_generica", "denominacion"],
        include: [
          {
            model: models.especificas,
            where: {id: req.body.id},
            as: "especificas",
            attributes: ["id", "numero_especifica", "denominacion"],
          }
        ]
      }
    ]
  })
  .then(resultado => {
    res.status(200).json(resultado)
  })
  .catch(err => {
    console.log(err);

    res.status(500).json("err");
  })

});

router.post('/obtener_partida_desde_subespecifica', function(req,res){
  models.partidas_presupuestarias.findOne({
    attributes: ["id", "numero_partida", "denominacion"], 
    include: [
      {
        model: models.genericas,
        as: "genericas",
        attributes: ["id", "numero_generica", "denominacion"],
        include: [
          {
            model: models.especificas,
          
            as: "especificas",
            attributes: ["id", "numero_especifica", "denominacion"],
            include: [
              {
                model: models.subespecificas,
                where: {id: req.body.id},
                as: "subespecificas",
                attributes: ["id", "numero_subespecifica", "denominacion"]
              }
            ]
          }
        ]
      }
    ]
  })
  .then(resultado => {
    res.status(200).json(resultado)
  })
  .catch(err => {
    console.log(err);

    res.status(500).json("err");
  })

});
module.exports = router;
