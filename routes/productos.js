var express = require('express');
var router = express.Router();
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var models = require('../models');


router.post('/crear_producto', autorizarAdministrador, function(req, res, next) {
  console.log(req.body.subespecifica_id);
  console.log(req.body.especifica_id);
  if (req.body.subespecifica_id !== undefined){
    var precio = parseFloat(req.body.precio,10);
    var iva = parseFloat(req.body.iva,10);
    var monto_iva = (iva/100) * precio;
    var total = precio + monto_iva;
    models.productos.create({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        precio: precio,
        subespecifica_id: req.body.subespecifica_id,
        unidad_de_medida_id: req.body.unidad_de_medida_id,
        iva: iva,
        monto_iva: monto_iva,
        total: total
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
    var precio = parseFloat(req.body.precio,10);
    var iva = parseFloat(req.body.iva,10);
    var monto_iva = (iva/100) * precio;
    var total = precio + monto_iva;    
    models.productos.create({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        precio: precio,
        especifica_id: req.body.especifica_id,
        unidad_de_medida_id: req.body.unidad_de_medida_id,
        iva: iva,
        monto_iva: monto_iva,
        total: total         
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
  var precio = parseFloat(req.body.precio,10);
  var iva = parseFloat(req.body.iva,10);
  var monto_iva = (iva/100) * precio;
  var total = precio + monto_iva;
  models.productos.update({
    codigo: req.body.codigo,
    nombre: req.body.nombre,
    precio: precio,
    unidad_de_medida_id: req.body.unidad_de_medida_id,
    especifica_id: req.body.especifica_id,
    subespecifica_id: req.body.subespecifica_id,
    habilitado: req.body.habilitado,
    iva: iva,
    monto_iva: monto_iva,
    total: total
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

router.get('/obtener_productos', function(req, res){
  models.productos.findAll({
      include:[
          {
          model: models.unidades_de_medida,
          as: 'unidad_de_medida',
          attributes: ["nombre"]
          },
          {
            model: models.subespecificas,
            as: 'subespecifica',
            include: [
              {
                model: models.especificas,
                as: 'especifica',
                include: [
                  {
                    model: models.genericas,
                    as: 'generica',
                    include: [
                      {
                        model: models.partidas_presupuestarias,
                        as: 'partida_presupuestaria'
                      }
                    ]
                  }
                ]
              }
            ]            
          },
          {
            model: models.especificas,
            as: 'especifica',
            include: [
              {
                model: models.genericas,
                as: 'generica',
                include: [
                  {
                    model: models.partidas_presupuestarias,
                    as: 'partida_presupuestaria'
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

router.get('/obtener_consolidado_presupuesto', function(req, res){
  // let query = 
  // "SELECT * " 
  // + "FROM partidas_presupuestarias pp " 
  // + "JOIN genericas g on pp.id = g.partida_presupuestaria_id "
  // + "JOIN especificas e on e.generica_id = g.id "
  // + "JOIN subespecificas sub on sub.especifica_id = e.id " 
  // + "JOIN productos p on p.subespecifica_id = sub.id "
  // + "JOIN entradas_solicitud_de_requerimientos esr on esr.producto_id = p.id " 
  // + "JOIN solicitudes_de_requerimientos sol on sol.id = esr.solicitud_id "
  // + "WHERE sol.periodo = :periodo AND sol.enviada = true "
  // ;
  // models.sequelize.query(query, {replacements: { periodo: '2018'}, type: models.sequelize.QueryTypes.SELECT})
  // .then(resultado => {
  //   res.status(200).json(resultado)
  // })
  // .catch(err => {
  //   console.log(err);
  //   res.status(500).json("err");
  // });

  models.partidas_presupuestarias.findAll({
    attributes: ["denominacion", "numero_partida", "id"],
    separate: true,
    include: [
      {
        model: models.genericas,
        as: "genericas",
        attributes: ["numero_generica", "denominacion", "id"],
        include: [
          {
            model: models.especificas,
            as: "especificas",
            attributes: ["numero_especifica", "denominacion", "id"],
            include: [
              {
                model: models.subespecificas,
                as: "subespecificas",
                attributes: ["numero_subespecifica", "denominacion", "id"],
                include: [
                  {
                    model: models.productos,
                    as: "productos",
                    separate: true,
                    include: [
                      {
                        model: models.entradas_solicitud_de_requerimientos,
                        as: "entradas_solicitud_de_requerimientos",
                        include: [
                          {
                            model: models.solicitudes_de_requerimientos,
                            as: "solicitud_de_requerimiento",
                            attributes: ["periodo", "area_id"],
                            where: {periodo: "2018", enviada: true},
                            required: false,
                          }
                        ]
                      },

                    ]
                  }
                ]
              },
              {
                model: models.productos,
                as: "productos",
                separate: true,
                include: [
                  {
                    model: models.entradas_solicitud_de_requerimientos,
                    as: "entradas_solicitud_de_requerimientos",
                    include: [
                      {
                        model: models.solicitudes_de_requerimientos,
                        as: "solicitud_de_requerimiento",
                        attributes: ["periodo", "area_id"],
                        required: false,
                        where: {periodo: "2018", enviada: true},
                      }
                    ]
                  },

                ]
              }
            ]
          }
        ]
      }
    ]
  })
  .then(resultado => {
    res.status(200).json(resultado);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
