var express = require('express');
var router = express.Router();
var autorizarDirector = require('../controllers/autenticacion/autorizarDirector');
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var models = require('../models');

/* */
router.post('/crear_solicitud_personal', autorizarDirector, function(req, res, next) {
  const fecha = new Date();
  const año = parseInt(fecha.toDateString().split(" ")[3], 10) + 1;

  models.solicitud_personal.findOne(
    {where: {area_id: req.body.area_id, periodo: `${año}`}}
  )
  .then(solicitud => {
    if(!solicitud){
      models.solicitud_personal.create({
        justificacion: req.body.numero,
        enviada: false,
        periodo: `${año}`,
        area_id: req.body.area_id
      })
      .then(solicitud => {
        if(solicitud){
          res.status(200).json(solicitud.dataValues.id);
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

router.post('/actualizar_solicitud_personal', autorizarDirector, function(req, res, next){
  models.solicitud_personal.update({
    justificacion: req.body.justificacion,
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

router.post('/eliminar_solicitud_personal', autorizarDirector, function(req, res){
  models.solicitud_personal.destroy({where: {id: req.body.id}})
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

router.get('/obtener_solicitudes_personal', autorizarDirector, function(req, res){
  models.solicitud_personal.findAll()
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.get('/obtener_solicitudes_personal_enviadas', autorizarDirector, function(req, res){
  models.solicitud_personal.findAll({
    where: {enviada: true}
  })
  .then( resultado => {
    res.json(resultado).status(resultado);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.get('/obtener_solicitud_personal', autorizarDirector, function(req, res){
  models.solicitud_personal.findOne({
    where: {area_id: req.session.area_id}
  })
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.post('/obtener_solicitud_personal_enviada', autorizarDirector, function(req, res){
  models.solicitud_personal.findOne({
    where: {id: req.body.id}
  })
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.post('/enviar_solicitud_personal', autorizarDirector, function(req, res){
  models.solicitud_personal.update({
    enviada: true 
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

router.get('/obtener_consolidado', function(req,res){
  models.requerimientos_personal.findAll({
    group:["cargo.id", "cargo_id"], 
    attributes: ["cargo_id", [models.sequelize.fn('SUM', models.sequelize.col('numero_personas')), 'total']], 
    include: [
      {
        model: models.cargos,
        as: "cargo",
        attributes: ["cargo", "codigo", "id"]
      },
      {
        model: models.solicitud_personal,
        as: "solicitud_personal",
        attributes: [],
        where: {enviada: true}
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
