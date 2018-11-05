var express = require('express');
var router = express.Router();
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var models = require('../models');

/**
 * Endpoint que se encarga de crear una propuesta de plan operativo anual
 * 
 * Parámetros que se envian en el body de la solicitud:
 * @param {String} area_id
 * @param {String} periodo
 * @param {String} enviada
 * @param {String} aprobada
 * @param {String} observaciones
 *
 * Respuestas:
 * @return estado 200 y {estado: 'ok', id: <id de la propuesta>} si la propuesta se creó correctamente.
 * @return estado 500 y {estado: 'err'} si ocurrió algún error en el servidor.
 */
router.post('/crear_propuesta', autorizarAdministrador, function(req, res){
  const fecha = new Date();
  
  // Se le suma 1 al año porque se está creando una propuesta para el periodo que corresponde al año siguiente
  const año = parseInt(fecha.toDateString().split(" ")[3], 10) + 1;

  models.propuestas_plan_operativo_anual.create({
    area_id: req.session.area_id,
    periodo: `${año}`,
    enviada: false,
    aprobada: false,
    observaciones: null,
  })
  .then(propuesta => {
    res.status(200).json({estado: "ok", data: propuesta});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({estado: "err", data: undefined});
  })
});

router.get("/obtener_historico_propuestas", autorizarAdministrador, function(req, res){
  models.propuestas_plan_operativo_anual.findAll()
  .then(propuestas => {
    res.status(200).json(propuestas);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json("err");
  })
});

/**
 * Obtiene toda la información de la propuesta de una cierta área. Esta información incluye:
 *  - Información de la propuesta
 *  - Objetivos específicos
 *  - Acciones recurrentes
 */
router.post("/obtener_propuesta_full", function(req, res){
  const fecha = new Date();
  
  // Se le suma 1 al año porque se está creando una propuesta para el periodo que corresponde al año siguiente
  const año = parseInt(fecha.toDateString().split(" ")[3], 10) + 1;

  models.propuestas_plan_operativo_anual.findAll(
    {
      where: {periodo: `${año}`, area_id: req.body.area_id},
      include: [
        {
          model: models.areas, 
          as: "area"
        },
        {
          model: models.objetivos_especificos, 
          as: "objetivos_especificos",
          include: [{
            model: models.acciones_recurrentes,
            as: "acciones_recurrentes",
            include: [
              {
                model: models.unidades_de_medida,
                as: "unidad_de_medida"
              },
              {
                model: models.medios_de_verificacion,
                as: "medio_de_verificacion"
              },
            ]
          }]
        },
      ]
    })
  .then(propuestas => {
    res.status(200).json(propuestas);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json("err");
  })
});

/**
 * Obtiene todas las propuestas que han sido enviadas que corresponden al próximo periodo
 * con la información de la área a la que pertenecen.
 */
router.get("/obtener_propuestas", function(req, res){
  const fecha = new Date();
  
  // Se le suma 1 al año porque se está creando una propuesta para el periodo que corresponde al año siguiente
  const año = parseInt(fecha.toDateString().split(" ")[3], 10) + 1;

  models.propuestas_plan_operativo_anual.findAll(
    {
      where: {periodo: `${año}`, enviada: true},
      include: [{model: models.areas, as: "area"}]
    })
  .then(propuestas => {
    res.status(200).json(propuestas);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json("err");
  })
});

/**
 * Obtiene la información de una propuesta para el periodo actual de una dirección en particular
 */
router.get("/obtener_propuesta", autorizarAdministrador, function(req, res){
  const fecha = new Date();
  
  // Se le suma 1 al año porque se está buscando una propuesta para el periodo que corresponde al año siguiente
  const año = parseInt(fecha.toDateString().split(" ")[3], 10) + 1;

  models.propuestas_plan_operativo_anual.findOne({where: {area_id: req.session.area_id, periodo: `${año}`}})
  .then(propuesta => {
    if(propuesta){
      res.status(200).json({estado: "ok", data: propuesta});
    }
    else{
      res.status(404).json("err");
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json("err");
  });
});

router.post("/aprobar_propuesta", autorizarAdministrador, function(req, res){
  models.propuestas_plan_operativo_anual.update({
    aprobada: true
  },
  {where: {id: req.body.id}})
  .then( (resultado) => {
    if(resultado[0]){
      res.status(200).json("ok");
    }
    else{
      res.status(404).json("err");
    }
  })
  .catch(err => {
    console.log(err);
    res.status(200).json("err");
  });
});

router.post("/desaprobar_propuesta", autorizarAdministrador, function(req, res){
  models.propuestas_plan_operativo_anual.update({
    aprobada: false,
    enviada: false
  },
  {where: {id: req.body.id}})
  .then( (resultado) => {
    if(resultado[0]){
      res.status(200).json("ok");
    }
    else{
      res.status(404).json("err");
    }
  })
  .catch(err => {
    console.log(err);
    res.status(200).json("err");
  });
});

router.post("/enviar_propuesta", autorizarAdministrador, function(req, res){
  models.propuestas_plan_operativo_anual.update({
    enviada: true
  },
  {where: {id: req.body.id}})
  .then( (resultado) => {
    if(resultado[0]){
      res.status(200).json("ok");
    }
  })
  .catch(err => {
    console.log(err);
    res.status(200).json("err");
  });
});

router.post("/retirar_propuesta", autorizarAdministrador, function(req, res){
  models.propuestas_plan_operativo_anual.update({
    enviada: false
  },
  {where: {id: req.body.id}})
  .then( (resultado) => {
    if(resultado[0]){
      res.status(200).json("ok");
    }
    else{
      res.status(404).json("err");
    }
  })
  .catch(err => {
    console.log(err);
    res.status(200).json("err");
  });
});

router.post("/eliminar_propuesta", autorizarAdministrador, function(req, res){
  models.propuestas_plan_operativo_anual.destroy({where: {id: req.body.id}})
  .then( (resultado) => {
    if(resultado[0]){
      res.status(200).json("ok");
    }
    else{
      res.status(404).json("err");
    }
  })
  .catch(err => {
    console.log(err);
    res.status(200).json("err");
  });
});

module.exports = router;