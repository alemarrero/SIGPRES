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
router.post('/crear_accion_recurrente', autorizarAdministrador, function(req, res){
  models.acciones_recurrentes.create({
    accion_recurrente: req.body.accion_recurrente,
    objetivo_especifico_id: req.body.objetivo_especifico_id,
    unidad_medida_id: req.body.unidad_medida_id,
    meta_fisica_anual: req.body.meta_fisica_anual,
    programacion_primer_trimestre: req.body.programacion_primer_trimestre,
    programacion_segundo_trimestre: req.body.programacion_segundo_trimestre,
    programacion_tercer_trimestre: req.body.programacion_tercer_trimestre,
    programacion_cuarto_trimestre: req.body.programacion_cuarto_trimestre,
    medio_verificacion_id: req.body.medio_verificacion_id,
  })
  .then(accion => {
    if(accion){
      res.status(200).json("ok");
    }
    else{
      res.status(409).json("err");
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json("err");
  })
});

router.post("/obtener_acciones_recurrentes", autorizarAdministrador, function(req, res){
  models.acciones_recurrentes.findAll({where: {objetivo_especifico_id: req.body.objetivo_especifico_id}})
  .then(acciones => {
    res.status(200).json(acciones);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json("err");
  })
});

router.get("/obtener_acciones_recurrentes_periodo_actual", autorizarAdministrador, function(req, res){
  let acciones = [];
  const fecha = new Date();
  const año = parseInt(fecha.toDateString().split(" ")[3], 10) + 1;
  models.acciones_recurrentes.findAll(
    {
      include:[
        {
          model: models.objetivos_especificos,
          as: "objetivo_especifico",
          attributes:["propuesta_id"],
          include: [
            {
              model: models.propuestas_plan_operativo_anual,
              as: "propuesta",
              where: {periodo: `${año}`},
              attributes: ["area_id", "periodo"],
            }
          ]
        }
      ]
    }
  )
  .then(resultado => {
    if(resultado.length > 0){
      resultado.map(accion => { 
        let info_accion = {};
        if (accion.objetivo_especifico.propuesta !== null){
          info_accion["accion_id"] = accion.id;
          info_accion["nombre"] = accion.accion_recurrente;
          acciones.push(info_accion);
        }
      })
    }
    res.status(200).json(acciones);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json("err");
  })
});

router.post("/obtener_accion_recurrente", autorizarAdministrador, function(req, res){
  models.acciones_recurrentes.findAll({where: {id: req.body.id}})
  .then(accion_recurrente => {
    res.status(200).json(accion_recurrente);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json("err");
  })
});

router.post("/modificar_accion_recurrente", autorizarAdministrador, function(req, res){
  models.acciones_recurrentes.update({
    accion_recurrente: req.body.accion_recurrente,
    unidad_medida_id: req.body.unidad_medida_id,
    meta_fisica_anual: req.body.meta_fisica_anual,
    programacion_primer_trimestre: req.body.programacion_primer_trimestre,
    programacion_segundo_trimestre: req.body.programacion_segundo_trimestre,
    programacion_tercer_trimestre: req.body.programacion_tercer_trimestre,
    programacion_cuarto_trimestre: req.body.programacion_cuarto_trimestre,
    medio_verificacion_id: req.body.medio_verificacion_id,
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

router.post("/eliminar_accion_recurrente", autorizarAdministrador, function(req, res){
  models.acciones_recurrentes.destroy({where: {id: req.body.id}})
  .then( (resultado) => {
    if(resultado){
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